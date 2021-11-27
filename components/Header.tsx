import Highlight from "@mui/icons-material/Highlight";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";

interface Props {}

const Header = (props: Props) => {
    const { logout } = useAuth();

    return (
        <header className="py-4 flex justify-around items-center text-darkBlue shadow-md">
            <div
                className="font-extralight text-3xl cursor-default"
                style={{
                    fontFamily: "McLaren, cursive",
                }}
            >
                <Highlight className="mb-2 text-darkBlue" /> Keeper
            </div>
            <div className="mt-[5px]" title="Logout">
                <button onClick={logout}>
                    <RiLogoutCircleRLine
                        className="text-darkBlue"
                        size="1.5rem"
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;
