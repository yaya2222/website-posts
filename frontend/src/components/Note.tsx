import {Note as NoteModel} from "../models/note"

interface NoteProps{
    note:NoteModel,
}

export default function Note({note}:NoteProps) {
    const {title,text,createdAt,updatedAt} =note
  return (
    <div className="bg-slate-200">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 whitespace-pre-line w-10">{text}</p>
    </div>
  )
}
