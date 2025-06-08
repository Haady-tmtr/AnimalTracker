import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Animal } from '../models/animal.model';
import { ApiResponse } from '../api-response';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private server: string = "http://localhost:8082/api/animals";

  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json'
  });

  private patch_headers = new HttpHeaders({
    'Content-Type': 'application/merge-patch+json'
  });

  constructor(private http: HttpClient) {}

  public all(): Observable<Array<Animal>> {
    return this.http.get<ApiResponse<Animal>>(this.server, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json'
    }).pipe(map(data => data['member']));
  }

  public get(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.server}/${id}`, {
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

  public create(animal: Animal): Observable<boolean> {
    return this.http.post(this.server, animal, {
      headers: this.headers,
      observe: 'response',
      responseType: 'json'
    }).pipe(map(response => response.status === 201));
  }

  public update(animal: Animal): Observable<boolean> {
    return this.http.patch(`${this.server}/${animal.id}`, animal, {
      headers: this.patch_headers,
      observe: 'response',
      responseType: 'json'
    }).pipe(map(response => response.status === 200));
  }

}
