'use strict';

var fs = require('fs');

exports.init = function (config) {
  exports.cuscmdir = config.cuscmdir;
};

var readFile = function (cuscmdirPath, callback) {
  fs.readFile(cuscmdirPath, 'utf8', function (err, string) {
    if (err) {
      return callback(err);
    }
    callback(null, {
      path: cuscmdirPath,
      command: string
    });
  });
};

var readFiles = function (cuscmdir, callback) {
  var total = cuscmdir.length;
  var current = 0;
  var called = false;
  var results = [];
  var done = function (err, data) {
    if (called) { // only call once
      return;
    }

    if (err) {
      called = true;
      return callback(err);
    }

    current++;
    results.push(data);
    if (current >= total) {
      callback(null, results);
    }
  };

  cuscmdir.forEach(function (packagePath) {
    readFile(packagePath, done);
  });
};

exports.run = function (callback) {
  var cuscmdir = exports.cuscmdir;
  if (!cuscmdir || !cuscmdir.length) {
    return callback(null, null);
  }

  readFiles(cuscmdir, function (err, results) {
    if (err) {
      return callback(err);
    }

    callback(null, {
      type: 'custom_command',
      metrics: results
    });
  });
};

exports.reportInterval = 1 * 60 * 1000; // 5分钟
