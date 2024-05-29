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
  loading = false;

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


  templateScelto = this.template_cv[this.currentIndex_cv_carousel].slice(8, -4);

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private elementRef: ElementRef) {
    this.fileInput = elementRef.nativeElement.querySelector('#fileInput');
  }
  

  openFileBrowser() {
    this.loading = true;
    this.uploadedFile = null;
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

    let x = 0;
    for (let i = 0; i < 10000000000; i++) {
      x = 2 * 2;
    }

    this.loading = false;

    
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
  

  
  scrollLeft() {
    this.currentIndex_cv_carousel = (this.currentIndex_cv_carousel - 1 + this.template_cv.length) % this.template_cv.length;
    this.templateScelto = this.template_cv[this.currentIndex_cv_carousel].slice(0, -4);
    this.updateVisibleImages();
  }

  scrollRight() {
    this.currentIndex_cv_carousel = (this.currentIndex_cv_carousel + 1) % this.template_cv.length;
    this.templateScelto = this.template_cv[this.currentIndex_cv_carousel].slice(8, -4);
    this.updateVisibleImages();
  }

  getVisibleImages() {
    const visibleImages = [];
    for (let i = -2; i <= 2; i++) {
      visibleImages.push(this.template_cv[(this.currentIndex_cv_carousel + i + this.template_cv.length) % this.template_cv.length]);
    }
    return visibleImages;
  }

  updateVisibleImages() {
    if (typeof document !== 'undefined') {
      const visibleImages = this.getVisibleImages();
      for (let i = 0; i < visibleImages.length; i++) {
        const imgElement = document.getElementById(`carousel-img-${i}`);
        if (imgElement) {
          imgElement.setAttribute('src', visibleImages[i]);
        }
      }
    }
  }
  

  ngAfterViewInit() {
    this.updateVisibleImages();
  }

}