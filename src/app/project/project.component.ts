import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { IProject } from '../models/IProject';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() Title: string = ''; // will be sent from parent

  ngOnInit(): void {
    this.AddNewEducation()
  }

  public EducationList: IProject[] = [] // initially its empty until i push some into it

  public EducationInput(event: any, education: IProject) { // will print the content of the html
    //  let index: number = this.EducationList.indexOf(education)
    //  console.log("what si wrote",event.target.innerHTML)
    // let textObject = { ...this.EducationList[index], [event.target.id]: event.target.innerText }
    // this.EducationList[index] = textObject
    let att: any = event.target.id
    console.log('att', att);
    let counter = 0;
    let index = counter;
    this.EducationList.map((current: IProject) => {

      if (current == education) {
        // console.log('the index is',index);
        (current as any)[att as keyof IProject] = event.target.innerText
        index = counter
      }
      counter++;
    })
    console.log('the index is', index);
    console.log('all douc', document.querySelectorAll('#proTitle').item(index))
    if (att == 'proBefore') {
      let afterText: any = education.proAfter
      console.log('aaaaallll', document.querySelectorAll('#proAfter'))
      if (afterText == '') {
        document.querySelectorAll('#proTitle')[index]?.setAttribute("data-after", `(${event.target.innerText})`)
      }
      else if (event.target.innerText != '') {
        document.querySelectorAll('#proTitle')[index]?.setAttribute("data-after", `(${event.target.innerText} - ${afterText})`)
      }
      else { // deleted it
        document.querySelectorAll('#proTitle')[index]?.setAttribute("data-after", `(${afterText})`)
      }

      if (afterText == '' && event.target.innerText == '') { // both are deleted
        document.querySelectorAll('#proTitle')[index]?.setAttribute("data-after", ``)
      }
    }


    if (att == 'proAfter') {
      let beforeText: any = education.proBefore
      if (beforeText == '') {
        document.querySelectorAll('#proTitle')[index]?.setAttribute("data-after", `(${event.target.innerText})`)
      }
      else if (event.target.innerText != '') {
        document.querySelectorAll('#proTitle')[index]?.setAttribute("data-after", `(${beforeText} - ${event.target.innerText})`)
      }
      else { // deleted it
        document.querySelectorAll('#proTitle')[index]?.setAttribute("data-after", `(${beforeText})`)
      }

      if (beforeText == '' && event.target.innerText == '') { // both are deleted
        document.querySelectorAll('#proTitle')[index]?.setAttribute("data-after", ``)
      }
    }


  }

  dropEducation(event: CdkDragDrop<IProject[]>) {
    console.log("dropped")
    console.log('pre', event.previousContainer.data)
    console.log('curre', event.container.data)
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public AddNewEducation() { // fixx it asap
    let currentEducation: IProject = {
      proTitle: '',
      proBefore: '',
      proAfter: '',
      proDesc: '', // optional paramter (contain the bech project )
      proLink:'',
      showFields: true,
    }
    console.log("the current list:", this.EducationList)
    let EducationContainer: any = document.querySelector('.EducationContainer')
    let leftCol: any = document.querySelector('.leftCol')
    let EducationRow: any = document.querySelectorAll('.EducationRow')
    //  try {
    //    if(leftCol.offsetHeight >= EducationContainer.offsetHeight + EducationRow[0].offsetHeight ){ // can add new row peacfully
    //      this.EducationList.push(currentEducation)
    //     }
    //     else{
    //      alert("cant addd it :D")
    //     }
    //  }
    //  catch{
    //    this.EducationList.push(currentEducation)
    //    console.warn("first time cant access it XX")
    //  }
    this.EducationList.push(currentEducation)


  }

  public DeleteEducation(education: IProject) {
    let NewEducationList = this.EducationList.filter(function (current) {
      return current != education
    })
    this.EducationList = [...NewEducationList]
  }


  // public showAllFields = true; // to show all the contents
  public LastParentFocus: any;

  public LastEducationSelected: any; // the index of the last selected one
  public testFocus(event: any, education: IProject) { // will be nofified if the something happed
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
      && event.target.id != 'USCircleInside' && event.target.id != 'link')
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
    proTitle: false,
    proBefore: false,
    proAfter: false,
    proDesc: false, // optional paramter (contain the bech project 
    proLink:false,
  };


  public focus(event: any) {
    event.target.innerText = event.target.innerText // need this to fix the focus problem
    console.log('----------')
    this.isInputActiveEdu[event.target.id] = true
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

  // public SelecGpaSystem(type:string,education:IProject){
  //    // console.log("the selected",event.target.id);
  //    // console.log(event.target.style)
  //    // let Selected:any = document.querySelector(`#${type}`)

  //    let index =this.EducationList.indexOf(education)

  //    if(this.EducationList[index].eduSystem == type){ // pressed on again
  //      this.EducationList[index].eduSystem ='' // just update the type
  //    }
  //    else{
  //      this.EducationList[index].eduSystem =type // just update the type
  //    }
  //    // this.focusGpa('eduGpa')
  //    console.log("all list:",this.EducationList)
  //    console.log('type: ',type)
  //    console.log(document.querySelector(`#${type}`))

  //    // document.querySelector(`#${type}`)?.classList.add('SelectedGpaSystemOn')
  //    // document.querySelector(`#${type}Circle`)?.classList.add('circleSystemOn')
  //    // document.querySelector(`#${type}CircleInside`)?.classList.add('circleSystmeinsideOn')
  // }

}
