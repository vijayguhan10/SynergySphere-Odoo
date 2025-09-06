import { Search, Pin, Users, MoreVertical, Smile, Send } from "lucide-react";

const pinnedChats = [
  {
    name: "Matriks Studio",
    typing: true,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    unread: 0,
    lastMessage: "",
    time: "",
  },
  {
    name: "Matriks Lab",
    typing: false,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    unread: 2,
    lastMessage: "Boleh di cek untuk email hari...",
    time: "4:30 PM",
  },
];

const allChats = [
  {
    name: "Work, Work, Work",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    lastMessage: "Siap pak, noted! thank you.",
    time: "4:30 PM",
  },
  {
    name: "Hisyam",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    lastMessage: "Design uga udah selesai ya",
    time: "4:30 PM",
  },
  {
    name: "Dimas Eza",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "Redesign sudah siap nih, kira kira...",
    time: "4:30 PM",
  },
  {
    name: "Nick Jo",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    lastMessage: "Udah ada nih referensinya",
    time: "4:30 PM",
  },
  {
    name: "Ellaslis",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    lastMessage: "Udah aku invite figma design ya",
    time: "4:30 PM",
  },
  {
    name: "Dips",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    lastMessage: "Udah siap riset buat next project",
    time: "4:30 PM",
  },
  {
    name: "Nopals",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    lastMessage: "Wahhh gaskuen ini mahh 🔥",
    time: "4:30 PM",
  },
];

const messages = [
  {
    sender: "Nick Jo",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    time: "4:30 PM",
    content:
      "Happy Weekend gaiss see you on next week keep spirit and dont forget to chill 🥲",
    mine: false,
  },
  {
    sender: "Dimas Eza",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "4:30 PM",
    content: "Ngedesign dashboard yu gais gaskuen ga sih?",
    mine: false,
  },
  {
    sender: "Ellaslis",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    time: "4:30 PM",
    content: "Cusssss berangkat ngedesign!!!",
    mine: false,
  },
  {
    sender: "Nick Jo",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    time: "4:30 PM",
    content: (
      <>
        Ada referensi nih{" "}
        <a
          href="https://dribbble.com/shots/20709999-Myproject-Task-Management-Dashboard"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Task-Management-Dashboard
        </a>
      </>
    ),
    mine: false,
  },
  {
    sender: "Nopals",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    time: "4:30 PM",
    content: "Wahhh gaskuen ini mahh 🔥",
    mine: false,
  },
  {
    sender: "You",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "4:30 PM",
    content: "Wahhh boleh tuh dashboard design 👍",
    mine: true,
  },
];

const groupAvatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
];

const Message = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Sidebar */}
      <aside className="w-full sm:w-80 bg-white border-r flex-shrink-0 flex flex-col h-full">
        <div className="p-6 pb-2 border-b">
          <h2 className="font-bold text-xl text-gray-800">Messages</h2>
        </div>
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Messages"
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
            PINNED MESSAGES
          </div>
          <ul className="px-2">
            {pinnedChats.map((chat, idx) => (
              <li
                key={chat.name}
                className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {chat.name}
                  </div>
                  {chat.typing ? (
                    <div className="text-xs text-purple-500">Typing...</div>
                  ) : (
                    <div className="text-xs text-gray-400 truncate">
                      {chat.lastMessage}
                    </div>
                  )}
                </div>
                {chat.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {chat.unread}
                  </span>
                )}
                <Pin size={16} className="text-gray-400 ml-2" />
              </li>
            ))}
          </ul>
          <div className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500">
            ALL MESSAGES
          </div>
          <ul className="px-2">
            {allChats.map((chat) => (
              <li
                key={chat.name}
                className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {chat.name}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {chat.lastMessage}
                  </div>
                </div>
                <span className="text-xs text-gray-400">{chat.time}</span>
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
              <img
                src={pinnedChats[0].avatar}
                alt="Group"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-bold text-lg text-gray-800">
                  Matriks Studio
                </div>
                <div className="text-xs text-purple-500">
                  Dimas Eza Typing...
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {groupAvatars.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt="User"
                  className="w-7 h-7 rounded-full border-2 border-white shadow"
                />
              ))}
            </div>
            <span className="ml-2 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-semibold">
              4+
            </span>
            <Users className="ml-2 text-gray-400" size={20} />
            <MoreVertical className="ml-2 text-gray-400" size={20} />
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                Hari ini
              </span>
            </div>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
              >
                {!msg.mine && (
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div
                  className={`max-w-[70%] sm:max-w-[60%] p-3 rounded-xl shadow ${
                    msg.mine
                      ? "bg-purple-400 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{msg.sender}</div>
                  <div className="text-sm">{msg.content}</div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>{msg.time}</span>
                    {!msg.mine && idx === 0 && (
                      <>
                        <span role="img" aria-label="emoji">
                          🥲
                        </span>
                        <span>2</span>
                      </>
                    )}
                  </div>
                </div>
                {msg.mine && (
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full ml-2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Input */}
        <div className="px-6 py-4 bg-white border-t flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
          />
          <Smile className="text-gray-400" size={24} />
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
            <Send size={18} />
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default Message;
