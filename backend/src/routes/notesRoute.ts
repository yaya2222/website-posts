import * as NoteController from "../controllers/notesController"
import express from "express"

const router = express.Router()

router.get("/",NoteController.getNotes)
router.post("/",NoteController.createNote)

router.get("/:noteId",NoteController.getNote)
router.put("/:noteId",NoteController.updateNote)
router.delete("/:noteId",NoteController.deleteNote)


export default router