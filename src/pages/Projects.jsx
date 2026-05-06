import { useEffect, useState } from "react";

import API from "../api/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get(
        "/projects"
      );

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", form);

      fetchProjects();

      alert("Project Created");
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
              Create Project
            </h2>

            <form
              onSubmit={createProject}
              className="flex flex-col gap-5"
            >

              <input
                type="text"
                placeholder="Project Title"
                className="border p-4 rounded-xl"
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Project Description"
                className="border p-4 rounded-xl"
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />

              <button className="bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700">
                Create Project
              </button>

            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-2xl shadow-md"
              >
                <h2 className="text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="text-slate-500 mt-3">
                  {project.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;