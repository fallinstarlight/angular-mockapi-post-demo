import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ÁLBUM

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

// ARTISTA

export interface CreateArtistPostRequest {
  id: string;
  name: string;
  status: string;
  genre: string;
}

export interface ArtistResponse extends CreateArtistPostRequest {
  _id: string;
}

// GÉNERO

export interface CreateGenrePostRequest {
  id: string;
  name: string;
  origin_Country: string;
}

export interface GenreResponse extends CreateGenrePostRequest {
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

  // ARTIST
  createArtist(baseUrl: string, payload: CreateArtistPostRequest): Observable<ArtistResponse> {
    const url = `${baseUrl}/artists`;
    return this.http.post<ArtistResponse>(url, payload);
  }

  // GENRE
  createGenre(baseUrl: string, payload: CreateGenrePostRequest): Observable<GenreResponse> {
    const url = `${baseUrl}/genres`;
    return this.http.post<GenreResponse>(url, payload);
  }
}