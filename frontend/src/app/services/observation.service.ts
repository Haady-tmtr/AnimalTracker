import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Observation } from '../models/observation.model';
import { ApiResponse } from '../api-response';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  private server: string = "http://localhost:8082/api/observations";

  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json'
  });

  private patch_headers = new HttpHeaders({
    'Content-Type': 'application/merge-patch+json'
  });

  constructor(private http: HttpClient) {}

  public all(): Observable<Array<Observation>> {
    return this.http.get<ApiResponse<Observation>>(this.server, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json'
    }).pipe(map(data => data['member']));
  }

  public get(id: number): Observable<Observation> {
    return this.http.get<Observation>(`${this.server}/${id}`, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json'
    });
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete(`${this.server}/${id}`, {
      headers: this.headers,
      observe: 'response',
      responseType: 'json'
    }).pipe(map(response => response.status === 204));
  }

  public create(observation: Observation): Observable<boolean> {
    return this.http.post(this.server, observation, {
      headers: this.headers,
      observe: 'response',
      responseType: 'json'
    }).pipe(map(response => response.status === 201));
  }

  public update(observation: Observation): Observable<boolean> {
    return this.http.patch(`${this.server}/${observation.id}`, observation, {
      headers: this.patch_headers,
      observe: 'response',
      responseType: 'json'
    }).pipe(map(response => response.status === 200));
  }

}
