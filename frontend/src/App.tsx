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
      <div className=" container m-auto">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4">
        {notes.map(note=><Note key={note._id} note={note} className="h-[200px] min-w-[150px] hover:shadow-lg hover:shadow-black/20 transition-all ease-in-out duration-200 cursor-pointer"/>)}
        </div>
      </div>
    </>
  );
}

export default App;
