import type { NextPage } from "next";

const Home: NextPage = () => {
    return (
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
    );
};

export default Home;
