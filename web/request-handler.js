var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  fs.readFile(archive.paths.siteAssets + '/index.html', function (err, data) {
    res.end(data);
  });
};
