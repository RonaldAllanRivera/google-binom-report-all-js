import {
  Admin,
  Resource,
  ListGuesser,
  CustomRoutes,
  Layout,
  Menu as RaMenu,
  AppBar,
} from "react-admin";
import { Route } from "react-router-dom";
import GoogleAdsCsvUpload from "./GoogleAdsCsvUpload";
import fakeDataProvider from "ra-data-fakerest";
import {
  Toolbar,
  Typography,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Avatar,
} from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from "react";

const fakeData = {
  posts: [
    { id: 1, title: "First Post", body: "Welcome to your admin dashboard!" },
    { id: 2, title: "Second Post", body: "React Admin is working!" },
  ],
};

// Custom AppBar (top)
const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#6d28d9" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit" fontWeight={700}>
          Google Ads + Binom Report
        </Typography>
        <div>
          <IconButton onClick={handleMenu} color="inherit" sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "#fff", color: "#6d28d9", fontWeight: "bold" }}>GA</Avatar>
          </IconButton>
          <MuiMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </MuiMenu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

// Custom Sidebar Menu
const CustomMenu = () => (
  <RaMenu>
    <RaMenu.Item to="/posts" primaryText="Posts" leftIcon={<PostAddIcon />} />
    <RaMenu.Item to="/google-ads-upload" primaryText="Google Ads Upload" leftIcon={<UploadFileIcon />} />
  </RaMenu>
);
// Custom Layout: uses both top bar and sidebar
const CustomLayout = (props) => (
  <Layout
    {...props}
    appBar={CustomAppBar}
    menu={CustomMenu}
  />
);

export default function AdminPanel() {
  return (
    <Admin dataProvider={fakeDataProvider(fakeData)} layout={CustomLayout}>
      <CustomRoutes>
        <Route path="/google-ads-upload" element={<GoogleAdsCsvUpload />} />
      </CustomRoutes>
      <Resource name="posts" list={ListGuesser} />
    </Admin>
  );
}
