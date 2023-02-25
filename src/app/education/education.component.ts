import { Component,Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { IEduation } from '../models/Education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
 

 ngOnInit():void{
 }

 public EducationList: IEduation[] = [] // initially its empty until i push some into it

 public EducationInput(event: any, education: IEduation) { // will print the content of the html
  //  let index: number = this.EducationList.indexOf(education)
  //  console.log("what si wrote",event.target.innerHTML)
  // let textObject = { ...this.EducationList[index], [event.target.id]: event.target.innerText }
  // this.EducationList[index] = textObject
   let att:any= event.target.id
   this.EducationList.map((current: IEduation)=>{
    if(current == education){
      (current as any)[att as keyof IEduation]=event.target.innerText
    }   
   })
 }

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

 public DeleteEducation(education:IEduation) {
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
   if(!parentFocus.classList.contains('EducationRow'))
      parentFocus=parentFocus.parentElement

  //  console.log("what is the parent",parentFocus.classList.contains('EducationRow'))
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
 public isInputActiveEdu:any={
  eduTitle: false,
  eduPlace: false,
  eduLocation: false,
  eduBefore: false,
  eduAfter: false,
  eduDesc: false, // optional paramter (contain the bech project )
  // eduGpa: false, // optional paramter (the cum gpa)
  // showFields: true,
 };
 
 public Counter=0 ;
//  public focusTest(){
//   console.log('focusTest')
//   this.Counter++ ;
//   console.log("Status: ",this.isInputActive)
//  }

 public focus(event:any){
  event.target.innerText =event.target.innerText // need this to fix the focus problem
  console.log('----------')
  this.isInputActiveEdu[event.target.id]=true
//   for (const key in this.isInputActiveEdu) {
//     console.log(key,":",this.isInputActiveEdu[key])
// }
 }

 public blur(event:any){ // check if all are false
  setTimeout(() => {
    // console.log('----------')
    this.isInputActiveEdu[event.target.id]=false
    let OneTrue =false; // means at least one is true
    for (const key in this.isInputActiveEdu) {
        // console.log(key,":",this.isInputActiveEdu[key])
        if(this.isInputActiveEdu[key]){ // on is active thus dont close it
            OneTrue =true; 
            break;
        }
    }
    if (!OneTrue) // all are false thus just close it
        this.EduLoseFocus()
    
  }, 100);

 }


}
