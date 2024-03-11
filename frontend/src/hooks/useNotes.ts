import { Note } from "../models/note";
import * as NotesApi from "../network/notes_api";

export function useNotes(
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
) {
  async function getAllNotes() {
    try {
      const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async function createNote(note: NotesApi.NoteInput) {
    try {
      const newNote = await NotesApi.createNotes(note);
      setNotes((prev)=>[...prev, newNote]);
      return newNote;
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async function deleteNote(noteId: string) {
    try {
      await NotesApi.deleteNote(noteId);
      setNotes((prev) => prev.filter((n) => n._id !== noteId));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async function updateNote(noteId:string ,note:NotesApi.NoteInput) {
    try {
      const response = await NotesApi.updateNote(noteId,note)
      setNotes((prev)=>prev.map(n=>n._id===noteId?response:n))
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return { getAllNotes, createNote, deleteNote,updateNote };
}
