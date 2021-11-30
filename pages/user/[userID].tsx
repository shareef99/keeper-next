import { Fragment, useState } from "react";
import Header from "../../components/Header";
import CreateNote from "../../components/CreateNote";
import DisplayNotes from "../../components/DisplayNotes";

interface Props {}

const User = (props: Props) => {
    return (
        <Fragment>
            <Header />
            <section className="container">
                <CreateNote />
                <DisplayNotes />
            </section>
        </Fragment>
    );
};

export default User;
