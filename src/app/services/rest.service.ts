import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryDetail } from '@interfaces/category.interface';
import { Command } from '@interfaces/command.interface';
import { CommandRequest, RoutineRequest } from '@models/requests.model';
import { NavigationService } from './navigation.service';
import { Routine } from '@interfaces/routine.interface';
import { TranslationService } from './translation.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private readonly apiBaseUrl: string = environment.API_BASE_URL;

  constructor(private http: HttpClient, private navService: NavigationService, private translation: TranslationService) { }

  getCategories() {
    return this.http.get<Category[]>(`${this.apiBaseUrl}category/`);
  }
  
  getDetailedCategory(id: number) {
    return this.http.get<CategoryDetail>(`${this.apiBaseUrl}category/${id}/`);
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

  getRoutinesByCategory(catId: number): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.apiBaseUrl}category/${catId}/`, { headers: this.getHeaders() });
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