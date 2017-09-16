var fs = require('fs');
var path = require('path');
var _ = require('underscore');
const request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

const paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

exports.paths = paths;
// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

const readListOfUrls = function(callback) {
  fs.readFile(paths.list, (err, data) => callback(data.toString().split('\n')));
};

const isUrlInList = function(url, callback) {
  readListOfUrls((array) => callback(array.includes(url)));
};

const addUrlToList = function(url, callback) {
  readListOfUrls((array) => {
    array.push(url);
    fs.writeFile(paths.list, array.join('\n'), () => {
      callback();
    });
  });
};

const isUrlArchived = function(url, callback) {
  fs.exists(paths.archivedSites + '/' + url, (exists) => callback(exists));
};

const downloadUrls = function(urls) {
  urls.forEach(url => fs.open(paths.archivedSites + '/' + url, 'w', (err, fd) => {
    request('http://' + url, function (error, response, body) {
      fs.write(fd, body, (err, fd) => fs.close(fd)); // Print the HTML for the Google homepage. 
    });
  }));
};

exports.addUrlToList = addUrlToList;
exports.isUrlInList = isUrlInList;
exports.readListOfUrls = readListOfUrls;
exports.isUrlArchived = isUrlArchived;
exports.downloadUrls = downloadUrls;
