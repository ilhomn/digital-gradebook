import React, { useEffect, useState } from "react";
import "./UpdateGroup.css";
import IP from "../../../config";

const UpdateGroup = () => {
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const [token, setToken] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupLoading, setGroupLoading] = useState(false);
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
        console.log("Fetching time slots...");
        const timeRes = await fetch(`${IP}/get-timeslots`, {
          method: "GET",
          headers: { "Content-Type": "application/json", token },
        });
        const timeData = await timeRes.json();
        console.log("Time slots response:", timeData);
        setTimeSlots(timeData?.data || []);

        console.log("Fetching groups...");
        const groupsRes = await fetch(`${IP}/get-all-groups`, {
          method: "GET",
          headers: { "Content-Type": "application/json", token },
        });
        const groupsData = await groupsRes.json();
        console.log("Groups response:", groupsData);
        setAllGroups(groupsData?.data || []);
      } catch (err) {
        console.error("Failed to fetch initial data", err);
        setError("Failed to load groups or time slots.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [token]);

  useEffect(() => {
    if (!selectedGroupId || !token) return;

    const fetchGroupData = async () => {
      setGroupLoading(true);
      console.log("Fetching group data for ID:", selectedGroupId);

      try {
        const res = await fetch(`${IP}/get-group-data/${selectedGroupId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", token },
        });
        const data = await res.json();
        console.log("Group data response:", data);

        if (!res.ok) {
          alert(
            "Failed to load group data: " + (data.message || "Server error")
          );
          return;
        }

        if (data.data) {
          const group = data.data;
          setGroupName(group.name || "");
          setAmount(String(group.amount || ""));
          setSelectedTimeSlot(group.days?.join(",") || "");
        } else {
          alert("Group not found or empty response from server.");
        }
      } catch (err) {
        console.error("Error fetching group details:", err);
        // alert("Error loading group data.");
      } finally {
        setGroupLoading(false);
      }
    };

    fetchGroupData();
  }, [selectedGroupId, token]);

  const handleUpdateGroup = async () => {
    if (!selectedGroupId || !groupName || !selectedTimeSlot || !amount) {
      alert("Please select a group and fill in all fields!");
      return;
    }

    const daysArray = selectedTimeSlot
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));

    if (daysArray.length === 0) {
      alert("Please select a valid time slot!");
      return;
    }

    const body = {
      new_name: groupName,
      new_days: daysArray,
      new_amount: Number(amount),
    };

    console.log("Updating group:", selectedGroupId, body);

    try {
      const res = await fetch(`${IP}/update-group/${selectedGroupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        console.error("Update error:", data);
        alert("Failed to update group: " + (data.message || "Server error"));
        return;
      }

      alert(data.message || `Group "${groupName}" successfully updated!`);
    } catch (err) {
      console.error("Network error during update:", err);
      alert("Network error while updating the group.");
    }
  };

  // === Render component ===
  if (isLoading) return <div className="updateGroupPage">Loading data...</div>;
  if (error)
    return (
      <div className="updateGroupPage" style={{ color: "red" }}>
        Error: {error}
      </div>
    );

  return (
    <div className="updateGroupPage">
      <div className="containAdmin">
        <select
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
        >
          <option value="">Select a group to edit</option>
          {allGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        {selectedGroupId && (
          <>
            {groupLoading ? (
              <p>Loading group data...</p>
            ) : (
              <>
                <input
                  placeholder="Group Name"
                  className="groupname"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />

                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.timeslot}>
                      {slot.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Number of Students"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                />

                <button onClick={handleUpdateGroup}>Update Group</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateGroup;
