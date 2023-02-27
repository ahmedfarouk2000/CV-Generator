import { Component } from '@angular/core';
import { GlobalConstants } from '../global';

@Component({
  selector: 'app-font',
  templateUrl: './font.component.html',
  styleUrls: ['./font.component.css']
})
export class FontComponent {
  public VisiableOrNot = GlobalConstants

  public ChooseFont(font:String){
    document.documentElement.style.setProperty('--lightFont', `font${font}Regular`);
    document.documentElement.style.setProperty('--MediumFont', `font${font}Medium`);
    document.documentElement.style.setProperty('--boldFont', `font${font}Bold`);

  }

}
