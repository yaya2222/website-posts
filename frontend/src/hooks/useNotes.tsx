import { Note } from "../models/note";
import * as NotesApi from "../network/notes_api"

export function useNotes() {
  async function getAllNotes(
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  ) {
    try {
      
      const notes = await NotesApi.fetchNotes()
      setNotes(notes);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return { getAllNotes };
}
