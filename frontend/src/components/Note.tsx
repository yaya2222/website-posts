import {Note as NoteModel} from "../models/note"

interface NoteProps{
    note:NoteModel,
    className?:string
}

export default function Note({note,className}:NoteProps) {
    const {title,text,createdAt,updatedAt} =note
  return (
    <div className={`bg-amber-100 shadow p-2 ${className}`}>
      <div className="overflow-hidden grad">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 whitespace-pre-line ">{text}</p>
      </div>
    </div>
  )
}
