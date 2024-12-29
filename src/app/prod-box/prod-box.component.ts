import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prod-box',
  imports: [],
  standalone: true,
  templateUrl: './prod-box.component.html',
  styleUrl: './prod-box.component.css',
})
export class ProdBoxComponent {
  productData: any;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data: any) => {
      this.productData = data?.data;
      console.log(data);
    });
  }
  handleFaceBookSharing = () => {
    const urlToScrape = 'https://hesham99.netlify.app/prod'; // Replace with the URL you want to rescrape

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
        'https://hesham99.netlify.app/prod' +
        '&scrape=true',
      'post',
      function (response) {
        console.log('rescrape', response);
        window.FB.ui(
          {
            method: 'share',
            href: 'https://hesham99.netlify.app/prod', // The URL to share
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
}
