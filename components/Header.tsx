import HighlightIcon from "@material-ui/icons/Highlight";

interface Props {}

const Header = (props: Props) => {
    return (
        <header className="py-4 flexCenter text-darkBlue shadow-md">
            <div
                className="font-extralight text-3xl cursor-default"
                style={{
                    fontFamily: "McLaren, cursive",
                }}
            >
                <HighlightIcon className="mb-2 text-darkBlue" /> Keeper
            </div>
        </header>
    );
};

export default Header;
