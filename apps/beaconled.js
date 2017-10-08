const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

let near = false;

board.on('ready', () => {

  const digits = new five.Led.Digits({
    controller: "HT16K33",
  });

  // Set an Event handler for becons
  scanner.onadvertisement = (ad) => {
    if (ad.eddystoneUrl) {
      near = (ad.rssi > -50);

      digits.draw(0, (near ? "C" : "O"))
      digits.draw(1, (near ? "L" : "P"))
      digits.draw(2, (near? "O" : "E"))
      digits.draw(3, (near? "S" : "N"))
    }
  };

  // Start scanning
  scanner.startScan().then(() => {
    console.log('Started to scan.')  ;
  }).catch((error) => {
    console.error(error);
  });

});



