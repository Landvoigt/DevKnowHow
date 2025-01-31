import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Category } from '@interfaces/category.interface';
import { FilterPipe } from '@pipes/filter.pipe';
import { DataService } from '@services/data.service';
import { NavigationService } from '@services/navigation.service';
import { fadeIn, slideUpDownSlow } from '@utils/animations';
import { Observable } from 'rxjs';
import { TranslationService } from '@services/translation.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, FilterPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [fadeIn, slideUpDownSlow]
})
export class NavbarComponent implements OnInit {
  @Input() closeMenu: boolean = false;

  categories$: Observable<Category[]> = this.dataService.categories$;

  userMenuOpen: boolean = false;
  mobileMenuOpen: boolean = false;

  constructor(public navService: NavigationService, private router: Router, private dataService: DataService, private translateService: TranslateService) { 
    this.translateService.get('BASE.NAVBAR.BTN_NEW').subscribe((translatedMessage: string) => {
      console.log(translatedMessage);
    });
    
  }

  ngOnInit(): void {
    this.dataService.loadCategories();
  }

  ngOnChanges() {
    if (this.closeMenu) {
      this.closeMobileMenu();
    }
  }

  changePage(cat: Category) {
    this.closeMobileMenu();
    this.router.navigate([`category/${cat.id}/`]);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}