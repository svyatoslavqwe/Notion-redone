import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { UserContext } from "../components/UserContextProvider";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import { fetchNotes, deleteNote } from "../api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchNotes()
      .then((data) => {
        const sortedNotes = data.sort((a, b) => b.createdAt - a.createdAt);
        setNotes(sortedNotes);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      console.log("Note deleted");
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Navigation />
      <p className="text-left mt-4 ml-4 absolute top-0 left-0">
        Hello, {user.email}
      </p>
      <h1 className="text-3xl mt-8 mb-4 font-bold">Notes</h1>
      <Link
        to="/createnote"
        className="bg-gray-300 py-2 px-6 rounded-lg text-gray-800 mb-8 w-96 text-center hover:bg-gray-400 font-bold"
      >
        Add new note
      </Link>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className="bg-gray-100 rounded-lg py-4 px-6 mb-4 flex justify-between items-center"
          >
            <div className="w-96">
              <h2 className="text-xl">
                <Link
                  to={`/viewnote/${note.id}`}
                  className="hover:text-blue-500"
                >
                  {note.title}
                </Link>
              </h2>
              <p className="text-gray-600">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Link to={`/editnote/${note.id}`} className="mr-5">
                <ModeEditTwoToneIcon className="hover:text-blue-500" />
              </Link>
              <DeleteTwoToneIcon
                onClick={() => handleDeleteNote(note.id)}
                className="hover:text-red-500"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
