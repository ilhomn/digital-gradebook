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
  const [groupName, setGroupName] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const currentYear = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const group = async () => {
    setLoading(true);
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
      setDays(data.data.days || {});
      setGroupName(data.data.name);
    } catch (error) {
      console.error("Ошибка при получении группы:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (studentId, day) => {
    if (!studentId) return;

    let current =
      attendance[attendance.findIndex((item) => item.student_id === studentId)]
        ?.attendance?.[currentYear]?.[months[currentMonth]]?.[day] || "";

    if (current === "") current = "absent";
    else if (current === "absent") current = "late";
    else if (current === "late") current = "";

    setAttendance((prev) =>
      prev.map((item) => {
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
        }
        return item;
      })
    );
  };

  const sendAttendance = async () => {
    if (!attendance.length) {
      alert("Нет данных для отправки!");
      return;
    }

    setSending(true);

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
      console.log("Ответ:", data);
      alert("Данные успешно отправлены!");
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка при отправке данных!");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    group();
  }, []);

  if (loading || !days) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const availableMonths = Object.keys(days[currentYear] || {})
    .filter((month) => days[currentYear][month]?.length > 0)
    .sort((a, b) => months.indexOf(a) - months.indexOf(b));

  const effectiveMonth = availableMonths.includes(months[currentMonth])
    ? months[currentMonth]
    : availableMonths[0];

  const monthDays = days?.[currentYear]?.[effectiveMonth] || [];

  return (
    <div className="students-list">
      <div className="studentItems">
        <div className="students">
          <div className="list-header">
            <span className="group-name">{groupName}</span>

            <div className="select-wrapper">
              <select
                value={availableMonths.indexOf(effectiveMonth)}
                onChange={(e) =>
                  setCurrentMonth(
                    months.indexOf(availableMonths[e.target.value])
                  )
                }
              >
                {availableMonths.map((month, idx) => (
                  <option key={month} value={idx}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
                        {attendanceSymbols[
                          attendance[
                            attendance.findIndex(
                              (item) => item.student_id === studentId
                            )
                          ]?.attendance?.[currentYear]?.[effectiveMonth]?.[day]
                        ] || ""}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            onClick={sendAttendance}
            className="save-button"
            disabled={sending}
          >
            {sending ? <div className="mini-loader"></div> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentsList;
