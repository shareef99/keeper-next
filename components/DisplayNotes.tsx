import { useEffect, useState } from "react";
import type { NoteType } from "./CreateNote";
import { db } from "../lib/firebase";
import { onSnapshot, collection, query } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Zoom from "@mui/material/Zoom";
import Note from "./Note";

interface Props {}

const DisplayNotes = (props: Props) => {
    // Context
    const { user } = useAuth();

    // State
    const [notes, setNotes] = useState<Array<NoteType>>();

    // Effects
    useEffect(() => {
        if (user) {
            const notesRef = query(
                collection(db, "users", user?.email!, "notes")
            );
            onSnapshot(notesRef, (snapshot) => {
                const notes: Array<NoteType> = [];
                snapshot.forEach((doc) => {
                    notes.push({
                        id: doc.id,
                        title: doc.data().title,
                        content: doc.data().content,
                        createdAt: doc.data().createdAt,
                        lastEditedAt: doc.data().lastEditedAt,
                    });
                });
                setNotes(notes);
            });
        }
    }, [user]);

    useEffect(() => {
        console.log(notes);
    }, [notes]);

    return (
        <div>
            {notes ? (
                <ul className="flex justify-center flex-wrap items-start">
                    {notes
                        .sort(
                            (a, b) =>
                                +new Date(b.createdAt) - +new Date(a.createdAt)
                        )
                        .map((note, index) => (
                            <Note
                                key={index}
                                id={note.id!}
                                index={index}
                                title={note.title}
                                content={note.content}
                            />
                        ))}
                </ul>
            ) : (
                <Zoom in={true}>
                    <h1 className="font-medium text-2xl my-40 text-center px-2">
                        Welcome to keeper, anything in mind? Write it down
                    </h1>
                </Zoom>
            )}
        </div>
    );
};

export default DisplayNotes;
