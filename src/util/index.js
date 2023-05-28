const crypto = require('crypto');

function sha1(str) {
  const sha1 = crypto.createHash('sha1');
  const res = sha1.update(str).digest('hex')
  return res;
}

module.exports = {
  sha1
}