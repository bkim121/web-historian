var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  if (req.url === '/') {
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
};
