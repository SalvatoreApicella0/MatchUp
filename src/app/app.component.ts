import { Component, ViewChild, ElementRef  } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'matchup';
  uploadedFile: File | null = null;

  templateScelto = 'null';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private elementRef: ElementRef) {
    this.fileInput = elementRef.nativeElement.querySelector('#fileInput');
  }
  

  openFileBrowser() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadedFile = event.target.files[0];
  
    const formData = new FormData();
    formData.append('file', file);
    
    //this.templateScelto questa è la variabile che ha all'interno il
    //nome del template scelto(tranne estensione), 
    //che o può essere usato come ID stesso, o convertito in ID per la post

    
  }

  downloadFile() {
    if (this.uploadedFile) {
      const blob = new Blob([this.uploadedFile], { type: this.uploadedFile.type });
      const url = window.URL.createObjectURL(blob);
  
      // Creare un link temporaneo e simularne il clic per avviare il download
      const link = document.createElement('a');
      link.href = url;
      link.download = this.templateScelto + ".png"; // Utilizza il nuovo nome del file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Rilascia l'URL creato per evitare memory leaks
      window.URL.revokeObjectURL(url);
    }
  }
  

  template_cv = [
    "/assets/CV_Template/CV_0.png",
    "/assets/CV_Template/CV_1.png",
    "/assets/CV_Template/CV_2.png",
    "/assets/CV_Template/CV_3.png",
    "/assets/CV_Template/CV_4.png",
    "/assets/CV_Template/CV_5.png",
    "/assets/CV_Template/CV_6.png",
    "/assets/CV_Template/CV_7.png",
    "/assets/CV_Template/CV_8.png",
    "/assets/CV_Template/CV_9.png"
    
  ];
  currentIndex_cv_carousel = 3; // L'indice dell'immagine centrale iniziale

  scrollLeft() {
    if (this.currentIndex_cv_carousel > 2) {
      this.currentIndex_cv_carousel--;
      this.templateScelto = this.template_cv[this.currentIndex_cv_carousel].slice(0, -4);
    }
  }

  scrollRight() {
    if (this.currentIndex_cv_carousel < this.template_cv.length - 3) {
      this.currentIndex_cv_carousel++;
      this.templateScelto = this.template_cv[this.currentIndex_cv_carousel].slice(0, -4);
    }
  }

}



