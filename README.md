# Old News (based on NPR One CLI)

This project is a conversion of a vintage AM/FM radio (Lloyds, Model# J202B) to an internet radio dedicated to NPR content.

![Original radio, 1](https://i.ebayimg.com/images/g/MGwAAOSwNrNdECSK/s-l1600.jpg)
![Original radio, 2](https://i.ebayimg.com/images/g/X~kAAOSwiG1dECSE/s-l1600.jpg)
![Original radio disassembled](https://photos.app.goo.gl/zphseqbzbzLxXA1V9)


This builds upon a command line based NPR One client. A full tutorial with setup instructions of that original work can be found [in the Adafruit Learning System](https://learn.adafruit.com/raspberry-pi-zero-npr-one-radio).

Details/instructions for Old News are in progress. The contents of the README from the project is included below. 

## Installation

This package requires the latest stable version of [Node.js](https://nodejs.org) (v6.0 or higher due to the use of es6).

```sh
$ node -v
v6.2.0
```

Install `mplayer` on OS X using [homebrew](http://brew.sh/):

```
$ brew install mplayer
```

Install `mplayer` on Linux:

```
$ sudo apt-get install -y mplayer
```

Make sure you have the latest stable [node.js](https://nodejs.org/en/) installed (6.0 or higher), and then run:

```
npm install -g npr-one
```

## Usage

Sign into the [NPR Dev Console](http://dev.npr.org/), create a new app, and use your App ID & Secret to authorize the CLI. The audio player will save your authorization and begin playing.

```
$ npr-one

\\\\\\\\\\\\\\\\\\\\\\\\\\\>>>>>>>>>>>>>>>>>>>>>>>>>> \\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\>>>>>>>>>>>>>>>>>>>>>>>>>> \\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\\\\\\>>\\\\\\\\\\\\>>>>>>>>>>>>>>>>>>>>>>>>>> \\\\\\\\\\\\\\>>>\\\\\\\\\
\\\\\\\           >\\\\\\\\>>>>>>>          \>>>>>>>> \\\\\\\\         (\\\\\\\\
\\\\\\\   .>>>>=   \\\\\\\\>>>>>>>   =>>>>    >>>>>>> \\\\\\\\    (>>>>\\\\\\\\\
\\\\\\\   )\\\\\   (\\\\\\\>>>>>>>   >>>>>>   )>>>>>> \\\\\\\\   .\\\\\\\\\\\\\\
\\\\\\\   )\\\\\   (\\\\\\\>>>>>>>   >>>>>>   )>>>>>> \\\\\\\\   )\\\\\\\\\\\\\\
\\\\\\\   )\\\\\   (\\\\\\\>>>>>>>   >>>>>\   >>>>>>> \\\\\\\\   )\\\\\\\\\\\\\\
\\\\\\\   )\\\\\   (\\\\\\\>>>>>>>          ->>>>>>>> \\\\\\\\   )\\\\\\\\\\\\\\
\\\\\\\>>>>\\\\\>>>>\\\\\\\>>>>>>>   >>>>(>>>>>>>>>>> \\\\\\\\>>>>\\\\\\\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\>>>>>>>   >>>>>>>>>>>>>>>> \\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\>>>>>>>===>>>>>>>>>>>>>>>> \\\\\\\\\\\\\\\\\\\\\\\\\\

[downloaded] WYPR FM
[downloaded] NPR thanks our sponsors
[playing] WYPR FM
[downloaded] Welcome To Czechia: Czech Republic Looks To Adopt Shorter Name
[downloaded] Belgian Transport Minister Resigns Over Airport Security Debate
[downloaded] Tax Season
[downloaded] Adapting To A More Extreme Climate, Coastal Cities Get Creative
[downloaded] NPR thanks our sponsors
```

### Keyboard Controls

```
space   play/pause
↑       volume up
↓       volume down
←       rewind 15 seconds
→       skip to the next story
i       mark as interesting
```

## License

Copyright (c) 2016 Adafruit Industries. Licensed under the MIT license.

The NPR logo is a registered trademark of NPR used with permission from NPR.  All rights reserved.
