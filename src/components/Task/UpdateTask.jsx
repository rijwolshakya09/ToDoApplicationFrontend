import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useState } from "react";

import {
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { toast } from "react-toastify";
import { Edit } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UpdateTask = ({ task }) => {
  const [task_name, setTaskName] = useState("");
  const [task_description, setTaskDescription] = useState("");
  const [task_status, setTaskStatus] = useState("");
  const [assigned_to, setAssignedTo] = useState("");
  const [allusers, setAllUsers] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios.get("http://localhost:90/user/getalluser", config).then((res) => {
      console.log(res.data);
      setAllUsers(res.data.data);
    });
  }, []);

  const updateTask = (e) => {
    const data = {
      task_name: task_name,
      task_description: task_description,
      task_status: task_status,
      assigned_to: assigned_to,
      _id: task._id,
    };
    console.log(data);

    axios
      .put("http://localhost:90/task/update", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Task Updated Successfully");
          toast.success("Task Updated Successfully", {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.replace("/showtask");
        } else {
          console.log("Please Try Again! Something Went Wrong!!!", res);
          toast.error("Somthing went wrong!", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (event) => {
    setAssignedTo(event.target.value);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0, pb: 2 },
          // width: 762,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <div className="row">
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Task Name"
            width="100%"
            defaultValue={task.task_name}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          <TextField
            required
            multiline
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Task Description"
            defaultValue={task.task_description}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
          />
          <TextField
            defaultValue={"Pending"}
            required
            id="outlined-required fullWidth"
            fullWidth
            // disabled
            label="Task Status"
            width="100%"
            onChange={(e) => {
              setTaskStatus(e.target.value);
            }}
          />
          <FormControl sx={{ pb: 2 }} required>
            <InputLabel id="demo-simple-select-label">Assign To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={task.assigned_to}
              value={assigned_to}
              label="Assign To"
              onChange={handleChange}
            >
              {allusers.map((allusers) => (
                <MenuItem value={allusers._id}>{allusers.full_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<Edit className="fs-3" />}
            onClick={updateTask}
          >
            Update Task
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdateTask;
