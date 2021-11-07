import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Home from "../components/Home";

const Main: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>Keeper | Shareef</title>
            </Head>
            <Fragment>
                <Home />
            </Fragment>
        </Fragment>
    );
};

export default Main;
