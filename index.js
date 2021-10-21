const http = require('http');
const fs = require('fs');
const PORT = 3000;

let requestCount = 0;

const users = [];

const requestListener = (request, response) => {
  const {method, url} = request;

  console.log(method);
  console.log(url);

  if(method === "GET") {

    if(url === '/') {
      fs.readFile('./views/index.html', { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          console.log(err);
        }
    
        response.end(data);
      });
      return;
    }

    if(url === '/about') {
      fs.readFile('./views/about.html', { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          console.log(err);
        }
    
        response.end(data);
      });
      return;
    }
  }

  if(method === "POST") {

    if(url === "/signup") {

      let userStringh;
      request.on('data', (chunk) => {
        userStringh += chunk;
      })

      request.on('end',() => {

        users.push(JSON.stringify(userStringh));
        console.log(users);
      } )

      return;
    }
  }

  fs.readFile('./views/404.html', { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log(err);
    }

    response.end(data);
  });
  

};

const server = http.createServer(requestListener);

server.listen(PORT);
