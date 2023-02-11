import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useState, useEffect } from "react";

import {
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { toast } from "react-toastify";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const AddTask = () => {
  const [task_name, setTaskName] = useState("");
  const [task_description, setTaskDescription] = useState("");
  const [task_status, setTaskStatus] = useState("Pending");
  const [assigned_to, setAssignedTo] = useState("");
  const [allusers, setAllUsers] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };  
    axios.get("http://localhost:90/user/getalluser", config).then((res) => {
      console.log(res.data);
      setAllUsers(res.data.data);
    });
  }, []);

  const handleChange = (event) => {
    setAssignedTo(event.target.value);
  };

  const addTask = (e) => {
    if (
      task_name === "" ||
      task_description === "" ||
      task_status === "" ||
      assigned_to === ""
    ) {
      toast.warn("Fill all Required Field", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = {
      task_name: task_name,
      task_description: task_description,
      task_status: task_status,
      assigned_to: assigned_to,
    };
    console.log(data);

    axios
      .post("http://localhost:90/task/add", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Task Added Successfully");
          toast.success("Task Added Successfully", {
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
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
          />
          <TextField
            defaultValue={"Pending"}
            required
            id="outlined-required fullWidth"
            fullWidth
            disabled
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
            endIcon={<AddCircleIcon className="fs-3" />}
            onClick={addTask}
            data-test="add-btn"
          >
            Add Task
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddTask;
