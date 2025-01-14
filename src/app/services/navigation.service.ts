import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  activePage: number | null = null;

  constructor(private router: Router, private location: Location) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.setActivePageFromUrl(event.url);
      } else if (event instanceof NavigationEnd) {
        this.setActivePageFromUrl(event.url);
      }
    });
  }

  private setActivePageFromUrl(url: string): void {
    const match = url.match(/\/category\/(\d+)/);
    if (match) {
      this.activePage = parseInt(match[1], 10);
    } else {
      this.activePage = null;
    }
  }

  back() {
    this.location.back();
  }

  main() {
    this.router.navigate(['main']);
  }

  category(catId: number) {
    this.router.navigate(['/category/' + catId]);
  }

  create() {
    this.router.navigate(['/create']);
  }

  imprint() {
    this.router.navigate(['/imprint']);
  }

  policy() {
    this.router.navigate(['/policy']);
  }

  error(params: any) {
    this.router.navigate(['/error'], params);
  }
}