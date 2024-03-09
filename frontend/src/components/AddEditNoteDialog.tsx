// import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { NoteInput } from "../network/notes_api";
import { Note } from "../models/note";
import { useNotes } from "../hooks/useNotes";

interface AddNoteEditDialogProps {
  noteToEdit?:Note,
  close:()=>void
  setNotes:React.Dispatch<React.SetStateAction<Note[]>>

}

export default function AddEditNoteDialog({close,noteToEdit,setNotes}: AddNoteEditDialogProps) {
  const {updateNote,createNote} = useNotes(setNotes)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues:{
      title:noteToEdit?.title||"",
      text:noteToEdit?.text||""
    }
  });

  const closeDialog = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = (e.target as HTMLDivElement).id;
    if (id.includes("dialog")) {
      // setShowAddNoteDialog(false);
      close()
    }
  };

  const onSubmit = async (note: NoteInput) => {
    if(noteToEdit){
      updateNote(noteToEdit._id,note)
    }else{
      createNote(note)
    }
    close()
  };
  

  return (
 
        <div
          onClick={closeDialog}
          id="dialog"
          className="fixed inset-0 z-10 bg-black backdrop-blur-md bg-opacity-50 transition-opacity "
        >
          <div className="bg-white max-w-lg m-auto mt-20 rounded-lg">
            <h1 className="text-3xl font-semibold px-4 py-3 border-gray-500 border-b flex justify-between items-center">
              <span>{noteToEdit?"Edit Note":"Add Note"}</span>
              <IoMdClose
                onClick={() => close()}
                className="cursor-pointer text-gray-500"
              />
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col p-4 ">
                <label htmlFor="title" className={errors.title?"text-red-600":"text-gray-600"}>
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required:{value:true,message:"Required"}})}
                  placeholder="Title"
                  className={" p-2 border-gray-400 border rounded-md focus:outline-none focus:border-black"}
                />
                <span className="text-red-600 text-sm px-2 mt-1">{errors.title?.message}</span>
              </div>
              <div className="flex flex-col p-4 ">
                <label htmlFor="text" className="text-gray-600">
                  Text
                </label>
                <textarea
                  rows={5}
                  id="text"
                  {...register("text")}
                  placeholder="Text"
                  className="text-gray-600 p-2 border-gray-400 border rounded-md focus:outline-none focus:border-black"
                />
              </div>
              <div className="border-t border-gray-500 py-3 px-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
                >
                  {noteToEdit?"Edit":"Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
  );
}
