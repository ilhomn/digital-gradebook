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

const attendanceSymbols = {
  o: "present",
  x: "absent",
  "△": "late",
  "": "present",
};

const attendanceSymbolsReverse = {
  present: "o",
  absent: "x",
  late: "△",
};

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

      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();

      setStudents(data.data.students);
      setDays(data.data.days);
    } catch (error) {
      console.error("Ошибка при получении группы:", error);
    }
  };

  const handleCellClick = (studentId, day) => {
    if (!studentId) return;

    const current = attendance[studentId]?.[day] || "";
    let next = "";

    if (current === "") next = "x";
    else if (current === "x") next = "o";
    else if (current === "o") next = "△";
    else if (current === "△") next = "x";

    const newState = {
      ...attendance,
      [studentId]: {
        ...attendance[studentId],
        [day]: attendanceSymbols[next],
      },
    };

    setAttendance(newState);
  };

  const sendAttendance = async () => {
    if (!Object.keys(attendance).length) {
      alert("Нет данных для отправки!");
      return;
    }

    const payload = {
      groupId: id,
      month: months[currentMonth],
      year: currentYear,
      attendance: Object.entries(attendance).map(([studentId, days]) => ({
        studentId,
        days,
      })),
    };

    try {
      const response = await fetch(`${IP}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: window.localStorage.getItem("token"),
        },
        body: JSON.stringify({ payload }),
      });

      const data = await response.json();
      console.log("✅ Ответ с сервера:", data);
      alert("Данные успешно отправлены!");
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Ошибка при отправке данных!");
    }
  };

  useEffect(() => {
    group();
  }, []);

  if (!days) return <div>Загрузка...</div>;

  const monthDays = days[currentYear]?.[months[currentMonth]] || [];

  return (
    <div className="students-list">
      <div className="studentItems">
        <div className="students">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                {monthDays.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => {
                const studentId =
                  student.student_id ||
                  student._id ||
                  student.id ||
                  student.studentId ||
                  student.id_student;

                return (
                  <tr key={idx}>
                    <td className="student-name">
                      {student.english_last_name} {student.english_first_name}
                    </td>
                    {monthDays.map((day) => (
                      <td
                        key={day}
                        className="student-day"
                        onClick={() => handleCellClick(studentId, day)}
                      >
                        {attendance[studentId]?.[day] ||
                          attendanceSymbolsReverse[
                            student.attendance?.[currentYear]?.[
                              months[currentMonth]
                            ]?.[day]
                          ] ||
                          ""}
                      </td>
                    ))}
                  </tr>
                );
              })}
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
