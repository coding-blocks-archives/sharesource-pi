const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
const Raspi = require('raspi-io');
const five = require('johnny-five');
const hooloovoo = require('hooloovoo');
hooloovoo.setup(7);
const board = new five.Board({
  io: new Raspi()
});
let userColors = [
  "000000", "FF0000", "00FF00", "0000FF"
]

let far = false;
let user = 0;
let lastChecked = new Date().getTime()

board.on('ready', () => {

  const digits = new five.Led.Digits({
    controller: "HT16K33",
  });

  // Set an Event handler for becons
  scanner.onadvertisement = (ad) => {
    console.log(ad.rssi);
    if (ad.eddystoneUrl) {
      far = (ad.rssi < -40);
      user = parseInt(ad.eddystoneUrl.url.split('/').pop())
      if (isNaN(user)) user = 0;
    } else {
      far = true
    }
    lastChecked = new Date().getTime()
  };

  // Start scanning
  scanner.startScan().then(() => {
    console.log('Started to scan.')  ;
  }).catch((error) => {
    console.error(error);
  });

  setInterval(() => {
    if (!far) {
      if (new Date().getTime() - lastChecked > 1000) {
        far = true;
      }
    }
    digits.draw(0, (far ? "C" : "O"))
    digits.draw(1, (far ? "L" : "P"))
    digits.draw(2, (far? "O" : "E"))
    digits.draw(3, (far? "S" : "N"))
    console.log("user:" + user);
    hooloovoo.fill_hex(userColors[user])
  }, 1000)

});



