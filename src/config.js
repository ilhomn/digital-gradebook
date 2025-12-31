const IP = import.meta.env.VITE_API_URL;

export const interfaceLangs = {
    tj: {
        sidebar: {
            dashboard: "Асосӣ", adminPanel: "Панели Администратор", logout: "Баромадан",
        },
        manage: {
            createUser: "Сохтани Корбар", createGroup: "Сохтани Гурӯҳ", createTimeslot: "Сохтани Фосилаи Вақт", uploadStudents: "Боргузории Донишҷӯён",
            createStudent: "Сохтани Донишҷӯ", users: "Истифодабарандагон", students: "Донишҷӯён", groups: "Гурӯҳҳо", timeslots: "Фосилаҳои Вақт"
        },
        group: {
            months: [
                "Январ", "Феврал", "Март", "Апрел", "Май", "Июн",
                "Июл", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр"
            ],
            exportToExcel: "Ирсол ба Excel",
            present: "Ҳозир",
            absent: "Ғоиб",
            late: "Дер",
            student: "Донишҷӯ",
            save: "Захира кардан"
        }
    },
    en: {
        sidebar: {
            dashboard: "Dashboard", adminPanel: "Admin Panel", logout: "Logout",
        },
        manage: {
            createUser: "Create User", createGroup: "Create Group", createTimeslot: "Create Timeslot", uploadStudents: "Upload Students",
            createStudent: "Create Student", users: "Users", students: "Students", groups: "Groups", timeslots: "Timeslots"
        },
        group: {
            months: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            exportToExcel: "Export To Excel",
            present: "Present",
            absent: "Absent",
            late: "Late",
            student: "Student",
            save: "Save"
        }
    },
    kr: {
        sidebar: {
            dashboard: "대시보드", adminPanel: "관리자 패널", logout: "로그아웃",
        },
        manage: {
            createUser: "사용자 생성", createGroup: "그룹 생성", createTimeslot: "시간 슬롯 생성", uploadStudents: "학생 업로드",
            createStudent: "학생 생성", users: "사용자", students: "학생", groups: "그룹", timeslots: "시간 슬롯"
        },
        group: {
            months: [
                "1월", "2월", "3월", "4월", "5월", "6월",
                "7월", "8월", "9월", "10월", "11월", "12월"
            ],
            exportToExcel: "Excel로 내보내기",
            present: "출석",
            absent: "결석",
            late: "지각",
            student: "학생",
            save: "저장"
        }
    }
}

export const getUserData = async (token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/get-user-data`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data) {
                return data.data;
            }
        } else {
            return "Error";
        }
    } catch (error) {
        console.error(error);
    }
};

export default IP;
