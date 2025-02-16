const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  if (request.url === '/') {
    htmlHandler.getIndex(request, response);
  } else if (request.url === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (request.url === '/getUsers') {
    jsonHandler.getUsersData(request, response);
  } else if (request.url === '/notReal') {
    jsonHandler.getNotRealData(request, response);
  } else if (request.url === '/addUser') {
    jsonHandler.handleUserInfo(request, response);
  } else {
    jsonHandler.getNotRealData(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
