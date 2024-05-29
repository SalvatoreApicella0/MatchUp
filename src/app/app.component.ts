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
    
    
  }

  downloadFile() {
    if (this.uploadedFile) {
      const blob = new Blob([this.uploadedFile], { type: this.uploadedFile.type });
      const url = window.URL.createObjectURL(blob);
      
      // Creare un link temporaneo e simularne il clic per avviare il download
      const link = document.createElement('a');
      link.href = url;
      link.download = this.uploadedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Rilascia l'URL creato per evitare memory leaks
      window.URL.revokeObjectURL(url);
    }
  }

}



  

