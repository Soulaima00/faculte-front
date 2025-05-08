import { Post } from './post.model';
import { User } from './user.model';

export interface Comment {
  id?: number;
  contenu: string;
  dateCreation?: string;
  auteur: User;
  post: Post;
}
