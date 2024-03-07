import { useState } from "react";

export default function AddNoteDialog() {
  const [showAddNoteDialog, setShowAddNoteDialog] = useState<boolean>(false);
  return (
    <>
      <button onClick={()=>setShowAddNoteDialog(true)}>Add new note</button>
      {showAddNoteDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      )}
    </>
  );
}
