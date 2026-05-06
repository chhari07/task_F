import { useEffect, useState } from "react";

import API from "../api/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  FaUserShield,
  FaUser,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";

const Team = () => {
  const [members, setMembers] = useState([]);

  const [projects, setProjects] = useState([]);

  const [selectedProject, setSelectedProject] =
    useState("");

  const [selectedUser, setSelectedUser] =
    useState("");

  useEffect(() => {
    fetchMembers();
    fetchProjects();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await API.get("/users");

      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const assignMemberToProject = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/projects/${selectedProject}/assign`,
        {
          userId: selectedUser,
        }
      );

      alert("Member Assigned");

      fetchProjects();
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

          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl">
              <FaUsers />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Team Management
              </h1>

              <p className="text-slate-500 mt-1">
                Manage your members and assign
                projects
              </p>
            </div>

          </div>

          {/* ASSIGN MEMBER */}

          <div className="bg-white rounded-3xl shadow-md p-8 mb-10">

            <h2 className="text-2xl font-bold mb-6">
              Assign Member To Project
            </h2>

            <form
              onSubmit={assignMemberToProject}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >

              <select
                className="border border-slate-300 p-4 rounded-2xl outline-none focus:border-blue-500"
                onChange={(e) =>
                  setSelectedProject(
                    e.target.value
                  )
                }
              >
                <option>
                  Select Project
                </option>

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.title}
                  </option>
                ))}
              </select>

              <select
                className="border border-slate-300 p-4 rounded-2xl outline-none focus:border-blue-500"
                onChange={(e) =>
                  setSelectedUser(
                    e.target.value
                  )
                }
              >
                <option>
                  Select Member
                </option>

                {members.map((member) => (
                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name}
                  </option>
                ))}
              </select>

              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold">
                Assign Member
              </button>

            </form>
          </div>

          {/* TEAM MEMBERS */}

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Team Members
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {members.map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition duration-300"
                >

                  <div className="flex items-center justify-between mb-5">

                    <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center text-3xl text-slate-700">
                      {member.role ===
                      "Admin" ? (
                        <FaUserShield />
                      ) : (
                        <FaUser />
                      )}
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold
                      ${
                        member.role ===
                        "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {member.role}
                    </span>

                  </div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    {member.name}
                  </h2>

                  <div className="flex items-center gap-3 mt-4 text-slate-500">
                    <FaEnvelope />
                    <p>{member.email}</p>
                  </div>

                  <div className="mt-6 flex justify-between items-center">

                    <div>
                      <p className="text-sm text-slate-400">
                        Joined
                      </p>

                      <h3 className="font-semibold text-slate-700">
                        {new Date(
                          member.createdAt
                        ).toLocaleDateString()}
                      </h3>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      {member.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* PROJECT TEAMS */}

          <div className="mt-14">

            <h2 className="text-3xl font-bold mb-6">
              Project Teams
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-3xl shadow-md p-6"
                >

                  <div className="flex justify-between items-center mb-5">

                    <div>
                      <h2 className="text-2xl font-bold">
                        {project.title}
                      </h2>

                      <p className="text-slate-500 mt-2">
                        {
                          project.description
                        }
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl">
                      <FaUsers />
                    </div>

                  </div>

                  <div className="mt-5">

                    <h3 className="font-bold text-slate-700 mb-4">
                      Team Members
                    </h3>

                    <div className="flex flex-wrap gap-3">

                      {project.teamMembers
                        ?.length > 0 ? (
                        project.teamMembers.map(
                          (member) => (
                            <div
                              key={
                                member._id
                              }
                              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium"
                            >
                              {
                                member.name
                              }
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-slate-400">
                          No Members
                          Assigned
                        </p>
                      )}

                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Team;