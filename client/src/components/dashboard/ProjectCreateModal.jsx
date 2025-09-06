import { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const ProjectCreateModal = ({ open, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState(3);

  if (!open) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const project = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      stats: { total: 0, completed: 0, members: Number(members) || 0 },
      tasks: [],
    };
    onSave(project);
    setName("");
    setDescription("");
    setMembers(3);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-70 w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Create Project</h3>
            <div className="text-xs opacity-90">
              Start a new project and invite members
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-md hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              placeholder="e.g. Marketing website"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Short project summary (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estimated members
            </label>
            <input
              type="number"
              min={1}
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              className="mt-2 w-36 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProjectCreateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

ProjectCreateModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSave: () => {},
};

export default ProjectCreateModal;
