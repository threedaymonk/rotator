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
    $(urls).each(function(i, url){
      left = (i === 0) ? 0 : $(window).width();
      $('body').append('<iframe src="' + unescape(url) + '" style="left: ' + left + 'px" />');
    });
    return $('iframe');
  };

  var setTransition = function(elements, property){
    elements.
      css('transition',         property).
      css('-moz-transition',    property).
      css('-webkit-transition', property);
  };

  var setX = function(el, x){
    $(el).css('left', x + 'px');
  };

  // Execute a series of actions in series with a timeout between each.
  // This allows CSS changes to take effect.
  var chain = function(stages, delay){
    stages.shift()();
    if (stages.length > 0) {
      setTimeout(function(){ chain(stages, delay) }, delay);
    }
  };

  var options  = parseHash(window.location.hash, DEFAULTS);
  var iframes  = createIframes(options.url);
  var selected = 0;
  var offset   = 0;

  var showNext = function(){
    setTimeout(showNext, options.interval * 1000);

    var w = $(window).width() + options.border;
    var current = iframes[offset];
    var next    = iframes[(offset + 1) % iframes.length];

    chain([
      function(){
        setTransition(iframes, 'none');
      },
      function(){
        iframes.each(function(i, el){
          setX(el, (i === offset) ? 0 : w);
        });
      },
      function(){
        setTransition(iframes, 'left ' + options.speed + 's');
      },
      function(){
        setX(current, -w);
        setX(next, 0);
        offset = (offset + 1) % iframes.length;
      }
    ], 10);
  };

  if (iframes.length > 1) {
    setTimeout(showNext, options.interval * 1000);
  }
});
