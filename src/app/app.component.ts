import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cv-generator';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domainSanitizer: DomSanitizer
  ) {


    this.matIconRegistry.addSvgIcon(
      'woman',
      this.domainSanitizer.bypassSecurityTrustResourceUrl('../assets/woman.svg')
    )

    this.matIconRegistry.addSvgIcon(
      'avatar1',
      this.domainSanitizer.bypassSecurityTrustResourceUrl('../assets/avatar1.svg')
    )

    this.matIconRegistry.addSvgIcon(
      'avatar2',
      this.domainSanitizer.bypassSecurityTrustResourceUrl('../assets/avatar2.svg')
    )



    this.matIconRegistry.addSvgIcon(
      'test',
      this.domainSanitizer.bypassSecurityTrustResourceUrl('../assets/test.svg')
    )

    this.matIconRegistry.addSvgIcon(
      'square',
      this.domainSanitizer.bypassSecurityTrustResourceUrl('../assets/square.svg')
    )

    this.matIconRegistry.addSvgIcon(
      'circle',
      this.domainSanitizer.bypassSecurityTrustResourceUrl('../assets/circle.svg')
    )

  }
}
