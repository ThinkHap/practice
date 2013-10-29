define(function(require) {
  //var domReady = require('domReady')

  //var Spinning = require('./spinning')

  //console.log(domReady);
  //domReady(function(){
    var Spinning = require('./spinning')
    var s = new Spinning('#container')
    s.render()
  //});

})
