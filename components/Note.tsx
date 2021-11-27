import Zoom from "@mui/material/Zoom";
import { MdDelete } from "react-icons/md";

interface Props {
    id: string;
    index: number;
    title: string;
    content: string;
}

const Note = ({ id, index, title, content }: Props) => {
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
                >
                    <MdDelete size="1.75rem" color="#555" />
                </button>
            </li>
        </Zoom>
    );
};

export default Note;
