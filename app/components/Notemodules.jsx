import React, { useState } from "react";
import moment from "moment";
import { useProjectContext } from "../hooks/useProjectContext";
import { MdCancel } from "react-icons/md";
import NoteEditor from "./NoteEditor";
import {
  RiFileEditFill,
  RiDeleteBin2Fill,
  RiCheckDoubleFill,
} from "react-icons/ri";

const Notemodules = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isoverlayOpen, setIsOverlayOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

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

  // const handleNoteWindow = () => {
  //   setIsNoteOpen(true);
  //   setIsOverlayOpen(true);
  // };

  return (
    //statrting note card
    <div key={note._id} id="note-card">
      <div className="note-card-title">
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
        <button onClick={handleUpdate}>
          <RiFileEditFill className="icon" />
        </button>
        <button onClick={handleDelete}>
          <RiDeleteBin2Fill className="icon" />
        </button>
        <button>
          <RiCheckDoubleFill className="icon" />
        </button>
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
