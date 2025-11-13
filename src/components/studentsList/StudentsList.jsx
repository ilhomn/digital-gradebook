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
  absent: "x",
  late: "△",
  present: "",
};

function StudentsList() {
  const { id } = useParams();
  const [attendance, setAttendance] = useState([]);
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

      setAttendance(data.data.students || []);

      setStudents(data.data.students);
      setDays(data.data.days);
    } catch (error) {
      console.error("Ошибка при получении группы:", error);
    }
  };

  const handleCellClick = (studentId, day) => {
    if (!studentId) return;

    console.log(
      attendance[attendance.findIndex((item) => item.student_id == studentId)][
        "attendance"
      ]?.[currentYear]?.[months[currentMonth]]?.[day]
    );

    let current =
      attendance[attendance.findIndex((item) => item.student_id === studentId)][
        "attendance"
      ]?.[currentYear]?.[months[currentMonth]]?.[day] || "";

    if (current === "") current = "absent";
    else if (current === "absent") current = "late";
    else if (current === "late") current = "";

    setAttendance((prev) => {
      return prev.map((item) => {
        if (item.student_id === studentId) {
          return {
            ...item,
            attendance: {
              ...item.attendance,
              [currentYear]: {
                ...item.attendance[currentYear],
                [months[currentMonth]]: {
                  ...item.attendance[currentYear][months[currentMonth]],
                  [day]: current,
                },
              },
            },
          };
        } else {
          return item;
        }
      });
    });
  };

  const sendAttendance = async () => {
    if (!Object.keys(attendance).length) {
      alert("Нет данных для отправки!");
      return;
    }

    console.log(attendance);

    const payload = {
      groupId: id,
      month: months[currentMonth],
      year: currentYear,
      attendance,
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
                        value={attendance[studentId]?.[day] || ""}
                      >
                        {attendanceSymbols[
                          attendance[
                            attendance.findIndex(
                              (item) => item.student_id == studentId
                            )
                          ]["attendance"]?.[currentYear]?.[
                            months[currentMonth]
                          ]?.[day]
                        ] || ""}
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
