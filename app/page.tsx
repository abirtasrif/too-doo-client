"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import NoteEditor from "./components/NoteEditor";

const HomePage = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/notes");
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setNotes(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    getNotes();
  }, []);

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
