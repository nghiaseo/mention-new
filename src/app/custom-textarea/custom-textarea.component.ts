import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { USERS } from '../mock-data';
import { getCarretPos, getCurrentNode } from './caret';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['./custom-textarea.component.scss']
})
export class CustomTextareaComponent implements OnInit {
  users = USERS;
  htmlDoc!: HTMLElement | null;
  currentNode = 0;
  selection: any;
  mentionAtStart = true;
  mentionText = false;
  beforeText = '';
  afterText = '';
  mentionConfig = {
    items: USERS,
    triggerChar: '@',
    allowSpace: true,
    labelKey:'name',
    mentionSelect: (e: any) => { return '##' + e.name + '##'; }
  }
  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    this.htmlDoc = document.getElementById('text-area');

  }
  itemSelected(e: any) {
    setTimeout(() => {
     // console.log('node:', this.currentNode, 'caret:', getCarretPos(this.htmlDoc))
      this.htmlDoc = document.getElementById('text-area');
      if (this.htmlDoc) {
        this.htmlDoc.innerHTML = this.htmlDoc.innerHTML.replace('##' + e.name + '##',
          '&nbsp;<div class="mentionText"  matTooltip="Tooltip Display">' + e.name +
           '<span class="tooltiptext">Bạn '+e.name+' '+e.age+'tuổi</span></div>&nbsp;');
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

      if (this.htmlDoc?.childNodes[this.currentNode + 2]) {
        if (this.mentionAtStart) {
          console.log(this.mentionAtStart, 'start')
          range.setStart(this.htmlDoc?.childNodes[2], 0)
          range.setEnd(this.htmlDoc?.childNodes[2], 0)
        }
        else {
          range.setStart(this.htmlDoc?.childNodes[this.currentNode + 2], 0)
          range.setEnd(this.htmlDoc?.childNodes[this.currentNode + 2], 0)
        }
      }
      else {
        range.setStart(this.htmlDoc?.childNodes[this.currentNode + 1], 0)
        range.setEnd(this.htmlDoc?.childNodes[this.currentNode + 1], 0)
        // range.collapse(true);
      }

    }
    selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  @HostListener('mouseup', ['$event'])
  mouseUpEvent() {
    if (this.htmlDoc) this.currentNode = getCurrentNode(this.htmlDoc)
  }
  @HostListener('keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (this.htmlDoc) this.currentNode = getCurrentNode(this.htmlDoc)
    //console.log(this.currentNode,getCarretPos(this.htmlDoc))
    //if(this.htmlDoc?.childNodes[this.currentNode].nodeName=='DIV') this.mentionText=true
    this.mentionText = this.htmlDoc?.childNodes[this.currentNode].nodeName=='DIV'?true:false;
    this.afterText = this.htmlDoc?.innerText||'';
    // console.log(this.beforeText.trim().length)
    // console.log(this.afterText.trim().length)
    // if(this.afterText.trim().length!=0&& this.beforeText.trim().length!=0)

    if(this.afterText!=this.beforeText&&this.mentionText&&event.key!='Enter')
    //this.htmlDoc?.childNodes[this.currentNode].replaceWith(this.afterText)
    this.htmlDoc?.childNodes[this.currentNode].remove();


  }
  @HostListener('keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    this.mentionAtStart = (event.key == '@' && getCarretPos(this.htmlDoc) == 0) ? true : false;
    if (this.htmlDoc) this.currentNode = getCurrentNode(this.htmlDoc)
    if(this.htmlDoc?.childNodes[this.currentNode])
    this.beforeText = this.htmlDoc.innerText||'';
   // console.log('down',this.beforeText);

  }
}
