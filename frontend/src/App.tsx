import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import { useNotes } from "./hooks/useNotes";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const { getAllNotes } = useNotes();

  useEffect(() => {
    async function loadNotes() {
      getAllNotes(setNotes);
    }
    loadNotes();
  }, []);

  console.log(notes);
  
  return (
    <>
      <div className="text-center mt-20">
        {notes.map(note=><Note key={note._id} note={note}/>)}
      </div>
    </>
  );
}

export default App;
