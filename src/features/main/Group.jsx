import React, { useEffect, useState } from "react";
import "./Group.css";
import { useParams } from "react-router-dom";
import IP, { interfaceLangs } from "../../config";
import { FaCheck, FaClockRotateLeft, FaX } from "react-icons/fa6";
import Sidebar from "../../components/Sidebar";
import { VscMenu } from "react-icons/vsc";

let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

const monthNumbers = {
    "January": "01",
    "February": "02",
    "March": "03",
    "April": "04",
    "May": "05",
    "June": "06",
    "July": "07",
    "August": "08",
    "September": "09",
    "October": "10",
    "November": "11",
    "December": "12",
};

const Group = ({ lang, setLang, token }) => {
    const { id } = useParams();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(interfaceLangs[lang].group.months[currentMonth]);
    const [attendance, setAttendance] = useState({});
    const [dirtyAttendance, setDirtyAttendance] = useState({});

    const [groupData, setGroupData] = useState({});
    const [students, setStudents] = useState([]);
    const [days, setDays] = useState({});

    const handleCloseSidebar = () => setIsSidebarOpen(false);

    const handleYearChange = (e) => {
        const year = e.target.value;

        setSelectedYear(year);

        const firstMonth = days && Object.keys(days[year])[0];
        setSelectedMonth(firstMonth);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const toggleAttendance = (studentId, year, month, day) => {
        if (userData.status !== "admin" && userData.status !== "teacher") return;

        const date = `${year}-${monthNumbers[month]}-${String(day).padStart(2, "0")}`;
        const key = `${date}_${studentId}`;
        const current = attendance[key];

        let next;
        if (!current) next = "present";
        else if (current === "present") next = "absent";
        else if (current === "absent") next = "late";
        else next = "present";

        setAttendance(prev => ({ ...prev, [key]: next }));
        setDirtyAttendance(prev => ({ ...prev, [key]: next }));
    };

    const exportMatrix = async () => {
        try {
            const response = await fetch(
                `${IP}/export-attendance-matrix/${id}?year=${selectedYear}&month=${monthNumbers[selectedMonth]}&group_name=${groupData.name}`,
                {
                    method: "GET",
                    headers: { token },
                }
            );

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;
            a.download = `Attendance_${groupData.name}_${selectedMonth}_${selectedYear}.xlsx`;
            a.click();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        const records = [];

        for (const key in dirtyAttendance) {
            const [date, student_id] = key.split("_");

            records.push({
                student_id,
                group_id: groupData.id,
                group_name: groupData.name,
                date,
                status: dirtyAttendance[key],
            });
        }

        if (!records.length) {
            alert("Нет изменений");
            return;
        }

        try {
            const res = await fetch(`${IP}/save-attendance`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                body: JSON.stringify({ records }),
            });

            if (res.ok) {
                alert("Attendance saved!");
                setDirtyAttendance({});
            } else {
                console.error(await res.json());
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch(`${IP}/get-group-data/${id}`, {
                    headers: { token },
                });

                if (res.ok) {
                    const { data } = await res.json();
                    const map = {};

                    data.group_attendance.forEach(item => {
                        const date = item.date.split("T")[0];
                        map[`${date}_${item.student_id}`] = item.status;
                    });

                    console.log(data);

                    setGroupData(data.group_data);
                    setStudents(data.group_students);
                    setDays(data.group_schedule.days);
                    setAttendance(map);

                    const year = Object.keys(data.group_schedule.days || {})[0];
                    const month = year ? Object.keys(data.group_schedule.days[year])[0] : "";

                    setSelectedYear(year);
                    setSelectedMonth(month);
                }

                const userRes = await fetch(`${IP}/get-user-data`, {
                    headers: { token },
                });

                if (userRes.ok) {
                    const u = await userRes.json();
                    setUserData(u.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        loadData();
    }, [id, token]);

    return (
        <div
            className="students-list"
            onClick={() => {
                if (isSidebarOpen) handleCloseSidebar();
            }}
        >
            <div
                className="sidebar-toggle-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsSidebarOpen(true);
                }}
            >
                <VscMenu />
            </div>
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                handleClose={handleCloseSidebar}
                status={userData.status}
                lang={lang}
                setLang={setLang}
            />
            <div className="studentItems">
                <div className="students">
                    <div className="list-header">
                        <div className="group-name"> {groupData.name} </div>
                        {/* <div className="current-month"> 
                            {months[currentMonth]} {currentYear} 
                        </div> */}
                        <div className="year-month-wrapper">
                            <div className="select-small-wrapper">
                                <select value={selectedYear} onChange={handleYearChange}>
                                    {Object.keys(days).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="select-small-wrapper">
                                <select value={selectedMonth} onChange={handleMonthChange}>
                                    {days &&
                                        days[selectedYear] &&
                                        Object.keys(days[selectedYear]).map((month) => (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <button className="back-button" onClick={exportMatrix}>
                                {interfaceLangs[lang].group.exportToExcel}
                            </button>
                        </div>
                    </div>

                    <div className="legend">
                        <p>
                            <span className="legend-symbol status-present">
                                {" "}
                                <FaCheck />{" "}
                            </span>{" "}
                            {interfaceLangs[lang].group.present}
                        </p>
                        <p>
                            <span className="legend-symbol status-absent">
                                {" "}
                                <FaX />{" "}
                            </span>{" "}
                            {interfaceLangs[lang].group.absent}
                        </p>
                        <p>
                            <span className="legend-symbol status-late">
                                {" "}
                                <FaClockRotateLeft />{" "}
                            </span>{" "}
                            {interfaceLangs[lang].group.late}
                        </p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{interfaceLangs[lang].group.student}</th>
                                {days &&
                                    days[selectedYear] &&
                                    days[selectedYear][selectedMonth] &&
                                    days[selectedYear][selectedMonth].map((day, index) => (
                                        <th key={index}> {day} </th>
                                    ))}
                            </tr>
                        </thead>

                        <tbody>
                            {students.length > 0 &&
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td> {student.student_name_en} </td>

                                        {days &&
                                            days[selectedYear] &&
                                            days[selectedYear][selectedMonth] &&
                                            days[selectedYear][selectedMonth].map((day, index) => (
                                                <td
                                                    key={index}
                                                    className="day-cell"
                                                    onClick={() =>
                                                        toggleAttendance(
                                                            student.id,
                                                            selectedYear,
                                                            selectedMonth,
                                                            day
                                                        )
                                                    }
                                                >
                                                    {attendance[
                                                        `${selectedYear}-${monthNumbers[selectedMonth]
                                                        }-${String(day).padStart(2, "0")}_${student.id}`
                                                    ] === "present" ? (
                                                        <FaCheck className="status-present" />
                                                    ) : attendance[
                                                        `${selectedYear}-${monthNumbers[selectedMonth]
                                                        }-${String(day).padStart(2, "0")}_${student.id}`
                                                    ] === "absent" ? (
                                                        <FaX className="status-absent" />
                                                    ) : attendance[
                                                        `${selectedYear}-${monthNumbers[selectedMonth]
                                                        }-${String(day).padStart(2, "0")}_${student.id}`
                                                    ] === "late" ? (
                                                        <FaClockRotateLeft className="status-late" />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                ))}
                            <tr>
                                <td colSpan={days[selectedYear] && days[selectedYear][selectedMonth] ? days[selectedYear][selectedMonth].length + 2 : 2} style={{ textAlign: "end" }}>{interfaceLangs[lang].group.totalStudents}: {students.length} </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="buttons-wrapper">
                        {userData.status === "admin" || userData.status === "teacher" ? (
                            <button className="save-button" onClick={handleSave}>
                                {interfaceLangs[lang].group.save}
                            </button>
                        ) : (
                            <div className="info-text">
                                {interfaceLangs[lang].group.attendanceEditNotAllowed}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Group;
