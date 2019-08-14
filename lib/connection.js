'use strict';

var EventEmitter = require( 'events' );
var util = require( 'util' );
var debug = require( 'debug' )( 'alinode_agent' );
const ioc = require( 'socket.io-client' );

var Connection = function ( server, opt ) {
  EventEmitter.call( this );
  // io
  this.socket = ioc( server, { query: opt } );
  console.log( '[%s] Connecting to ' + server + '...', Date() );
  this.handleEvents();
};
util.inherits( Connection, EventEmitter );

Connection.prototype.handleEvents = function () {
  var that = this;
  this.socket.on( 'connect', () => {
    if ( this.socket.connected ) {
      debug( 'connected' );
      that.emit( 'open' );
    }
  } );

  this.socket.on( 'error', ( err ) => {
    that.emit( 'error', err );
  } );

  this.socket.on( 'disconnect', () => {
    debug( 'WebSocket closed.' );
    that.emit( 'close' );
  } );

  this.socket.on( 'message', ( data, flags ) => {
    var message;
    try {
      message = JSON.parse( data );
    } catch ( err ) {
      debug( 'non-json message: ' + data + ', err: ' + err );
      return;
    }
    that.emit( 'message', message, flags );
  } );
};

Connection.prototype.sendMessage = function ( message ) {
  var that = this;
  var str = JSON.stringify( message );
  that.socket.send( 'message', str, function ( err ) {
    if ( err ) {
      debug( 'send message when connected not opened.' );
      that.socket.close();
    }
  } );
};

Connection.prototype.close = function () {
  this.socket.close();
};

module.exports = Connection;
