"use client";

import { useEffect, useState } from "react";

import NoteEditor from "./components/NoteEditor";
import { useProjectContext } from "./hooks/useProjectContext";
import { BsPencilSquare } from "react-icons/bs";
import Notemodules from "./components/Notemodules";

// import { useAuthContext } from "./hooks/useAuthContext";
// import { useRouter } from "next/router";

const HomePage = () => {
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const { notes, dispatch } = useProjectContext();
  // const { user } = useAuthContext();
  // const router = useRouter();

  // if (!user) {
  //   router.push("/login");
  //   return null;
  // }

  const handleNewNote = () => {
    setIsNewNoteOpen(true);
  };

  useEffect(() => {
    const getNotes = async () => {
      const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/notes`);
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
        <div id="note-card" className="new-note" onClick={handleNewNote}>
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
