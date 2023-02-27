import { Component ,Input} from '@angular/core';
import { ISkill } from '../models/ISkill';
import { GlobalConstants } from '../global';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {
 ngOnInit(): void {
    this.AddNewEducation()
  }
@Input() Title: string = ''; // will be sent from parent
public VisiableOrNot = GlobalConstants

  public EducationList: ISkill[] = [] // initially its empty until i push some into it
  public LastEducationSelected: any; // the index of the last selected one
  public LastParentFocus: any;
  

  public testFocus(event: any, education: ISkill) { // will be nofified if the something happed
    //  console.log('test focus')

    let index = this.EducationList.indexOf(education)
    // this.EducationList[index].showFields = true
    this.LastEducationSelected = index; // to save its index

    let parentFocus = event.target.parentElement
    if (!parentFocus.classList.contains('EducationRow'))
      parentFocus = parentFocus.parentElement

    this.LastParentFocus = parentFocus
  }


  public EducationInput(event: any, education: ISkill) { // will print the content of the htm
    let att: any = event.target.id
    console.log('att', att);
    // let counter = 0;
    // let index = counter;
    this.EducationList.map((current: ISkill) => {

      if (current == education) {
        // console.log('the index is',index);
        (current as any)[att as keyof ISkill] = event.target.innerText
        // index = counter
      }
      // counter++;
    })
    // console.log('the index is', index);
    // console.log('all douc', document.querySelectorAll('#proTitle').item(index))
   

}


public AddNewEducation() { // fixx it asap
  let currentEducation: ISkill = {
    SkillTitle: '',
  }
  this.EducationList.push(currentEducation)
}


  public focus(event: any) {
    event.target.classList.remove('closed')
  }




  public blur(event: any) { // check if all are false
    event.target.classList.add('closed')
  }

  public DeleteEducation(education: ISkill) {
    let NewEducationList = this.EducationList.filter(function (current) {
      return current != education
    })
    this.EducationList = [...NewEducationList]
  }

  public DeleteEducationAll() {
    this.VisiableOrNot.toggleVisiable('Skill')
  }
}
