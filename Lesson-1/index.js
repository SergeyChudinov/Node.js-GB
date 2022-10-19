import fs from 'fs';

// sync
const file = fs.readFileSync('index.html', {
    encoding: 'utf-8'
});
console.log(file); //.toString()
                        
// promis
// fs.promises.readFile('index.html').then(console.log)

// fs.readFile('index.html', (err, data) => {
//     if (err) {
//         console.log('error', err)
//     }
//     console.log(data);
// })

