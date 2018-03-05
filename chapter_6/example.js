const ticker = require('./ticker');

ticker.on('tick',(tickCount)=>console.log(tickCount,'Tick'));
require('events').prototype.emit.call(ticker,'dsa',{})