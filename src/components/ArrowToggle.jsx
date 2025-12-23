import { VscChevronDown } from "react-icons/vsc";
import "./Arrow.css";

const ArrowToggle = ({ open, onClick }) => {
    return (
        <button className="arrow-btn" onClick={onClick}>
            <VscChevronDown className={`arrow-icon ${open ? "open" : ""}`} />
        </button>
    );
};

export default ArrowToggle;
