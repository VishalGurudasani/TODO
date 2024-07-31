"use client";
import React, { useContext, useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns"; // Import parseISO for parsing date strings
import "../CSS/dashboard.css";
import {
  FaBell,
  FaSun,
  FaForward,
  FaHome,
  FaClipboard,
  FaCog,
  FaUsers,
  FaChartBar,
  FaDownload,
  FaPlus,
} from "react-icons/fa";
import {
  FiSearch,
  FiCalendar,
  FiZap,
  FiFilter,
  FiShare2,
  FiPlus,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import NoteContext from "@/Context/Notecontext";

const Dashboard = () => {
  const router = useRouter();
  const { notes, getNotes } = useContext(NoteContext);
  const [columns, setColumns] = useState([
    { title: "To do", status: "to-do", tasks: [] },
    { title: "In progress", status: "in-progress", tasks: [] },
    { title: "Under review", status: "under-review", tasks: [] },
    { title: "Finished", status: "finished", tasks: [] },
  ]);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    const categorizedTasks = columns.map((column) => ({
      ...column,
      tasks: notes.filter((note) => note.status === column.status),
    }));
    setColumns(categorizedTasks);
  }, [notes]);

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/taskmodal");
  };

  const logout = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="dashboard">
      <div className="leftside">
        <div className="app">
          <header>
            <div className="user-info">
              <div className="profile-pic">JG</div>
              <span>Joe Gardner</span>
            </div>
          </header>
          <div className="header-icons">
            <FaBell className="icon" />
            <FaSun className="icon" />
            <FaForward className="icon" />
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </div>
          <nav>
            <ul>
              <li>
                <FaHome className="nav-icon" /> Home
              </li>
              <li>
                <FaClipboard className="nav-icon" /> Boards
              </li>
              <li>
                <FaCog className="nav-icon" /> Settings
              </li>
              <li>
                <FaUsers className="nav-icon" /> Teams
              </li>
              <li>
                <FaChartBar className="nav-icon" /> Analytics
              </li>
            </ul>
          </nav>
          <button className="create-task" onClick={handleClick}>
            <FaPlus /> Create new task
          </button>
          <div className="download-app">
            <FaDownload className="download-icon" />
            <div>
              <p>Download the app</p>
              <small>Get the full experience</small>
            </div>
          </div>
        </div>
      </div>
      <div className="rightside">
        <h1>Good Morning, Joe!</h1>
        <div className="first">
          <p>
            <b>Introducing Tags</b>
            <br /> Easily categorize and find your notes by adding tags. Keep
            your workspace clutter-free and efficient.
          </p>
          <p>
            <b> Share Notes Instantly</b> <br /> Effortlessly share your notes
            with others via email or link. Enhance collaboration with quick
            sharing options.
          </p>
          <p>
            <b> Access Anywhere </b>
            <br /> Sync your notes across all devices. Stay productive whether
            you're on your phone, tablet, or computer.
          </p>
        </div>
        <nav>
          <div className="navbar-left">
            <div className="toolbar">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input"
                />
                <FiSearch className="search-icon" />
              </div>
              <div className="toolbar-right">
                <button className="toolbar-button">
                  <FiCalendar /> Calendar view
                </button>
                <button className="toolbar-button">
                  <FiZap /> Automation
                </button>
                <button className="toolbar-button">
                  <FiFilter /> Filter
                </button>
                <button className="toolbar-button">
                  <FiShare2 /> Share
                </button>
                <button className="create-button" onClick={handleClick}>
                  <FiPlus /> Create new
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="notebar">
          <div className="board">
            {columns.map((column, index) => (
              <div key={index} className="column">
                <h2>{column.title}</h2>
                {column.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="task-card">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    <div className="task">
                      <span className="due-date">{task.deadline}</span>
                      {/* <span className="time-ago">
                        {task.updatedAt
                          ? formatDistanceToNow(parseISO(task.updatedAt), {
                              addSuffix: true,
                            })
                          : "Date not available"}
                      </span> */}
                    </div>
                  </div>
                ))}
                <button className="add-task-btn" onClick={handleClick}>Add new +</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
