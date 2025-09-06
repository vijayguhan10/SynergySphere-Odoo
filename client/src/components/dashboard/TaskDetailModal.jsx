import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const TaskDetailModal = ({ open, onClose, task, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    setDraft(task ? { ...task } : null);
    setEditMode(false);
  }, [task]);

  if (!open || !task) return null;

  const saveChanges = () => {
    if (!draft) return;
    onSave(draft);
    setEditMode(false);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-70 w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-slate-700 to-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Task Details</h3>
          </div>
          <div className="flex items-center gap-2">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-3 py-1 bg-blue-600 rounded-md text-white text-sm"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  setDraft(task ? { ...task } : null);
                  setEditMode(false);
                }}
                className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-800 border border-gray-200"
              >
                Cancel
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-md hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-600">Title</div>
            {!editMode ? (
              <div className="mt-1 text-lg font-semibold text-gray-800">
                {task.title}
              </div>
            ) : (
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              />
            )}
          </div>

          <div>
            <div className="text-sm font-medium text-gray-600">Description</div>
            {!editMode ? (
              <div className="mt-1 text-gray-700 whitespace-pre-wrap">
                {task.description || (
                  <span className="text-gray-400">No description</span>
                )}
              </div>
            ) : (
              <textarea
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
                rows={4}
                className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="text-sm font-medium text-gray-600">Assignee</div>
              {!editMode ? (
                <div className="mt-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700">
                    {task.assignee?.initials ??
                      task.assignee?.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-gray-800">
                    {task.assignee?.name ?? "Unassigned"}
                  </div>
                </div>
              ) : (
                <input
                  value={draft.assignee?.name}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      assignee: {
                        ...(draft.assignee || {}),
                        name: e.target.value,
                      },
                    })
                  }
                  className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                />
              )}
            </div>

            <div>
              <div className="text-sm font-medium text-gray-600">Due date</div>
              {!editMode ? (
                <div className="mt-2 text-gray-700">
                  {task.dueDate ?? "No due"}
                </div>
              ) : (
                <input
                  type="date"
                  value={draft.dueDate ?? ""}
                  onChange={(e) =>
                    setDraft({ ...draft, dueDate: e.target.value })
                  }
                  className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                />
              )}
            </div>

            <div>
              <div className="text-sm font-medium text-gray-600">Status</div>
              {!editMode ? (
                <div
                  className={`mt-2 inline-flex items-center px-3 py-1 rounded-md text-sm ${
                    task.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {task.completed ? "Done" : "Open"}
                </div>
              ) : (
                <select
                  value={draft.completed ? "done" : "open"}
                  onChange={(e) =>
                    setDraft({ ...draft, completed: e.target.value === "done" })
                  }
                  className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                >
                  <option value="open">Open</option>
                  <option value="done">Done</option>
                </select>
              )}
            </div>
          </div>

          {editMode && (
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setDraft(task ? { ...task } : null);
                  setEditMode(false);
                }}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
              >
                Save changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TaskDetailModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  task: PropTypes.object,
  onSave: PropTypes.func,
};

TaskDetailModal.defaultProps = {
  open: false,
  onClose: () => {},
  task: null,
  onSave: () => {},
};

export default TaskDetailModal;
