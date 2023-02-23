import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IEduation } from '../models/Education';


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


  ngOnInit(): void { // here 
    // let start = 0.1
    // let string = ''
    // for (let i = 0 ;i<=100 ; i+=5){
    //   if(i < 50){
    //     let current =`${i}% {background-color: rgba(128, 128, 128, ${start.toFixed(2)});}`
    //     start+=0.015
    //     console.log(current)
    //     string+=current + '\n'
    //   }
    //   else{
    //     let current =`${i}% {background-color: rgba(128, 128, 128, ${start.toFixed(2)});}`
    //     start-=0.015
    //     console.log(current)
    //     string+=current + '\n'
    //   }
    //   console.log(string)


    // }

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



  // public uploadedImage = false;
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

  public ResetBox = { x: 0, y: 0 }
  public onlyOnceReset = true
  public changeElementBackground = (imageUrl: string) => {
    this.togglePopUp(false)
    this.ResetImage()
    // this.toggleRods()
    // this.toggleDots()
    this.toggleSelectingBox()
    this.ResetAllModes()
    this.ResetZoomSize()
    this.ResetRotateImg()
    this.TogglecroppingBox()
    this.TempImgAbsoluteRemove()
    let tmepImgInside: any = document.querySelector(".tmepImgInside");
    let tmepImgInsideRest: any = document.querySelector(".tmepImgInsideRest");
    tmepImgInside.src = imageUrl
    tmepImgInsideRest.src = imageUrl
    this.SelectedImg = false; // reset it  
  };

  public ResetImage() { // to reset the image to be in place of clipping
    if (this.onlyOnceReset) {
      this.ResetBoxFun()
      this.onlyOnceReset = false
    }
    const parent: any = document.querySelector(".transparentContainer")
    const tempImage: any = document.querySelector(".tempImage")
    tempImage.style.top = 'auto'
    tempImage.style.left = 'auto'
    document.documentElement.style.setProperty('--clippingX', `${50}%`);
    document.documentElement.style.setProperty('--clippingY', `${50}%`);
    document.documentElement.style.setProperty('--xLocation', `${50}%`);
    document.documentElement.style.setProperty('--yLocation', `${50}%`);
    document.documentElement.style.setProperty('--radius', `${100}%`);
    parent.appendChild(tempImage)
  }

  // public toggleRods() {
  //   let rods = document.querySelectorAll('.rod')
  //   rods.forEach(rod => {
  //     console.log(rod)
  //     rod.classList.toggle('hidden')
  //   });
  // }

  // public toggleDots() {
  //   let dots = document.querySelectorAll('.dot')
  //   dots.forEach(dot => {
  //     console.log(dot)
  //     dot.classList.toggle('hidden')
  //   });
  // }

  public toggleSelectingBox() {
    let SelectingBox = document.querySelector('.tempImage')
    SelectingBox?.classList.toggle('selecting')
    console.log('entered')
    console.log(SelectingBox)
  }

  public ResetBoxFun() {
    this.ResetBox = { x: 0, y: 0 };
  }


  // public Slide1(event: any) {
  //   console.log(event.target.value)
  //   // event.target.value = 100
  //   let currentValue = event.target.value
  //   document.documentElement.style.setProperty('--clippingRadius', `${currentValue}%`);
  // }

  // public Slide2(event: any) {
  //   console.log(event.target.value)
  //   // event.target.value = 100
  //   let currentValue = event.target.value
  //   document.documentElement.style.setProperty('--clippingX', `${currentValue}%`);
  // }



  // public Slide3(event: any) {
  //   console.log(event.target.value)
  //   // event.target.value = 100
  //   let currentValue = event.target.value
  //   document.documentElement.style.setProperty('--clippingY', `${currentValue}%`);
  // }

  public DropCroppingBox(event: any) {
    console.log('in drag and drop', event)


  }
  // (cdkDragMoved)="dragMoved($event)"
  public publicPosX: any;
  public publicPosY: any;
  // public OnlyOnce = false;
  // public funcReset: any;
  dragMoved(event: any) {
    // if (!this.OnlyOnce) {
    //   this.funcReset = event.source._dragRef.reset();
    //   this.OnlyOnce = true
    // }


    // console.log(event)
    const croppingBox: any = document.querySelector(".croppingBox")
    const tempImage: any = document.querySelector(".tempImage")
    // const width = tempImage.offsetWidth;
    // const height = tempImage.offsetHeight;
    // console.log('before:', width, height);
    const pageXChild = event.event.pageX
    const pageYChild = event.event.pageY
    // console.log("the event :", pageXChild, pageYChild)




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
    // this.OnlyOnce = false


  }
  public SelectedImg = false // indicate that img is selcted thus will display the delete img icon
  public Confirm() { // this function will confirm the crop
    this.togglePopUp(false)
    const parent: any = document.querySelector(".svgContainer")
    const tempImage: any = document.querySelector(".tempImage")
    const RestImg: any = document.querySelector(".RestImg")


    // let OldTempImage = tempImage.cloneNode(true);


    parent.appendChild(tempImage)




    // const parentNew: any = document.querySelector(".transparentContainer")
    // parentNew.appendChild(OldTempImage)




    // const hidden: any = document.querySelector(".hidden")
    // hidden.classList.toggle('hidden')


    // const transparentContainer: any = document.querySelector(".transparentContainer")
    // transparentContainer.appendChild(tempImage)

    console.log("eneters")

    // tempImage.style.position = "absolute";
    let AvatarWidth = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--AvatarWidth').replace('px', ''));
    let halfAvatarWidth = AvatarWidth / 2
    let SquareBorderRadius = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--SquareBorderRadius').replace('px', ''));


    let finalX = this.publicPosX + SquareBorderRadius
    let finalY = this.publicPosY + SquareBorderRadius
    tempImage.style.top = `-${finalY}px`;
    tempImage.style.left = `-${finalX}px`;

    RestImg.style.top = `-${finalY}px`;
    RestImg.style.left = `-${finalX}px`;

    document.documentElement.style.setProperty('--radius', `${halfAvatarWidth}px`);
    document.documentElement.style.setProperty('--xLocation', `${this.publicPosX + halfAvatarWidth + SquareBorderRadius}px`);
    document.documentElement.style.setProperty('--yLocation', `${this.publicPosY + halfAvatarWidth + SquareBorderRadius}px`);


    // square.transform = "translate3d(0px, 0px, 0px)";
    // console.log("Aaaaaaaaaa", square)
    // const square: any = document.querySelector('#square')
    // square.style.transform = "";
    this.onlyOnceReset = true
    // this.toggleRods()
    // this.toggleDots()
    this.toggleSelectingBox()
    this.TogglecroppingBox()
    this.TempImgAbsoluteAdd()


    if (this.DontHideImg) { // means the mode has changed before selecting a an img
      this.UnResetAllModes()
    }
    this.SelectedImg = true; // img is selected 


  }

  public TogglecroppingBox() {
    let croppingBox = document.querySelector('.croppingBox')
    croppingBox?.classList.toggle('HidecroppingBox')
    console.log('ENTEEEEEEEEEEEEEEEEEEEED')
  }

  public toggleScrollingScreen() {
    // document.body.style.overflow = "hidden"; // this will disable the user froll scrolling
    if (document.body.style.overflow == 'hidden') {
      document.body.style.overflow = "auto"; // this will disable the user froll scrolling
    }
    else {
      document.body.style.overflow = "hidden"; // this will disable the user froll scrolling
    }
  }




  public togglePopUp(cond: boolean) { // cond tells me to set or not the box
    this.toggleScrollingScreen()
    console.log("wo")
    let popUp = document.querySelector('.popUp')
    popUp?.classList.toggle('ClosePopUp')
    let popUpTab = document.querySelector('.popUpTab')
    popUpTab?.classList.toggle('popUpTabAnimation')
    let transparentContainer = document.querySelector('.transparentContainer')
    transparentContainer?.classList.toggle('transparentContainerToggle')
    if (cond) {
      this.ResetBoxFun()
      // this.toggleRods()
      // this.toggleDots()
      this.toggleSelectingBox()
      this.ResetAllModes()
      this.TogglecroppingBox()
      let tmepImgInsideRest: any = document.querySelector(".tmepImgInsideRest");
      tmepImgInsideRest.src = ''
    }


  }

  public CLosePopUp(event: any) {
    // console.log()
    // console.log(event.target)
    if (event.target?.id == 'popUp') {
      this.togglePopUp(false)
      this.ResetBoxFun()
      // this.toggleRods()
      // this.toggleDots()
      this.toggleSelectingBox()
      this.ResetAllModes()
      this.TogglecroppingBox()
      let tmepImgInsideRest: any = document.querySelector(".tmepImgInsideRest");
      tmepImgInsideRest.src = ''
    }


  }

  public deleteImg() { // just remove it bro
    let tmepImgInside: any = document.querySelector(".tmepImgInside");
    let tmepImgInsideRest: any = document.querySelector(".tmepImgInsideRest");
    tmepImgInside.src = ''
    tmepImgInsideRest.src = ''
    this.SelectedImg = false
  }




  public DontHideImg = false;
  public circleMode() {
    let tempImage = document.querySelector('.tempImage')
    this.ResetAllModes()
    tempImage?.classList.add('circleMode')
    tempImage?.classList.remove('squareMode')
    this.SetSvgRadius(50, 50, 50, 50)
    this.DontHideImg = false
  }


  public squareMode() {
    let tempImage = document.querySelector('.tempImage')
    this.ResetAllModes()
    tempImage?.classList.add('squareMode')
    tempImage?.classList.remove('circleMode')
    this.SetSvgRadius(0, 0, 0, 0)
    this.DontHideImg = false

  }
  public ResetAllModes() { // hide the img
    let temp: any = document.querySelector('.RestImg')
    temp?.classList.add('RestImgHidden')
  }

  public UnResetAllModes() { // hidden img appears
    let temp: any = document.querySelector('.RestImg')
    temp?.classList.remove('RestImgHidden')
  }



  public mode1RightTop() {
    this.circleMode()
    let temp: any = document.querySelector('.RestImg')
    temp.className = ''
    temp?.classList.add('RestImg')
    temp.classList.add('mode1RightTop')
    this.UnResetAllModes()
    this.SetSvgRadius(50, 0, 50, 50)
    this.DontHideImg = true
  }

  public mode1LeftTop() {
    this.circleMode()
    let temp: any = document.querySelector('.RestImg')
    temp.className = ''
    temp?.classList.add('RestImg')
    temp.classList.add('mode1LeftTop')
    this.UnResetAllModes()
    this.SetSvgRadius(0, 50, 50, 50)
    this.DontHideImg = true
  }

  public mode1RightBottom() {
    this.circleMode()
    let temp: any = document.querySelector('.RestImg')
    temp.className = ''
    temp?.classList.add('RestImg')
    temp.classList.add('mode1RightBottom')
    this.UnResetAllModes()
    this.SetSvgRadius(50, 50, 0, 50)
    this.DontHideImg = true
  }

  public mode1LeftBottom() {
    this.circleMode()
    let temp: any = document.querySelector('.RestImg')
    temp.className = ''
    temp?.classList.add('RestImg')
    temp.classList.add('mode1LeftBottom')
    this.UnResetAllModes()
    this.SetSvgRadius(50, 50, 50, 0)
    this.DontHideImg = true
  }



  public mode2Left() {
    this.circleMode()
    let temp: any = document.querySelector('.RestImg')
    temp.className = ''
    temp?.classList.add('RestImg')
    temp.classList.add('mode2Left')
    this.UnResetAllModes()
    this.SetSvgRadius(0, 50, 50, 0)
    this.DontHideImg = true
  }

  public mode2Right() {
    this.circleMode()
    let temp: any = document.querySelector('.RestImg')
    temp.className = ''
    temp?.classList.add('RestImg')
    temp.classList.add('mode2Right')
    this.UnResetAllModes()
    this.SetSvgRadius(50, 0, 0, 50)
    this.DontHideImg = true
  }

  public mode2Top() {
    this.circleMode()
    let temp: any = document.querySelector('.RestImg')
    temp.className = ''
    temp?.classList.add('RestImg')
    temp.classList.add('mode2Top')
    this.UnResetAllModes()
    this.SetSvgRadius(0, 0, 50, 50)
    this.DontHideImg = true
  }


  public mode2Bottom() {
    this.circleMode()
    let temp: any = document.querySelector('.RestImg')
    temp.className = ''
    temp?.classList.add('RestImg')
    temp.classList.add('mode2Bottom')
    this.UnResetAllModes()
    this.SetSvgRadius(50, 50, 0, 0)
    this.DontHideImg = true
  }

  public toggleRadius() {
    // let test = document.querySelector('.svgContainer')
    // test?.classList.toggle('testClass')
    document.documentElement.style.setProperty('--border-bottom-left-radius', 0 + "%");
    document.documentElement.style.setProperty('--border-bottom-right-radius', 0 + "%");
    document.documentElement.style.setProperty('--border-top-left-radius', 0 + "%");
    document.documentElement.style.setProperty('--border-top-right-radius', 0 + "%");
  }

  public SetSvgRadius(TopLeft: number, TopRight: number, BottomRight: number, BottomLeft: number) {
    document.documentElement.style.setProperty('--border-top-left-radius', TopLeft + "%");
    document.documentElement.style.setProperty('--border-top-right-radius', TopRight + "%");
    document.documentElement.style.setProperty('--border-bottom-right-radius', BottomRight + "%");
    document.documentElement.style.setProperty('--border-bottom-left-radius', BottomLeft + "%");
  }

  public OpenSettings() {
    let HoverOnSetting = document.querySelector('.HoverOnSetting')
    HoverOnSetting?.classList.toggle('HoverOnSettingOpened')
  }


  public zoomOutLimit = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--AvatarWidth').replace('px', ''))  // wont be less than the clipping box size
  public ZoomValue = 100 // zoom by value
  public zoomInImg() { // fix the problem of zooming in thus the clipping box will not func well as expected
    let currentWidth = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--imgResize').replace('px', ''));
    let newWidth = currentWidth + this.ZoomValue
    document.documentElement.style.setProperty('--imgResize', newWidth + 'px');

    let clippingX: number = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--clippingX').replace('px', ''));
    let clippingY: number = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--clippingY').replace('px', ''));
    document.documentElement.style.setProperty('--clippingX', `${clippingX + (this.ZoomValue / 2)}px`);
    document.documentElement.style.setProperty('--clippingY', `${clippingY + (this.ZoomValue / 2)}px`);


    document.documentElement.style.setProperty('--zoom-in-Animation', `${1.4}`);
    setTimeout(() => {
      document.documentElement.style.setProperty('--zoom-in-Animation', `${1}`);
    }, 400);

    // rotateValue += 720
    // document.documentElement.style.setProperty('--RotatediceAnimation', `${rotateValue}deg`);

  }


  public zoomOutImg() {


    let currentWidth: number = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--imgResize').replace('px', ''));
    if (this.zoomOutLimit < currentWidth) {
      let newWidth = currentWidth - this.ZoomValue
      document.documentElement.style.setProperty('--imgResize', newWidth + 'px');


      // to avoid the glitching in the clipping border
      let clippingX: number = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--clippingX').replace('px', ''));
      let clippingY: number = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--clippingY').replace('px', ''));
      document.documentElement.style.setProperty('--clippingX', `${clippingX - (this.ZoomValue / 2)}px`);
      document.documentElement.style.setProperty('--clippingY', `${clippingY - (this.ZoomValue / 2)}px`);


      document.documentElement.style.setProperty('--zoom-out-Animation', `${0.6}`);
      setTimeout(() => {
        document.documentElement.style.setProperty('--zoom-out-Animation', `${1}`);
      }, 400);

    }
  }

  public ResetZoomSize() { // to set the size of the img for the next img depending on the --imgResize
    document.documentElement.style.setProperty('--imgResize', 400 + 'px');
  }

  public ResetRotateImg() { // to set the size of the img for the next img depending on the --imgResize
    document.documentElement.style.setProperty('--RotationDeg', 0 + 'deg');
  }

  public RotateImg() {
    let RotationDeg: number = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--RotationDeg').replace('deg', ''));
    RotationDeg += 90;
    document.documentElement.style.setProperty('--RotationDeg', `${RotationDeg}deg`);


    let rotateValue: number = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--RotateIconAnimation').replace('deg', ''));
    rotateValue -= 360
    document.documentElement.style.setProperty('--RotateIconAnimation', `${rotateValue}deg`);


  }

  public TempImgAbsoluteRemove() { // used to make the temp img absolute after confirm
    let tempImage = document.querySelector('.tempImage')
    tempImage?.classList.remove('tempImageAbsolute')
  }

  public TempImgAbsoluteAdd() { // used to make the temp img absolute after confirm
    let tempImage = document.querySelector('.tempImage')
    tempImage?.classList.add('tempImageAbsolute')
  }

  public LastRandomNumber = 1 // for the circle effect
  public randomDiceAvatar() {


    let rotateValue: number = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--RotatediceAnimation').replace('deg', ''));
    rotateValue += 720
    document.documentElement.style.setProperty('--RotatediceAnimation', `${rotateValue}deg`);


    let RandomEffect = Math.ceil(Math.random() * 10) // rando num between (1,2)
    while (this.LastRandomNumber == RandomEffect) {
      RandomEffect = Math.ceil(Math.random() * 10) // rando num between (1,2)
    }
    this.LastRandomNumber = RandomEffect // update it for next iteration
    switch (RandomEffect) {
      case 1: this.circleMode(); break
      case 2: this.squareMode(); break
      case 3: this.mode1RightTop(); break
      case 4: this.mode1RightBottom(); break
      case 5: this.mode1LeftTop(); break
      case 6: this.mode1LeftBottom(); break
      case 7: this.mode2Top(); break
      case 8: this.mode2Bottom(); break
      case 9: this.mode2Left(); break
      case 10: this.mode2Right(); break
    }

  }



  public EducationList: IEduation[] = [] // initially its empty until i push some into it

  public printContent(event: any, education: any) { // will print the content of the html

    let index: number = this.EducationList.indexOf(education)
    console.log('the index', index)

    let textObject = { ...this.EducationList[index], [event.target.id]: event.target.innerHTML }
    this.EducationList[index] = textObject
    // let att:keyof IEduation = event.target.id 
    // this.EducationList[index][att as keyof IEduation] = event.target.innerHTML
    // console.log(this.EducationList, 'the input from the user')


  }



  // public ConfirmInputs() {
  //   // this.EducationList.push(this.currentRow)
  //   console.log('pushed to the array', this.EducationList)
  // }



  dropEducation(event: CdkDragDrop<IEduation[]>) {
    console.log("dropped")
    console.log('pre', event.previousContainer.data)
    console.log('curre', event.container.data)
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public AddNewEducation() {
    let currentEducation: IEduation = {
      eduTitle: '',
      eduPlace: '',
      eduLocation: '',
      eduBefore: '',
      eduAfter: '',
      eduDesc: '', // optional paramter (contain the bech project )
      eduGpa: '', // optional paramter (the cum gpa)
      showFields: true,
    }
    this.EducationList.push(currentEducation)
  }

  public showAllFields = true; // to show all the contents
  public LastParentFocus: any;

  public LastEducationSelected: any; // the index of the last selected one
  public testFocus(event: any, education: IEduation) { // will be nofified if the something happed
    console.log('focus happened ')

    let index = this.EducationList.indexOf(education)
    this.EducationList[index].showFields = true
    this.LastEducationSelected = index; // to save its index

    let parentFocus = event.target.parentElement
    parentFocus.classList.add('pulseAnim')

    this.LastParentFocus = event.target.parentElement
  }

  public LoseFocus(event: any) { // lose focus for education
    console.log(event.target.id)
    let currentId = event.target.id

    let Parent: any = document.querySelector('.EducationContainer')
    // console.log(event.target)
    // if (Parent.contains(event.target)) {
    //   console.log('yess its')

    // }
    // else {
    //   console.log('no its does not contan')
    // }
    // const isChild = this.isDescendantOf(Parent, event.target as HTMLElement);
    // console.log('child result', isChild)

    try {
      if (!Parent.contains(event.target)) {

        this.LastParentFocus.classList.remove('pulseAnim')
        this.EducationList[this.LastEducationSelected].showFields = false
        console.log('loseeeeeeeeee')
      }

    }
    catch {
      console.warn('eeeerrrre')
    }

  }

  // public isDescendantOf(parent: HTMLElement, child: HTMLElement): boolean {
  //   console.log('all parents', child)
  //   if (parent === child) {
  //     // Child is the parent element
  //     return true;
  //   } else if (child.parentNode) {
  //     // Check if the parent element is an ancestor of the child element
  //     return this.isDescendantOf(parent, child.parentNode as HTMLElement);
  //   } else {
  //     // Child element does not have a parent node
  //     return false;
  //   }
  // }












}
