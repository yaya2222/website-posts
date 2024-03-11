import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import { useNotes } from "./hooks/useNotes";
import Note from "./components/Note";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";
import { useHandleDialog } from "./hooks/useHandleDialog";
import SignUpModal from "./components/SignUpModal";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const { getAllNotes} = useNotes(setNotes);
  const {showNoteDialog,showEditDialog,closeDialog,showAddDialog} = useHandleDialog()

  useEffect(() => {
    async function loadNotes() {
      getAllNotes();
    }
    loadNotes();
  }, []);

  return (
    <>
      <div className=" container m-auto">
        <div className="flex justify-center">
          <button
            onClick={showAddDialog}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg m-4 text-center flex items-center gap-2"
          >
            <FaPlus />
            Add new note
          </button>
        </div>
    
        <div className="grid xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4">
          {notes.map((note) => (
            <Note
            setNotes={setNotes}
            onNoteClicked={showEditDialog}
              key={note._id}
              note={note}
              className="h-[200px] min-w-[150px] hover:shadow-lg hover:shadow-black/20 transition-all ease-in-out duration-200 cursor-pointer"
            />
          ))}
        </div>
      </div>
      {(showNoteDialog.addDialog||showNoteDialog.noteToEdit) && (
          <AddEditNoteDialog
          noteToEdit={showNoteDialog.noteToEdit}
          setNotes={setNotes}
            close={closeDialog}
          />
        )}
        {true&&<SignUpModal />}
    </>
  );
}

export default App;
