import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../assets/css/theme.min.css','../assets/css/icons.min.css']
})
export class AppComponent implements OnInit {

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}
  title = 'EProject';
  ngOnInit(): void {
    const scripts = [
      '../assets/js/app.js',
      '../assets/js/vendor/jquary-3.6.0.min.js',
      '../assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js',
      '../assets/js/vendor/jquery.ajaxchimp.min.js',
      '../assets/js/vendor/bootstrap.min.js',
      '../assets/js/vendor/popper.min.js',
      '../assets/js/vendor/swiper.min.js',
      '../assets/js/vendor/jquery.datetimepicker.full.js',
      '../assets/js/vendor/jquery.nice-select.min.js',
      '../assets/js/vendor/venobox.min.js',
      '../assets/js/vendor/smooth-scroll.js',
      '../assets/js/vendor/wow.min.js',
      '../assets/js/book-ride.js',
      '../assets/js/main.js',
    ];

    scripts.forEach((script) => {
      this.loadScript(script);
    });
  }

  private loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'text/javascript');
    this.renderer.setAttribute(script, 'src', src);
    this.renderer.appendChild(this.document.body, script);
  }
}
