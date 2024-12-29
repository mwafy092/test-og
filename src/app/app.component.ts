import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
declare global {
  interface Window {
    FB: any;
  }
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-app';
  uri = 'https://dummyjson.com/products';
  productData: any = null;
  constructor(private http: HttpClient) {
    this.handleGetData();
  }

  handleGetData = () => {
    this.http.get(this.uri).subscribe((res: any) => {
      this.productData = res?.products[0];
      console.log(this.productData);
      this.handleMetadata(res?.products[0]);
    });
  };

  handleMetadata = (data: any) => {
    console.log(window?.FB);
    document.title = data.title;
    let metaTag: any = document.querySelector('meta[name="description"]');

    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'description';
      document.head.appendChild(metaTag);
    }

    let metaTagImg: any = document.querySelector('meta[property="og:image"]');

    if (!metaTagImg) {
      metaTagImg = document.createElement('meta');
      metaTagImg.setAttribute('property', 'og:image');
      document.head.appendChild(metaTagImg);
    }

    metaTagImg.setAttribute('content', data.thumbnail);

    metaTag.content = data.description;
  };

  handleFaceBookSharing = () => {
    window.FB.ui(
      {
        method: 'share',
        href: 'https://yourwebsite.com', // The URL to share
      },
      function (response) {
        // Handle the response (optional)
        if (response && !response.error_message) {
          alert('Post shared successfully!');
        } else {
          alert('Error while sharing.');
        }
      }
    );
  };
}
