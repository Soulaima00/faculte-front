import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumService, Post } from '../services/forum.service';
import { FormsModule } from '@angular/forms';
import { Commentaire } from '../services/forum.service';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  posts: Post[] = [];
  newPost: Post = {
    titre: '',
    contenu: '',
    auteur: { id: 1 } // remplacer par utilisateur connecté plus tard
  };

  modifierMode = false;
  postEnCours: Post | null = null;

  commentaires: { [postId: number]: Commentaire[] } = {};
  nouveauxCommentaires: { [postId: number]: string } = {};

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.chargerPosts();
  }

  chargerPosts(): void {
    this.forumService.getPosts().subscribe(res => this.posts = res);
  }

  ajouterPost(): void {
    this.forumService.createPost(this.newPost).subscribe(() => {
      this.newPost = { titre: '', contenu: '', auteur: { id: 1 } };
      this.chargerPosts();
    });
  }

  supprimerPost(id: number): void {
    this.forumService.deletePost(id).subscribe(() => this.chargerPosts());
  }

  modifier(post: Post): void {
    this.modifierMode = true;
    this.postEnCours = { ...post };
  }

  validerModification(): void {
    if (!this.postEnCours) return;
    this.forumService.updatePost(this.postEnCours.id!, this.postEnCours).subscribe(() => {
      this.modifierMode = false;
      this.postEnCours = null;
      this.chargerPosts();
    });
  }

  annulerModification(): void {
    this.modifierMode = false;
    this.postEnCours = null;
  }



  chargerCommentaires(postId: number): void {
    this.forumService.getCommentsByPost(postId).subscribe(res => {
      this.commentaires[postId] = res;
    });
  }
  ajouterCommentaire(postId: number): void {
    const contenu = this.nouveauxCommentaires[postId];
    if (!contenu || contenu.trim() === '') return;
  
    const commentaire: Commentaire = {
      contenu: contenu.trim(),
      auteur: { id: 0 }, // ou undefined/null selon backend
      post: { id: postId }
    };
  
    this.forumService.addComment(commentaire).subscribe(() => {
      this.nouveauxCommentaires[postId] = '';
      this.chargerCommentaires(postId);
    });
  }
  

}
