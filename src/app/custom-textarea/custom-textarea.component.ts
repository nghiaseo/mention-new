import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { USERS } from '../mock-data';
import {getCarretPos,getCurrentNode} from './caret'
@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['./custom-textarea.component.scss']
})
export class CustomTextareaComponent implements OnInit {
  users = USERS;
  htmlDoc!: HTMLElement | null;
  currentNode = 0;
  selection:any;
  mentionConfig = {
    items: USERS,
    triggerChar: '@',
    mentionSelect: (e: any) => {return '##' + e.label + '##';}
  }
  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    this.htmlDoc = document.getElementById('text-area');
  }
  itemSelected(e: any) {
    setTimeout(() => {
      this.htmlDoc = document.getElementById('text-area');

      if (this.htmlDoc) {

        this.htmlDoc.innerHTML = this.htmlDoc.innerHTML.replace(
          '##' + e.label + '##',
          '&nbsp;<span class="mentionText">' + e.label + '</span>&nbsp;'
        );

        // put the cursor to the end of field again...&nbsp;
       this.selectEnd();
             }
    }, 10);
  }
  selectEnd() {
    let range, selection;

    range = document.createRange();
    if (this.htmlDoc) {
      range.selectNodeContents(this.htmlDoc);
     // range.selectNode(this.htmlDoc?.childNodes[this.currentNode+2])
      if(this.htmlDoc?.childNodes[this.currentNode+2])
     {
       range.setStart(this.htmlDoc?.childNodes[this.currentNode+2],1)
       //range.selectNode(this.htmlDoc?.childNodes[this.currentNode+2])
       range.setEnd(this.htmlDoc?.childNodes[this.currentNode+2],1)
     // range.collapse(true);
    }
     else
     {
      range.setStart(this.htmlDoc?.childNodes[this.currentNode+1],1)
      range.setEnd(this.htmlDoc?.childNodes[this.currentNode+1],1)
       //range.selectNode(this.htmlDoc?.childNodes[this.currentNode+1])
    // range.collapse(true);
  }

    }
    selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  //------------------------------==============================
@HostListener('mouseup',['$event'])
mouseUpEvent(){
  if(this.htmlDoc)
  {
  console.log('current node is :',getCurrentNode(this.htmlDoc))
  this.currentNode = getCurrentNode(this.htmlDoc)
  }

  }
  @HostListener('keyup', ['$event'])
  keyUpEvent(event:any) {
    if(this.htmlDoc){
      if(this.htmlDoc.innerText[getCarretPos(this.htmlDoc)-1]){

      }
      this.currentNode = getCurrentNode(this.htmlDoc)
  console.log(this.htmlDoc.innerText[getCarretPos(this.htmlDoc)-1],this.htmlDoc.innerText[getCarretPos(this.htmlDoc)])

    }
      }

}
