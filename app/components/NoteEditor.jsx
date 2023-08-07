import { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";

const NoteEditor = ({ note, setIsModalOpen, setIsOverlayOpen }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const { dispatch } = useProjectContext();

  // const handleCheckboxChange = (e) => {
  //   setIsDone(e.target.checked);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteObj = { title, content };

    if (!note) {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteObj),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setEmptyFields(data.emptyFields);
      }

      if (res.ok) {
        setTitle("");
        setContent("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_NOTES", payload: data });
      }

      return;
    }

    //if(note), send patch
    if (note) {
      const res = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteObj),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setEmptyFields(data.emptyFields);
      }

      if (res.ok) {
        setError(null);
        setEmptyFields([]);
        //dispatch
        dispatch({
          type: "UPDATE_NOTE",
          payload: data,
        });
        //close hover
        setIsModalOpen(false);
        setIsOverlayOpen(false);
      }

      return;
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2 className={`note-header ${note ? "hidden" : ""}`}>Add a new note</h2>

      <div className="form-control">
        <label htmlFor="title">Note Title</label>
        <input
          type="text"
          placeholder="Today's priority"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${
            emptyFields.includes(`title`) ? "border-red" : "border-normal"
          }`}
        />
      </div>

      <div className="form-control">
        <label htmlFor="content">Note Body</label>
        <input
          type="text"
          placeholder="Have to give feedback to supplier before leaving office today"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`${
            emptyFields.includes(`content`) ? "border-red" : "border-normal"
          }`}
        />
      </div>
      {/* <label>
        <input
          type="checkbox"
          checked={isDone}
          onChange={handleCheckboxChange}
        />
        Mark as Completed
      </label> */}

      <button type="submit">{note ? "Confirm Update" : "Add Note"}</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default NoteEditor;
