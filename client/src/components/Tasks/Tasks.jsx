import {
  Filter,
  SortAsc,
  Group,
  LayoutList,
  Calendar,
  Timer,
  Users,
  MessageSquare,
  BarChart2,
  ClipboardList,
  Plus,
  Eye,
  MessageCircle,
} from "lucide-react";

const taskData = [
  {
    id: "MKT-101",
    title: "Draft Q3 Social Media Calendar",
    description: "Plan posts for all platforms for the upcoming quarter.",
    progress: 40,
    status: "To Do",
    tags: ["High", "Marketing"],
    users: [1, 2, 3, 4],
    comments: 2,
    views: 5,
    color: "red",
  },
  {
    id: "DES-218",
    title: "Research Competitor Onboarding Flows",
    description: "Analyze 3-5 competitors and document their user onboarding.",
    progress: 40,
    status: "In progress",
    tags: ["Low", "Figma Design"],
    users: [1, 2, 3, 4],
    comments: 2,
    views: 5,
    color: "green",
  },
  {
    id: "MKT-098",
    title: 'Write Blog Post on "5 Productivity Tips"',
    description: "Final draft is complete and ready for editorial review.",
    progress: 100,
    status: "In Review",
    tags: ["Medium", "Content"],
    users: [1, 2, 3, 4],
    comments: 2,
    views: 5,
    color: "red",
  },
  {
    id: "DEV-345",
    title: "Set up new Staging Database",
    description: "Provision and configure the PostgreSQL instance for staging.",
    progress: 40,
    status: "To Do",
    tags: ["Medium", "Backend"],
    users: [1, 2, 3, 4],
    comments: 2,
    views: 5,
    color: "purple",
  },
  {
    id: "DEV-340",
    title: "Implement Login Page UI",
    description:
      "Code the React components for the new login and registration forms.",
    progress: 40,
    status: "In progress",
    tags: ["Medium", "Figma Design"],
    users: [1, 2, 3, 4],
    comments: 2,
    views: 5,
    color: "red",
  },
  {
    id: "A-500",
    title: "Create Icons for Navigation Bar",
    description: "All icons have been approved and exported as SVG.",
    progress: 40,
    status: "In Review",
    tags: ["Medium", "Figma Design"],
    users: [1, 2, 3, 4],
    comments: 2,
    views: 5,
    color: "orange",
  },
];

const statusColumns = [
  { label: "To Do", count: 2 },
  { label: "In progress", count: 2 },
  { label: "In Review", count: 2 },
];

const getTasksByStatus = (status) =>
  taskData.filter((task) => task.status === status);

const tagColors = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-green-100 text-green-600",
  Marketing: "bg-pink-100 text-pink-600",
  "Figma Design": "bg-blue-100 text-blue-600",
  Backend: "bg-purple-100 text-purple-600",
  Content: "bg-yellow-100 text-yellow-600",
};

const userAvatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
];

const Tasks = () => {
  return (
    <div className="p-2 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <ClipboardList size={20} />
          Overview
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <LayoutList size={20} />
          Board
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          List
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <Calendar size={20} />
          Calendar
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <Timer size={20} />
          Time-line
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <BarChart2 size={20} />
          Workload
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <MessageSquare size={20} />
          Message
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
        <button className="flex items-center gap-2 px-2 py-1 sm:px-3 rounded bg-gray-100 text-gray-700 text-xs sm:text-sm">
          <Filter size={16} />
          Filter
        </button>
        <button className="flex items-center gap-2 px-2 py-1 sm:px-3 rounded bg-gray-100 text-gray-700 text-xs sm:text-sm">
          <SortAsc size={16} />
          Sort
        </button>
        <button className="flex items-center gap-2 px-2 py-1 sm:px-3 rounded bg-gray-100 text-gray-700 text-xs sm:text-sm">
          <Group size={16} />
          Group
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statusColumns.map((col) => (
          <div key={col.label}>
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <span className="font-semibold text-base sm:text-lg">
                {col.label}
              </span>
              <span className="text-gray-500">{col.count}</span>
              <button className="ml-auto text-gray-400 hover:text-gray-700">
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-2 sm:space-y-4">
              {getTasksByStatus(col.label).map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl shadow-sm border p-3 sm:p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded text-xs font-semibold mr-2 ${
                          tagColors[tag] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto text-xs font-bold text-gray-400">
                      {task.id}
                    </span>
                  </div>
                  <div className="font-semibold text-sm sm:text-base mb-1 truncate">
                    {task.title}
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 truncate">
                    {task.description}
                  </div>
                  <div className="mb-2 sm:mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs text-gray-500">
                        {task.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded mt-1">
                      <div
                        className={`h-2 rounded ${
                          task.color === "red"
                            ? "bg-red-500"
                            : task.color === "green"
                            ? "bg-green-500"
                            : task.color === "purple"
                            ? "bg-purple-500"
                            : task.color === "orange"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-2">
                      {task.users.map((u, idx) => (
                        <img
                          key={u}
                          src={userAvatars[idx % userAvatars.length]}
                          alt="User"
                          className="w-6 h-6 rounded-full border-2 border-white shadow"
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 text-gray-400">
                      <Eye size={16} />
                      <span className="text-xs">{task.views}</span>
                      <MessageCircle size={16} />
                      <span className="text-xs">{task.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
