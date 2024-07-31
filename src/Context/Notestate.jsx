'use client'
import React from "react";
import NoteContext from "./Notecontext";
import { useState } from "react";

const Notestate = (props) => {
  const host = "http://127.0.0.1:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //GET all note
  const getNotes = async () => {
    //TODO:API Call
    const response = await fetch(
      `${host}/api/note/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
            
        }
      }
    );
    const json = await response.json()
    console.log(json);
    setNotes(json)
  };


  //Add a note
  const addNote = async (title, description, status,priority,deadline) => {
    //TODO:API Call
    const response = await fetch(
      `${host}/api/note/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,status,priority,deadline}),
      }
    );
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API Call

    const response = await fetch(
      `${host}/api/note/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      }
    );
    const json = response.json();
    console.log(json);
    // console.log("deleting the note with id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };
  //Edit a note

  const editNote = async (id, title, description, status,priority,deadline) => {
    
    //API Call

    const response = await fetch(
      `${host}/api/note/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,status,priority,deadline}),
      }
    );
    const json = await response.json();
    console.log(json)
    
 

    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].status = status;
        newNotes[index].priority = priority;
        newNotes[index].deadline = deadline;
        break;
      }
    }

    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default Notestate;
