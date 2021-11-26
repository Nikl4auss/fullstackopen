import { useState } from "react"
import Note from "./components/Note"
const App = ({notes}) => {
  return (
    <section>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <Note note={note} />)}
      </ul>
    </section>
  )
}

export default App