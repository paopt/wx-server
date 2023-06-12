const { parseXml } = require('../util/index')

async function replyMsg(msg) {
  if (!msg) return '';
  const data = await parseXml(msg);
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
  console.log('回复Click事件');
  const {ToUserName, FromUserName, MsgType, Event, EventKey} = data;
  return `
    <xml>
      <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[点击事件]]></Content>
    </xml>
  `;
}

module.exports =  {
  replyMsg
}