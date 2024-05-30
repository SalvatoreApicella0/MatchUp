import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'matchup';
  uploadedFile: File | null = null;
  responseFile: Blob | null = null;
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
    this.uploadedFile = null;
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadedFile = file;

    // Chiamata del metodo di caricamento
    this.uploadFile();
  }

  async uploadFile() {
    if (this.uploadedFile) {
      this.toggleLoadingIndicator(true);

      const formData = new FormData();
      formData.append('file', this.uploadedFile);
      formData.append('text', 'Your text here');

      try {
        const response = await axios.post('http://localhost:5100/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'blob' // Assicurati che la risposta sia di tipo blob
        });
        console.log('Success:', response.data);
        this.responseFile = response.data;
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.toggleLoadingIndicator(false);
      }
    }
  }

  toggleLoadingIndicator(show: boolean) {
    this.loading = show;
  }

  downloadFile() {
    if (this.responseFile) {
      const url = window.URL.createObjectURL(this.responseFile);

      // Creare un link temporaneo e simularne il clic per avviare il download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CV_Impaginato.docx'; // Imposta il nome del file come desiderato
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Rilascia l'URL creato per evitare memory leaks
      window.URL.revokeObjectURL(url);
    }
  }

  scrollLeft() {
    this.currentIndex_cv_carousel = (this.currentIndex_cv_carousel - 1 + this.template_cv.length) % this.template_cv.length;
    this.templateScelto = this.template_cv[this.currentIndex_cv_carousel];
    this.updateVisibleImages();
  }

  scrollRight() {
    this.currentIndex_cv_carousel = (this.currentIndex_cv_carousel + 1) % this.template_cv.length;
    this.templateScelto = this.template_cv[this.currentIndex_cv_carousel];
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
