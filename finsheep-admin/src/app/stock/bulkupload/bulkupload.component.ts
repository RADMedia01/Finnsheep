import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bulkupload',
  standalone: true,
  imports: [],
  templateUrl: './bulkupload.component.html',
  styleUrl: './bulkupload.component.scss'
})




export class BulkuploadComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  // This method triggers when a file is selected
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  // This method uploads the selected file to the backend
  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // POST request to backend
      this.http.post('http://localhost:3000/api/stock/bulkUpload', formData).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
}
