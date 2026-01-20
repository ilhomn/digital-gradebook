import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./UserModal.css";
import "./CreateTimeSlotModal.css";
import { VscClose } from "react-icons/vsc";
import IP from "../config";

const CreateTimeSlotsModal = ({ isOpen, onClose, token, timeslotData }) => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [name, setName] = useState("");

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
            alert("Хотя бы мяу мяу скажи!");
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
        });

        try {
            if (timeslotData) {
                const response = await fetch(`${IP}/update-timeslot/${timeslotData.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token,
                    },
                    body: JSON.stringify({
                        name: name,
                        timeslot: changedDatesFromUnreadableVariantToReadableSoAsOthersCouldUnderstandThisReadableFormatOfThatUnreadableFormat_yes,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                    onClose();
                    window.location.reload();
                }
            } else {
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
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            alert("Ошибка отправки данных на сервер");
        }
    };

    useEffect(() => {
        if (timeslotData) {
            setName(timeslotData.name);
            setSelectedDates([]);
        }
    }, [timeslotData]);

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
