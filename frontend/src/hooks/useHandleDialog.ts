import { useState } from "react";
import { Note } from "../models/note";

interface HandleDialog{
    addDialog:boolean,
    noteToEdit:Note|undefined
}

export function useHandleDialog(){
const [showNoteDialog, setShowNoteDialog]=useState<HandleDialog>({addDialog:false,noteToEdit:undefined})

function closeDialog(){
    setShowNoteDialog({addDialog:false,noteToEdit:undefined})
}
 function showAddDialog(){
    setShowNoteDialog({addDialog:true,noteToEdit:undefined})
}
 function showEditDialog(note:Note){
    setShowNoteDialog({addDialog:false,noteToEdit:note})
}

return {showNoteDialog,closeDialog,showAddDialog,showEditDialog}

}