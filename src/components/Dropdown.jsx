import React, { useState, useRef, useEffect } from "react";
import { VscChevronDown } from "react-icons/vsc";
import "./UserModal.css"; // Assuming you want to use your modal dropdown styles

const Dropdown = ({ options = [], value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="custom-dropdown"
            ref={dropdownRef}
            onClick={() => setIsOpen(!isOpen)}
        >
            <span className="dropdown-selected">{value}</span>
            <VscChevronDown className={`dropdown-icon ${isOpen ? "open" : ""}`} />

            {isOpen && (
                <div className="dropdown-options">
                    {options.map((option) => (
                        <div
                            key={option}
                            className="dropdown-option"
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
