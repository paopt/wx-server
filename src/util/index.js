const crypto = require('crypto');
const xml2js = require('xml2js');

/**
 * sha1加密
 * @param {*} str 
 * @returns 
 */
function sha1(str) {
  const sha1 = crypto.createHash('sha1');
  const res = sha1.update(str).digest('hex')
  return res;
}

/**
 * 解析xml数据
 * @param {*} xmlStr xml字符串
 * @returns js对象
 */
async function parseXml(xmlStr) {
  try {
    let data = await xml2js.parseStringPromise(xmlStr, {
      trim: true
    });
    data = data.xml;

    const res = {};
    Object.keys(data).forEach(key => {
      const v = data[key];
      res[key] = v.length === 1 ? v[0] : v
    });
    return res;
  } catch (e) {
    console.error('解析xml数据出错')
    return null;
  }
}

/**
 * 把js对象转换为xml字符窜
 * @param {*} obj 
 */
function toXml(obj) {
  const builder = new xml2js.Builder({cdata: true});
  const xml = builder.buildObject(obj);
  return xml;
}

module.exports = {
  sha1,
  parseXml,
  toXml
}