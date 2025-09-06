import { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  Search,
  Mail,
  Folder,
  ClipboardList,
  Bell,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const statusColors = {
  "Full Time": "bg-green-100 text-green-700",
  "Part Time": "bg-yellow-100 text-yellow-700",
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Fetch all users
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      })
      .then((res) => setUsers(res.data.data || []));
  }, []);

  // Filter users by search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Select user row
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Expand user details
  const handleExpand = async (user) => {
    setExpandedUser(user.id);
    setEditMode(false);
    setEditName(user.name);
    setEditEmail(user.email);

    // Get user by ID
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setUserDetails(res.data.data || user);

      // Get user's projects
      try {
        const projRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${user.id}/projects`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        setUserProjects(projRes.data.data || []);
      } catch {
        setUserProjects([]);
      }

      // Get user's tasks
      try {
        const taskRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${user.id}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        setUserTasks(taskRes.data.data || []);
      } catch {
        setUserTasks([]);
      }

      // Get user's messages
      try {
        const msgRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${user.id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        setUserMessages(msgRes.data.data || []);
      } catch {
        setUserMessages([]);
      }

      // Get user's notifications
      try {
        const notifRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${user.id}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        setUserNotifications(notifRes.data.data || []);
      } catch {
        setUserNotifications([]);
      }
    } catch (err) {
      toast.error("Failed to fetch user details.");
    }
  };

  // Edit user profile
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/${expandedUser}`,
        {
          name: editName,
          email: editEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      toast.success("User updated!");
      setEditMode(false);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === expandedUser ? { ...u, name: editName, email: editEmail } : u
        )
      );
      setUserDetails((prev) => ({
        ...prev,
        name: editName,
        email: editEmail,
      }));
    } catch (err) {
      toast.error("Failed to update user.");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      toast.success("User deleted!");
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (expandedUser === id) setExpandedUser(null);
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search User"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 focus:outline-none"
              style={{ width: 220 }}
            />
          </div>
          <span className="ml-6 text-gray-600 font-medium">
            {selected.length > 0 && `${selected.length} Selected`}
          </span>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          <Plus size={18} />
          ADD USER
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={
                    selected.length === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                  onChange={() =>
                    setSelected(
                      selected.length === filteredUsers.length
                        ? []
                        : filteredUsers.map((u) => u.id)
                    )
                  }
                />
              </th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                className={`border-b hover:bg-blue-50 transition ${
                  selected.includes(u.id) ? "bg-blue-100" : ""
                }`}
                onClick={() => handleExpand(u)}
                style={{ cursor: "pointer" }}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(u.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelect(u.id);
                    }}
                  />
                </td>
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?u=${u.email}`}
                    alt={u.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold">{u.name}</span>
                </td>
                <td className="p-4">Graphics Designer</td>
                <td className="p-4">Sales Team</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">(252) 555-0126</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors["Full Time"]}`}
                  >
                    Full Time
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(u);
                    }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(u.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {/* Expanded row for user details */}
            {expandedUser && userDetails && (
              <tr className="bg-blue-50">
                <td colSpan={8} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div>
                      <div className="font-semibold mb-1">Profile</div>
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={`https://i.pravatar.cc/60?u=${userDetails.email}`}
                          alt={userDetails.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          {editMode ? (
                            <>
                              <input
                                className="border rounded px-2 py-1 mb-1 w-full"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                              />
                              <input
                                className="border rounded px-2 py-1 mb-1 w-full"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                              />
                            </>
                          ) : (
                            <>
                              <div className="text-gray-900 font-medium">
                                {userDetails.name}
                              </div>
                              <div className="text-gray-500">
                                {userDetails.email}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={editMode ? handleSaveEdit : handleEdit}
                          className={`flex-1 px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2
    ${
      editMode
        ? "bg-green-600 text-white shadow-md hover:bg-green-700"
        : "bg-blue-600 text-white shadow hover:bg-blue-700"
    }`}
                        >
                          {editMode ? "Save" : "Edit"} Profile
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 shadow hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Details</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-500 text-xs">Phone</div>
                        <div className="text-gray-900">
                          {userDetails.phone || "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Status</div>
                        <div className="text-gray-900">
                          {userDetails.status || "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Department</div>
                        <div className="text-gray-900">
                          {userDetails.department || "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Position</div>
                        <div className="text-gray-900">
                          {userDetails.position || "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Birthday</div>
                        <div className="text-gray-900">
                          {userDetails.birthday || "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Address</div>
                        <div className="text-gray-900">
                          {userDetails.address || "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* User projects, tasks, messages, notifications */}
                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg shadow p-4">
                        <div className="font-semibold mb-2">Projects</div>
                        <div className="text-gray-700 text-sm">
                          {userProjects.length === 0
                            ? "No projects found."
                            : userProjects.map((proj) => (
                                <div
                                  key={proj.id}
                                  className="flex justify-between items-center py-2 border-b"
                                >
                                  <div className="text-gray-900">
                                    {proj.name}
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    {proj.status}
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow p-4">
                        <div className="font-semibold mb-2">Tasks</div>
                        <div className="text-gray-700 text-sm">
                          {userTasks.length === 0
                            ? "No tasks found."
                            : userTasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="flex justify-between items-center py-2 border-b"
                                >
                                  <div className="text-gray-900">
                                    {task.title}
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    {task.status}
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow p-4">
                        <div className="font-semibold mb-2">Messages</div>
                        <div className="text-gray-700 text-sm">
                          {userMessages.length === 0
                            ? "No messages found."
                            : userMessages.map((msg) => (
                                <div
                                  key={msg.id}
                                  className="flex justify-between items-center py-2 border-b"
                                >
                                  <div className="text-gray-900">
                                    {msg.subject}
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    {msg.sender}
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow p-4">
                        <div className="font-semibold mb-2">Notifications</div>
                        <div className="text-gray-700 text-sm">
                          {userNotifications.length === 0
                            ? "No notifications found."
                            : userNotifications.map((notif) => (
                                <div
                                  key={notif.id}
                                  className="flex justify-between items-center py-2 border-b"
                                >
                                  <div className="text-gray-900">
                                    {notif.title}
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    {notif.date}
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
