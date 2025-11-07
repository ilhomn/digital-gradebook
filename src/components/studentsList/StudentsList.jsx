import React, { useState } from "react";
import "./StudentsList.css";

const days = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];

const students = [
  "Икроми Анушервон",
  "Мукумов Мухаммад",
  "Ниёзов Алишер",
  "Шокири Мухаммадризо",
  "Лоиков Шахбоз",
  "Носиров Алишер",
  "Нозимов Илхом",
  "Файззода Амир",
  "Раджабов Илхом",
  "Тургинов Абубакр",
];

function StudentsList() {
  const [attendance, setAttendance] = useState({});

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

  return (
    <div className="students-list">
      <div className="studentItems">
        <div className="students">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                {days.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student}>
                  <td className="student-name">{student}</td>
                  {days.map((day) => (
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
        </div>
      </div>
    </div>
  );
}

export default StudentsList;
