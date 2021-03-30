import {messaging,} from 'firebase-admin';

const fcm = messaging();

interface MessagingPayload {
    notification:{
        title:string,
        body:string,
        icon:string,
        click_action:string
    }
}


const notifyUsers = async(deviceTokens:string[],payload:messaging.MessagingPayload) =>{
    fcm.sendToDevice(deviceTokens,payload);
}


export {
    notifyUsers,
    MessagingPayload
}