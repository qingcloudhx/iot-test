
const mqtt = require('mqtt');
const jwtDecode = require('jwt-decode');
const message = require('./message.js')
function Mqtt(token,host,port) {
    this.Token = token;
    let decoded = jwtDecode(token);
    this.DeviceId = decoded.orgi;
    this.ThingId = decoded.thid;
    this.Client = undefined;
    this.host= host;
    this.port  = port;
    console.log(decoded.orgi,decoded.thid);
}
Mqtt.prototype = {
    Init(){
        const  client = mqtt.connect({'host':this.host,'port':this.port,'keepalive':10,'clientId':this.DeviceId,'username':this.DeviceId,'password':this.Token})
       this.Client =  client
       client.subscribe(message.BuildPropertyReplyTopic(this.DeviceId,this.ThingId))
       client.on('message',function(topic,message){
           console.log(topic,message.toString())
       })
       client.on('error',function(err){
           console.log(err);
       })
       client.on('connect',function(b){
           console.log('connect success');
       });
       client.on('disconnect',function(b){
        console.log('disconnected ',b);
       });
       client.on('reconnect',function(b){
        console.log('reconnecting ',b);
       });
       console.log('init')
    },
    PublishProperty(data){
        if (typeof data != "object") {
            console.error(msg)
            return
        }
        let topic = message.BuildPropertyTopic(this.DeviceId,this.ThingId)
        let msg = message.BuildMessage(data)
        this.Client.publish(topic,JSON.stringify(msg))
        console.log('publish property success',topic,msg)
    },
    PublishPropertyEx(data,time){
        if (typeof data != "object") {
            console.error(msg)
            return
        }
        let topic = message.BuildPropertyTopic(this.DeviceId,this.ThingId)
        let msg = message.BuildMessageEx(data,time)
        this.Client.publish(topic,JSON.stringify(msg))
        console.log('publish property success',topic,msg)
    }
}
module.exports = Mqtt;