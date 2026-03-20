import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "../services/tasks.service";
import CreateTaskForm from "../components/tasks/CreateTaskForm";
import TaskCard from "../components/tasks/TaskCard";
import toast from "react-hot-toast";
import type { TaskStatus } from "../types/task.types";
import { useEffect, useState } from "react";

function TasksPage() {
  const [status, setStatus] = useState<TaskStatus | undefined>();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const queryClient = useQueryClient();

  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["tasks", status, debouncedSearch],
    queryFn: () => getTasks({ status, search: debouncedSearch }),
    placeholderData: (prev) => prev,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated");
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const handleMarkDone = (id: string) => {
    updateMutation.mutate({
      id,
      status: "DONE",
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    updateMutation.mutate({
      id,
      status,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted");
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">Loading tasks...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">Failed to load tasks</div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Tasks</h2>

      {/* Create Task */}
      <div className="bg-white p-4 rounded-lg shadow">
        <CreateTaskForm />
      </div>

      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setStatus(undefined)}
            className={`px-3 py-1 rounded ${
              status === undefined ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setStatus("OPEN")}
            className={`px-3 py-1 rounded ${
              status === "OPEN" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Open
          </button>

          <button
            onClick={() => setStatus("IN_PROGRESS")}
            className={`px-3 py-1 rounded ${
              status === "IN_PROGRESS"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            In Progress
          </button>

          <button
            onClick={() => setStatus("DONE")}
            className={`px-3 py-1 rounded ${
              status === "DONE" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Done
          </button>
        </div>
      </div>

      <div className="relative">
        {isFetching && (
          <div className="absolute top-0 right-0 text-xs text-gray-500">
            Updating...
          </div>
        )}
        {/* Task List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.items.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              No tasks found
            </div>
          ) : (
            data?.items.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMarkDone={handleMarkDone}
                onDelete={(id) => deleteMutation.mutate(id)}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
