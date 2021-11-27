import Zoom from "@mui/material/Zoom";
import { MdDelete } from "react-icons/md";
import { db } from "../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

interface Props {
    id: string;
    index: number;
    title: string;
    content: string;
}

const Note = ({ id, index, title, content }: Props) => {
    // Context
    const { user } = useAuth();

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

    return (
        <Zoom in={true} style={{ transitionDelay: `${300 * index}ms` }}>
            <li className="p-3 w-60 m-4 rounded-lg bg-[#d4d4d8] shadow-lg">
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
    );
};

export default Note;
