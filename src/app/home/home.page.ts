import { Component } from '@angular/core';
import Gun from 'gun/gun';
import 'gun/lib/path.js';
import { AlertController } from '@ionic/angular';

//var gun = Gun().get('thoughts');
var gun = Gun('https://guntestgiovanni.herokuapp.com/gun').get('tutorial/chat/app');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  message: string;

  messages = [{who: 'user1', what: 'test1', when: 'date1'}, {who: 'user2', what: 'test2', when: 'date2'}];
  // messages: Message[];

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    // gun.map().on(function (message, id) {
    //   if (message != null && message.when && message.who && message.what) {
    //     var messageList = document.getElementById('list');
    //     var messageItem = document.createElement("ion-item");
    //     messageItem.id = id;
    //     messageItem.appendChild(document.createTextNode(new Date(message.when).toLocaleString()+ message.who + message.what));
    //     messageList.appendChild(messageItem);
    //   }
    // });
    // this.messages = this.getMessages();
    // console.log(this.messages);
    gun.map().once(function (message, id) {
      if (message != null && message.when && message.who && message.what) {
        var messageList = document.getElementById('list');
        var messageItem = document.createElement("ion-item");
        messageItem.id = id;
        messageItem.appendChild(document.createTextNode(`${new Date(message.when).toLocaleString()} ${message.who}: ${message.what}`));
        messageList.appendChild(messageItem);
      }
    });
  }

  // getMessages() {
  //   return gun.map().val(function (message, id) {
  //     if (message != null && message.when && message.who && message.what) {
  //       var messageList = document.getElementById('list');
  //       var messageItem = document.createElement("ion-item");
  //       messageItem.id = id;
  //       messageItem.appendChild(document.createTextNode(new Date(message.when).toLocaleString() + message.who + message.what));
  //       messageList.appendChild(messageItem);
  //     }
  //   });
  // }

  sendMessage() {
    if (this.username != null && this.message != null) {
      gun.set({ what: this.message, when: new Date().getTime(), who: this.username });
      this.message = "";
    } else {
      this.presentAlertConfirm();
      console.log("Your message is empty => " + this.message);
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Your message is <strong>empty</strong>!!!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //console.log('Okay');
          }
        }
      ]
    });
    await alert.present();
  }
}

// class Message {
//   who: string;
//   when: string;
//   what: string;

//   constructor (who: string, when: string, what: string) {
//     this.who = who;
//     this.when = when;
//     this.what = what;
//   }
// }