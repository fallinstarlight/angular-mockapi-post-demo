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

  /* Inicializar variables de mensaje */
  albumMessage: string = '';
  artistMessage: string = '';
  genreMessage: string = '';

  /* La API expira cada día, por lo que se debe de cambiar el token al nuevo que se esté usando */
  apiBaseUrl: string = 'https://api.jsoning.com/mock/TOKEN_DE_LA_API';

  /* Objeto que guarda la respuesta de la API en el método post Album */
  form: CreateAlbumPostRequest = {
    id: '',
    name: '',
    artist: '',
    year: 1970,
    tracks: []
  };

  /* Variable que guarda el campo de texto de las canciones de un álbum, se guardan en otro objeto porque
se debe de trabajar diferente esta input */
  tracksInput: string = '';

  loading = false;

  /* Objeto que guarda la respuesta de la API en el método post Artista */
  artistForm: CreateArtistPostRequest = {
    id: '',
    name: '',
    status: '',
    genre: ''
  };

  /* Objeto que guarda la respuesta de la API en el método post género */
  genreForm: CreateGenrePostRequest = {
    id: '',
    name: '',
    origin_Country: ''
  };

  /* Constructor de la clase */
  constructor(
    private postsApi: MockPostsService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  /* Método para Post Album */
  sendPost(): void {
    this.albumMessage = '';

    /* Tomar la cadena de texto colocada en el campo de canciones (tracks)
    Se separa la cadena cada vez que se encuentra una coma, para así construir un
    arreglo con todos los textos separados. p. ej. track1, track2, track3 => {
                                                                              track1,
                                                                              track2,
                                                                              track3
                                                                              } */
    if (this.tracksInput.trim()) {
      this.form.tracks = this.tracksInput
        .split(',')
        .map(track => track.trim())
        .filter(track => track.length > 0);
    } else {
      this.form.tracks = [];
    }

    /* Validar que todos los campos tengan algo escrito */
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

    /* Intentar el Post album (createPost) */
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

  /* Método post artist */
  sendArtist(): void {
    this.artistMessage = '';

    /* Validación de campos de texto */
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

    /* Intentar el post */
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

  /* Método post género */
  sendGenre(): void {

    this.genreMessage = '';

    /* Validar los datos */
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

    /* Intentar el post */
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