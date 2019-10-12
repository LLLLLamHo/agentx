'use strict';

var fs = require('fs');
var path = require('path');

/*
  AliNode会自己在tmp目录下生成alinode-uds-path-*的文件，并且不会自己删除，所以该脚本只是每天检查进行删除
*/

exports.logdir = ''; // 进程记录

var removeFiles = function (logdir, files, callback) {
  var count = files.length;
  if (count === 0) {
    return callback(null);
  }

  var done = function (err) {
    if (err) {
      return callback(err);
    }

    count--;
    if (count <= 0) {
      callback(null);
    }
  };

  for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var filepath = path.join(logdir, filename);
    console.log('clean alinode uds path file: %s', filepath);
    fs.unlink(filepath, done);
  }
};

var patt = /^(alinode-uds-path)-(\d)+$/;

var cleanAlinode_uds_path = function (callback) {
  fs.readdir(exports.logdir, function (err, files) {
    if (err) {
      return callback(err);
    }

    var logs = files.filter(function (filename) {
      var matched = filename.match(patt);
      if (matched) {
        return true;
      }
      return false;
    });

    removeFiles(exports.logdir, logs, callback);
  });
};

exports.init = function (config) {
  exports.logdir = '/tmp';
};

exports.run = function (callback) {
  if (!exports.logdir) {
    return callback(new Error('Not specific logdir in agentx config file'));
  }

  cleanAlinode_uds_path(function (err) {
    if (err) {
      return callback(err);
    }

    // nothing to report
    callback(null);
  });
};

exports.reportInterval = 24 * 60 * 60 * 1000; // 1 day
