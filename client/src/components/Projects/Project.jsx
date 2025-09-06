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
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// board columns will be derived from backend tasks; no static board data

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
  // selectedProject holds either 'all' or a project id (number/string)
  const [selectedProject, setSelectedProject] = useState("all");
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]); // array of {id,name,...}
  const [projectDetails, setProjectDetails] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  // When viewing "All Projects", aggregate tasks from the fetched projects list.
  const effectiveTasks =
    selectedProject === "all"
      ? projects.flatMap((p) => (Array.isArray(p.tasks) ? p.tasks : []))
      : tasks;

  useEffect(() => {
    let mounted = true;
    const ctrl = new AbortController();

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/projects/getall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
        signal: ctrl.signal,
      })
      .then((res) => {
        if (!mounted) return;
        const data = res.data;
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch((err) => {
        // Ignore cancellations triggered by AbortController
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError")
          return;
        console.error("Failed to load projects:", err);
        toast.error(err.response?.data?.message || "Failed to fetch projects.");
      });

    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, []);

  // When a project is selected (by id), fetch its details and tasks
  useEffect(() => {
    if (selectedProject === "all") {
      setProjectDetails(null);
      setTasks([]);
      return;
    }

    const id = selectedProject;
    let mounted = true;
    const ctrl = new AbortController();

    const fetchData = async () => {
      setLoadingTasks(true);
      try {
        const [projRes, tasksRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/projects/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
            signal: ctrl.signal,
          }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/tasks/project/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
            signal: ctrl.signal,
          }),
        ]);

        if (!mounted) return;
        setProjectDetails(projRes.data || null);
        // tasks endpoint returns { data: [ ... ] }
        const t = Array.isArray(tasksRes.data?.data) ? tasksRes.data.data : [];
        setTasks(t);
      } catch (err) {
        // Ignore cancellations
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
          if (mounted) setLoadingTasks(false);
          return;
        }
        console.error("Failed to load project/tasks:", err);
        toast.error(
          err.response?.data?.message || "Failed to fetch project or tasks."
        );
        setProjectDetails(null);
        setTasks([]);
      } finally {
        if (mounted) setLoadingTasks(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, [selectedProject]);

  // Build board data from fetched tasks when a project is selected
  const taskToCard = (task) => ({
    tags: [],
    title: task.title,
    description: task.description || "",
    date: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "",
    avatars: task.assignee ? [task.assignee.id] : [],
    comments: 0,
    views: 0,
  });

  const columnsFromTasks = () => {
    const groups = {
      todo: [],
      inprogress: [],
      review: [],
      complete: [],
    };

    effectiveTasks.forEach((t) => {
      const status = (t.status || "").toLowerCase();
      if (status.includes("todo") || status === "todo") groups.todo.push(t);
      else if (status.includes("progress") || status === "in_progress")
        groups.inprogress.push(t);
      else if (status.includes("review")) groups.review.push(t);
      else groups.complete.push(t);
    });

    return [
      {
        status: "To Do",
        count: groups.todo.length,
        cards: groups.todo.map(taskToCard),
      },
      {
        status: "In Progress",
        count: groups.inprogress.length,
        cards: groups.inprogress.map(taskToCard),
      },
      {
        status: "Review",
        count: groups.review.length,
        cards: groups.review.map(taskToCard),
      },
      {
        status: "Complete",
        count: groups.complete.length,
        cards: groups.complete.map(taskToCard),
      },
    ];
  };

  const filteredBoardData = columnsFromTasks().map((col) => ({
    ...col,
    cards: col.cards.filter((card) => {
      // Only filter cards by the search query. Project selection determines
      // whether we use the static board (`all`) or task-derived columns.
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        String(card.title).toLowerCase().includes(q) ||
        String(card.description).toLowerCase().includes(q)
      );
    }),
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
          <option value="all">All Projects</option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.name || proj.title || `Project ${proj.id}`}
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
