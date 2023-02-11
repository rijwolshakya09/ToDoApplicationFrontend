import * as React from "react";
import "./assignedTask.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import AssignedTaskCard from "./AssignedTaskCard";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const AssignedTask = () => {
    const [userId, setUserId] = useState("");
    const [userDetails, setUserDetails] = useState("");
    const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:90/user/get", config).then((res) => {
      console.log(res.data.data._id);
      setUserId(res.data.data._id);
      setUserDetails(res.data.data);
    });

    axios.get("http://localhost:90/task/filter" , config).then((res) => {
      console.log(res.data);
      setTasks(res.data.data);
    });
  }, []);
  return (
    <div>
      <h1 className="text-center fs-3 mt-4 p-0">Assigned Task</h1>
      {tasks.map((tasks) => (
        <AssignedTaskCard tasks={tasks} />
      ))}
    </div>
  );
};

export default AssignedTask;
