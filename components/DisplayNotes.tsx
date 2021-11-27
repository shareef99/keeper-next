import { useEffect, useState } from "react";
import type { NoteType } from "./CreateNote";
import { db } from "../lib/firebase";
import { onSnapshot, doc, collection, query } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

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
                "Notes"
            ) : (
                <div>
                    <h1>Welcome to keeper, anything in mind? Write it down</h1>
                </div>
            )}
        </div>
    );
};

export default DisplayNotes;
