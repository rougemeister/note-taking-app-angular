export interface Note {
  id: string; // <-- Added this
  title: string;
  tags: string[];
  content: string;
  lastEdited: string; // ISO string format
  isArchived: boolean;
}
export interface CreateNoteRequest {
  title: string;
  content: string;
  tags: string[];
}

export interface UpdateNoteRequest {
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