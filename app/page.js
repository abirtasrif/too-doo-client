"use client";

import { useEffect } from "react";

import NoteEditor from "./components/NoteEditor";
import { useProjectContext } from "./hooks/useProjectContext";
import { BsPencilSquare } from "react-icons/bs";
import Notemodules from "./components/Notemodules";

const HomePage = () => {
  const { notes, dispatch } = useProjectContext();

  useEffect(() => {
    const getNotes = async () => {
      const res = await fetch("http://localhost:5000/api/notes");
      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_NOTES", payload: data });
      }
    };

    getNotes();
  }, [dispatch]);

  return (
    <div className="main">
      <h2>My Notes</h2>
      <div className="notes-wrapper">
        {/* new note card */}
        <div id="note-card" className="new-note">
          <BsPencilSquare />
          <p>Add a New Note</p>
        </div>
        {notes &&
          notes.map((note) => <Notemodules key={note._id} note={note} />)}
      </div>

      <NoteEditor />
    </div>
  );
};

export default HomePage;
