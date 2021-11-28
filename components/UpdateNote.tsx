import { FormEvent, useRef, useEffect } from "react";
import { MdCloseFullscreen } from "react-icons/md";

export interface OptionalNote {
    id?: string;
    title?: string;
    content?: string;
}

interface Props {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    lastEditedAt: string;
    onSetNote: (note: OptionalNote) => void;
    onUpdateNote: (note: OptionalNote, id: string) => void;
    onClose: () => void;
}

const UpdateNote = (props: Props) => {
    const { id, title, content, onSetNote, onClose, onUpdateNote } = props;

    // Refs
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Effects
    useEffect(() => {
        // This effect set the default values to title and content
        if (titleRef) {
            if (titleRef.current) {
                titleRef.current.innerText = title;
            }
        }
        if (contentRef) {
            if (contentRef.current) {
                contentRef.current.innerText = content;
            }
        }
    }, [title, content]);

    useEffect(() => {
        // This effect works as onChange and save the every change in onSetNote
        titleRef?.current?.addEventListener("input", (e) => {
            // I logged the value and check that innerText exist but I don't know why TS not getting it.
            // @ts-ignore
            let title = e.target?.innerText;
            // If pressed enter change focus to content
            // @ts-ignore
            if (e.target.innerHTML.toString().includes("br")) {
                // @ts-ignore
                titleRef.current?.innerText = e.target?.innerText.trim();
                contentRef?.current?.focus();
            }
            onSetNote({ title });
        });
        contentRef?.current?.addEventListener("input", (e) => {
            // Same here as previous(title)
            // @ts-ignore
            const content = e.target?.innerText;
            onSetNote({ content });
        });
    }, [onSetNote]);

    // Handlers
    const handleUpdateNote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedTitle = titleRef.current?.innerText || title || "Untitled";
        const updatedContent =
            contentRef.current?.innerText || content || "Empty note...";
        onUpdateNote({ title: updatedTitle, content: updatedContent }, id);
        // Closing Dialog.
        onClose();
    };

    return (
        <form
            onSubmit={handleUpdateNote}
            className="p-4 bg-[gray-200] min-w-[300px] xs:min-w-[400px] sm:min-w-[500px] rounded-lg"
        >
            <div
                contentEditable={true}
                className="w-full p-1 outline-none text-xl font-medium"
                ref={titleRef}
            />
            <div
                contentEditable={true}
                className="w-full p-1 outline-none text-lg"
                ref={contentRef}
            />
            <div className="flex flex-col items-end cursor-pointer">
                <button type="submit">
                    <MdCloseFullscreen size="1.5rem" />
                </button>
            </div>
        </form>
    );
};

export default UpdateNote;
