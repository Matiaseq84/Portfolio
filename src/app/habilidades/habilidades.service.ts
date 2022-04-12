import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HSSkill } from './habilidades';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSkills(): Observable<HSSkill[]> {
    return this.http.get<HSSkill[]>(`${this.apiServerUrl}/hsskill/all`);
  }

  public addSkill(skill: HSSkill): Observable<HSSkill> {
    return this.http.post<HSSkill>(`${this.apiServerUrl}/hsskill/add`, skill);
  } 

  
  public updateSkill(skill: HSSkill): Observable<HSSkill> {
    return this.http.put<HSSkill>(`${this.apiServerUrl}/hsskill/update`, skill);
  }

  public deleteSkill(skillId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/hsskill/delete/${skillId}`);
  }
}
