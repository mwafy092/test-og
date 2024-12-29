import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiDataResolver implements Resolve<any> {
  constructor(private http: HttpClient) {}
  resolve(): Observable<any> {
    let productData: null;

    const handleMetadata = (data: any) => {
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

      let metaTagTitle: any = document.querySelector(
        'meta[property="og:title"]'
      );
      if (!metaTagTitle) {
        metaTagTitle = document.createElement('meta');
        metaTagTitle.setAttribute('property', 'og:title');
        document.head.appendChild(metaTagTitle);
      }

      metaTagTitle.setAttribute('content', data.title);

      metaTagTitle.content = data.title;
    };

    const handleFaceBookSharing = () => {
      const urlToScrape = 'https://hesham99.netlify.app/'; // Replace with the URL you want to rescrape

      // Facebook Sharing Debugger API URL
      const debuggerUrl = `https://graph.facebook.com/?id=${encodeURIComponent(
        urlToScrape
      )}`;

      fetch(debuggerUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log('Scraping result:', data);
        })
        .catch((error) => {
          console.error('Error scraping URL:', error);
        });
      window.FB.api(
        'https://graph.facebook.com?id=' +
          'https://hesham99.netlify.app' +
          '&scrape=true',
        'post',
        function (response) {
          console.log('rescrape', response);
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
        }
      );
    };

    const initFacebook = async () => {
      window.fbAsyncInit = await function () {
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
    console.log(productData);
    return this.http.get('https://dummyjson.com/products').pipe(
      map((res: any) => {
        productData = res?.products[0];
        handleMetadata(res?.products[0]);
        initFacebook();
        console.log(res);
        return res?.products[0];
      })
    );
  }
}
