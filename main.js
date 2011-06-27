$(document).ready(function(){
  var parameters = {
    p: [],
    t: 3
  };

  window.location.hash.slice(1).split(/&/).forEach(function(kv){
    var kv_ = kv.split(/=/);
    var k = kv_[0], v = kv_[1];
    switch (typeof parameters[k]) {
      case "object":
        parameters[k].push(v);
        break;
      case "number":
        parameters[k] = parseFloat(v);
        break;
      default:
        parameters[k] = v;
    }
  });

  console.log(JSON.stringify(parameters));

  parameters.p.forEach(function(url){
    $('body').append('<iframe src="' + url + '" />');
  });

  var iframes = $('iframe');
  var selected = 0;

  var move = function(el, x){
    $(el).css('left', x + 'px')
  }

  var show = function(el){
    var t0 = new Date();
    var w = $(window).width();
    var slide = function(){
      var d = new Date() - t0;
      var r = (d / w);
      var x = w * Math.pow(Math.sin(r * Math.PI / 2), 2) - w;
      console.log(d, r, x);
      if (x >= -5) {
        x = 0;
      }
      move(el, x);
      if (x < 0) {
        setTimeout(slide, 5);
      }
    };
    slide();
  };

  setTimeout(function(){
    show(iframes[0]);
  }, 2000);

});
