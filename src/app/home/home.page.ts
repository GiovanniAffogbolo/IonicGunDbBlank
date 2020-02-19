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

  thoughts: Array<Thought> = new Array<Thought>();

  constructor() {

  }

  ngOnInit() {
    console.log('ngOnInit');
    let tempArray = new Array<Thought>();
    console.log('tempArray when created in at start of ngOnInit')
    console.log(tempArray)
    gun.map().on(function (thought, id) {
      console.log('gun.map().on')
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

  addThought() {
    if (this.message != null) {
      gun.set({ message: this.name + this.message });
      //this.thoughts.push(gun);
      //console.log(this.thoughts);
      this.message = "";
    } else {
      console.log("Your message is empty => " + this.message);
    }
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