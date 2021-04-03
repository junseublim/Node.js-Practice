/*
Streams: start using data, before it has finished loading
*/


const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./docs/blog4.txt');

//event listner
//when we get a chunk of data

// readStream.on('data', (chunk) => {
//     console.log('--------new chunk-------');
//     console.log(chunk);
//     writeStream.write('\n New Chunk \n');
//     writeStream.write(chunk);
// })

//same as code written on top
readStream.pipe(writeStream);