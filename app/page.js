"use client";

import { useEffect } from "react";
import moment from "moment";
import NoteEditor from "./components/NoteEditor";
import { useProjectContext } from "./hooks/useProjectContext";

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
      <div className="left">
        <h2>My Notes</h2>
        <div className="notes-wrapper">
          {notes &&
            notes.map((note) => (
              //statrting note card
              <div key={note._id}>
                <div className="note-card-title">
                  <span>ID: {note._id}</span>
                  <h3>{note.title}</h3>
                  <p>
                    Last updated:
                    {moment(note.updatedAt).format("ddd DD-MMM-YY HH:mm A")}
                  </p>
                </div>
                <div className="note-card-body">
                  <p>{note.content}</p>
                </div>
                <div className="note-card-buttons">
                  <button>Update</button>
                  <button>Delete</button>
                  <button>Mark Done</button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <NoteEditor />
    </div>
  );
};

export default HomePage;
