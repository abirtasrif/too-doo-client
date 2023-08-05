import { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";

const NoteEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useProjectContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteObj = { title, content };

    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteObj),
    });
    const data = await res.json();

    //!res.ok, set error
    if (!res.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }

    //res.ok, reset
    if (res.ok) {
      setTitle("");
      setContent("");
      setError(null);
      dispatch({ type: "CREATE_NOTES", payload: data });
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Add a new note</h2>

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

      <button type="submit">Add Note</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default NoteEditor;
