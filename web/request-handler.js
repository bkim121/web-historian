var path = require('path');
// require more modules/folders here!
var fs = require('fs');
var parseBody = require('parse-body');

var archive = require('../helpers/archive-helpers');
// var sendResponse = function(req, res) {
  
// };

// var sendFile = function () {
  
// };

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    if (req.url === '/' || req.url === '') {
      fs.readFile(archive.paths.siteAssets + '/index.html', function (err, data) {
        res.end(data);  
      });
    } else {
      fs.exists(archive.paths.archivedSites + req.url, (exists) => {
        if (exists) {
          fs.readFile(archive.paths.archivedSites + req.url, (err, data) => res.end(data));
        } else {
          res.writeHead(404, 'Not Found');
          res.end();
        }
      }); 
    }
  } else if (req.method === 'POST') {
    parseBody(req, 1e6, (err, body) => {
      fs.writeFile(archive.paths.list, body.url + '\n', () => {
        res.writeHead(302, 'Found');
        res.end();
      });
    }); 

      // fs.open(archive.paths.list, 'w', (fd) => {
      //   fs.write(fd, body, (fd) => {
      //     res.writeHead(302, 'Found');
      //     res.end();
      //     fs.close(fd);
      //   });
      // });
  }

};
