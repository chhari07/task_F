const TaskCard = ({ task }) => {
  const statusColors = {
    Todo: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Done: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 hover:shadow-xl transition duration-300">
      
      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-3 py-1 text-xs rounded-full font-bold ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>

        <span className="text-xs text-slate-400">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-2">
        {task.title}
      </h2>

      <p className="text-slate-500 text-sm line-clamp-3">
        {task.description}
      </p>

      <div className="mt-5 flex justify-between items-center">
        <div className="text-sm text-slate-500">
          Assigned to
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {task.assignedTo?.name?.charAt(0) || "U"}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;