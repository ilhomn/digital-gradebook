import React, { useEffect, useState } from "react";
import "./StudentsList.css";
import IP, { getUserData } from "../../config";
import { useParams, useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [days, setDays] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [userRole, setUserRole] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const currentYear = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const fetchGroup = async () => {
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

    const index = attendance.findIndex((item) => item.student_id === studentId);
    if (index === -1) return;

    const student = attendance[index];
    const monthData =
      student.attendance?.[currentYear]?.[months[currentMonth]] || {};

    let current = monthData[day] || "";

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
                  ...monthData,
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

  const exportToExcelCSV = async () => {
    if (!attendance.length) {
      alert("Нет данных для экспорта!");
      return;
    }

    const availableMonths = Object.keys(days[currentYear] || {})
      .filter((month) => days[currentYear][month]?.length > 0)
      .sort((a, b) => months.indexOf(a) - months.indexOf(b));

    const effectiveMonth = availableMonths.includes(months[currentMonth])
      ? months[currentMonth]
      : availableMonths[0];

    const monthDays = days?.[currentYear]?.[effectiveMonth] || [];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");

    // Добавляем строку с названием группы
    worksheet.addRow([`Group: ${groupName}`]);

    // Добавляем строку с месяцем
    worksheet.addRow([`Month: ${effectiveMonth}`]);

    // Пустая строка для отступа
    worksheet.addRow([]);

    // Заголовки
    worksheet.addRow(["Student", ...monthDays]);

    // Символы для отображения
    const attendanceSymbols = {
      absent: "x",
      late: "△",
      present: "",
    };

    // Добавляем строки с учениками
    students.forEach((student) => {
      const studentId =
        student.student_id ||
        student._id ||
        student.id ||
        student.studentId ||
        student.id_student;

      const studentAttendance =
        attendance.find((item) => item.student_id === studentId)?.attendance?.[
          currentYear
        ]?.[effectiveMonth] || {};

      const rowValues = [
        `${student.english_last_name} ${student.english_first_name}`,
        ...monthDays.map(
          (day) => attendanceSymbols[studentAttendance[day] || "present"]
        ),
      ];

      const row = worksheet.addRow(rowValues);

      // Задаем цвет текста
      monthDays.forEach((day, idx) => {
        const colIndex = idx + 2; // первый столбец это имя
        const cell = row.getCell(colIndex);
        const val = cell.value;

        if (val === "x") {
          // cell.font = { color: { argb: "FFFF0000" } }; // красный
        } else if (val === "△") {
          // cell.font = { color: { argb: "FFFFFF00" } }; // желтый
        } else {
          // cell.font = { color: { argb: "FF00FF00" } }; // зеленый
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `${groupName}_${effectiveMonth}_${currentYear}.xlsx`
    );
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        const userData = await getUserData(token);
        if (userData && userData.status) {
          setUserRole(userData.status);
        }
      }
    };

    fetchUserRole();
    fetchGroup();
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
            <button className="back-button" onClick={() => navigate(-1)}>
              &#x2190; Back
            </button>
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
          <div className="legend">
            <p><span className="legend-symbol">x</span> - Absent</p>
            <p><span className="legend-symbol">△</span> - Late</p>
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

                const studentAttendance =
                  attendance.find((item) => item.student_id === studentId)
                    ?.attendance?.[currentYear]?.[effectiveMonth] || {};

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
                        {attendanceSymbols[studentAttendance[day]] || ""}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="buttons-wrapper">
            <button
              onClick={sendAttendance}
              className="save-button"
              disabled={sending}
            >
              {sending ? <div className="mini-loader"></div> : "Save"}
            </button>
            {userRole === "admin" && (
              <button onClick={exportToExcelCSV} className="save-button">
                Export Excel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsList;
