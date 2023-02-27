import { Component } from '@angular/core';
import { GlobalConstants } from '../global';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  public VisiableOrNot = GlobalConstants

  public ChooseFont(type:any){
    
    console.log('Education:::::',this.VisiableOrNot.getVisible('Education'))
    this.VisiableOrNot.toggleVisiable(type)
  }

}
