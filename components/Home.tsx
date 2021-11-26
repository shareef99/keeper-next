import type { NextPage } from "next";
import Link from "next/link";
import Typed from "typed.js";
import { useRef, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

interface Props {}

const Home: NextPage = (props: Props) => {
    const el = useRef<HTMLSpanElement>(null);
    const { login, user } = useAuth();

    useEffect(() => {
        const typed = new Typed(el.current!, {
            strings: ["thoughts", "schedule", "secrets", "plans", "notes"],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 100,
            smartBackspace: true,
            loop: true,
            showCursor: true,
            cursorChar: "!",
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="container grid md:grid-cols-2 md:place-items-center h-screen">
            <div className="place-self-center w-full">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl w-full text-center text-darkBlue">
                    <span className="inline-block md:mb-4">Keep your</span>
                    <div className="h-16">
                        <span
                            ref={el}
                            className="bg-gradient-to-b from-cream to-lightBlue 
                                p-2 underline inline-block"
                        ></span>
                    </div>
                    <span className="inline-block mt-4 lg:mt-12">
                        in keeper
                    </span>
                </h1>
            </div>
            <div className="self-start place-self-center md:self-center">
                {user ? (
                    <div
                        className="px-3 py-2 rounded-md font-black text-xl shadow-md
                            bg-gradient-to-br from-cream to-lightBlue cursor-pointer
                            hover:from-lightBlue hover:to-cream"
                    >
                        <Link href={`/user/${user.displayName}`}>
                            <button>Go To Keep &#10230;</button>
                        </Link>
                    </div>
                ) : (
                    <div
                        className="rowCenter space-x-2 px-6 py-4 rounded-md bg-lightBrown 
                            cursor-pointer bg-opacity-75 hover:opacity-90 focus:opacity-90
                            transition-opacity duration-300 ease-in"
                        onClick={login}
                    >
                        <FcGoogle size="2rem" />
                        <button className="font-medium text-xl text-darkBlue">
                            Continue with Google
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
