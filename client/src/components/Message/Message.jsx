import { useState, useEffect, useRef } from "react";
import {
  Search,
  Pin,
  Users,
  MoreVertical,
  Smile,
  Send,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Message = ({ projectId = 1 }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [dropdownUsers, setDropdownUsers] = useState([]);
  const inputRef = useRef();

  // Fetch all users
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      })
      .then((res) => setUsers(res.data.data || []))
      .catch(() => setUsers([]));
  }, []);

  // Fetch messages for project
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/messages/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      })
      .then((res) => setMessages(res.data.data || []))
      .catch(() => setMessages([]));
  }, [projectId]);

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/messages/create`,
        {
          projectId,
          content: input.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      toast.success("Message sent!");
      setInput("");
      // Refresh messages
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/messages/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setMessages(res.data.data || []);
    } catch (err) {
      toast.error("Failed to send message.");
    }
    setLoading(false);
  };

  // Delete message
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      toast.success("Message deleted!");
      setMessages((msgs) => msgs.filter((m) => m.id !== id));
    } catch (err) {
      toast.error("Failed to delete message.");
    }
  };

  // Handle clicking a user in sidebar to tag them
  const handleUserClick = (user) => {
    setInput((prev) => prev + ` @${user.name} `);
    inputRef.current?.focus();
  };

  // Handle input change for @ logic
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Show dropdown if last char is @ or if typing @word
    const match = value.match(/@(\w*)$/);
    if (match) {
      const search = match[1].toLowerCase();
      setDropdownUsers(
        users.filter((u) => u.name.toLowerCase().includes(search))
      );
      setShowUserDropdown(true);
    } else {
      setShowUserDropdown(false);
    }
  };

  // Handle selecting user from dropdown
  const handleDropdownUser = (user) => {
    // Replace last @word with @username
    setInput((prev) => prev.replace(/@(\w*)$/, `@${user.name} `));
    setShowUserDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Sidebar: Show all users */}
      <aside className="w-full sm:w-80 bg-white border-r flex-shrink-0 flex flex-col h-full">
        <div className="p-6 pb-2 border-b">
          <h2 className="font-bold text-xl text-gray-800">Users</h2>
        </div>
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Users"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500">
            ALL USERS
          </div>
          <ul className="px-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <img
                  src={`https://i.pravatar.cc/40?u=${user.email}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {user.email}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Chat Area */}
      <section className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-10 h-10 text-purple-600" />
              <div>
                <div className="font-bold text-lg text-gray-800">
                  Project Messages
                </div>
                <div className="text-xs text-purple-500">
                  Project ID: {projectId}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MoreVertical className="ml-2 text-gray-400" size={20} />
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="flex flex-col gap-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                No messages yet.
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.userId === users[0]?.id ? "justify-end" : "justify-start"
                }`}
              >
                {msg.user && (
                  <img
                    src={`https://i.pravatar.cc/40?u=${msg.user.email}`}
                    alt={msg.user.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div
                  className={`max-w-[70%] sm:max-w-[60%] p-3 rounded-xl shadow bg-white text-gray-800`}
                >
                  <div className="font-semibold text-sm mb-1">
                    {msg.user?.name || "User"}
                  </div>
                  <div className="text-sm">{msg.content}</div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>
                      {new Date(msg.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <button
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(msg.id)}
                      title="Delete message"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Input */}
        <div className="px-6 py-4 bg-white border-t flex items-center gap-2 relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            value={input}
            onChange={handleInputChange}
            disabled={loading}
          />
          {showUserDropdown && (
            <div className="absolute bottom-16 left-6 bg-white border rounded shadow-lg z-50 w-64 max-h-48 overflow-y-auto">
              {dropdownUsers.length === 0 ? (
                <div className="p-2 text-gray-400 text-sm">No users found</div>
              ) : (
                dropdownUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDropdownUser(user)}
                  >
                    <img
                      src={`https://i.pravatar.cc/40?u=${user.email}`}
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                ))
              )}
            </div>
          )}
          <Smile className="text-gray-400" size={24} />
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
            onClick={handleSend}
            disabled={loading}
          >
            <Send size={18} />
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default Message;
