import React, { useEffect } from "react";
import "./Group.css";
import { useParams } from "react-router-dom";
import IP from "../../../config";

const Group = () => {
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${IP}/get-group-data/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": window.localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const { data } = await response.json();

                console.log(data);
            }
        };

        getData();
    }, []);
    
    return (
        <div class="students-list">
            <div class="studentItems">

                <div class="students">

                    <div class="list-header">
                        <div class="group-name">Group A</div>
                        <div class="current-month">February 2025</div>
                    </div>

                    <div class="legend">
                        <p><span class="legend-symbol">✓</span> Present</p>
                        <p><span class="legend-symbol">✗</span> Absent</p>
                        <p><span class="legend-symbol">L</span> Late</p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Akmal</td>
                                <td class="student-day">✓</td>
                                <td class="student-day">✓</td>
                                <td class="student-day">✗</td>
                                <td class="student-day">✓</td>
                                <td class="student-day">L</td>
                                <td class="student-day"></td>
                            </tr>

                            <tr>
                                <td>Fatima</td>
                                <td class="student-day">✓</td>
                                <td class="student-day">✓</td>
                                <td class="student-day">✓</td>
                                <td class="student-day">✗</td>
                                <td class="student-day"></td>
                                <td class="student-day"></td>
                            </tr>

                            <tr>
                                <td>Omar</td>
                                <td class="student-day">✗</td>
                                <td class="student-day">✓</td>
                                <td class="student-day">✓</td>
                                <td class="student-day">✓</td>
                                <td class="student-day">✓</td>
                                <td class="student-day"></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="buttons-wrapper">
                        <button class="back-button">Back</button>
                        <button class="save-button">Save</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Group;
