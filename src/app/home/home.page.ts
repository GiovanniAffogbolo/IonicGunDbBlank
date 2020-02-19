import { Component } from '@angular/core';
import Gun from 'gun/gun';
import 'gun/lib/path.js';
import { environment } from '../../environments/environment';

var gun = Gun().get('thoughts');


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  message: string;

  name: string = "Giovanni : "; //change it by your name

  thethoughts: Array<string> = [];

  gunRemote: any;

  constructor() {
    this.connectGun();
  }

  public connectGun() {
    this.gunRemote = new Gun({
      peers: [environment.gun_server_secure],
      file: 'gunStore'
    });
    //console.log(this.gunRemote);
  }

  ngOnInit() {
    gun.map().on(function (thought, id) {
      var ul = document.getElementById("list");
      var elementLi = document.createElement("li");
      elementLi.id = id;
      elementLi.addEventListener('click', function () {
        gun.get(id).put(null);
        elementLi.remove();
      });
      document.body.appendChild(elementLi);
      if (thought) {
        var html = thought.message;
        elementLi.appendChild(document.createTextNode(html));
        ul.appendChild(elementLi);
      }
    });
  }

  addThoughLocal() {
    if (this.message != null) {
      gun.set({ message: this.name + this.message });
      //this.thethoughts.push(gun);
      //console.log(this.thethoughts);
      this.message = "";
    } else {
      console.log("Your message is empty => " + this.message);
    }
  }

  addThoughServer() {
    if (this.message != null) {
      this.gunRemote.get('message').put({ message: this.name + this.message });
      console.log(this.gunRemote.get('message').put({ message: this.name + this.message }));
      this.message = "";
    } else {
      console.log("Your message is empty => " + this.message);
    }
  }
}