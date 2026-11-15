PROKLETIJSKI PERIDOT - AR trail missions
Xplore Prokletije · Turistička organizacija Gusinje

Since 15 Nov 2026 this folder is the AR trail missions only. The virtual trail missions (360° photos, the St. Anthony
3D walk, the 3D valley map) are becoming a game of their own and are no longer here.

WHAT IS IN THIS FOLDER
  index.html      the start screen: the 3D Peridot badge over the valley at night, the AR trail missions card, and four menu cards in the same style:
                  My Peridot (points, places, chapters, rank, the field stamp with its QR), Legend & how to play,
                  Visit info (visitor centre, time and getting around, safety, national park, places of prayer),
                  Before you go (checks location, camera, motion and compass, shows the battery; tips).
                  EN · ME · SQ switches the start screen's language (remembered on the device). The game itself is
                  in English for now.
  field.html      the game: real places in Gusinje, Vusanje and Grebaje and the last step at the visitor centre, played on site
                  (GPS zones on the phone, or the 4-character code on each site's plaque). At each site a peridot shard
                  floats in the camera view, fixed to a compass bearing: flick the crystal orb to catch it (like Pokémon GO).
                  The 3D shard uses three.js from jsDelivr, loaded when a site is near; without it the shard is tapped.
                  With GPS the shard first waits at its spot (zone centre, or a spot set with ?survey > "Set shard spot here")
                  under a pillar of light; walk to it and it lands on the ground in front of you. Works in Safari too (no WebXR).
                  Camera view (v20, from the city map): the main back lens at 1× and its whole 4:3 picture (camera button
                  top right when the phone has several back cameras); the lens's angle is learned while you turn (gyro vs
                  how far the picture slides) and saved; the gyro turns the view and the compass only sets north, slowly,
                  so the shard neither shakes nor slides; the view uses the orientation from when the picture was taken.
                  The city map on the same site (wave84mn.github.io) and this game share their lens measurements.
  logo/           the 3D badge for the start screen (peridot-mesh.txt + textures) and its pictures (peridot-badge*.png)
  landing/        the start screen's pictures: night-wide.jpg (computers), night-tall.jpg (phones), trail.jpg (the picture on
                  the game card: the trail crossroad with the signpost), menu-mine.jpg,
                  menu-legend.jpg, menu-visit.jpg, menu-ready.jpg (the pictures on the four menu cards), frame.webp (the
                  slate frame of the cards)
  fieldmap/       the game's map, painted like the printed Game Trails Map (blue-hour relief, glowing rivers, warm town
                  lights): overview.jpg (the valleys), gusinje.webp, vusanje.webp, grebaje.webp (town plans that fade in when
                  you zoom in). Made from the Copernicus DEM and OpenStreetMap by tools/fieldmap in the build folder.
  logo.png        Xplore Prokletije logo
  partners/       logos under the menu on the start screen: TO Gusinje, Xplore Prokletije, Ministry of Tourism
  catch/          ari.jpg: the guide's painted portrait in the game's camera view (from the Higgsfield catch design)
  field-redirect/index.html   forwarder for the address on the printed map (see below)
  three.js 0.160.0 loads from jsDelivr; the fonts load from Google Fonts.

  Updating an earlier copy: the m/ folder (the virtual missions' photos), landing/orb.jpg, landing/phone.jpg and
  fieldmap/valley3d.jpg are no longer used and can be deleted from the site. landing/trail.jpg is new: replace the old one.

HOSTING
  Upload the folder as it is to https://xplore-prokletije.com/p/ . Static files only: no database, no build step.
  Use HTTPS. Location, compass and camera only work over HTTPS on your own site.
  Inside the claude.ai preview they are switched off; there the game works with the plaque codes.
  index.html and field.html must stay in the same folder and on the same site: they share the player's progress.

THE PRINTED MAP
  Its QR code opens https://xplore-prokletije.com/field/ . Copy field-redirect/index.html to that folder on the site
  (https://xplore-prokletije.com/field/index.html). It forwards to /p/field.html and keeps plaque codes after the #.
  If the game folder is not /p/, change the three places that say /p/ in that file.

LINKS (for QR codes, posters, the website)
  /p/                       start screen
  /p/field.html             the game
  /field/#field-T2-6DYP     a plaque QR: opens the game and confirms the visit (T2 = site, 6DYP = its plaque code)
  /p/field.html?survey      staff tools on site: set zone centres, record bearings and answers, plaque codes with QR, export
  /p/field.html?test        test mode: play anywhere (also "Try at home" in Legend & how to play). A pretend position near a site,
                            walked with the joystick (or W A S D) or the Walk button in the camera view; real camera and
                            compass; arriving takes 5 s; its progress is kept apart from the real game.
  Old links to the virtual missions (/p/#missions, /p/#square …) now open the start screen.

PROGRESS
  Saved on the player's device only, in browser storage under "peridot.game.v1", the game under "field".
  The start screen's My Peridot reads it. The language choice is stored under "peridot.lang".

STAMP CODES
  Field stamp: PRK-F + three characters + a check character, after the last step at the visitor centre.
  Characters: 23456789ABCDEFGHJKMNPQRSTUVWXYZ (no 0, 1, I, L, O).
  Check: for the four characters after "PRK-", add (position 1..4) × (index of the character in the list above);
  the check character is the character at (sum mod 31). This catches one wrong character and two swapped neighbours.
  The QR opens https://xplore-prokletije.com/p/staff?c=<code>. That staff page still has to be built.

THE BADGE ON THE START SCREEN
  logo/peridot-mesh.txt is the Meshy model of the badge (709,156 triangles) simplified to 25,000 triangles, with its texture
  seams kept so the texture still fits exactly: 384 KB of binary data written as base64 text (512 KB), instead of 72 MB.
  Textures: peridot-2k.jpg (computers), peridot-1k.jpg (phones), peridot-orm.jpg (red: the gem's glow, green: roughness,
  blue: metal). peridot-badge.png is shown while the 3D badge loads, or instead of it if it cannot load;
  peridot-badge-sm.png is the small badge on the home buttons.

CHANGING TEXT
  Start screen texts in the three languages: the TXT block (en, me, sq) in the script in index.html; the ten places
  and their names: PLACES10 just above it. Visitor centre details (address, opening hours, phone) go in visCentre.
  Game sites, tasks and questions: the FIELD block of the script in field.html.

Maps: © OpenStreetMap contributors (ODbL); heights: Copernicus DEM GLO-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH
2014-2018, provided under COPERNICUS by the European Union and ESA.
