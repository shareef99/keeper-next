import { Fragment, useState } from "react";
import Header from "../../components/Header";
import CreateNote from "../../components/CreateNote";
import DisplayNotes from "../../components/DisplayNotes";

interface Props {}

const User = (props: Props) => {
    // State
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // Handlers/Functions
    const toggleExpand = (e: any) => {
        const allowedIds = ["title", "content", "create-note"];
        const currentId = e.target.id;
        const isAllowed = allowedIds.includes(currentId);

        if (isAllowed) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    };

    return (
        <Fragment>
            <Header />
            <section className="container" onClick={toggleExpand}>
                <CreateNote isExpanded={isExpanded} />
                <DisplayNotes />
            </section>
        </Fragment>
    );
};

export default User;
