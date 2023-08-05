import React from "react";
import moment from "moment";
import { useProjectContext } from "../hooks/useProjectContext";

const Notemodules = ({ note }) => {
  const { dispatch } = useProjectContext();
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
      method: "DELETE",
    });
    const json = await res.json();

    if (res.ok) {
      dispatch({
        type: "DELETE_NOTE",
        payload: json,
      });
    }
  };

  return (
    //statrting note card
    <div key={note._id} id="note-card">
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
        <button onClick={handleDelete}>Delete</button>
        <button>Mark Done</button>
      </div>
    </div>
  );
};

export default Notemodules;
