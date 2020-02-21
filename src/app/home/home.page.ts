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

  // messages = [{who: 'Wilco', what: 'Hoi', when: '20/02/2020'}, {who: 'Amjada', what: 'Hallo', when: '20/02/2020'}];
  messages: Message[];

  constructor(public alertController: AlertController) { }

  ionViewDidEnter() {
    this.messages = new Array<Message>();
    var self = this;
    if (this.messages) {
      gun.get('messages').map(message => message.who === 'Wilco' || message.who === 'Amjada' ? message : undefined).once(function (message, id) {
        if (message != null && message.when && message.who && message.what) {
          self.messages.push(new Message(message.who, new Date(message.when).toLocaleString(), message.what));
        }
      });
    }
  }

  sendMessage() {
    if (this.username != null && this.message != null) {
      gun.get('messages').set({ what: this.message, when: new Date().getTime(), who: this.username });
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

class Message {
  who: string;
  when: string;
  what: string;

  constructor(who: string, when: string, what: string) {
    this.who = who;
    this.when = when;
    this.what = what;
  }
}