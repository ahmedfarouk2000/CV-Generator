import { Component } from '@angular/core';
import { GlobalConstants } from '../global';
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {
  public VisiableOrNot = GlobalConstants
  public ChooseColor(color:String){
    let PrimaryColor = window.getComputedStyle(document.documentElement).getPropertyValue(`--Color${color}1`)
    let SecondaryColor =window.getComputedStyle(document.documentElement).getPropertyValue(`--Color${color}2`)
      // console.log(PrimaryColor)
      // console.log(SecondaryColor)
    document.documentElement.style.setProperty('--theme1', PrimaryColor);
    document.documentElement.style.setProperty('--theme12', SecondaryColor);

    // console.log('Education:::::',this.VisiableOrNot.getVisible('Education'))
  }

}
