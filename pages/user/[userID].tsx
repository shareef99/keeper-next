import React, { Fragment } from "react";
import Header from "../../components/Header";

interface Props {}

const User = (props: Props) => {
    return (
        <Fragment>
            <Header />
            <section className="container flexCenter  text-2xl">
                <div>
                    <h1>Welcome to keeper, anything in mind? Write it down</h1>
                </div>
                <div>
                    <button></button>
                </div>
            </section>
        </Fragment>
    );
};

export default User;
