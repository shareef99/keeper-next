import { useRef, FormEvent, useState } from "react";
import { BiPlus } from "react-icons/bi";

interface Props {
    isExpanded: boolean;
}

const CreateNote = ({ isExpanded }: Props) => {
    // Refs
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    // Handlers
    const submitNote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                />
            )}
            <div
                id="content"
                contentEditable={true}
                ref={contentRef}
                data-placeholder="Take a note..."
                className="w-full p-1 outline-none text-lg editableContent"
            />
            {/* {isExpanded && (
                    <div id="options-container" className="mt-2 space-y-2">
                        <div className="flex items-center space-x-4 flex-wrap space-y-4">
                            <div className="mr-auto space-x-2 space-y-2">
                                {initialNoteLabels.map((label, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-400 rounded-2xl px-3 py-1"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex">
                            <Options />
                        </div>
                    </div>
                )} */}
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
