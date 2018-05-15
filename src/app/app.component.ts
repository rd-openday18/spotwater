import { Component, ViewChild } from '@angular/core';
import { Node, Link } from './d3';
import { GraphComponent } from './visuals/graph/graph.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];
  @ViewChild(GraphComponent) child:GraphComponent;
  constructor() {
    const N = 50,
          getIndex = number => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      let node = new Node(i);
      node.cat = Math.floor(Math.random() * 4);
      this.nodes.push(node);
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
    
  }

  move(){
    console.log('this is call here')
    const cat = Math.floor(Math.random() * 4);
    this.nodes[Math.floor(Math.random() * 50)].cat = cat;
    this.child.restart();

  }
}