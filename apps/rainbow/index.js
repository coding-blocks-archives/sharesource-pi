const hooloovoo = require('hooloovoo');
hooloovoo.setup(7);

let randomHex = () => parseInt(Math.random() * 255)

setInterval(() => {
  for (let i = 0 ; i < 7; i++) {
    hooloovoo.set_pixel_BGR(i, randomHex(), randomHex(), randomHex())
  }
}, 1000)

