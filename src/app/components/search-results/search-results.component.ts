import { Component, OnInit,OnDestroy, OnChanges  } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Book } from '../../models/books';
import { Category } from '../../models/categories';
import { Author } from '../../models/authors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit ,OnDestroy  {
  searchCat :string="";
  searchedNa  : string="";


  constructor(private myService:PublicService) { 
     console.log("cons")
     this.searchCat=this.myService.searchCategory
     this.searchedNa=this.myService.searchedName
    
  }
  ngOnDestroy(): void {
    console.log("destroy");

  }
  ngOnInit(): void {
   console.log("Yaraaaaaaaaab")
  
   console.log(this.searchCat,this.searchedNa)
    this.myService.categoryObservable.subscribe(cat => this.searchCat = cat )
   this.myService.searchedNameObservable.subscribe(name => this.searchedNa = name)
  }
 
 
}
