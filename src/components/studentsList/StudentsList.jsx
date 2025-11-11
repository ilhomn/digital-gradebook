import React, { useEffect, useState } from "react";
import "./StudentsList.css";
import IP from "../../config";
import { useParams } from "react-router-dom";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function StudentsList() {
  const { id } = useParams();

  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([]);
  const [days, setDays] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const group = async () => {
    try {
      const response = await fetch(`${IP}/get-group-data/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: window.localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Группа получена:", data.data);
        setStudents(data.data.students);
        setDays(data.data.days);
      } else {
        console.error("Ошибка при получении группы:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Ошибка при получении группы:", error);
      return [];
    }
  };
  const handleCellClick = (student, day) => {
    const current = attendance[student]?.[day] || "";
    let next;
    if (current === "") next = "n";
    else if (current === "n") next = "l";
    else next = "";
    setAttendance((prev) => ({
      ...prev,
      [student]: {
        ...prev[student],
        [day]: next,
      },
    }));
  };

  const sendAttendance = async () => {
    try {
      const response = await fetch(`${IP}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendance),
      });

      const data = await response.json();
      console.log("Ответ с сервера:", data);
      alert("Данные успешно отправлены!");
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Ошибка при отправке данных!");
    }
  };
  useEffect(() => {
    group();
  }, []);

  return (
    <div className="students-list">
      <div className="studentItems">
        <div className="students">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                {console.log(days)}
                {days &&
                  days[currentYear] &&
                  days[currentYear][months[currentMonth]] &&
                  days[currentYear][months[currentMonth]].map((day) => (
                    <th key={day}>{day}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((student, idx) => (
                  <tr key={idx}>
                    <td className="student-name">
                      {student.english_last_name} {student.english_first_name}
                    </td>
                    {days[currentYear][months[currentMonth]].map((day) => (
                      <td
                        key={day}
                        className="student-day"
                        onClick={() => handleCellClick(student, day)}
                      >
                        {attendance[student]?.[day]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          <button onClick={sendAttendance} className="save-button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default StudentsList;
