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
    fs.readFile(archive.paths.archivedSites + req.url, (err, data) => res.end(data));
  }
};
