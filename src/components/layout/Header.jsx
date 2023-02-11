import * as React from "react";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar
    //     position="static"
    //     sx={{
    //       zIndex: (theme) => theme.zIndex.drawer + 1,
    //       background: "#6BB3ED",
    //     }}
    //   >
    //     <Toolbar>
    //       <Box
    //         sx={{
    //           flexGrow: 1,
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <Typography sx={{ fontWeight: "bold" }} className="fs-2" color="white">
    //           To Do Application
    //         </Typography>
    //       </Box>
    //       {localStorage.getItem("token") ? (
    //         <Box sx={{ display: { xs: "flex", md: "flex" } }}>
    //           <Button
    //             sx={{ borderRadius: 4, fontWeight: "bold" }}
    //             variant="contained"
    //             endIcon={<LogoutIcon />}
    //             onClick={logout}
    //           >
    //             Logout
    //           </Button>
    //         </Box>
    //       ) : (
    //         <></>
    //       )}
    //     </Toolbar>
    //   </AppBar>
    // </Box>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#6BB3ED",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="fs-3"
            sx={{ display: { xs: "none", sm: "block", fontFamily: "Poppins", fontWeight: "bold" } }}
          >
            TODO Application
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {localStorage.getItem("token") ? (
            <Box sx={{ display: { xs: "flex", md: "flex" }, alignItems: "center" }}>
              <Link to="/showtask" className="text-decoration-none text-white me-4 fw-bold">Add Task</Link>
              <Link to="/assigned_task" className="text-decoration-none text-white me-4 fw-bold">Assigned Task</Link>
              <Button
                sx={{ borderRadius: 4, fontWeight: "bold" }}
                variant="contained"
                endIcon={<LogoutIcon />}
                onClick={logout}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
