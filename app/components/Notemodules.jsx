import React, { useState } from "react";
import moment from "moment";
import { useProjectContext } from "../hooks/useProjectContext";
import { MdCancel } from "react-icons/md";
import NoteEditor from "./NoteEditor";

const Notemodules = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isoverlayOpen, setIsOverlayOpen] = useState(false);

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

  const handleUpdate = () => {
    setIsModalOpen(true);
    setIsOverlayOpen(true);
  };

  const handleOverlay = () => {
    setIsModalOpen(false);
    setIsOverlayOpen(false);
    console.log("test");
  };

  return (
    //statrting note card
    <div
      key={note._id}
      id="note-card"
      // onClick={handleUpdate}
      // style={{ cursor: "pointer" }}
    >
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
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        <button>Mark Done</button>
      </div>

      {/* Overlay */}
      <div className={`overlay ${isoverlayOpen ? "" : "hidden"}`}>
        <span onClick={handleOverlay} style={{ cursor: "pointer" }}>
          <MdCancel className="cancel-button" />
        </span>
      </div>
      {/* Modal */}
      <div className={`modal ${isModalOpen ? "" : "hidden"}`}>
        <h2>Update note</h2>
        <NoteEditor
          note={note}
          setIsModalOpen={setIsModalOpen}
          setIsOverlayOpen={setIsOverlayOpen}
        />
      </div>
    </div>
  );
};

export default Notemodules;
