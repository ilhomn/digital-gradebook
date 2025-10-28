import React from "react";
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
  return (
    <div className="students-list">
      <div className="studentItems">
        <div className="students">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                {days.map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="student-name">{student}</td>
                  {days.map((day, index) => (
                    <td key={index} className="student-day"></td>
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
