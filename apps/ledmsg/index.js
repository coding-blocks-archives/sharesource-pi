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
    digits.draw(0, (toggle ? "C" : "O"))
    digits.draw(1, (toggle ? "L" : "P"))
    digits.draw(2, (toggle? "O" : "E"))
    digits.draw(2, (toggle? "S" : "N"))
    toggle = !toggle
  }, 2000)

});