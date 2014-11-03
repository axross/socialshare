# Socialshare.js

Share URL and count on Hatena bookmark, Twitter and Facebook.

[![npm version](https://badge.fury.io/js/socialshare.svg)](http://badge.fury.io/js/socialshare)

## Installation

Use with Browserify:

```javascript
var socialshare = require('socialshare');

var googleSS = socialshare('http://google.com', function(ss) {
  console.log(ss.url);
  console.log(ss.hatebu.value, ss.twitter.value, ss.facebook.value);
});

googleSS.openTwitterShareWindow('page title');
```

Otherwise:

```javascript
window.socialshare;  // is referrense to socialshare.
```

## Examples

In `examples/index.html`.

## API

### socialshare(url, [callback])

Generate socialshare instance.

#### socialshare#fetch([callback])

Re-fetch social counts.

#### socialshare#openHatebuShareWindow([pageTitle])
#### socialshare#openTwitterShareWindow([pageTitle])
#### socialshare#openFacebookShareWindow([pageTitle])

Open small share window.
