export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tags: string[];
}

export interface UpdateNoteRequest {
  id: string;
  title?: string;
  content?: string;
  tags?: string[];
  isArchived?: boolean;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}