import React, { useState, useEffect } from "react";
import "./UpdateUser.css";
import IP from "../../../config";

const UpdateUser = () => {
  const [token, setToken] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");

  const [newUsername, setNewUsername] = useState("");

  const [password, setPassword] = useState("");
  const [fullNameKorean, setFullNameKorean] = useState("");
  const [fullNameEnglish, setFullNameEnglish] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [status, setStatus] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    else setError("Token not found. Please log in.");
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const usersRes = await fetch(`${IP}/get-all-users`, {
          method: "GET",
          headers: { "Content-Type": "application/json", token: token },
        });
        const usersData = await usersRes.json();
        setAllUsers(usersData.data || []);

        const groupsRes = await fetch(`${IP}/get-groups`, {
          method: "GET",
          headers: { "Content-Type": "application/json", token },
        });
        const groupsData = await groupsRes.json();
        setGroups(groupsData.data || []);
      } catch (err) {
        console.error("Failed to fetch initial data", err);
        setError("Не удалось загрузить пользователей или группы.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [token]);

  useEffect(() => {
    if (!selectedUsername || !token) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${IP}/get-user-data/${selectedUsername}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json", token },
          }
        );
        const data = await response.json();

        if (response.ok && data.data) {
          const user = data.data;
          setNewUsername(user.username || "");

          setPassword("");
          setFullNameKorean(user.fullname_korean || "");
          setFullNameEnglish(user.fullname_english || "");
          setSelectedGroups(user.groups || []);
          setStatus(user.status || "");
        } else {
          alert(
            "Не удалось получить детали пользователя: " +
              (data.message || "Неизвестная ошибка")
          );
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        alert("Ошибка при загрузке данных пользователя.");
      }
    };

    fetchUserData();
  }, [selectedUsername, token]);

  const handleChange = (setter) => (e) => setter(e.target.value);

  const handleSelectGroup = (e) => {
    const groupName = e.target.value;
    if (groupName && !selectedGroups.includes(groupName)) {
      setSelectedGroups((prev) => [...prev, groupName]);
    }
    e.target.value = "";
  };

  const handleRemoveGroup = (groupToRemove) => {
    setSelectedGroups((prev) => prev.filter((g) => g !== groupToRemove));
  };

  const handleUpdateUser = async () => {
    if (!selectedUsername || !newUsername) {
      alert("Пожалуйста, выберите пользователя и заполните Username!");
      return;
    }

    const body = {
      new_username: newUsername,
      new_fullname_korean: fullNameKorean,
      new_fullname_english: fullNameEnglish,
      new_groups: selectedGroups,
      new_status: status,
      ...(password && { new_password: password }),
    };

    try {
      const response = await fetch(`${IP}/update-user/${selectedUsername}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || `Пользователь ${newUsername} успешно обновлен!`);
        setPassword("");

        if (newUsername !== selectedUsername) {
          const updatedUsers = allUsers.map((user) =>
            user.username === selectedUsername
              ? { ...user, username: newUsername }
              : user
          );
          setAllUsers(updatedUsers);
          setSelectedUsername(newUsername);
        }
      } else {
        alert(data.message || "Ошибка при обновлении пользователя.");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сети при обновлении пользователя.");
    }
  };

  if (isLoading)
    return <div className="updateUserPage">Loading users and groups...</div>;
  if (error)
    return (
      <div className="updateUserPage" style={{ color: "red" }}>
        Error: {error}
      </div>
    );

  return (
    <div className="updateUserPage">
      <div className="contiAdmin">
        <select
          value={selectedUsername}
          onChange={(e) => setSelectedUsername(e.target.value)}
        >
          <option value="" disabled>
            Select User to Edit
          </option>
          {allUsers.map((user, idx) => (
            <option key={idx} value={user.username}>
              {user.username}
              {/* ({user.fullname_korean}) */}
            </option>
          ))}
        </select>

        {selectedUsername && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={newUsername}
              onChange={handleChange(setNewUsername)}
            />

            <input
              type="password"
              placeholder="New Password (Leave blank to keep old)"
              value={password}
              onChange={handleChange(setPassword)}
            />

            <input
              type="text"
              placeholder="Name and Last Name (Korean)"
              value={fullNameKorean}
              onChange={handleChange(setFullNameKorean)}
            />

            <input
              type="text"
              placeholder="Name and Last Name (English)"
              value={fullNameEnglish}
              onChange={handleChange(setFullNameEnglish)}
            />

            <select value="" onChange={handleSelectGroup}>
              <option value="" disabled>
                Select group to add
              </option>
              {groups.map((group, idx) => (
                <option
                  key={idx}
                  value={group.name}
                  disabled={selectedGroups.includes(group.name)}
                >
                  {group.name}
                </option>
              ))}
            </select>

            <div className="selectedGroups">
              {selectedGroups.map((group, idx) => (
                <div key={idx} className="groupTag">
                  {group}
                  <button
                    className="removeGroupBtn"
                    onClick={() => handleRemoveGroup(group)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <select value={status} onChange={handleChange(setStatus)}>
              <option value="" disabled>
                Status
              </option>
              <option value="teacher">Teacher</option>
              {/* <option value="admin">Admin</option> */}
            </select>

            <button
              className="sendBtn"
              onClick={handleUpdateUser}
              style={{ width: "200px" }}
              disabled={!selectedUsername}
            >
              Update User
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
