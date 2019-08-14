'use strict';
// var WebSocket = require( 'ws' );
// const ws = new WebSocket( 'ws://node.zuzuche.net:3000/node-monitor' );
// const ws = new WebSocket( 'ws://172.16.201.160:3000/socket.io/?EIO=3&transport=websocket' );
// ws.on( 'open', function () {
//     console.log( 'open' );
//     ws.send('message');
// } );
// ws.on( 'error', function ( err ) {
//     console.log( 'error', err );
// } );
// ws.on( 'message', function ( data, flags ) {
//     console.log( 'message', data, flags );
// } );

// const ioc = require( 'socket.io-client' );

// const socket = ioc( 'http://node.zuzuche.net:3000/node-monitor' );
//     // 链接成功
//     socket.on( 'connect', () => {
//         console.log('链接成功');
//         socket.send('message', '123123123');
//     } );

//     socket.on('error', (error) => {
//         console.log('链接出错：',error);
//     });

// var execFileSync = require('child_process').execFileSync;
const fs = require('fs');
// var result = execFileSync('/Users/lamho/Desktop/前端代码/eagleeye/.task/1565691065244.sh');
// console.log( new Buffer(result).toString() );
const file = '/Users/lamho/Desktop/前端代码/eagleeye/shell/test.sh';
fs.open( file, 'r', function ( err, fd ) {
    if ( err ) {
      console.log(1);
      return;
    }

    // fs.fchmod( fd, '0777', function ( err ) {
    //   if ( err ) {
    //     console.log(2);
    //     return;
    //   }
      
    //   fs.close(fd, function(err) {
    //     if ( err ) {
    //         console.log(3);
    //       return;
    //     }

    //     console.log(4)
    //   });
    // } );
  } );