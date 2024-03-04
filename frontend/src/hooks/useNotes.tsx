import { Note } from "../models/note";
import { getAllNotesUrl } from "./setting";

export function useNotes() {
  async function getAllNotes(
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  ) {
    try {
      const response = await fetch(getAllNotesUrl, { method: "GET" });
      const notes = await await response.json();
      setNotes(notes);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return { getAllNotes };
}
