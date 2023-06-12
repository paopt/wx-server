const { parseXml } = require('../util/index')

function replyMsg(msg) {
  if (!msg) return '';
  const data = parseXml(msg);
  console.log('接收消息数据：', data);
  const { MsgType }  = data;
  if (MsgType === 'text') {
    return replyText(data);
  } else if (MsgType === 'event') {
    return replyEvent(data);
  }
  return ''
}

function replyText(data) {
  const {ToUserName, FromUserName, CreateTime, MsgType, Content, MsgId} = data;
  return `
    <xml>
      <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${Content}]]></Content>
    </xml>
  `;
}

function replyEvent(data) {
  return 'success';
}

export {
  replyMsg
}