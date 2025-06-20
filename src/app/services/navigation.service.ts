import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  activePage: number | null = null;
  activeLayout: 'command' | 'routine' | 'smt' = 'command';
  activeLanguage: 'eng' | 'de' = 'eng';

  constructor(private router: Router, private location: Location) {
    this.loadLayout();
    this.setupActivePageListener();
  }

  loadLayout(): void {
    this.activeLayout = this.safeGetLocalStorage('DevKnowHow_activeLayout');
  }

  setLayout(layout: 'command' | 'routine' | 'smt'): void {
    this.activeLayout = layout;
    this.safeSetLocalStorage('DevKnowHow_activeLayout', layout);
  }

  setLanguage(lang: 'eng' | 'de'): void {
    this.activeLanguage = lang;
  }

  private safeGetLocalStorage(key: string): any {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : 'command';
    } catch {
      return 'command';
    }
  }

  private safeSetLocalStorage(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch { }
  }

  private setActivePageFromUrl(url: string): void {
    const match = url.match(/\/category\/(\d+)/);
    if (match) {
      this.activePage = parseInt(match[1], 10);
    } else {
      this.activePage = null;
    }
  }

  setupActivePageListener(): void {
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

  back(): void {
    this.location.back();
  }

  main(): void {
    this.router.navigate(['main']);
  }

  category(catId: number): void {
    this.router.navigate(['/category/' + catId]);
  }

  create(): void {
    this.router.navigate(['/create']);
  }

  imprint(): void {
    this.router.navigate(['/imprint']);
  }

  policy(): void {
    this.router.navigate(['/policy']);
  }

  appreciation(): void {
    this.router.navigate(['/appreciation']);
  }

  error(params: any): void {
    this.router.navigate(['/error'], params);
  }
}