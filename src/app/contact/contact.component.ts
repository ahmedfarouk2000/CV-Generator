import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GlobalConstants } from '../global';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  public VisiableOrNot = GlobalConstants



  public rightCounterMovies = 1;
  public leftCounterMovies = 1;

  public rightCounterContacts = 1;
  public leftCounterContacts = 1;


  public currentLeftColumnHeight = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--rowSize').replace('px', ''));
  public currentRightColumnHeight = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--rowSize').replace('px', ''));

  leftMovies = [
    `left ${this.leftCounterMovies}`,
  ];

  rightMovies = [
    `right ${this.rightCounterMovies}`,
  ];


  leftContacts: { id: string, text: string, type: string }[] = [
    // { id: `left${this.leftCounterContacts}`, text: ``, type: 'linkedin' },
  ];

  rightContacts: { id: string, text: string, type: string }[] = [
    // { id: `right${this.rightCounterContacts}`, text: ``, type: 'github' },
  ];

  // public AddLeftContact() {


  // }
  public addToLeft = true;
  public chosenContacts: string[] = []; // will contain all the choosen contacts till now
  public AddContact(type: string) {
    if (this.chosenContacts.indexOf(type) == -1) { // this mean the contact is not yet added  
      this.chosenContacts.push(type);
      if (this.leftCounterContacts <= this.rightCounterContacts) { // will add to the left peacfully
        this.leftCounterContacts += 1;
        this.leftContacts.push({ id: `left${this.leftCounterContacts}`, text: ``, type: type })
      }
      else { // put to the right
        this.rightCounterContacts += 1;
        this.rightContacts.push({ id: `right${this.rightCounterContacts}`, text: ``, type: type })
      }
    }


  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("dropped")
    console.log('pre', event.previousContainer.data)
    console.log('curre', event.container.data)


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("in the sec")
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  dropSkills(event: CdkDragDrop<{ id: string; text: string; type: string; }[]>) {
    // console.log("dropped")
    console.log('pre', event.previousContainer.data)
    console.log('curre', event.container.data)

    console.log('the id', event.container.data.length)

    console.log('the CONTANT', event.previousContainer.data[event.previousIndex])

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("in the sec")
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if (event.previousContainer.id == event.container.id) { // the same container thus no problem
        // this.addToLeft=true;
        // this.leftCounterContacts -= 1;
        // this.rightCounterContacts += 1;
      }
      else { // means from one column to another one

        if (event.previousContainer.id == "MiddleLeft") { // -1 rfrom left +1 to right
          const temp = document.querySelector('.AllSkills')
          console.log(temp)
          this.leftCounterContacts -= 1;
          this.rightCounterContacts += 1;
        }
        else { // -1 from right +1 to left
          this.leftCounterContacts += 1;
          this.rightCounterContacts -= 1;
        }

      }
      console.log('pre', event.previousContainer.data)
      console.log('curre', event.container.data)
    }
  }

  public AddNewLeft() {
    let currentAdded = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--rowSize').replace('px', ''));
    let leftColumnHeight = document.querySelector<HTMLElement>('.leftCol')?.offsetHeight;

    // console.log(currentAdded);
    // console.log(leftColumnHeight);
    // console.log(this.currentLeftColumnHeight);

    if (currentAdded != undefined && leftColumnHeight != undefined && this.currentLeftColumnHeight != undefined) {
      console.log("entered fun")
      if (currentAdded + this.currentLeftColumnHeight < leftColumnHeight) {
        this.currentLeftColumnHeight += currentAdded;
        this.leftCounterMovies += 1;
        this.leftMovies.push(`left ${this.leftCounterMovies}`);
      }
      else {
        alert("cant add more left")
      }
    }


  }

  public AddNewRight() {

    let currentAdded = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--rowSize').replace('px', ''));
    let rightColumnHeight = document.querySelector<HTMLElement>('.rightCol')?.offsetHeight;

    if (currentAdded != undefined && rightColumnHeight != undefined && this.currentRightColumnHeight != undefined) {
      console.log("entered fun")
      if (currentAdded + this.currentRightColumnHeight < rightColumnHeight) {
        this.currentRightColumnHeight += currentAdded;
        this.rightCounterMovies += 1;
        this.rightMovies.push(`right ${this.rightCounterMovies}`);
      }
      else {
        alert("cant add more right")
      }
    }

  }

  public triggerTrash() {
    console.log("i have enterd the text")
    const currentSelected = document.querySelector('#trash')
    currentSelected?.classList.toggle('visible')
    console.log(currentSelected)
  }


  public triggerLeaveTrash() {
    console.log("i have enterd the text")
    const currentSelected = document.querySelector('#trash')
    currentSelected?.classList.toggle('visible')
    console.log(currentSelected)
  }

  public deleteContact(contact: any) {
    console.log(contact)
    let chosenContactsNew = this.chosenContacts.filter(function (current) {
      return current != contact.type
    })
    this.chosenContacts = [...chosenContactsNew]
    let foundleft = this.leftContacts.indexOf(contact)
    if (foundleft != -1) { // this means the item is located in the left column thus remove it
      let newList = this.leftContacts.filter(function (current) {
        return current != contact
      })
      this.leftContacts = [...newList]
      this.leftCounterContacts -= 1
      console.log('THE NEW LIST', this.leftContacts)
    }
    else { // this means the element for sure in the right
      let newList = this.rightContacts.filter(function (current) {
        return current != contact
      })
      this.rightContacts = [...newList]
      this.rightCounterContacts -= 1
      console.log('THE NEW LIST', this.rightContacts)
    }

    console.log('the found is', foundleft)
    console.log('all left contract', this.leftContacts)
    console.log('all right contract', this.rightContacts)


  }

  public updateText(contact: any, event: any) {
    // console.log('the contact is', event.target.value)
    let foundleft = this.leftContacts.indexOf(contact)
    console.log('the foun index', foundleft)
    if (foundleft != -1) { // this means the item is located in the left column
      this.leftContacts[foundleft].text = event.target.value
    }
    else { // this means the element for sure in the right
      let foundright = this.rightContacts.indexOf(contact)
      this.rightContacts[foundright].text = event.target.value
    }
  }



  public ShowContactsOrNot = false //to show the contacts or not
  public toggleShowContacts() {
    this.ShowContactsOrNot = !this.ShowContactsOrNot;
  }

  public SelectedOrNotFun(type: string) {
    // console.log(type);
    if (this.chosenContacts.indexOf(type) != -1) { // this means already chosen 
      return true;
    }
    return false;
  }



  public PrintOrNot = false;
  public width = 930;  // the inital width (vw)
  public height = 1300; // the inital height (vh)
  public printPara() {
    this.PrintOrNot = true;
    console.log("Wwwwwwwqs");
    document.documentElement.style.setProperty('--width', 21 + "cm");
    document.documentElement.style.setProperty('--height', 29.7 + "cm");
    this.width = 930
    this.height = 1300
    // this.PrintSize = !this.PrintSize;
    setTimeout(() => {
      window.print();
    }, 100);

  }

}
