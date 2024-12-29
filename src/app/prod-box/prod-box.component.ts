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
  };
}
