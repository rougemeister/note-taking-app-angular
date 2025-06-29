import { NoteState, ThemeState } from "./state";

export interface AppState {
  notes: NoteState;
  theme: ThemeState
}