$(document).ready(function(){
  var DEFAULTS = {
    url: [],
    interval: 5, // s
    speed: 2, // s
    border: 50
  }

  var parseHash = function(hash, template){
    var result = template;
    $(hash.slice(1).split('&')).each(function(i, kv){
      var kv_ = kv.split('=');
      var k = kv_[0], v = kv_[1];
      switch (typeof result[k]) {
        case "object":
          result[k].push(v);
          break;
        case "number":
          result[k] = parseFloat(v);
          break;
        default:
          result[k] = v;
      }
    });
    return result;
  };

  var createIframes = function(urls){
    $(urls).each(function(ii, url){
      $('body').append('<iframe src="' + unescape(url) + '" />');
    });
    return $('iframe');
  };

  var rearrangeIframes = function(iframes, offset, width){
    $('iframe').css('-webkit-transition-duration', '0');
    iframes.each(function(i, el){
      if (i === offset) {
        setX(el, 0);
      } else {
        setX(el, width);
      }
    });
  };

  var setX = function(el, x){
    $(el).css('left', x + 'px');
  };

  var options  = parseHash(window.location.hash, DEFAULTS);
  var iframes  = createIframes(options.url);
  var selected = 0;
  var offset   = 0;

  var showNext = function(){
    var t0 = new Date();
    var w = $(window).width() + options.border;
    var current = iframes[offset % iframes.length];
    var next    = iframes[(offset + 1) % iframes.length];

    $('iframe').css('-webkit-transition-duration', options.speed + 's');
    setX(current, -w);
    setX(next, 0);

    setTimeout(function(){
      offset = (offset + 1) % iframes.length;
      rearrangeIframes(iframes, offset, w);
    }, 1100);

    setTimeout(showNext, options.interval * 1000);
  };

  rearrangeIframes(iframes, offset, $(window).width() + options.border);
  if (iframes.length > 1) {
    setTimeout(showNext, options.interval * 1000);
  }
});
