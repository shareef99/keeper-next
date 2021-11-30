import { createContext, ReactNode, useContext } from "react";

interface noteContextType {
    // updateNote: (note: OptionalNote, id: string) => Promise<void>;
}

const noteContextDefaultValues: noteContextType = {
    // updateNote: () => new Promise((resolve) => resolve()),
};

const NoteContext = createContext<noteContextType>(noteContextDefaultValues);

export function useNote() {
    return useContext(NoteContext);
}

interface Props {
    children: ReactNode;
}

export function NoteProvider({ children }: Props) {
    const value = {
        // updateNote,
    };

    return (
        <>
            <NoteContext.Provider value={value}>
                {children}
            </NoteContext.Provider>
        </>
    );
}
