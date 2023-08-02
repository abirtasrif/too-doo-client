import { useState } from "react";

const NoteEditor = () => {
  const [title, setTile] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const note = { title, body };

    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const data = await res.json();

    //!req.ok, set error
    if (!res.ok) {
      setError(data.error);
    }

    //req.ok, reset
    if (res.ok) {
      setTile("");
      setBody("");
      setError(null);
      console.log("note added to db", data);
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
          onChange={(e) => setTile(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="body">Note Body</label>
        <input
          type="text"
          placeholder="Have to give feedback to supplier before leaving office today"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button type="submit">Add Note</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default NoteEditor;
