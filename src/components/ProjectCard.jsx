import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaProjectDiagram } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>

      <Link to="/dashboard">
        <FaHome /> Dashboard
      </Link>

      <Link to="/projects">
        <FaProjectDiagram /> Projects
      </Link>

      <Link to="/tasks">
        <FaTasks /> Tasks
      </Link>
    </div>
  );
};

export default Sidebar;