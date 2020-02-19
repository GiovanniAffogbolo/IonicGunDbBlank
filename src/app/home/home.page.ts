import { Component } from '@angular/core';
import Gun from 'gun/gun';
import 'gun/lib/path.js';
//import 'gun/lib/webrctl';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';

var gunRemote: any;
//var gun = g.get('message');
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  message: string;

  name: string = "Giovanni : "; //change it by your name

  thoughts: Array<Thought> = new Array<Thought>();

  //gunRemote: any;

  constructor(public alertController: AlertController) {
    this.connectGun();
    this.ngOnInit();
  }

  public connectGun() {
    gunRemote = new Gun({
      peers: [environment.local, environment.gun_server_ip_adress],
      file: 'gunStore'
    });
    //console.log(this.gunRemote.back('opt.peers'));
    console.log(gunRemote);
  }

  ngOnInit() {
    console.log('ngOnInit');
    let tempArray = new Array<Thought>();
    console.log('tempArray when created in at start of ngOnInit')
    console.log(tempArray)
    gunRemote.map().on(function (thought, id) {
      console.log(thought);
      console.log('gun.map().on')
      var ul = document.getElementById("list");
      var elementLi = document.createElement("li");
      elementLi.id = id;
      elementLi.addEventListener('click', function () {
        gunRemote.get(id).put(null);
        elementLi.remove();
      });
      document.body.appendChild(elementLi);
      if (thought) {
        var html = thought.message;
        elementLi.appendChild(document.createTextNode(html));
        ul.appendChild(elementLi);
        console.log('if(thought)')
        tempArray.push(new Thought(id, thought.message));
        console.log('tempArray at the end of if (thought)')
        console.log(tempArray)
      }
    });
    console.log('tempArray to thoughts arrray')
    tempArray.forEach(thought => {
      this.thoughts.push(thought)
      console.log(thought)
    })
    console.log('this.thoughts:')
    console.log(this.thoughts);
  }

  addThoughLocal() {
    if (this.message != null) {
      //gun.set({ message: this.name + this.message });

      gunRemote.get('message').put({ message: this.name + this.message });
      //gunRemote.set({ message: this.name + this.message });
      console.log(gunRemote);
      this.ngOnInit();
      //this.thethoughts.push(gun);
      //console.log(this.thethoughts);
      this.message = "";
    } else {
      this.presentAlertConfirm();
      console.log("Your message is empty => " + this.message);
    }
  }

  addThoughServer() {
    if (this.message != null) {
      gunRemote.get('message').put({ message: this.name + this.message });
      console.log(gunRemote.get('message').put({ message: this.name + this.message }));
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

class Thought {
  id: number;
  message: string;

  constructor(id: number, message: string) {
    this.id = id;
    this.message = message;
  }
}