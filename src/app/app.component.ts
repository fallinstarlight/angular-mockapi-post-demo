import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';


import {
  MockPostsService,
  CreateAlbumPostRequest,
  PostResponse, CreateArtistPostRequest,
  CreateGenrePostRequest
} from './mock-posts.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {


  albumMessage: string = '';
  artistMessage: string = '';
  genreMessage: string = '';

  /* La API expira cada día, por lo que se debe de cambiar el token al nuevo que se esté usando */
  apiBaseUrl: string = 'https://api.jsoning.com/mock/TOKEN_DE_LA_API';

  form: CreateAlbumPostRequest = {
    id: '',
    name: '',
    artist: '',
    year: 1970,
    tracks: []
  };

  artistForm: CreateArtistPostRequest = {
    id: '',
    name: '',
    status: '',
    genre: ''
  };

  genreForm: CreateGenrePostRequest = {
    id: '',
    name: '',
    origin_Country: ''
  };
  tracksInput: string = '';

  loading = false;
  
  constructor(
    private postsApi: MockPostsService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  sendPost(): void {
    this.albumMessage = '';

    if (this.tracksInput.trim()) {
      this.form.tracks = this.tracksInput
        .split(',')
        .map(track => track.trim())
        .filter(track => track.length > 0);
    } else {
      this.form.tracks = [];
    }

    if (!this.apiBaseUrl.trim()) {
      this.albumMessage = 'La URL del API es obligatoria.';
      return;
    }
    if (!this.form.name.trim()) {
      this.albumMessage = 'Nombre del álbum obligatorio.';
      return;
    }
    if (!this.form.artist.trim()) {
      this.albumMessage = 'Artista obligatorio.';
      return;
    }

    this.loading = true;

    this.postsApi.createPost(this.apiBaseUrl.trim(), this.form).subscribe({
      next: (res) => {
        this.zone.run(() => {
          this.albumMessage = '✅ Álbum creado correctamente';
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.loading = false;
          this.albumMessage = 'Error al hacer POST. Revisa la URL o el token.';
          console.error(err);
          this.cdr.detectChanges();
        });
      }
    });
  }

  sendArtist(): void {
    this.artistMessage = '';

    if (this.tracksInput.trim()) {
      this.form.tracks = this.tracksInput
        .split(',')
        .map(track => track.trim())
        .filter(track => track.length > 0);
    } else {
      this.form.tracks = [];
    }

    if (!this.apiBaseUrl.trim()) {
      this.artistMessage = 'La URL del API es obligatoria.';
      return;
    }
    if (!this.artistForm.name.trim()) {
      this.artistMessage = 'Nombre del artista obligatorio.';
      return;
    }
    if (!this.artistForm.status.trim()) {
      this.artistMessage = 'Estatus obligatorio.';
      return;
    }
    if (!this.artistForm.genre.trim()) {
      this.artistMessage = 'Género obligatorio.';
      return;
    }
    
    this.loading = true;
    this.postsApi.createPost(this.apiBaseUrl.trim(), this.form).subscribe({
      next: (res) => {
        this.zone.run(() => {
          this.artistMessage = '✅ Artista creado correctamente';
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.loading = false;
          this.artistMessage = 'Error al hacer POST. Revisa la URL o el token.';
          console.error(err);
          this.cdr.detectChanges();
        });
      }
    });
  }

  sendGenre(): void {
    
    this.genreMessage = '';

    if (this.tracksInput.trim()) {
      this.form.tracks = this.tracksInput
        .split(',')
        .map(track => track.trim())
        .filter(track => track.length > 0);
    } else {
      this.form.tracks = [];
    }
    
    if (!this.apiBaseUrl.trim()) {
      this.genreMessage = 'La URL del API es obligatoria.';
      return;
    }
    if (!this.genreForm.name.trim()) {
      this.genreMessage = 'Nombre del género obligatorio.';
      return;
    }
    if (!this.genreForm.origin_Country.trim()) {
      this.genreMessage = 'País de origen obligatorio.';
      return;
    }

    this.loading = true;
    this.postsApi.createPost(this.apiBaseUrl.trim(), this.form).subscribe({
      next: (res) => {
        this.zone.run(() => {
          this.genreMessage = '✅ Género creado correctamente';
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.loading = false;
          this.genreMessage = 'Error al hacer POST. Revisa la URL o el token.';
          console.error(err);
          this.cdr.detectChanges();
        });
      }
    });
  }
}