import HighlightIcon from "@material-ui/icons/Highlight";

interface Props {}

const Header = (props: Props) => {
    return (
        <header className="px-4 py-8 flexCenter text-darkBlue bg-lightBrown shadow-md">
            <div
                className="font-extralight text-3xl"
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
