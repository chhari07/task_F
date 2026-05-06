import { useEffect, useState } from "react";

import API from "../api/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  FaTasks,
  FaProjectDiagram,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });

  const [tasks, setTasks] = useState([]);

  const [editTask, setEditTask] = useState({});

  useEffect(() => {
    fetchDashboard();

    fetchTasks();
  }, []);

  // FETCH DASHBOARD
  const fetchDashboard = async () => {
    try {
      const { data } = await API.get(
        "/dashboard"
      );

      setStats(data);
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Dashboard API Error"
      );
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const { data } = await API.get(
        "/tasks"
      );

      setTasks(data);
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Tasks API Error"
      );
    }
  };

  // UPDATE TASK
  const updateTask = async (id) => {
    try {
      await API.put(
        `/tasks/${id}`,
        editTask[id] || {}
      );

      alert("Task Updated");

      fetchTasks();

      fetchDashboard();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Task Update Failed"
      );
    }
  };

  const cards = [
    {
      title: "Projects",
      value: stats.totalProjects,
      icon: <FaProjectDiagram />,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },

    {
      title: "Tasks",
      value: stats.totalTasks,
      icon: <FaTasks />,
      color: "text-green-500",
      bg: "bg-green-100",
    },

    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: <FaClock />,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },

    {
      title: "Completed",
      value: stats.completedTasks,
      icon: <FaCheckCircle />,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {/* HEADER */}
          <div className="mb-10">

            <h1 className="text-4xl font-bold text-slate-800">
              Dashboard Overview
            </h1>

            <p className="text-slate-500 mt-2">
              Manage projects and track team
              tasks efficiently
            </p>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-4xl font-bold text-slate-800">
                      {card.value || 0}
                    </h2>

                    <p className="text-slate-500 mt-2 font-medium">
                      {card.title}
                    </p>

                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${card.bg} ${card.color}`}
                  >
                    {card.icon}
                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* TASKS SECTION */}
          <div className="bg-white p-6 rounded-3xl shadow-md">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-bold text-slate-800">
                  Recent Tasks
                </h2>

                <p className="text-slate-500 mt-1">
                  Update and monitor task
                  progress
                </p>

              </div>

              <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-bold">
                {tasks.length} Tasks
              </div>

            </div>

            {/* TASK GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition duration-300 bg-slate-50"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-center mb-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold
                      ${
                        task.status === "Done"
                          ? "bg-green-100 text-green-700"
                          : task.status ===
                            "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>

                    <span className="text-sm text-slate-400">
                      {task.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString()
                        : "No Due Date"}
                    </span>

                  </div>

                  {/* TITLE */}
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    {task.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-slate-500 mb-6 min-h-[60px]">
                    {task.description}
                  </p>

                  {/* STATUS UPDATE */}
                  <div className="flex gap-3">

                    <select
                      defaultValue={task.status}
                      className="flex-1 border border-slate-300 p-3 rounded-xl outline-none focus:border-blue-500"
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,

                          [task._id]: {
                            ...task,
                            status:
                              e.target.value,
                          },
                        })
                      }
                    >
                      <option value="Todo">
                        Todo
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Done">
                        Done
                      </option>
                    </select>

                    <button
                      onClick={() =>
                        updateTask(task._id)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-bold transition"
                    >
                      Update
                    </button>

                  </div>
                </div>
              ))}

            </div>

            {/* EMPTY */}
            {tasks.length === 0 && (
              <div className="text-center py-16">

                <h2 className="text-2xl font-bold text-slate-700">
                  No Tasks Found
                </h2>

                <p className="text-slate-500 mt-3">
                  Create tasks to display them
                  here
                </p>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;