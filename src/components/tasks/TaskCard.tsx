import type { Task } from "../../types/task.types";

interface TaskCardProps {
  task: Task;
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

function TaskCard({
  task,
  onMarkDone,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col gap-3 hover:shadow-lg transition">
      {/* Title */}
      <h3 className="text-lg font-semibold">{task.title}</h3>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm">{task.description}</p>
      )}

      {/* Status Section */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Status:{" "}
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              task.status === "DONE"
                ? "bg-green-100 text-green-700"
                : task.status === "IN_PROGRESS"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {task.status}
          </span>
        </span>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="border rounded p-1 text-sm cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onMarkDone(task.id)}
          className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700 text-sm active:scale-95 transition"
        >
          Mark Done
        </button>

        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this task?"
            );
            if (confirmed) {
              onDelete(task.id);
            }
          }}
          className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600 text-sm active:scale-95 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
