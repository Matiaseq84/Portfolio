import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExperienciaLaboral } from './experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getExperiencias(): Observable<ExperienciaLaboral[]> {
    return this.http.get<ExperienciaLaboral[]>(`${this.apiServerUrl}/experiencia/all`);
  }

  public addExperiencia(experiencia: ExperienciaLaboral): Observable<ExperienciaLaboral> {
    return this.http.post<ExperienciaLaboral>(`${this.apiServerUrl}/experiencia/add`, experiencia);
  } 

  
  public updateExperiencia(experiencia: ExperienciaLaboral): Observable<ExperienciaLaboral> {
    return this.http.put<ExperienciaLaboral>(`${this.apiServerUrl}/experiencia/update`, experiencia);
  }

  public deleteExperiencia(experienciaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/experiencia/delete/${experienciaId}`);
  }
}
