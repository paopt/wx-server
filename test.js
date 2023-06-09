const { parseXml, toXml } = require('./src/util/index');

const str = `
<xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[fromUser]]></FromUserName>
  <CreateTime>12345678</CreateTime>
  <MsgType><![CDATA[image]]></MsgType>
  <Image>
    <MediaId><![CDATA[media_id]]></MediaId>
  </Image>
</xml>
`;

parseXml(str).then(res => {
  console.log('xml: ', str)
  console.log('对象: ', res)
  console.log('xml: ', toXml(res))
})

