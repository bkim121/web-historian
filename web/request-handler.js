var path = require('path');
// require more modules/folders here!
var fs = require('fs');
var parseBody = require('parse-body');

var archive = require('../helpers/archive-helpers');


const readFile = (path, res) => fs.readFile(path, (err, data) => res.end(data));

const gets = {
  'home': (req, res) => fs.readFile(archive.paths.siteAssets + '/index.html', (err, data) => res.end(data)),
  'search': (req, res) => {
    fs.exists(archive.paths.archivedSites + req.url, (exists) => {
      if (exists) {
        readFile(archive.paths.archivedSites + req.url, res);
      } else {
        res.writeHead(404, 'Not Found');
        res.end();
      }
    }); 
  },
};

const posts = {
  write: (req, res) => {
    parseBody(req, 1e6, (err, body) => {
      console.log(body);
      archive.addUrlToList(body.url, () => {
        // fs.writeFile(archive.paths.list, body.url + '\n', () => {
        res.writeHead(302, 'Found');
        res.end();
        // });
      });
    });
  }
};

const methods = {
  'GET': (req, res) => {
    if (req.url === '/' || req.url === '') {
      gets.home(req, res);
    } else {
      gets.search(req, res);
    }
  },
  'POST': (req, res) => {
    posts.write(req, res);
  }
};

exports.handleRequest = function (req, res) {
  
  methods[req.method](req, res);

};
