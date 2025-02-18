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
  apiBaseUrl: string = 'http://127.0.0.1:8000/';
  // apiBaseUrl: string = 'https://server-timvoigt.ch/';

  constructor(private http: HttpClient, private navService: NavigationService, private translation: TranslationService) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBaseUrl}category/`, { headers: this.getHeaders() });
  }

  getCommands(searchValue: string): Observable<Command[]> {
    if (searchValue) {
      return this.http.get<Command[]>(`${this.apiBaseUrl}command/?search=${searchValue}`, { headers: this.getHeaders() });
    } else {
      return this.http.get<Command[]>(`${this.apiBaseUrl}command/`, { headers: this.getHeaders() });
    }
  }

  getRoutines(searchValue: string): Observable<Routine[]> {
    if (searchValue) {
      return this.http.get<Routine[]>(`${this.apiBaseUrl}routine/?search=${searchValue}`, { headers: this.getHeaders() });
    } else {
      return this.http.get<Routine[]>(`${this.apiBaseUrl}routine/`, { headers: this.getHeaders() });
    }
  }

  getCommandsByCategory(catId: number): Observable<Command[]> {
    return this.http.get<Command[]>(`${this.apiBaseUrl}command/category/${catId}/`, { headers: this.getHeaders() });
  }

  getRoutinesByCategory(catId: number): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.apiBaseUrl}routine/category/${catId}/`, { headers: this.getHeaders() });
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

  getHeaders(): HttpHeaders {
    let headers: { [key: string]: string } = {
      'Accept-Language': this.translation.currentLanguage
    };

    return new HttpHeaders(headers);
  }

}