'use strict';

const Mplayer = require('mplayer'),
      chalk = require('chalk'),
      log = require('npmlog'),
      EventEmitter = require('events');

const resetLine  = function() {
  process.stdout.clearLine();
  process.stdout.cursorTo(0)
};

class Player extends EventEmitter {

  constructor() {
    super();

    log.addLevel('playing', 2001, {bg: 'black', fg: 'green'}, '[playing]');
    log.addLevel('paused', 2007, {bg: 'black', fg: 'green'}, '[paused]');
    log.addLevel('skipped', 2002, {bg: 'black', fg: 'red'}, '[skipped]');
    log.addLevel('finished', 2003, {bg: 'black', fg: 'red'}, '[finished]');
    log.addLevel('volume', 2004, {bg: 'black', fg: 'red'}, '[volume]');
    log.addLevel('interesting', 2005, {bg: 'black', fg: 'red'}, '[interesting]');
    log.addLevel('switching', 2006, {bg: 'black', fg: 'red'}, '[switching]');

    this.story = null;
    this.volume = 20;
    this.time = 0;
    this.playing = false;

    this.player = new Mplayer();
    this.player.on('stop', this.done.bind(this));
    this.player.on('time', (time) => this.time = time);
    this.player.on('error', console.error);

  }

  load(story) {
    this.story = story;
    return this.play();
  }

  play() {

    if(! this.story) return;

    this.story.start().then((file) => {

      this.player.openFile(file);

      resetLine();
      log.playing(this.story.selection + ":" + this.story.title);

      this.player.play();
      this.time = 0;
      this.playing = true;

    });

  }

  increaseVolume() {

    if(! this.player) return;

    this.volume += 5;

    if(this.volume > 100)
      this.volume = 100;

    this.player.volume(this.volume);

    resetLine();
    log.volume(this.volume);

  }

  decreaseVolume() {

    if(! this.player)
      return;

    this.volume -= 5;

    if(this.volume < 5)
      this.volume = 5;

    this.player.volume(this.volume);

    resetLine();
    log.volume(this.volume);

  }
  pause() {

    if(! this.player) return;

    if(this.playing) {
      this.player.pause();
      this.playing = false;
      // log.paused("Pressed Pause")
    } else {
      this.player.play();
      this.playing = true;
    }

  }

  rewind() {

    if(! this.player) return;

    if(this.time < 15)
      this.time = 15;

    this.player.seek(this.time-15);

  }

  skip() {

    if(! this.player) return;
    if(! this.story) return;
    if(! this.story.canSkip) return;

    resetLine();
    log.skipped(this.story.title);

    this.story.next(this.time);
    this.player.stop();

  }

  interesting() {

    if(! this.player) return;
    if(! this.story) return;
    if(this.story.interesting) return;

    resetLine();
    log.interesting(this.story.title);

    this.story.markInteresting(this.time);

  }

  done() {

    if(! this.story.skipped) {
      resetLine();
      log.finished(this.story.title);
    }

    this.story.finished();
    this.time = 0;
    this.playing = false;
    this.play();

  }

  decreaseFreq() {
      // Switch between news and music
      // log.switching(this.story.music);
      // this.story.music = !this.story.music;
      log.switching('Music choice is ' + this.story.music);
      // const npr = new NPR(),
      //     story = new Story(npr);
      // this.load(story)
      // this.skip()

  }
}

module.exports = Player;
