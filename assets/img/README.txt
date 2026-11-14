PHOTOS FOR THE EXHIBITION
=========================

Each instrument shows a photo gallery. The file names below are what the site expects.
Photos are already listed in data/content.json.

  central-1.jpg   ALSEP central station
  pse-1.jpg       Passive Seismic Experiment
  ase-2.jpg       Active Seismic Experiment (Apollo 14 scene)
  ase-1.jpg       Active Seismic Experiment (NASA diagram)
  ase-3.jpg       Active Seismic Experiment (Apollo 16 scene)
  hfe-1.jpg       Heat Flow Experiment
  lsm-1.jpg       Lunar Surface Magnetometer
  sws-1.jpg       Solar Wind Spectrometer (Apollo 15 scene)
  sws-2.jpg       Solar Wind Spectrometer (Apollo 12 scene)

STILL MISSING
  leam-1.jpg      Lunar Ejecta and Meteorites (AS17-134-20500 on Wikimedia Commons).
                  Save it as leam-1.jpg here, then add this inside "images" for leam in data/content.json:
                  { "src": "assets/img/leam-1.jpg", "caption": { "en": "...", "th": "..." } }

ADDING MORE PHOTOS TO ANY INSTRUMENT
  1. Save the file here with the next number, e.g. pse-2.jpg
  2. In data/content.json, add another entry to that instrument's "images" list.
  The gallery shows the photos in the order they are listed.

TIPS
  - Keep photos around 1600 px on the longest side and under 500 KB each.
  - Check each photo's licence on its Wikimedia Commons page and keep the credit line.
