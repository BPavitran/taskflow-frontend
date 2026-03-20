import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/tasks.service";
import toast from "react-hot-toast";

function CreateTaskForm() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDescription("");

      toast.success("Task created");
    },
    onError: () => {
      toast.error("Failed to create task");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      title,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition  active:scale-95"
      >
        {mutation.isPending ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}

export default CreateTaskForm;
