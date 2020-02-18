import { Component } from '@angular/core';
import Gun from 'gun/gun';
import 'gun/lib/path.js';

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

  constructor() {

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

  addThough() {
    if (this.message != null) {
      gun.set({ message: this.name + this.message });
      //this.thethoughts.push(gun);
      //console.log(this.thethoughts);
      this.message = "";
    } else {
      console.log("Your message is empty => " + this.message);
    }
  }
}