const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

board.on('ready', () => {
  let toggle = false;

  const digits = new five.Led.Digits({
    controller: "HT16K33",
  });

  setInterval(() => {
    digits.print(toggle ? "CLOSE" : "OPEN")
    toggle = !toggle
  }, 2000)

});