import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
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
      this.handleMetadata(res?.products[0]);
      // this.initFacebook();
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

    let metaTagTitle: any = document.querySelector('meta[property="og:title"]');
    if (!metaTagTitle) {
      metaTagTitle = document.createElement('meta');
      metaTagTitle.setAttribute('property', 'og:title');
      document.head.appendChild(metaTagTitle);
    }

    metaTagTitle.setAttribute('content', data.title);

    metaTagTitle.content = data.title;
  };

  handleFaceBookSharing = () => {
    window.FB.ui(
      {
        method: 'share',
        href: 'https://hesham99.netlify.app/', // The URL to share
      },
      function (response) {
        if (response && !response.error_message) {
          alert('Post shared successfully!');
        } else {
          alert('Error while sharing.');
        }
      }
    );
  };

  initFacebook = () => {
    let metaTagTitle: any = document.querySelector('meta[property="og:title"]');
    if (!metaTagTitle) {
      metaTagTitle = document.createElement('meta');
      metaTagTitle.setAttribute('property', 'og:title');
      document.head.appendChild(metaTagTitle);
    }

    metaTagTitle.setAttribute('content', 'nice');

    metaTagTitle.content = 'nice';
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1258582682037170',
        xfbml: true,
        version: 'v16.0', // Use the latest version
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };
}
