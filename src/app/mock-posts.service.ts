// Servicio para consumir CrudCrud con POST usando una URL dinámica

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Payload que enviamos en el POST (CrudCrud lo guarda y regresa un _id)
export interface CreateAlbumPostRequest {
  id: string;
  name: string;
  artist: string;
  year: number;
  tracks: string[];
}

// Respuesta del API (mismo payload + _id)
export interface PostResponse extends CreateAlbumPostRequest {
  _id: string;
}

@Injectable({ providedIn: 'root' })
export class MockPostsService {

  constructor(private http: HttpClient) {}

  // POST: crea un post en {baseUrl}/posts
  createPost(baseUrl: string, payload: CreateAlbumPostRequest): Observable<PostResponse> {
    // https://api.jsoning.com/mock/TOKEN/{resource}
    const url = `${baseUrl}/albums`;
    return this.http.post<PostResponse>(url, payload);
  }
}
