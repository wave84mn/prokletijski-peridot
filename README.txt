PROKLETIJSKI PERIDOT - one game, two ways to play
Xplore Prokletije · Turistička organizacija Gusinje

WHAT IS IN THIS FOLDER
  index.html      the start screen (the 3D Peridot badge over the valley at night) and the nine virtual missions:
                  valley map, 360° photos, the St. Anthony 3D walk, story, rewards
  field.html      the field game: 15 real sites and the assembly at the visitor centre, played on site
                  (GPS zones on the phone, or the 4-character code on each site's plaque). At each site a peridot shard
                  floats in the camera view, fixed to a compass bearing: flick the crystal orb to catch it (like Pokémon GO).
                  The 3D shard uses three.js from jsDelivr, loaded when a site is near; without it the shard is tapped.
                  With GPS the shard first waits at its spot (zone centre, or a spot set with ?survey > "Set shard spot here")
                  under a pillar of light; walk to it and it lands on the ground in front of you. Works in Safari too (no WebXR).
  logo/           the 3D badge for the start screen (peridot-mesh.txt + textures) and its pictures (peridot-badge*.png)
  landing/        the start screen's pictures, made with Higgsfield: night-wide.jpg (computers), night-tall.jpg (phones),
                  orb.jpg and trail.jpg (the pictures on the two menu cards), frame.webp (the slate frame of the cards)
  logo.png        Xplore Prokletije logo
  partners/       logos under the menu on the start screen: TO Gusinje, Xplore Prokletije, Ministry of Tourism
  catch/          ari.jpg: Ari's painted portrait in the field game's camera view (from the Higgsfield catch design)
  m/<mission>/    panoramas: <view>-2k.jpg, <view>-4k.jpg, <view>-thumb.jpg
  m/anthony/world-tex/, world-m-tex/   textures of the St. Anthony 3D model (computers / phones)
  field-redirect/index.html   forwarder for the address on the printed field map (see below)
  three.js 0.160.0 loads from jsDelivr; the fonts load from Google Fonts.

HOSTING
  Upload the folder as it is to https://xplore-prokletije.com/p/ . Static files only: no database, no build step.
  Use HTTPS. Location, compass and camera (field game), phone motion and VR (missions) only work over HTTPS on your own site.
  Inside the claude.ai preview they are switched off; there the field game works with the plaque codes.
  index.html and field.html must stay in the same folder and on the same site: they share the player's progress.

THE PRINTED FIELD MAP
  Its QR code opens https://xplore-prokletije.com/field/ . Copy field-redirect/index.html to that folder on the site
  (https://xplore-prokletije.com/field/index.html). It forwards to /p/field.html and keeps plaque codes after the #.
  If the game folder is not /p/, change the three places that say /p/ in that file.

LINKS (for QR codes, posters, the website)
  /p/                       start screen: choose the virtual missions or the field game
  /p/#missions              straight to the valley map
  /p/#<mission>             the map opens on that mission's card:
                            #gusinje  #square  #vezir  #george  #anthony  #springs  #grlja  #oko  #grebaje
  /p/field.html             the field game
  /field/#field-T2-6DYP     a plaque QR: opens the field game and confirms the visit (T2 = site, 6DYP = its plaque code)
  /p/field.html?survey      staff tools on site: set zone centres, record bearings and answers, plaque codes with QR, export
  /p/field.html?test        test mode: play anywhere (also "Try it at home" on the intro and "Test mode" in Sites). A pretend
                            position near a site, walked with the joystick (or W A S D) or the Walk button in the camera
                            view; real camera and compass; arriving takes 5 s; its progress is kept apart from the real game.

PROGRESS
  Saved on the player's device only, in browser storage under "peridot.game.v1": the missions under "missions",
  the field game under "field". The start screen shows both.
  "My peridot" > "Start over" clears the virtual missions only (for shared devices at the visitor centre).

STAMP CODES
  Virtual missions: PRK-V + three characters + a check character, when all nine missions are done.
  Field game: PRK-F + three characters + a check character, after the assembly at the visitor centre.
  Characters: 23456789ABCDEFGHJKMNPQRSTUVWXYZ (no 0, 1, I, L, O).
  Check: for the four characters after "PRK-", add (position 1..4) × (index of the character in the list above);
  the check character is the character at (sum mod 31). This catches one wrong character and two swapped neighbours.
  The QR opens https://xplore-prokletije.com/p/staff?c=<code>. That staff page still has to be built.

THE BADGE ON THE START SCREEN
  logo/peridot-mesh.txt is the Meshy model of the badge (709,156 triangles) simplified to 25,000 triangles, with its texture
  seams kept so the texture still fits exactly: 384 KB of binary data written as base64 text (512 KB), instead of 72 MB.
  Textures: peridot-2k.jpg (computers), peridot-1k.jpg (phones), peridot-orm.jpg (red: the gem's glow, green: roughness,
  blue: metal). peridot-badge.png is shown while the 3D badge loads, or instead of it if it cannot load;
  peridot-badge-sm.png is the small badge on the home buttons; peridot-badge-hd.png goes on the share picture.

CHANGING TEXT
  Mission text (facts, questions, ranks, the cub's lines) is in the MISSIONS block at the top of the script in index.html.
  Field sites, tasks and questions are in the FIELD block of the script in field.html.
  The cub's name is the CUB constant in both files (now "Ari", the suggestion from the game design document).

TURNING ANOTHER MISSION INTO A 3D WALK (like St. Anthony)
  1. Embed the model's glTF as <script type="application/json" id="world-geo-<mission>"> in index.html.
  2. Put its textures in m/<mission>/world-tex/ and m/<mission>/world-m-tex/.
  3. In that mission's data: set kind "world", add a "world" block (copy St. Anthony's), and give each ground
     viewpoint "pos" [x east, z south] and "floor" in metres. Shards on those viewpoints are placed on the model automatically.

360° photos: Turistička organizacija Gusinje (GoThru tour by Virtualno360, June 2025).
The valley map is a stylised relief drawn in code; mission pins stand at their real coordinates.
Field map: OpenStreetMap tiles (© OpenStreetMap contributors), or a sketch of the roads when tiles cannot load.
