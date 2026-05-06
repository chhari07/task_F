import { useEffect, useState } from "react";

import API from "../api/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", form);

      fetchTasks();

      alert("Task Created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

            <h2 className="text-2xl font-bold mb-5">
              Create Task
            </h2>

            <form
              onSubmit={createTask}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >

              <input
                type="text"
                placeholder="Task Title"
                className="border p-4 rounded-xl"
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <input
                type="date"
                className="border p-4 rounded-xl"
                onChange={(e) =>
                  setForm({
                    ...form,
                    dueDate: e.target.value,
                  })
                }
              />

              <select
                className="border p-4 rounded-xl"
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value,
                  })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <select
                className="border p-4 rounded-xl"
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
              >
                <option>Todo</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <textarea
                placeholder="Task Description"
                className="border p-4 rounded-xl md:col-span-2"
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />

              <button className="bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 md:col-span-2">
                Create Task
              </button>

            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
              />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;