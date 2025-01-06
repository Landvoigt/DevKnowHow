import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '@interfaces/category.interface';
import { Item } from '@models/command.model';
import { CommandRequest } from '@models/requests.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiBaseUrl: string = 'http://127.0.0.1:8000/';
  // apiBaseUrl: string = 'http://212.227.161.51:8000/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBaseUrl}category/`);
  }

  getCommands(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiBaseUrl}command/`);
  }

  getCommandsByCategory(catId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiBaseUrl}command/category/${catId}/`);
  }

  createCommand(request: CommandRequest): Observable<any> {
    // const payload = { name, email, body, message };
    return this.http.post<any>(`${this.apiBaseUrl}command/`, request);
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