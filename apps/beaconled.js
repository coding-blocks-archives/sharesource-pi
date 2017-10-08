const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

let far = false;

board.on('ready', () => {

  const digits = new five.Led.Digits({
    controller: "HT16K33",
  });

  // Set an Event handler for becons
  scanner.onadvertisement = (ad) => {
    console.log(ad.rssi);
    if (ad.eddystoneUrl) {
      far = (ad.rssi < -60);
    } else {
      far = true
    }
      digits.draw(0, (far ? "C" : "O"))
      digits.draw(1, (far ? "L" : "P"))
      digits.draw(2, (far? "O" : "E"))
      digits.draw(3, (far? "S" : "N"))

  };

  // Start scanning
  scanner.startScan().then(() => {
    console.log('Started to scan.')  ;
  }).catch((error) => {
    console.error(error);
  });

});



