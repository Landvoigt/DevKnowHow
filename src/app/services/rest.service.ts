import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '@interfaces/category.interface';
import { Command } from '@interfaces/command.interface';
import { CommandRequest } from '@models/requests.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // apiBaseUrl: string = 'http://127.0.0.1:8000/';
  apiBaseUrl: string = 'https://server-timvoigt.ch/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBaseUrl}category/`);
  }

  getCommands(): Observable<Command[]> {
    return this.http.get<Command[]>(`${this.apiBaseUrl}command/`);
  }

  getCommandsByCategory(catId: number): Observable<Command[]> {
    return this.http.get<Command[]>(`${this.apiBaseUrl}command/category/${catId}/`);
  }

  createCommand(request: CommandRequest): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}command/`, request);
  }

  incrementCopyCount(commandId: number): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}command/${commandId}/increment_copy/`, {});
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