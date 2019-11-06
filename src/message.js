
const  format = require('string-format')
const uuid = require('uuid/v1');
function Message(){
}
Message.BuildPropertyTopic = function(deviceId,thingId) {
    return format('/sys/{}/{}/thing/event/property/post',thingId,deviceId)
}
Message.BuildPropertyReplyTopic = function(deviceId,thingId) {
    return format('/sys/{}/{}/thing/event/property/post_reply',thingId,deviceId)
}
Message.BuildMessage = function(data) {
    let content = {}
    for (let item in data) {
        content[item] = {
            value:data[item],
            time:Date.now(),
        }
    }
    let msg = {
        id:uuid(),
        version:"v1.0.0",
        params:content
    }
    return msg
}
Message.BuildMessageEx = function(data,time) {
    let content = {}
    for (let item in data) {
        content[item] = {
            value:data[item],
            time:time,
        }
    }
    let msg = {
        id:uuid(),
        version:"v1.0.0",
        params:content
    }
    return msg
}
module.exports = Message;