import { Component } from '@angular/core';
import { GlobalConstants } from '../global';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent {
  public VisiableOrNot = GlobalConstants
  public width = 950 // the editing page size
  public height = 1300 // the editing page size

  public HideAll() {
    this.VisiableOrNot.ReadyForPrint()
    this.printPage()
    setTimeout(() => { // bring them back
      this.VisiableOrNot.ReadyForPrint()
      this.PageBackToNormal()
    }, 500);

  }


  public printPage() {
    // document.documentElement.style.setProperty('--width', 21 + "cm");
    // document.documentElement.style.setProperty('--height', 29.7 + "cm");

    document.documentElement.style.setProperty('--width', 21 + "cm");
    document.documentElement.style.setProperty('--height', 29.6 + "cm");
       setTimeout(() => {
      window.print();
    }, 100);

  }


  public PageBackToNormal() {
    document.documentElement.style.setProperty('--width', this.width + "px");
    document.documentElement.style.setProperty('--height', this.height + "px");
  }


}
