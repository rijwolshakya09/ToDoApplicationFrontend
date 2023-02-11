import * as React from "react";
import "./showTask.scss";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TaskIcon from "@mui/icons-material/Task";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import AddTask from "./AddTask";
import { Button } from "@mui/material";
import UpdateTask from "./UpdateTask";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);

  const [openReply, setOpenReply] = React.useState(false);
  const handleOpenReply = () => setOpenReply(true);
  const handleCloseReply = () => setOpenReply(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const style3 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const deleteTask = () => {
    console.log(row._id);
    axios
      .delete("http://localhost:90/task/delete/" + row._id, config)
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          console.log("Task Deleted Successfull");
          toast.success(
            "Task Deleted Successfully",
            { toastId: "Delete Success" },
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          console.log("Please Try Again!!!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <TableCell align="center">{row.task_name}</TableCell>
        <TableCell
          align="center"
          className={` ${
            (row.task_status === "Pending" && "text-warning") ||
            (row.task_status === "Started" && "text-success") ||
            (row.task_status === "Completed" && "text-danger")
          }`}
        >
          {row.task_status}
        </TableCell>
        <TableCell align="center">{row.assigned_to.full_name}</TableCell>
        <TableCell align="center">
          <div className="d-flex  align-items-center justify-content-center">
            {row.task_status !== "Started" &&
            row.task_status === "Completed" ? (
              <></>
            ) : (
              <>
                <button className="update--btn" onClick={handleOpenReply}>
                  Update&nbsp; <SendIcon size={15} />
                </button>
                <Modal
                  open={openReply}
                  onClose={handleCloseReply}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style3}>
                    <UpdateTask
                      // _id={row._id}
                      // task_name={row.task_name}
                      // task_description={row.task_description}
                      // task_status={row.task_status}
                      // assigned_to={row.assigned_to}
                      task={row}
                    />
                  </Box>
                </Modal>
              </>
            )}

            <button onClick={handleOpen} class="delete--btn">
              Delete &nbsp; <BsTrashFill size={15} />
            </button>
            <Modal
              open={view}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete this task?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="d-flex align-items-center ">
                    <button
                      className="update--btn"
                      onClick={(e) => {
                        deleteTask(row._id, e);
                      }}
                    >
                      Yes &nbsp; <BsCheckLg />
                    </button>
                    <button onClick={handleClose} className="delete--btn ">
                      No &nbsp; <ImCross />
                    </button>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className="moreInfo">
                <Typography sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                    }}
                    className="me-2"
                    variant="body2"
                    color="text.secondary"
                  >
                    Task Description:
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, fontFamily: "Poppins" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {row.task_description}
                  </Typography>
                </Typography>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff6363",
    fontSize: "18px",
    fontWeight: "600",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 26,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get("http://localhost:90/task/getbyUser", config).then((res) => {
      console.log(res.data);
      setTasks(res.data.data);
      //   setListedBooks(res.data.data);
    });
  }, []);
  return (
    <div className="ms-5 me-5">
      <h1 className="text-center fs-3 mt-4">All Tasks Added</h1>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-test="add-audiobook-modal"
        >
          <Box sx={style}>
            <AddTask />
          </Box>
        </Modal>
        <Button
          variant="contained"
          onClick={handleOpen}
          endIcon={<TaskIcon />}
          sx={{
            borderRadius: 2,
            background: "#6BB3ED",
            fontFamily: "Poppins",
            marginBottom: 1,
            p: 1,
            ":hover": { background: "#3098EC" },
          }}
        >
          Add Task
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell />
              <StyledTableCell align="center" className="tableheading">
                Task Name
              </StyledTableCell>
              <StyledTableCell align="center" className="tableheading">
                Task Status
              </StyledTableCell>
              <StyledTableCell align="center" className="tableheading">
                Assigned To
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
