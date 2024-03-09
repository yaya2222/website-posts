import { MdDelete } from "react-icons/md";
import { Note as NoteModel } from "../models/note";
import { formatData } from "../utils/formatDate";
import { useNotes } from "../hooks/useNotes";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  className?: string;
  setNotes: React.Dispatch<React.SetStateAction<NoteModel[]>>;
}

export default function Note({
  note,
  className,
  onNoteClicked,
  setNotes,
}: NoteProps) {
  const { title, text, createdAt, updatedAt, _id } = note;
  const { deleteNote } = useNotes(setNotes);

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatData(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatData(createdAt)}`;
  }

  return (
    <div
      className={`bg-amber-100 shadow relative rounded-lg cursor-pointer  ${className}`}
      onClick={() => {
        onNoteClicked(note);
      }}
    >
      <div className=" h-full ">
        <div className=" py-2 px-4 text-over overflow-hidden h-[calc(100%-2rem)]">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{title}</h3>
            <MdDelete
              className="text-gray-600 text-xl"
              onClick={(e) => {
                e.stopPropagation();

                deleteNote(_id);
              }}
            />
          </div>
          <p className="text-gray-600 whitespace-pre-line text-ellipsis">
            {text}
          </p>
        </div>
        <div className=" border-t border-black absolute bottom-0 w-full bg-amber-100 py-2 px-4 brightness-95 rounded-b-lg">
          <span>{createdUpdatedText}</span>
        </div>
      </div>
    </div>
  );
}
