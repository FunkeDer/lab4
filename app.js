const http = require('http');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a port number: ', (port) => {
  http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === "/") {
        fs.readFile('index.html', (err, html) => {
            if (err) {
                throw err;
            }
            res.setHeader('Content-type', 'text/html');
            res.write(html);
            res.statusCode = 200;
            res.end();
        });
    }
    else if (req.url == '/style.css') {
        res.setHeader('Content-type', 'text/css');
        res.write(fs.readFileSync('style.css'));
        res.end();
    }    else if (req.url == '/script.js') {
      res.setHeader('Content-type', 'text/js');
      res.write(fs.readFileSync('script.js'));
      res.end();} 
    else {
        res.write("invalid request")
        res.end();
    }
  }).listen(port);

  console.log(`Server running http://localhost:${port}/`);
  rl.close();
});