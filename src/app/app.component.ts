import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MockPostsService,
  CreateAlbumPostRequest,
  PostResponse
} from './mock-posts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /* La API expira cada día, por lo que se debe de cambiar el token al nuevo que se esté usando */
  apiBaseUrl: string = 'https://api.jsoning.com/mock/TOKEN_DE_LA_API';

  form: CreateAlbumPostRequest = {
    id: '',
    name: '',
    artist: '',
    year: 1970,
    tracks: []
  };

  tracksInput: string = '';

  createdPost: PostResponse | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private postsApi: MockPostsService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  sendPost(): void {
    this.errorMessage = '';
    this.createdPost = null;

    if (this.tracksInput.trim()) {
      this.form.tracks = this.tracksInput
        .split(',')
        .map(track => track.trim())
        .filter(track => track.length > 0);
    } else {
      this.form.tracks = [];
    }

    if (!this.apiBaseUrl.trim()) {
      this.errorMessage = 'La URL del API es obligatoria.';
      return;
    }
    if (!this.form.name.trim()) {
      this.errorMessage = 'Nombre del álbum obligatorio.';
      return;
    }
    if (!this.form.artist.trim()) {
      this.errorMessage = 'Artista obligatorio.';
      return;
    }

    this.loading = true;

    this.postsApi.createPost(this.apiBaseUrl.trim(), this.form).subscribe({
      next: (res) => {
        this.zone.run(() => {
          this.createdPost = res;
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.loading = false;
          this.errorMessage = 'Error al hacer POST. Revisa la URL o el token.';
          console.error(err);
          this.cdr.detectChanges();
        });
      }
    });
  }
}