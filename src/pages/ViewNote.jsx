import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Navigation from "../components/Navigation";
import { UserContext } from "../components/UserContextProvider";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import { fetchNoteById, deleteNote } from "../api";

export default function ViewNote() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { noteId } = useParams();

  const [note, setNote] = useState({});
  const [noteExists, setNoteExists] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await fetchNoteById(noteId);
        if (!note) {
          setNoteExists(false);
        } else {
          setNote(note);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleDeleteNote = async () => {
    try {
      const response = await deleteNote(note.id);

      if (response) {
        console.log("Note deleted");
        navigate("/notes");
      } else {
        throw new Error("Error deleting note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (!noteExists) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col items-center">
      <Navigation />
      <p className="text-left mt-4 ml-4 absolute top-0 left-0">
        Hello, {user.email}
      </p>
      <h1 className="text-3xl mt-8 mb-4 font-bold">View Note</h1>
      <div className="w-96">
        <h2 className="border border-gray-300 rounded-lg py-2 px-3 mt-2 mb-4 w-full">
          {note.title}
        </h2>
        <pre className="border border-gray-300 rounded-lg py-2 px-3 mt-2 mb-4 w-full">
          {note.text}
        </pre>
        <div className="flex justify-between items-center">
          <div>
            <Link to={`/editnote/${noteId}`}>
              <ModeEditTwoToneIcon className="hover:text-blue-500" />
            </Link>
            <span className="ml-5">
              <Link
                to="/notes"
                className="bg-gray-300 text-gray-900 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-lg mr-2 font-bold"
              >
                Back
              </Link>
            </span>
          </div>
          <DeleteTwoToneIcon
            onClick={handleDeleteNote}
            className="hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
