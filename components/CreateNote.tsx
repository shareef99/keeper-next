import { useRef, FormEvent } from "react";
import { BiPlus } from "react-icons/bi";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

interface Props {
    isExpanded: boolean;
}

export interface NoteType {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    lastEditedAt: string;
}

const CreateNote = ({ isExpanded }: Props) => {
    // Context
    const { user } = useAuth();

    // Refs
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    // Handlers
    const submitNote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let title = titleRef?.current?.innerText.trim() || "Untitled";
        let content = contentRef?.current?.innerText.trim() || "Empty note...";

        addNote(title, content);

        if (titleRef) {
            if (titleRef.current) {
                titleRef.current.innerText = "";
            }
        }

        if (contentRef) {
            if (contentRef.current) {
                contentRef.current.innerText = "";
            }
        }
    };

    const addNote = async (title: string, content: string) => {
        const id = title + Math.floor(Math.random() * 10000000);

        const createdAt = `${new Date().toLocaleDateString(undefined, {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })}`;

        if (title === "") {
            title = "untitled";
        }

        const newNote: NoteType = {
            id,
            title,
            content,
            createdAt,
            lastEditedAt: "Original",
        };

        try {
            await setDoc(doc(db, "users", user?.email!, "notes", id), newNote);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTitleChange = (e: FormEvent<HTMLDivElement>) => {
        // @ts-ignore
        if (e.code === "Enter") {
            contentRef?.current?.focus();
        }
    };

    return (
        <form
            onSubmit={submitNote}
            className="container relative bg-gray sm:max-w-lg p-4 mx-auto mt-8 mb-5 rounded-lg shadow-2xl"
            id="create-note"
        >
            {isExpanded && (
                <div
                    id="title"
                    contentEditable={true}
                    ref={titleRef}
                    data-placeholder="Title"
                    className="w-full p-1 outline-none text-xl font-medium editableTitle"
                    onKeyPress={handleTitleChange}
                />
            )}
            <div
                id="content"
                contentEditable={true}
                ref={contentRef}
                data-placeholder="Take a note..."
                className="w-full p-1 outline-none text-lg editableContent"
            />
            <button
                className="flexCenter absolute right-[18px] -bottom-[18px] border-none rounded-full 
                        w-9 h-9 outline-none text-white bg-yellow400 hover:bg-black
                        focus:bg-black transitionIn"
                type="submit"
            >
                <BiPlus size="1.45rem" />{" "}
            </button>
        </form>
    );
};

export default CreateNote;
