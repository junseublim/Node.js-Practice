const fs = require('fs');


//read file
fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});

//write to file
fs.writeFile('./docs/blog2.txt', 'hello blog2!', () => {
    console.log('file is written');
});


//directories
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder created');
    });
}
else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder removed');
    })
}

//delete file
if (fs.existsSync('./docs/blog2.txt')) {
    fs.unlink('./docs/blog2.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('file deleted');
    });
}


/*
Streams: start using data, before it has finished loading
*/

