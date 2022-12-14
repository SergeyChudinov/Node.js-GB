// import { red } from "colors";
import url from "url";
import http from "http";
import fs from "fs";
import os from "os";
import cluster from "cluster";

// const server = http.createServer((req, res) => {
//     // res.write('hello')
//     // res.end('hello 4')

//     // console.log('url', req.url)
//     // console.log('method', req.method)
//     // console.log('headers', req.headers)

//     // res.setHeader('test-header', 'test')
//     // res.writeHead(200, 'OK!', {
//     // 'test-header': 'test'
//     // })

//     // res.end('end')

//     // URL
//     // if (req.url === '/user') {
//     //     res.end('User found')
//     // } else {
//     //     res.writeHead(404, 'User not found', {
//     //         'test-header': 'test'
//     //     })
//     //     res.end('User not found')
//     // }

//     // METHOD
//     // if (req.method === 'GET') {
//     //     if (req.url) {
//     //         const {query} = url.parse(req.url, true)
//     //         console.log(query);
//     //     }
//     //     res.end('hello')
//     // } else if (req.method === 'POST') {
//     //     let data = ''
//     //     req.on('data', (chunk) => data += chunk)
//     //     req.on('end', () => {
//     //         // console.log('data', data)
//     //         console.log('data', JSON.parse(data))
//     //         res.writeHead(200, 'OK', {
//     //             'Content-Type': 'application/json'
//     //         })
//     //         res.end(data)
//     //     })
//     //     // res.writeHead(405, 'Method not allowed')
//     //     // res.end('Method not allowed')
//     // }

//     const file = fs.readFileSync('index.html');
//     res.writeHead(200, 'OK', {
//         'Content-Type': 'text/html'
//     })
//     res.end(file)
// })
// server.listen(5555) //иницилизация порта сервера
// server.listen(5555, () => console.log('Server been started http://localhost:5555')) // localhost:5555

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running...`); //pid индиф-р процес
    for (let i = 0; i < os.cpus().length; i++) {  //cpus кол-во ядер
      console.log(`Forking process number ${i}`);
      cluster.fork();
    }
} else {
    console.log(`Worker ${process.pid} is running...`)
    http
      .createServer((req, res) => {
        // setTimeout(() => {
          // const file = fs.readFileSync("index.html");
          const readStream = fs.createReadStream('index.html')
          res.writeHead(200, "OK", {
            "Content-Type": "text/html",
          });
          console.log(`Send file for ${process.pid}`)
          readStream.pipe(res)
        // }, 3000);
      })
      .listen(5555, () =>
        console.log("Server been started http://localhost:5555")
      );
}

// http
//   .createServer((req, res) => {
//     setTimeout(() => {
//       const file = fs.readFileSync("index.html");
//       // const readStream = fs.createReadStream('index.html')

//       res.writeHead(200, "OK", {
//         "Content-Type": "text/html",
//       });
//       // console.log(`Send file for ${process.pid}`)

//       // readStream.pipe(res)
//       res.end(file);
//     }, 5000);
// }).listen(5555, () =>
//   console.log("Server been started http://localhost:5555")
// );