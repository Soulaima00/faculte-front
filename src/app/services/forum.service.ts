import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { Comment } from '../model/comment.model';


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
  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments/post/${postId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/comments`, comment);
  }

  updateComment(id: number, contenu: string): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/comments/${id}`, contenu, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/comments/${id}`);
  }
}
