'use strict';

const EventEmitter = require('events'),
      keypress = require('keypress');

class UI extends EventEmitter {

  constructor(config) {

    super();

    this.touchThreshold = config.touchThreshold || 24;
    this.releaseThreshold = config.releaseThreshold || 12;

    if(process.platform == 'linux' && process.arch == 'arm')
      this.mprInit();

    this.keyboardInit();

    this.gpioInit();
  }

  keyboardInit() {

    keypress(process.stdin);

    process.stdin.on('keypress', (ch, key) => {
      if(key && key.name == 'right') this.skip();
      if(key && key.name == 'left') this.rewind();
      if(key && key.name == 'up') this.volumeup();
      if(key && key.name == 'down') this.volumedown();
      if(key && key.name == 'space') this.pause();
      if(key && key.name == 'i') this.interesting();
      if(key && key.ctrl && key.name == 'c') process.exit();
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();

  }

  mprInit() {

    const MPR121 = require('adafruit-mpr121'),
          mpr121 = new MPR121(0x5A, 1);

    mpr121.setThresholds(this.touchThreshold, this.releaseThreshold);

    mpr121.on('touch', (pin) => {
      if(pin === 0) this.rewind();
      if(pin === 1) this.pause();
      if(pin === 2) this.skip();
      if(pin === 3) this.interesting();
      if(pin === 4) this.volumeup();
      if(pin === 5) this.volumedown();
      if(pin === 6) this.volumeup();
      if(pin === 7) this.volumeup();


    });

    // const Gpio = require('onoff').Gpio,
    //     button = new Gpio(13, 'in', 'falling');
    // function freq(err, value) {
    //     try{
    //         console.log('Button value is now ' + value);
    //
    //         this.hit();
    //     }catch(e){
    //         if(e){
    //             // If fails, do something
    //             console.log('failed:' + e);
    //         }
    //     }
    // }
    // button.watch(freq);
  }

  gpioInit() {


    //     function(err, value) {
    //     if(err){
    //     console.log('failed:' + err);
    //     throw err;
    //   }
    //   console.log('Button value is now ' + value);
    //   // this.decreaseFreq();
    //     console.log('hitting...');
    //     this.emit('decreaseFreq');
    //
    // });
  }
  decreaseFreq(pressed){
      this.emit('decreaseFreq');
  }

  skip(pressed) {
    this.emit('skip');
  }

  pause(pressed) {
    this.emit('pause');
  }

  rewind(pressed) {
    this.emit('rewind');
  }

  interesting(pressed) {
    this.emit('interesting');
  }

  volumeup(pressed) {
    this.emit('volumeup');
  }

  volumedown(pressed) {
    this.emit('volumedown');
  }

}

module.exports = UI;
