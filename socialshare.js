;(function() {
  'use strict';

  if (!window) return;
  if (window.socialshare) return;

  var hatebuGraphUrl   = 'http://api.b.st-hatena.com/entry.count';
  var twitterGraphUrl  = 'http://urls.api.twitter.com/1/urls/count.json';
  var facebookGraphUrl = 'http://graph.facebook.com/';

  var jsonp = function(url, query, callback) {
    var callbackName = 'callback' + new Date().valueOf() + Math.floor(Math.random() * 65535);

    var queryString = /[\?\&]/.test(url) ? '&' : '?';
    queryString += 'callback=' + callbackName + '&';
    for (var key in query) {
      queryString += (key + '=' + query[key] + '&');
    }

    window[callbackName] = function(data) {
      if (callback && typeof callback === 'function') callback(data);
      delete window[callbackName];
      return;
    };

    var scriptDOM = document.createElement('script');
    scriptDOM.src = url + queryString;
    document.body.appendChild(scriptDOM);
  };

  var socialshare = function(url, callback) {
    var url = url || location.href.split(/#[^\/]/)[0];

    var Socialshare = function(url, callback) {
      this.url      = url;
      this.hatebu   = { value: null };
      this.twitter  = { value: null };
      this.facebook = { value: null };

      this.callback = callback;
    };
    Socialshare.prototype.fetch = function(callback) {
      var self         = this;
      var callback     = callback || self.callback || function() {};
      var processCount = 0;

      // hatebu
      jsonp(hatebuGraphUrl, { url: self.url }, function(count) {
        self.hatebu.value = parseInt(count);
        processCount++;
        if (processCount === 3) callback(self);
      });

      jsonp(twitterGraphUrl, { url: self.url }, function(json) {
        self.twitter.value = parseInt(json.count);
        processCount++;
        if (processCount === 3) callback(self);
      });

      jsonp(facebookGraphUrl + self.url, {}, function(json) {
        self.facebook.value = json.shares && parseInt(json.shares);
        processCount++;
        if (processCount === 3) callback(self);
      });
    };
    Socialshare.prototype.openHatebuShareWindow = function(text) {
      var text = text || '';
      var url = 'http://b.hatena.ne.jp/add?mode=confirm&url=' + this.url + '&title=' + text;
      var subWindow = window.open(
        url,
        'ssHatebuWindow',
        'dialog=yes,width=506,height=330'
      );

      return;
    };
    Socialshare.prototype.openTwitterShareWindow = function(text) {
      var text = text || '';
      var url = 'http://twitter.com/share?url=' + this.url + '&text=' + text;
      var subWindow = window.open(
        url,
        'ssTwitterWindow',
        'dialog=yes,width=640,height=258'
      );

      return;
    };
    Socialshare.prototype.openFacebookShareWindow = function(text) {
      var text = text || '';
      var url = 'http://www.facebook.com/sharer.php?u=' + this.url + '&t=' + text;
      var subWindow = window.open(
        url,
        'ssFacebookWindow',
        'dialog=yes,width=640'
      );

      return;
    };

    var socialshare = new Socialshare(url, callback);
    socialshare.fetch();
    return socialshare;
  };

  if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
      module.exports === exports) {
    module.exports = socialshare;
  } else {
    window.socialshare = socialshare;
  }
})();
