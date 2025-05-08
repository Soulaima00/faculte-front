import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumService } from '../services/forum.service';
import { Post } from '../model/post.model';
import { Comment } from '../model/comment.model';
import { User } from '../model/user.model';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  posts: Post[] = [];
  newPost: Post = {
    titre: '',
    contenu: '',
    auteur: {} as User
  };

  modifierMode = false;
  postEnCours: Post | null = null;

  commentaires: { [postId: number]: Comment[] } = {};
  nouveauxCommentaires: { [postId: number]: string } = {};

  currentUser!: User;
  commentaireEnCours: Comment | null = null; // Pour édition
  modifContenuCommentaire: string = '';

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("Utilisateur non connecté !");
      return;
    }

    this.currentUser = JSON.parse(storedUser);
    this.newPost.auteur = this.currentUser;

    this.chargerPosts();
  }

  chargerPosts(): void {
    this.forumService.getPosts().subscribe({
      next: (res) => {
        this.posts = res;
      },
    });
  }
  
  

  ajouterPost(): void {
    const postToSave: Post = {
      titre: this.newPost.titre,
      contenu: this.newPost.contenu,
      auteur: this.currentUser
    };

    this.forumService.createPost(postToSave).subscribe({
      next: () => {
        this.newPost = { titre: '', contenu: '', auteur: this.currentUser };
        this.chargerPosts();
      },
      error: err => {
        console.error("Erreur lors de l'ajout du post :", err);
        alert("Erreur lors de l'ajout du post !");
      }
    });
  }

  supprimerPost(id: number): void {
    const confirmation = confirm("Es-tu sûr(e) de vouloir supprimer ce post ?");
    if (!confirmation) return;
  
    this.forumService.deletePost(id).subscribe(() => this.chargerPosts());
  }
  

  modifier(post: Post): void {
    this.modifierMode = true;
    this.postEnCours = { ...post };
  }

  validerModification(): void {
    if (!this.postEnCours || !this.currentUser) return;
  
    const updatedPost: Post = {
      id: this.postEnCours.id,
      titre: this.postEnCours.titre,
      contenu: this.postEnCours.contenu,
      auteur: this.currentUser // même si le backend ne le met pas à jour, on le garde ici
    };
  
    this.forumService.updatePost(updatedPost.id!, updatedPost).subscribe({
      next: () => {
        this.modifierMode = false;
        this.postEnCours = null;
        this.chargerPosts();
      },
      error: err => {
        console.error('Erreur lors de la modification du post :', err);
        alert('Erreur lors de la modification');
      }
    });
  }
  
  
  annulerModification(): void {
    this.modifierMode = false;
    this.postEnCours = null;
  }

  chargerCommentaires(postId: number): void {
    this.forumService.getCommentsByPost(postId).subscribe({
      next: res => this.commentaires[postId] = res,
      error: err => console.error("Erreur chargement commentaires :", err)
    });
  }

  ajouterCommentaire(postId: number): void {
    const contenu = this.nouveauxCommentaires[postId];
    if (!contenu?.trim()) return;

    const post = this.posts.find(p => p.id === postId);
    if (!post) return;

    const commentaire: Comment = {
      contenu: contenu.trim(),
      auteur: this.currentUser,
      post: post
    };

    this.forumService.addComment(commentaire).subscribe({
      next: () => {
        this.nouveauxCommentaires[postId] = '';
        this.chargerCommentaires(postId);
      },
      error: err => console.error("Erreur ajout commentaire :", err)
    });
  }

  modifierCommentaire(commentaire: Comment): void {
    this.commentaireEnCours = { ...commentaire };
    this.modifContenuCommentaire = commentaire.contenu;
  }
  
  validerModificationCommentaire(postId: number): void {
    if (!this.commentaireEnCours) return;
  
    this.forumService
      .updateComment(this.commentaireEnCours.id!, this.modifContenuCommentaire)
      .subscribe(() => {
        this.commentaireEnCours = null;
        this.modifContenuCommentaire = '';
        this.chargerCommentaires(postId);
      });
  }
  
  annulerModificationCommentaire(): void {
    this.commentaireEnCours = null;
    this.modifContenuCommentaire = '';
  }
  
  supprimerCommentaire(postId: number, commentaireId: number): void {
    const confirmDel = confirm('Supprimer ce commentaire ?');
    if (!confirmDel) return;
  
    this.forumService.deleteComment(commentaireId).subscribe(() => {
      this.chargerCommentaires(postId);
    });
  }
}
