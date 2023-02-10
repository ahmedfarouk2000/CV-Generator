import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  public PrintSize = false;
  public width = 930;  // the inital width (vw)
  public height = 1300; // the inital height (vh)
  public nuBubbles = 5;


  ngOnInit(): void {
  }
  public PrintOrNot = false;
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

  public ZoomIn() {
    console.log("in ZoomIn");

    // let currentPageSize = document.querySelector<HTMLElement>('.currentPage')
    // let temp = document.documentElement.style.getPropertyValue('--width');
    // console.log(temp);

    // console.log(currentPageSize?.offsetWidth);
    // console.log(currentPageSize?.offsetHeight);
    // currentPageSize!.style.width = currentPageSize!.offsetWidth + 50 + "px";

    // currentPageSize?.style.width=currentPageSize.offsetWidth+20 +"px";
    this.width = this.width + 50;
    this.height = this.height + 50;
    document.documentElement.style.setProperty('--width', this.width + "px");
    document.documentElement.style.setProperty('--height', this.height + "px");
  }

  public ZoomOut() {
    console.log("in ZoomOut");


    this.width = this.width - 50;
    this.height = this.height - 50;
    document.documentElement.style.setProperty('--width', this.width + "px");
    document.documentElement.style.setProperty('--height', this.height + "px");
  }

  public getRandomCoordinates(): { x: number, y: number } {
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    return { x, y };
  }

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

  public DeleteImage() {
    console.log("delete the img");
    const img = document.querySelector('.img');
    img!.classList.toggle('imgToggle');
  }


  // public handleFileInput(files: any) {
  //   // let fileToUpload: File | null = null;
  //   let fileToUpload = files.files.item(0);
  //   console.log('in handle file', fileToUpload)
  //   document.documentElement.style.setProperty('--image', `url(${fileToUpload})`);

  // }
  public uploadedImage = false;
  public handleFileInput = (input: any) => { // workingggggggggg wwwwwwwow
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const imageUrl = e.target.result as string;
        this.changeElementBackground(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  public changeElementBackground = (imageUrl: string) => {
    this.togglePopUp()
    this.uploadedImage = true;
    const targetElement = document.querySelector(".svgContainer") as HTMLElement;
    // targetElement.style.backgroundImage = `url(${imageUrl})`;

    const tmepImgInside: any = document.querySelector(".tmepImgInside");
    tmepImgInside.src = imageUrl
  };
  public EnteredImage(event: any) {
    console.log('wwwwwwwwwwww', event.pageX)

    const tempImage: any = document.querySelector(".tempImage")
    event = event || window.event; // IE-ism
    console.log("Mouse:", event.pageX)

    // const rect = tempImage.getBoundingClientRect();
    // const pageXParent = rect.left + window.pageXOffset;
    // const pageYParent = rect.top + window.pageYOffset;
    // const CenterCropingX = (event.pageX - pageXParent)
    // const CenterCropingY = (event.pageY - pageYParent)

    // document.documentElement.style.setProperty('--clippingX', `${CenterCropingX}px`);
    // document.documentElement.style.setProperty('--clippingY', `${CenterCropingY}px`);

  }

  public Slide1(event: any) {
    console.log(event.target.value)
    // event.target.value = 100
    let currentValue = event.target.value
    document.documentElement.style.setProperty('--clippingRadius', `${currentValue}%`);
  }

  public Slide2(event: any) {
    console.log(event.target.value)
    // event.target.value = 100
    let currentValue = event.target.value
    document.documentElement.style.setProperty('--clippingX', `${currentValue}%`);
  }



  public Slide3(event: any) {
    console.log(event.target.value)
    // event.target.value = 100
    let currentValue = event.target.value
    document.documentElement.style.setProperty('--clippingY', `${currentValue}%`);
  }

  public DropCroppingBox(event: any) {
    console.log('in drag and drop', event)


  }
  // (cdkDragMoved)="dragMoved($event)"
  public publicPosX: any;
  public publicPosY: any;
  dragMoved(event: any) {
    // console.log(event)
    const croppingBox: any = document.querySelector(".croppingBox")
    const tempImage: any = document.querySelector(".tempImage")
    // const width = tempImage.offsetWidth;
    // const height = tempImage.offsetHeight;
    // console.log('before:', width, height);
    const pageXChild = event.event.pageX
    const pageYChild = event.event.pageY
    console.log("the event :", pageXChild, pageYChild)




    // console.log(targetElement);
    const rect = tempImage.getBoundingClientRect();
    const pageXParent = rect.left + window.pageXOffset;
    const pageYParent = rect.top + window.pageYOffset;

    const rect2 = croppingBox.getBoundingClientRect();
    const pageXChild2 = rect2.left + window.pageXOffset;
    const pageYChild2 = rect2.top + window.pageYOffset;

    const CenterCropingX = (pageXChild2 - pageXParent)
    const CenterCropingY = (pageYChild2 - pageYParent)
    this.publicPosX = CenterCropingX
    this.publicPosY = CenterCropingY
    // console.log(`start point: ${CenterCropingX}, ${CenterCropingY}`)

    let AvatarWidth = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--AvatarWidth').replace('px', ''));
    let SquareBorderRadius = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--SquareBorderRadius').replace('px', ''));
    let halfAvatarWidth = AvatarWidth / 2
    document.documentElement.style.setProperty('--clippingX', `${CenterCropingX + halfAvatarWidth + SquareBorderRadius}px`);
    document.documentElement.style.setProperty('--clippingY', `${CenterCropingY + halfAvatarWidth + SquareBorderRadius}px`);
    // let AvatarWidth = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--AvatarWidth').replace('px', ''));
    // let halfAvatarWidth = AvatarWidth / 2
    // document.documentElement.style.setProperty('--clippingRadius', `${halfAvatarWidth}px`);
  }

  public Confirm() { // this function will confirm the crop
    this.togglePopUp()
    const parent: any = document.querySelector(".svgContainer")
    const tempImage: any = document.querySelector(".tempImage")
    parent.appendChild(tempImage)
    console.log("eneters")

    // tempImage.style.position = "absolute";
    let AvatarWidth = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--AvatarWidth').replace('px', ''));
    let halfAvatarWidth = AvatarWidth / 2
    let SquareBorderRadius = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--SquareBorderRadius').replace('px', ''));


    let finalX = this.publicPosX + SquareBorderRadius
    let finalY = this.publicPosY + SquareBorderRadius
    tempImage.style.top = `-${finalY}px`;
    tempImage.style.left = `-${finalX}px`;

    document.documentElement.style.setProperty('--radius', `${halfAvatarWidth}px`);
    document.documentElement.style.setProperty('--xLocation', `${this.publicPosX + halfAvatarWidth + SquareBorderRadius}px`);
    document.documentElement.style.setProperty('--yLocation', `${this.publicPosY + halfAvatarWidth + SquareBorderRadius}px`);
  }

  public togglePopUp() {
    console.log("wo")
    let popUp = document.querySelector('.popUp')
    popUp?.classList.toggle('ClosePopUp')

  }

















}
