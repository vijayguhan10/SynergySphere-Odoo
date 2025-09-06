import {
  List,
  LayoutList,
  Workflow,
  Plus,
  Filter,
  SortAsc,
  User,
  Share2,
  Search,
  Calendar,
  MessageCircle,
  Eye,
  Users,
} from "lucide-react";
import { useState } from "react";

const projects = [
  "All Projects",
  "Design Agency Website",
  "Fintech App",
  "Online Catalog Development",
  "Neobank App Case",
];

const boardData = [
  {
    status: "To Do",
    count: 3,
    cards: [
      {
        tags: ["Dribbble", "Design"],
        title: "Project Management Wep App",
        description:
          "Make a design for a web application for organizing the workspace of an IT company",
        date: "30 Jan",
        avatars: [0, 1, 2, 3],
        comments: 2,
        views: 1,
      },
      {
        tags: ["Behance", "Design"],
        title: "Neobank App Case",
        description:
          "It should include wireframes, user flows, and visual design elements that demonstrate how the app delivers a seamless and modern banking experience",
        date: "5 Feb",
        avatars: [0, 1, 2, 3],
        comments: 8,
        views: 3,
      },
      {
        tags: ["Design", "Dev"],
        title: "Design Agency Website",
        description:
          "The design should be responsive, ensuring optimal performance across all devices and screen sizes. Example...",
        date: "9 Jan",
        avatars: [0, 1, 2, 3],
        comments: 6,
        views: 3,
      },
    ],
  },
  {
    status: "In Progress",
    count: 2,
    cards: [
      {
        tags: ["Dribbble", "Design"],
        title: "Speaking App",
        description:
          "Create a mobile application design for language exchange. The purpose of the application is to help users learn foreign languages",
        date: "30 Jan",
        avatars: [0, 1, 2, 3],
        comments: 6,
        views: 2,
      },
      {
        tags: ["Dev", "Design"],
        title: "Online Catalog Development",
        description:
          "Develop an online employee directory for a company with more than 50,000 employees. When performing a task, you need to additionally use any third-party Python and/or JS/CSS libraries, without any restrictions",
        date: "3 Feb",
        avatars: [0, 1, 2, 3],
        comments: 6,
        views: 3,
      },
    ],
  },
  {
    status: "Review",
    count: 2,
    cards: [
      {
        tags: ["Research", "Design"],
        title: "Administrator Panel Interface",
        description:
          "Develop an interface for the administrator to manage the rights of the company's users to various products (projects) of the company",
        date: "24 Jan",
        avatars: [0, 1, 2, 3],
        comments: 3,
        views: 1,
      },
      {
        tags: ["Design"],
        title: "Fintech App",
        description:
          "The goal is to create an intuitive, user-friendly, and visually appealing design that simplifies complex financial transactions",
        date: "23 Jan",
        avatars: [0, 1, 2, 3],
        comments: 5,
        views: 5,
        image:
          "https://cdn.dribbble.com/users/240025/screenshots/20709999/media/1e3e2e3e3e3e3e3e3e3e3e3e3e3e3e3e.png",
      },
    ],
  },
  {
    status: "Complete",
    count: 2,
    cards: [
      {
        tags: ["Dribbble", "Design"],
        title: "Finance Manager",
        description:
          "Make a design for a web application for organizing the workspace of an IT company",
        date: "12 Jan",
        avatars: [0, 1, 2, 3],
        comments: 2,
        views: 1,
      },
      {
        tags: ["Research", "Design"],
        title: "Fashion Website",
        description:
          "The design should be luxurious, emphasizing craftsmanship, and the quality of materials.",
        date: "9 Jan",
        avatars: [0, 1, 2, 3],
        comments: 5,
        views: 5,
      },
    ],
  },
];

const tagColors = {
  Dribbble: "bg-pink-100 text-pink-600",
  Behance: "bg-blue-100 text-blue-600",
  Research: "bg-purple-100 text-purple-600",
  Design: "bg-orange-100 text-orange-600",
  Dev: "bg-green-100 text-green-600",
};

const userAvatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
];

const Project = () => {
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [search, setSearch] = useState("");

  // Filter logic
  const filteredBoardData = boardData.map((col) => ({
    ...col,
    cards: col.cards.filter(
      (card) =>
        (selectedProject === "All Projects" ||
          card.title === selectedProject) &&
        (search === "" ||
          card.title.toLowerCase().includes(search.toLowerCase()) ||
          card.description.toLowerCase().includes(search.toLowerCase()))
    ),
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6">
        <h2 className="font-bold text-2xl text-gray-800 mr-4">Publications</h2>
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
          <List size={18} />
          List
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black text-white font-medium">
          <LayoutList size={18} />
          Board
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
          <Workflow size={18} />
          Workflow
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500 text-white font-medium">
          <Plus size={18} />
          View
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
          Automate
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
          <Share2 size={18} />
          Share
        </button>
      </div>
      {/* Filter/Search */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium"
        >
          {projects.map((proj) => (
            <option key={proj} value={proj}>
              {proj}
            </option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
          <SortAsc size={16} />
          Sort by
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
          <Filter size={16} />
          Filters
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
          <User size={16} />
          Me
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
          Show
        </button>
      </div>
      {/* Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBoardData.map((col) => (
          <div key={col.status}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-lg">{col.status}</span>
              <span className="text-gray-500">{col.cards.length}</span>
            </div>
            <div className="space-y-4">
              {col.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-sm border p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded text-xs font-semibold mr-2 ${
                          tagColors[tag] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="font-semibold text-base mb-1 truncate">
                    {card.title}
                  </div>
                  <div className="text-gray-500 text-sm mb-3 truncate">
                    {card.description}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{card.date}</span>
                  </div>
                  {card.image && (
                    <img
                      src={card.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-2">
                      {card.avatars.map((u, idx) => (
                        <img
                          key={u}
                          src={userAvatars[idx % userAvatars.length]}
                          alt="User"
                          className="w-6 h-6 rounded-full border-2 border-white shadow"
                        />
                      ))}
                      <span className="ml-2 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        +3
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                      <Eye size={16} />
                      <span className="text-xs">{card.views}</span>
                      <MessageCircle size={16} />
                      <span className="text-xs">{card.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
              {col.cards.length === 0 && (
                <div className="text-gray-400 text-center py-8">
                  No tasks found.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
