import React, { Fragment, useState } from "react";
import CreateNote from "../../components/CreateNote";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";

interface Props {}

const User = (props: Props) => {
    // Context
    const { logout } = useAuth();

    // State
    const [isExpanded, setIsExpanded] = useState(false);

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
                {/* <div>
                    <h1>Welcome to keeper, anything in mind? Write it down</h1>
                </div> */}
                <CreateNote isExpanded={isExpanded} />
                <div className="m-10">
                    <button onClick={logout}>Logout</button>
                </div>
            </section>
        </Fragment>
    );
};

export default User;
