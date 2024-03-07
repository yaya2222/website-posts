import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw createHttpError(401)
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }
    const newNote = await NoteModel.create({ title, text });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface updateNoteParmas {
  noteId: string;
}
interface updateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  updateNoteParmas,
  unknown,
  updateNoteBody,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;
  const { text, title } = req.body;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    note.title = title;
    if (text) {
      note.text = text;
    }
    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    await NoteModel.findByIdAndDelete(noteId)
    res.sendStatus(204)
  } catch (error) {
    next(error);
  }
};
