export interface User {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    password?: string;
    telephone?: string;
    role?: {
      name: string;
    };
  }
  