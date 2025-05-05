import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id?: number;
  titre: string;
  contenu: string;
  auteur: { id: number };
  dateCreation?: string;
}

export interface Commentaire {
  id?: number;
  contenu: string;
  auteur: { id: number };
  post: { id: number };
  dateCreation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private baseUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) {}

  // 🔹 POSTS
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`);
  }

  // 🔹 COMMENTS
  getCommentsByPost(postId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseUrl}/comments/post/${postId}`);
  }

  addComment(comment: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.baseUrl}/comments`, comment);
  }

  updateComment(id: number, contenu: string): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.baseUrl}/comments/${id}`, contenu, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/comments/${id}`);
  }
}
