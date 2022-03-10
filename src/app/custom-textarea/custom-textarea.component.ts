import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { USERS } from '../mock-data';
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
    mentionSelect: (e: any) => {

      return '##' + e.label + '##';

    }
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
          '<span class="mentionText">' + e.label + '</span>&nbsp;'
        );
        // put the cursor to the end of field again...
        this.selectEnd();
      }
    }, 10);
  }
  selectEnd() {

    let range, selection;
    range = document.createRange();
    if (this.htmlDoc) {
      range.selectNodeContents(this.htmlDoc);
     let node = this.currentNode==0?1:this.currentNode+2;
     range.selectNode(this.htmlDoc?.childNodes[node])
     range.collapse(false);

    }
    selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  //------------------------------==============================
  getCaretCharacterOffsetWithin(element: any) {
    var caretOffset = 0;
    var doc = element!.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }

@HostListener('mouseup',['$event'])
mouseUpEvent(){
  const caretPos = this.getCaretCharacterOffsetWithin(this.htmlDoc);
  let tmp = 0;
  if (this.htmlDoc) {
    for (let i = 0; i < this.htmlDoc.childNodes.length; i++) {
      let len = this.htmlDoc.childNodes[i].textContent?.length;
      if (len) tmp += len;
      if (len) {
        if (tmp >= caretPos) {
          console.log('current node is:', i)
          this.currentNode = i;
          break;
        }
      }
    }
  }

}
  @HostListener('keyup', ['$event'])
  keyUpEvent(event:any) {
    const caretPos = this.getCaretCharacterOffsetWithin(this.htmlDoc);
    let tmp = 0;
    if (this.htmlDoc) {
      for (let i = 0; i < this.htmlDoc.childNodes.length; i++) {
        let len = this.htmlDoc.childNodes[i].textContent?.length;
        if (len) tmp += len;
        if (len) {
          if (tmp >= caretPos) {
            console.log('current node is:', i)
            console.log(this.htmlDoc.childNodes[i].nodeName=='SPAN')
            if(event.code=='Backspace'){
              //const txt = this.htmlDoc.childNodes[i].textContent||'';
              //this.htmlDoc.childNodes[i].replaceWith(txt);
              if(this.htmlDoc.childNodes[i].nodeName=='SPAN')
              this.htmlDoc.childNodes[i].remove()
              this.currentNode--;
              continue;

            }
            this.currentNode = i;
            break;
          }
        }
      }
    }
  }

}
