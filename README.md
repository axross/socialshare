# Socialshare.js

Share URL and count on Hatena bookmark, Twitter and Facebook.

[![npm version](https://badge.fury.io/js/socialshare.svg)](http://badge.fury.io/js/socialshare)

## Installation

use with browserify:

```javascript
var socialshare = require('socialshare');

var googleSS = socialshare('http://google.com', function(ss) {
  console.log(ss.url);
  console.log(ss.hatebu.value, ss.twitter.value, ss.facebook.value);
});
```

otherwise:

```javascript
window.socialshare;  // is referrense to socialshare.
```

## Examples

in `examples/index.html`.

## API

### socialshare(url, [callback])

generate socialshare instance.

#### socialshare#fetch([callback])

Re-fetch social counts.  
