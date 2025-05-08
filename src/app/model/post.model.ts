import { User } from './user.model';
import { Comment } from './comment.model';

export interface Post {
  id?: number;
  titre: string;
  contenu: string;
  dateCreation?: string;
  auteur: User;
  commentaires?: Comment[];
}
