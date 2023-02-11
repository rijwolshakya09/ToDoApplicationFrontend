import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StartIcon from "@mui/icons-material/Start";
import axios from "axios";
import { toast } from "react-toastify";
// import { Modal } from "@mui/material";

// import { BsCheckLg } from "react-icons/bs";
// import { ImCross } from "react-icons/im";
// import { BsTrashFill } from "react-icons/bs";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const AssignedTaskCard = ({ tasks }) => {
  const { _id, task_name, task_description, task_status, userId } =
    tasks;

  // const [view, setView] = React.useState(false);
  // const handleOpen = () => setView(true);
  // const handleClose = () => setView(false);

  const startTask = (_id, e) => {
    e.preventDefault();
    const data = {
      _id: _id,
    };
    axios
      .put("http://localhost:90/task/start", data, config)
      .then((response) => {
        console.log(response.data.msg);
        toast.success(
          "Task Started Successfully",
          { toastId: "Task Started" },
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const finishTask = (_id, e) => {
    e.preventDefault();
    const data = {
      _id: _id,
    };
    axios
      .put("http://localhost:90/task/complete", data, config)
      .then((response) => {
        console.log(response.data.msg);
        toast.success(
          "Task Completed Successfully",
          { toastId: "Task Completed" },
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const deleteTask = (_id, e) => {
  //   e.preventDefault();
  //   const data = {
  //     _id: _id,
  //   };
  //   axios
  //     .delete("http://localhost:90/task/delete/" + _id, config)
  //     .then((result) => {
  //       console.log(result);
  //       if (result.data.success) {
  //         console.log("Task Deleted Successfull");
  //         toast.success(
  //           "Task Deleted Successfully",
  //           { toastId: "Delete Success" },
  //           setTimeout(() => {
  //             window.location.reload();
  //           }, 1500)
  //         );
  //       } else {
  //         console.log("Please Try Again!!!");
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginBottom: 2,
      }}
    >
      <Card
        sx={{ width: "60vh", backgroundColor: "whitesmoke" }}
        className="card-assign"
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              border: 2,
              borderRadius: 1,
              justifyContent: "center",
              borderColor: "#429ce773",
              marginBottom: 1,
            }}
            backgroundColor="primary.light"
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: "bold",
                marginRight: 1,
                color: "white",
              }}
            >
              Task Name:
            </Typography>
            <Typography sx={{ fontSize: 18, color: "white" }}>
              {task_name}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignContent: "center", marginBottom: 1 }}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold", marginRight: 1 }}
              color="text.secondary"
            >
              Task Description:
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary">
              {task_description}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignContent: "center", marginBottom: 1 }}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold", marginRight: 1 }}
              color="text.secondary"
            >
              Task Status:
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold" }}
              className={` ${
                (task_status === "Pending" && "text-warning") ||
                (task_status === "Started" && "text-success") ||
                (task_status === "Completed" && "text-danger")
              }`}
            >
              {task_status}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignContent: "center" }}>
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold", marginRight: 1 }}
              color="text.secondary"
            >
              Assigned By:
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary">
              {userId.full_name}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          {task_status !== "Pending" ? (
            <></>
          ) : (
            <Button
              variant="contained"
              endIcon={<StartIcon />}
              sx={{
                backgroundColor: "#64a36e",
                fontFamily: "Poppins",
                fontSize: 14,
              }}
              onClick={(e) => {
                startTask(_id, e);
              }}
            >
              Start
            </Button>
          )}
          {task_status !== "Started" ? (
            <></>
          ) : (
            <Button
              variant="contained"
              endIcon={<StartIcon />}
              sx={{
                backgroundColor: "#e22424",
                fontFamily: "Poppins",
                fontSize: 14,
              }}
              onClick={(e) => {
                finishTask(_id, e);
              }}
            >
              Finish
            </Button>
          )}
          {/* {task_status !== "Completed" ? (
            <></>
          ) : (
            <>
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
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Are you sure you want to delete this task?
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="d-flex align-items-center ">
                      <button
                        className="update--btn"
                        onClick={(e) => {
                          deleteTask(_id, e);
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
            </>
          )} */}
        </CardActions>
      </Card>
    </Box>
  );
};

export default AssignedTaskCard;
