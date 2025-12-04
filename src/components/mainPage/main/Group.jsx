import React, { useEffect, useState } from "react";
import "./Group.css";
import { useParams } from "react-router-dom";
import IP from "../../../config";
import { FaCheck, FaClockRotateLeft, FaX } from "react-icons/fa6";
import Sidebar from "../../resources/Sidebar";
import { VscMenu } from "react-icons/vsc";

let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Group = () => {
    const { id } = useParams();

    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
    const [ userData, setUserData ] = useState({});

    const [ groupData, setGroupData ] = useState({});
    const [ students, setStudents ] = useState([]);
    const [ days, setDays ] = useState([]);

    const handleCloseSidebar = () => setIsSidebarOpen(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${IP}/get-group-data/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": window.localStorage.getItem("token"),
                    },
                });
    
                if (response.ok) {
                    const { data } = await response.json();
    
                    setGroupData(data.group_data);
                    setStudents(data.group_students);
                    setDays(data.group_schedule.days);
                }
                const userResponse = await fetch(`${IP}/get-user-data`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": window.localStorage.getItem("token"),
                    },
                });

                if (userResponse.ok) {
                    const data = await userResponse.json();

                    setUserData(await data.data);
                }                
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, [id]);
    
    return (
        <div className="students-list">
            <div
                className="sidebar-toggle-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsSidebarOpen(true);
                }}>
                <VscMenu />
            </div>
            <Sidebar isSidebarOpen={isSidebarOpen} handleClose={handleCloseSidebar} status={userData.status} />
            <div className="studentItems">

                <div className="students">

                    <div className="list-header">
                        <div className="group-name"> {groupData.name} </div>
                        <div className="current-month"> {months[currentMonth]} {currentYear} </div>
                    </div>

                    <div className="legend">
                        <p><span className="legend-symbol"> <FaCheck /> </span> Present</p>
                        <p><span className="legend-symbol"> <FaX /> </span> Absent</p>
                        <p><span className="legend-symbol"> <FaClockRotateLeft /> </span> Late</p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                {days && days[currentYear] && days[currentYear][months[currentMonth]] && days[currentYear][months[currentMonth]].map((day, index) => (
                                    <th key={index}> {day} </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {students.length > 0 && students.map((student, index) => (
                                <tr key={index}>
                                    <td> {student.student_name_english} </td>

                                    {days && days['2025'] && days['2025']['December'] && days['2025']['December'].map((day, index) => (
                                        <td key={index}> </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="buttons-wrapper">
                        <button className="back-button">Back</button>
                        <button className="save-button">Save</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Group;
