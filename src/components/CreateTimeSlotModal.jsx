import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./UserModal.css";
import "./CreateTimeSlotModal.css";
import { VscClose } from "react-icons/vsc";
import IP from "../config";

const CreateTimeSlotsModal = ({ isOpen, onClose }) => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [name, setName] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    const handleDateClick = (date) => {
        const dateStr = date.toDateString();
        if (selectedDates.find((d) => d.toDateString() === dateStr)) {
            setSelectedDates((prev) =>
                prev.filter((d) => d.toDateString() !== dateStr)
            );
        } else {
            setSelectedDates((prev) => [...prev, date]);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (!name) {
            alert("Хотя бы укажи день!");
            return;
        }
        if (selectedDates.length === 0) {
            alert("Выберите хотя бы одну дату!");
            return;
        }
        
        const changedDatesFromUnreadableVariantToReadableSoAsOthersCouldUnderstandThisReadableFormatOfThatUnreadableFormat_yes = selectedDates.map(d => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return Number(`${y}${m}${day}`);
        } 
            // parseInt(d.toISOString().slice(0, 10).replace(/-/g, ""))
        );
        // const datesToSend = selectedDates.map((d) =>
        //     parseInt(d.toISOString().slice(0, 10).replace(/-/g, ""))
        // );

        try {
            const response = await fetch(`${IP}/create-timeslot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({
                    name: name,
                    timeslot: changedDatesFromUnreadableVariantToReadableSoAsOthersCouldUnderstandThisReadableFormatOfThatUnreadableFormat_yes,
                }),
            });

            const data = await response.json();
            alert(data.message || "Даты успешно сохранены!");

            onClose(); // close modal after saving
        } catch (err) {
            console.error(err);
            alert("Ошибка отправки данных на сервер");
        }
    };

    return (
        <div className={`modal-backdrop ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div
                className={`modal-card ${isOpen ? "open" : ""}`}
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                <div className="modal-header">
                    <h2>Create Time Slot:</h2>
                    <button className="close-btn" onClick={onClose}>
                        <VscClose />
                    </button>
                </div>

                <form className="modal-form" onSubmit={handleSave}>
                    <label htmlFor="" className="modal-label"> Name: </label>
                    <input
                        type="text"
                        placeholder="Days of the week: "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="" className="modal-label"> Dates: </label>
                    <div className="calendarContainer">
                        <Calendar
                            onClickDay={handleDateClick}
                            value={new Date()}
                            selectRange={false}
                            tileClassName={({ date }) =>
                                selectedDates.find(
                                    (d) => d.toDateString() === date.toDateString()
                                )
                                    ? "selected-date"
                                    : null
                            }
                        />
                    </div>

                    <button className="submit-btn">
                        Create Time Slot
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTimeSlotsModal;
