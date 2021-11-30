import { useCallback, useState } from "react";
import { doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import Zoom from "@mui/material/Zoom";
import Dialog from "@mui/material/Dialog";
import UpdateNote, { OptionalNote } from "./UpdateNote";
import { NoteType } from "./CreateNote";

interface Props {
    id: string;
    index: number;
    title: string;
    content: string;
    createdAt: string;
    lastEditedAt: string;
}

const Note = (props: Props) => {
    const { id, index, title, content, createdAt, lastEditedAt } = props;

    // Context
    const { user } = useAuth();

    // States
    const [selectedNote, setSelectedNote] = useState<string>("none");
    const [note, setNote] = useState<OptionalNote | null>(null);

    // Handlers/Functions
    const deleteNote = async () => {
        try {
            console.log("Deleting note...");
            await deleteDoc(doc(db, "users", user?.email!, "notes", id));
        } catch (error) {
            console.error(error);
        } finally {
            console.log("Note deleted.");
        }
    };

    const updateNote = async (note: OptionalNote, id: string) => {
        const { title, content } = note;
        const prevNoteSnap = await getDoc(
            doc(db, "users", user?.email!, "notes", id)
        );
        const prevNote: NoteType = prevNoteSnap.data() as NoteType;
        const prevTitle = prevNote.title;
        const prevContent = prevNote.content;

        const newTitle = title?.trim() || prevTitle || "Untitled";
        const newContent = content?.trim() || prevContent || "Empty note...";
        const lastEditedAt = `${new Date().toLocaleDateString(undefined, {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })}`;

        const updatedNote = {
            id,
            title: newTitle,
            content: newContent,
            lastEditedAt,
        };

        await setDoc(doc(db, "users", user?.email!, "notes", id), updatedNote, {
            merge: true,
        });
    };

    const handleClose = async () => {
        setSelectedNote("none");
        if (note) {
            await updateNote(note, id);
        }
    };

    // Using callback because vs-code suggested in comments of useEffect, and useEffect was rending
    // too many times
    const handleSetNote = useCallback((note: OptionalNote) => {
        setNote(note);
    }, []);

    return (
        <>
            <Zoom in={true} style={{ transitionDelay: `${300 * index}ms` }}>
                <li
                    className="p-3 w-60 m-4 rounded-lg bg-[#d4d4d8] shadow-lg"
                    onClick={() => setSelectedNote(id)}
                >
                    <h2 className="mb-4 text-xl font-medium">{title}</h2>
                    <p
                        className="mb-3 whitespace-pre-wrap text-lg"
                        style={{ wordWrap: "break-word" }}
                    >
                        {content}
                    </p>
                    <button
                        className="relative float-right cursor-pointer"
                        title="Delete note"
                        onClick={deleteNote}
                    >
                        <MdDelete size="1.75rem" color="#555" />
                    </button>
                </li>
            </Zoom>
            <Dialog onClose={handleClose} open={id === selectedNote}>
                <UpdateNote
                    id={id}
                    title={title}
                    content={content}
                    createdAt={createdAt}
                    lastEditedAt={lastEditedAt}
                    onSetNote={handleSetNote}
                    onUpdateNote={updateNote}
                    onClose={handleClose}
                />
            </Dialog>
        </>
    );
};

export default Note;
