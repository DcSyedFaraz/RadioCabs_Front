import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  constructor(private searchService: AdminService) {}

  searchTerm: string = '';
  searchResults: any;
  loading: boolean = false;



  ngOnInit(): void { }
  search() {
    this.loading = true;
    this.searchService.search(this.searchTerm).subscribe(
      (results) => {
        console.log(results);

        this.searchResults = results;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching search results:', error);
        this.loading = false;
      }
    );

  }
}
