# Vagrant Story Tools

A toolset for Vagrant Story (2000, Square), written in JavaScript with Three.js.
Contains a mostly working model viewer.

[Run in browser](https://morris.github.io/vstools)

<img src="img/screenshot2.png">

<img src="img/screenshot1.png">

(A prior version was written in Java, which can be found [here](https://github.com/morris/vstools-java).)

## [Run in browser](https://morris.github.io/vstools)

Runs in browsers supporting WebGL, like Chrome or Firefox.
The viewer opens individual files obtained from a CD image
which have to be extracted first from your copy of Vagrant Story.

The toolset is developed for the US Version of Vagrant Story but should work with any.

## Supported file types

- WEP (weapons)
- SHP (characters)
- SEQ (animations)
- ZUD (basically SHP + SEQ + WEP)
- ZND (zone data)
- MPD (map)
- ARM (minimap)

To open an MPD file, you'll need the correct ZND file.
You can find the Zone/Map list
[here](http://datacrystal.romhacking.net/wiki/Vagrant_Story:rooms_list).

## Motivation

Reverse engineering is ridiculously rewarding.
You get to know assembly, debuggers, system architecture, hacking live programs and much more.
Making sense of undocumented file formats is great, kind of archeological fun.

Vagrant Story itself is a unique piece of art,
featuring an outstanding character and level design that has no equal.

## Contributions and acknowledgments

- WEP textures fixed by [Oliver Barraza](https://github.com/MercurialForge)

Many thanks to Valendian and other people's tremendous work on analyzing Vagrant Story.

Most information on VS hacking can be found here:
http://datacrystal.romhacking.net/wiki/Vagrant_Story
