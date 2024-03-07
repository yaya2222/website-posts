import {Note as NoteModel} from "../models/note"
import { formatData } from "../utils/formatDate"

interface NoteProps{
    note:NoteModel,
    className?:string
}

export default function Note({note,className}:NoteProps) {
    const {title,text,createdAt,updatedAt} =note

    let createdUpdatedText:string
    if(updatedAt>createdAt){
      createdUpdatedText=`Updated: ${formatData(updatedAt)}`
    }else{
      createdUpdatedText=`Created: ${formatData(createdAt)}`
    }

  return (
    <div className={`bg-amber-100 shadow relative rounded-lg  ${className}`}>
      <div className=" h-full ">
        <div className=" py-2 px-4 text-over overflow-hidden h-[calc(100%-2rem)]">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 whitespace-pre-line text-ellipsis">{text}</p>
        </div>
        <div className=" border-t border-black absolute bottom-0 w-full bg-amber-100 py-2 px-4 brightness-95 rounded-b-lg">
          <span>{createdUpdatedText}</span>
        </div>
      </div>
    </div>
  )
}
