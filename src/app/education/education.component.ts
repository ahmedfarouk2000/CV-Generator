import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';

import { IEduation } from '../models/IEducation';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  @Input() Title: string = ''; // will be sent from parent

  ngOnInit(): void {
    this.AddNewEducation()
  }

  public EducationList: IEduation[] = [] // initially its empty until i push some into it

  public EducationInput(event: any, education: IEduation) { // will print the content of the html
    //  let index: number = this.EducationList.indexOf(education)
    //  console.log("what si wrote",event.target.innerHTML)
    // let textObject = { ...this.EducationList[index], [event.target.id]: event.target.innerText }
    // this.EducationList[index] = textObject
    let att: any = event.target.id
    console.log('att', att);
    this.EducationList.map((current: IEduation) => {
      if (current == education) {
        if (att == 'eduGpa' && event.target.innerText != '') { // 
          //  console.log('in gpaaaaaa');
          event.target.innerText = 'GPA: ' + event.target.innerText.replace('GPA: ', '');
          (current as any)[att as keyof IEduation] = event.target.innerText

        }
        else {
          (current as any)[att as keyof IEduation] = event.target.innerText
        }

      }
    })
    console.log("the list is :", this.EducationList)
  }

  dropEducation(event: CdkDragDrop<IEduation[]>) {
    console.log("dropped")
    console.log('pre', event.previousContainer.data)
    console.log('curre', event.container.data)
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public AddNewEducation() { // fixx it asap
    let currentEducation: IEduation = {
      eduTitle: '',
      eduPlace: '',
      eduLocation: '',
      eduBefore: '',
      eduAfter: '',
      eduDesc: '', // optional paramter (contain the bech project )
      eduGpa: '', // optional paramter (the cum gpa)
      eduSystem: '', // optional paramter (the cum gpa)
      showFields: true,
    }
    console.log("the current list:", this.EducationList)
    let EducationContainer: any = document.querySelector('.EducationContainer')
    let leftCol: any = document.querySelector('.leftCol')
    let EducationRow: any = document.querySelectorAll('.EducationRow')
    try {
      if (leftCol.offsetHeight >= EducationContainer.offsetHeight + EducationRow[0].offsetHeight) { // can add new row peacfully
        this.EducationList.push(currentEducation)
      }
      else {
        alert("cant addd it :D")
      }
    }
    catch {
      this.EducationList.push(currentEducation)
      console.warn("first time cant access it XX")
    }



  }

  public DeleteEducation(education: IEduation) {
    let NewEducationList = this.EducationList.filter(function (current) {
      return current != education
    })
    this.EducationList = [...NewEducationList]
  }


  // public showAllFields = true; // to show all the contents
  public LastParentFocus: any;

  public LastEducationSelected: any; // the index of the last selected one
  public testFocus(event: any, education: IEduation) { // will be nofified if the something happed
    //  console.log('test focus')

    let index = this.EducationList.indexOf(education)
    this.EducationList[index].showFields = true
    this.LastEducationSelected = index; // to save its index

    let parentFocus = event.target.parentElement
    if (!parentFocus.classList.contains('EducationRow'))
      parentFocus = parentFocus.parentElement

    //  console.log("what is the parent",parentFocus.classList.contains('EducationRow'))
    console.log(event.target.id)
    if (event.target.id != 'USCircle' && event.target.id != 'GermanCircle' && event.target.id != 'GermanCircleInside'
      && event.target.id != 'USCircleInside')
      parentFocus.classList.add('pulseAnim')

    this.LastParentFocus = parentFocus
  }

  public EduLoseFocus() { // lose focus for education
    console.log("in eduuuuuuuuuuu")
    //  console.log(event.target.id)
    //  let currentId = event.target.id

    //  let Parent: any = document.querySelector('.EducationContainer')
    try {
      //  if (!Parent.contains(event.target)) {
      this.LastParentFocus.classList.remove('pulseAnim')
      this.EducationList[this.LastEducationSelected].showFields = false
      console.log('loseeeeeeeeee')
      //  }
      //  console.log('ww')
    }
    catch {
      console.warn('eeeerrrre')
    }

  }
  public isInputActiveEdu: any = {
    eduTitle: false,
    eduPlace: false,
    eduLocation: false,
    eduBefore: false,
    eduAfter: false,
    eduDesc: false, // optional paramter (contain the bech project )
    eduGpa: false, // optional paramter (the cum gpa)
    // eduSystem: '', // optional paramter (the cum gpa)
    // showFields: true,
  };

  public Counter = 0;
  //  public focusTest(){
  //   console.log('focusTest')
  //   this.Counter++ ;
  //   console.log("Status: ",this.isInputActive)
  //  }

  public focus(event: any) {
    event.target.innerText = event.target.innerText // need this to fix the focus problem
    console.log('----------')
    this.isInputActiveEdu[event.target.id] = true

    // try{
    //   let eduGpa:any =document.querySelector('#eduGpa')
    //   eduGpa.innerText =  eduGpa.innerText.replace('GPA: ','');
    // }
    // catch{
    //   console.warn('not found')
    // }

  }

  //  public focusGpa(id:string){
  //   console.log('hiiiiii man')
  //   this.isInputActiveEdu[id]=true

  //  }


  public blur(event: any) { // check if all are false
    setTimeout(() => {
      // console.log('----------')
      this.isInputActiveEdu[event.target.id] = false
      let OneTrue = false; // means at least one is true
      for (const key in this.isInputActiveEdu) {
        // console.log(key,":",this.isInputActiveEdu[key])
        if (this.isInputActiveEdu[key]) { // on is active thus dont close it
          OneTrue = true;
          break;
        }
      }
      if (!OneTrue) // all are false thus just close it
        this.EduLoseFocus()

    }, 100);

  }

  public SelecGpaSystem(type: string, education: IEduation) {
    // console.log("the selected",event.target.id);
    // console.log(event.target.style)
    // let Selected:any = document.querySelector(`#${type}`)

    let index = this.EducationList.indexOf(education)

    if (this.EducationList[index].eduSystem == type) { // pressed on again
      this.EducationList[index].eduSystem = '' // just update the type
    }
    else {
      this.EducationList[index].eduSystem = type // just update the type
    }
    // this.focusGpa('eduGpa')
    console.log("all list:", this.EducationList)
    console.log('type: ', type)
    console.log(document.querySelector(`#${type}`))

    // document.querySelector(`#${type}`)?.classList.add('SelectedGpaSystemOn')
    // document.querySelector(`#${type}Circle`)?.classList.add('circleSystemOn')
    // document.querySelector(`#${type}CircleInside`)?.classList.add('circleSystmeinsideOn')
  }


}
