import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>Keeper | Shareef</title>
            </Head>
            <div>
                <h1 className="text-red-300">Hello World!</h1>
                <div>
                    <ul className="flex">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
