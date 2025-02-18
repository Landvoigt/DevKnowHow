import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '@interfaces/category.interface';
import { Command } from '@interfaces/command.interface';
import { CommandRequest, RoutineRequest } from '@models/requests.model';
import { NavigationService } from './navigation.service';
import { Routine } from '@interfaces/routine.interface';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // apiBaseUrl: string = 'http://127.0.0.1:8000/';
  apiBaseUrl: string = 'https://server-timvoigt.ch/';

  headers = new HttpHeaders().set('Accept-Language', this.translation.currentLanguage);

  constructor(private http: HttpClient, private navService: NavigationService, private translation: TranslationService) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBaseUrl}category/`, { headers: this.headers });
  }

  getCommands(searchValue: string): Observable<Command[]> {
    if (searchValue) {
      return this.http.get<Command[]>(`${this.apiBaseUrl}command/?search=${searchValue}`, { headers: this.headers });
    } else {
      return this.http.get<Command[]>(`${this.apiBaseUrl}command/`, { headers: this.headers });
    }
  }

  getRoutines(searchValue: string): Observable<Routine[]> {
    if (searchValue) {
      return this.http.get<Routine[]>(`${this.apiBaseUrl}routine/?search=${searchValue}`, { headers: this.headers });
    } else {
      return this.http.get<Routine[]>(`${this.apiBaseUrl}routine/`, { headers: this.headers });
    }
  }

  getCommandsByCategory(catId: number): Observable<Command[]> {
    return this.http.get<Command[]>(`${this.apiBaseUrl}command/category/${catId}/`, { headers: this.headers });
  }

  getRoutinesByCategory(catId: number): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.apiBaseUrl}routine/category/${catId}/`, { headers: this.headers });
  }

  createCommand(request: CommandRequest): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}command/`, request);
  }

  createRoutine(request: RoutineRequest): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}routine/`, request);
  }

  incrementCopyCount(id: number): Observable<any> {
    if (this.navService.activeLayout === 'command') {
      return this.http.post<any>(`${this.apiBaseUrl}command/${id}/increment_copy/`, {});
    } else {
      return this.http.post<any>(`${this.apiBaseUrl}routine/${id}/increment_copy/`, {});
    }
  }

}