import { Bell, CheckCircle, XCircle, Info, Clock, Trash2 } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "info",
    message: "Your password was changed successfully.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "success",
    message: "Project invitation accepted.",
    time: "10 min ago",
    read: true,
  },
  {
    id: 3,
    type: "error",
    message: "Failed to upload file. Please try again.",
    time: "30 min ago",
    read: false,
  },
  {
    id: 4,
    type: "info",
    message: "New comment on your task.",
    time: "1 hour ago",
    read: true,
  },
];

const typeIcon = {
  info: <Info className="text-blue-500" size={22} />,
  success: <CheckCircle className="text-green-500" size={22} />,
  error: <XCircle className="text-red-500" size={22} />,
};

const Notification = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col items-center py-8 px-2 sm:px-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Bell size={32} className="text-purple-600 drop-shadow" />
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Notifications
          </h2>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border p-6">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <Bell size={40} className="mx-auto mb-4" />
              No notifications yet.
            </div>
          ) : (
            <ul className="divide-y">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`flex items-center gap-4 py-5 px-2 sm:px-4 transition-all rounded-xl ${
                    notif.read
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-purple-50 hover:bg-purple-100"
                  }`}
                >
                  <div className="flex-shrink-0">{typeIcon[notif.type]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 font-semibold text-base truncate">
                      {notif.message}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={14} />
                      {notif.time}
                    </div>
                  </div>
                  {!notif.read && (
                    <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                      New
                    </span>
                  )}
                  <button
                    className="ml-2 p-2 rounded-lg hover:bg-gray-200 transition"
                    title="Delete notification"
                  >
                    <Trash2
                      size={18}
                      className="text-gray-400 hover:text-red-500"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
