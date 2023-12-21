import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-frontlayout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './frontlayout.component.html',
  styleUrls: ['./frontlayout.component.css'],
})
export class FrontlayoutComponent implements OnInit {

  ngOnInit(): void {
    var front = true;
   }

}
