import fs from 'fs';
import {
    Transform
} from 'stream';

const ACCESS_LOG = './access.log';

// const data = fs.readFileSync('./access.log', 'utf-8');
// console.log(data); //.toString()

// fs.readFile(ACCESS_LOG, 'utf-8', (err, data) => {
//     if (err) {
//         console.log('error', err)
//     }
//     console.log(data);
// });

// const requests = [
//     `127.0.0.1 - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
//     `127.0.0.1 - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
//   ];

// fs.writeFile(ACCESS_LOG, '\n' + requests[0], {encoding: 'utf-8', flag: 'a'}, (err, data) =>{
//     if (err) {
//         console.log('error', err)
//     }
// });

// fs.appendFile(ACCESS_LOG, '\n' + requests[0], 'utf-8', (err, data) =>{
//     if (err) {
//         console.log('error', err)
//     }
// });

// fs.ReadStream() //class
// fs.createReadStream()

// const readStream = fs.createReadStream(ACCESS_LOG, {
//     encoding: 'utf-8',
//     //autoClose = true
//     //start
//     //end
//     highWaterMark: 64, //по сколько байтов читать
// });
// readStream.on('data', (chunk) => {
//     console.log('chunk', chunk)
// });
// end, error,

// const writeStream = fs.createWriteStream(ACCESS_LOG,{
//     encoding: 'utf8',
//     flags: 'a'
// })
// requests.forEach((logString) => {
//   writeStream.write(logString + '\n')
// })
// writeStream.end()

// const payedAccount = false;
// const readStream = fs.createReadStream(ACCESS_LOG)
// const tStream = new Transform({
//   transform(chunk, enconfig, callback) {
//     if(!payedAccount) {
//       const transformed = chunk.toString().replace(/\d+\.\d+\.\d+\.\d+/g, '[Hidden IP]')
//       this.push(transformed)
//     } else {
//       this.push(chunk)
//     }
//     callback()
//   }
// })
// readStream.pipe(tStream).pipe(process.stdout);

// const payedAccount = false;
// const readStream = fs.createReadStream(ACCESS_LOG)
// readStream.on('data', (chunk) => {
//     if(!payedAccount) {
//         const transformed = chunk.toString().replace(/\d+\.\d+\.\d+\.\d+/g, '[Hidden IP]')
//         console.log('transformed', transformed)
//     } else {
//     console.log('chunk', chunk.toString())
//     }
// });


// fs.readFile('./access.log', (ree, data) => {
//     const array = data.toString().split('\n');
//     const regExp = /(127\.0\.0\.1)|(127\.0\.0\.2)/;
//     const regExp2 = /\d+\.\d+\.\d+\.\d+/;
//     const newArray = array.filter(arr => regExp.test(arr));
//     newArray.map(arr => {
//         let url = arr.match(regExp2)[0];
//         fs.writeFile(`./${url}.log`, '\n' + arr, {encoding: 'utf-8', flag: 'a'}, (err, data) =>{
//             if (err) {
//                 console.log('error', err)
//             }
//         });
//     })
// })

// fs.readFile('./access.log', (ree, data) => {
//     const array = data.toString().split('\n');
//     const regExp = /\d+\.\d+\.\d+\.\d+/;
//     const arrayIp = [];
//     array.map(arr => {
//         const ip = arr.match(regExp);
//         ip && arrayIp.push(ip[0]);
//     });
//     arrayIp.map(arr => {
//         fs.writeFile(`./${arr}.log`, arr + '\n', {encoding: 'utf-8', flag: 'a'}, (err, data) =>{
//             if (err) {
//                 console.log('error', err)
//             }
//         });
//     })
// })



const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const string = () => {
    const randomIp = generateRandomNumber(1, 129);
    return `${randomIp}.0.0.1 - - [25/May/2021:00:07:16 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`
}
const writeFunction = () => {
    fs.writeFile(ACCESS_LOG, '\n' + string(), {
        encoding: 'utf-8',
        flag: 'a'
    }, (err, data) => {
        if (err) {
            console.log('error', err)
        }
    });
}

let stats = 0;
console.log(fs.statSync(ACCESS_LOG).size);

while (stats < 1000) {
    writeFunction();
    stats = fs.statSync(ACCESS_LOG).size;
    console.log(fs.statSync(ACCESS_LOG).size);
}