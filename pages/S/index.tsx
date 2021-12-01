import { FormEvent, useState } from "react";

interface Props {}

const SecretPage = (props: Props) => {
    const [secret, setSecret] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (secret === "secret") {
            alert("You found the secret!");
        } else {
            alert("You didn't find the secret!");
        }
    };

    return (
        <section className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl m-4 text-center font-bold -mt-8 text-darkBlue ">
                Welcome Back Master Shareef
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="secret"
                    id="secret"
                    className="bg-transparent border-b-2 border-darkBlue text-xl p-2
                        hover:border-darkBlue focus:border-darkBlue focus:outline-none
                        text-center font-medium"
                    placeholder="Enter Secret"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                />
            </form>
        </section>
    );
};

export default SecretPage;
