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

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    gun.map().on(function (message, id) {
      if (message != null && message.when && message.who && message.what) {
        var ul = document.getElementById("list");
        var elementLi = document.createElement("ion-item");
        elementLi.id = id;
        elementLi.appendChild(document.createTextNode(new Date(message.when).toLocaleString()+ message.who + message.what));
        ul.appendChild(elementLi);
      }
    });
  }

  sendMessage() {
    if (this.username != null && this.message != null) {
      gun.set({ what: this.message, when: new Date().getTime(), who: this.username});
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