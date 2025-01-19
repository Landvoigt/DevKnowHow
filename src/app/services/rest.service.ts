import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '@interfaces/category.interface';
import { Command } from '@interfaces/command.interface';
import { CommandRequest, RoutineRequest } from '@models/requests.model';
import { NavigationService } from './navigation.service';
import { Routine } from '@interfaces/routine.interface';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // apiBaseUrl: string = 'http://127.0.0.1:8000/';
  apiBaseUrl: string = 'https://server-timvoigt.ch/';

  constructor(private http: HttpClient, private navService: NavigationService) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBaseUrl}category/`);
  }

  getCommands(): Observable<Command[]> {
    return this.http.get<Command[]>(`${this.apiBaseUrl}command/`);
  }

  getRoutines(): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.apiBaseUrl}routine/`);
  }

  getCommandsByCategory(catId: number): Observable<Command[]> {
    return this.http.get<Command[]>(`${this.apiBaseUrl}command/category/${catId}/`);
  }

  getRoutinesByCategory(catId: number): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.apiBaseUrl}routine/category/${catId}/`);
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
    // const authToken = this.authService.getAuthenticationToken();
    let headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    };

    // if (authToken) {
    //   headers['Authorization'] = authToken;
    // }

    return new HttpHeaders(headers);
  }

}