'use strict';

process.title = 'npr-one';

if(process.platform != 'linux' && process.platform != 'darwin') {
  console.error('Your platform is not currently supported');
  process.exit(1);
}

const NPR = require('npr-api'),
      chalk = require('chalk'),
      auth = require('./lib/auth'),
      fs = require('fs'),
      path = require('path'),
      config = path.join(process.env['HOME'], '.npr-one'),
      dotenv = require('dotenv').load({silent: true, path: config}),
      Player = require('./lib/player'),
      Story = require('./lib/story'),
      UI = require('./lib/ui'),
      Gpio = require('onoff').Gpio;

const logo = fs.readFileSync(path.join(__dirname, 'logo.txt'), 'utf8');

const npr = new NPR(),
      story = new Story(npr),
      player = new Player();

console.log('connecting to npr one...');

// silence swagger log output
process.env.NODE_ENV = 'test';

npr.one
   .init()
   .then(auth.getToken.bind(auth, npr))
   .then((token) => {
     process.stdout.write('\x1B[2J');
     process.stdout.write('\x1B[0f');
     console.log(logo);
     // console.log(token);
     return npr.one.setAccessToken(token);
   })
   .then(story.getRecommendations.bind(story))
   .then(player.load.bind(player))
   .then(() => {

     const ui = new UI({
       touchThreshold: process.env.MPR121_TOUCH,
       releaseThreshold: process.env.MPR121_RELEASE
     });
     var Gpio = require('onoff').Gpio,
         button = new Gpio(13, 'in', 'falling', {debounceTimeout: 200 });
     button.watch(function (err, value) {
           console.log('Button value is now ' + value);
           // this.decreaseFreq();
           if (err) {
               throw err;
           } else {
               // this.decreaseFreq()
               player.decreaseFreq();
               // story.getRecommendations()
           }

           // if(key && key.name == 'right') this.skip();
           // if(key && key.name == 'left') this.rewind();
           // if(key && key.name == 'up') this.volumeup();
           // if(key && key.name == 'down') this.volumedown();
           // if(key && key.name == 'space') this.pause();
           // if(key && key.name == 'i') this.interesting();
           // if(key && key.ctrl && key.name == 'c') process.exit();
       });
     // const button = new Gpio(13, 'in', 'falling');
     // button.watch(function(err, value) {
     //     console.log('button now ' + value)
     //     player.pause.bind(player);
     // });
     ui.on('skip', player.skip.bind(player));
     ui.on('pause', player.pause.bind(player));
     ui.on('rewind', player.rewind.bind(player));
     ui.on('interesting', player.interesting.bind(player));
     ui.on('volumeup', player.increaseVolume.bind(player));
     ui.on('volumedown', player.decreaseVolume.bind(player));
     ui.on('decreaseFreq', player.decreaseFreq.bind(player));
   })
   .catch(function(err) {
     console.error(err, err.stack);
   });
