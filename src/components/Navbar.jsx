import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
  Menu,
  MenuItem,
  Fade,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { logout, initializeAuth } from "../redux/slice/authSlice";
import { authenticatedApiService } from "../services/authenticatedApiService";
import logo from "../assets/optimized/logo-1.webp";
import ManageBookingModal from "./manageBooking/ManageBookingModal";
import { useAirports } from "../hooks/useAirports";
import { useUserRegion } from "../hooks/useUserRegion";

// Base navigation links (without Manage Booking)
const baseNavLinks = [
  { title: "About Us", path: "/about-us" },
  { title: "Airport Parking", path: "/airport-parking", hasDropdown: true },
  // { title: "Airport Lounges", path: "/extra" },
  // { title: "Car Hire", path: "/car-hire" },
  // { title: "Blog", path: "/blog" },
  { title: "Why Choose Us", path: "/why-choose-us" },
  { title: "FAQ", path: "/faq" },
  { title: "Contact Us", path: "/contact-us" },
];

// Airport Parking dropdown options - sorted alphabetically
const airportParkingOptions = [
  { title: "Birmingham Airport", path: "/birmingham-airport-parking" },
  { title: "Bristol Airport", path: "/bristol-airport-parking" },
  { title: "Dublin Airport", path: "/dublin-airport-parking" },
  { title: "Dubai Airport", path: "/dubai-airport-parking" },
  { title: "Glasgow Airport", path: "/glasgow-airport-parking" },
  { title: "Heathrow Airport", path: "/heathrow-airport-parking" },
  { title: "Leeds Bradford Airport", path: "/leeds-airport-parking" },
  { title: "Luton Airport", path: "/luton-airport-parking" },
  { title: "Manchester Airport", path: "/manchester-airport-parking" },
  { title: "Stansted Airport", path: "/stansted-airport-parking" },
  { title: "Southampton Port", path: "/southampton-port-parking" },
];



export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [manageBookingModalOpen, setManageBookingModalOpen] = useState(false);
  const open = Boolean(anchorEl);

  // ✅ Dynamic airports data
  const { airports, loading: airportsLoading, error: airportsError } = useAirports();

  // ✅ User region detection from IP
  const { region: userRegion, isDubai: isUserFromDubai, loading: regionLoading } = useUserRegion();

  // ✅ Map airport data from API to include navigation paths
  // API returns: { level: "Manchester", value: "MAN" }
  // We need: { title: "Manchester Airport", path: "/manchester-airport-parking", value: "MAN" }
  const mapAirportToNavOption = (airport) => {
    const name = airport.level || airport.name || airport.title || "";
    const code = airport.value || airport.code || airport.path || "";
    const nameLower = name.toLowerCase();

    // Map airport names to paths
    let path = "/airport-parking";
    if (nameLower.includes("birmingham")) path = "/birmingham-airport-parking";
    else if (nameLower.includes("bristol")) path = "/bristol-airport-parking";
    else if (nameLower.includes("dublin")) path = "/dublin-airport-parking";
    else if (nameLower.includes("dubai")) path = "/dubai-airport-parking";
    else if (nameLower.includes("glasgow")) path = "/glasgow-airport-parking";
    else if (nameLower.includes("heathrow")) path = "/heathrow-airport-parking";
    else if (nameLower.includes("leeds") || nameLower.includes("bradford")) path = "/leeds-airport-parking";
    else if (nameLower.includes("luton")) path = "/luton-airport-parking";
    else if (nameLower.includes("manchester")) path = "/manchester-airport-parking";
    else if (nameLower.includes("stansted")) path = "/stansted-airport-parking";
    else if (nameLower.includes("southampton")) path = "/southampton-port-parking";

    // Format title - add "Airport" if not present
    let title = name;
    if (!nameLower.includes("airport") && !nameLower.includes("port")) {
      title = `${name} Airport`;
    }

    return {
      title,
      path,
      value: code,
      name: name
    };
  };

  // ✅ Convert airports to navigation options
  const airportOptions = airportParkingOptions.map(mapAirportToNavOption);
  // const airportOptions = airports.map(mapAirportToNavOption);

  // ✅ Filter airport options based on IP-detected region - Dubai Airport only shows in Dubai region
  const getFilteredAirportOptions = () => {
    // If user is from Dubai (based on IP), show all airports including Dubai
    if (isUserFromDubai) return airportOptions;
    
    // Otherwise, exclude Dubai Airport for UK users
    return airportOptions.filter((airport) => {
      return airport.path !== "/dubai-airport-parking";
    });
  };


  // Dynamic navigation links - show Dashboard when logged in, Manage Booking when not
  const navLinks = [
    ...baseNavLinks.slice(0, 2), // About Us, Airport Parking
    {
      title: isLoggedIn ? "Dashboard" : "Manage Booking (Login)",
      path: isLoggedIn ? "/customer-dashboard" : "/manage-booking",
      isModal: !isLoggedIn,
      authAction: isLoggedIn ? "dashboard" : "login",
    },
    ...baseNavLinks.slice(2), // Car Hire, FAQ, Contact Us
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleAirportClick = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  const handleMobileDropdownToggle = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const handleMobileAirportClick = (path) => {
    setDrawerOpen(false);
    setMobileDropdownOpen(false);
    navigate(path);
  };

  const handleManageBookingClick = () => {
    setManageBookingModalOpen(true);
  };

  const handleMobileManageBookingClick = () => {
    setDrawerOpen(false);
    setManageBookingModalOpen(true);
  };

  const handleBookingFound = (bookingData) => {
    // Navigate to customer dashboard or booking details page
    // For now, we'll navigate to a placeholder route
    navigate("/customer-dashboard", { state: { bookingData } });
  };

  const handleLogout = async () => {
    try {
      // Call logout API endpoint with Bearer token
      await authenticatedApiService.logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout API error (continuing with local logout):", error);
      // Continue with local logout even if API fails
    } finally {
      // Always clear Redux state and redirect
      dispatch(logout());
      navigate("/");
    }
  };

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "secondary.main" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Section - Logo */}
          <Box sx={{ flex: "0 0 auto" }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Go Airport Parking LTD"
                sx={{
                  height: 50, // adjust size as needed
                  width: "auto",
                  my: 2,
                }}
              />
            </Box>
          </Box>

          {/* Middle Section - Navigation Links (Desktop only) */}
          {!isMobile && (
            <Box
              sx={{
                flex: "1 1 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
              }}
            >
              {navLinks.map((ele) => {
                const isActive = location.pathname === ele.path; // check active path

                // Special handling for Airport Parking dropdown
                if (ele.hasDropdown && ele.title === "Airport Parking") {
                  return (
                    <Box key={ele.title} sx={{ position: "relative" }}>
                      <Button
                        onMouseEnter={handleMouseEnter}
                        // Removed component={Link} and to={ele.path} to prevent navigation
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{
                          color: isActive
                            ? theme.palette.primary.main
                            : "white",
                          fontWeight: isActive ? 700 : 500,
                          textTransform: "none",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        {ele.title}
                      </Button>

                      {/* Dropdown Menu */}
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMouseLeave}
                        MenuListProps={{
                          onMouseLeave: handleMouseLeave,
                          sx: { py: 0 },
                        }}
                        TransitionComponent={Fade}
                        transitionDuration={200}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        sx={{
                          "& .MuiPaper-root": {
                            mt: 0.5,
                            minWidth: 220,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            borderRadius: 2,
                            overflow: "visible",
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              left: "50%",
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform:
                                "translateY(-50%) translateX(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                      >
                        {getFilteredAirportOptions().map((airport) => (
                          <MenuItem
                            key={airport.title}
                            onClick={() => handleAirportClick(airport.path)}
                            sx={{
                              py: 1.5,
                              px: 2,
                              fontSize: "0.95rem",
                              "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                                color: "white",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            {airport.title}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  );
                }

                // Handle Dashboard/Manage Booking based on login state
                if (
                  ele.authAction === "dashboard" ||
                  ele.authAction === "login"
                ) {
                  if (ele.authAction === "dashboard" && isLoggedIn) {
                    // Show Dashboard link when logged in
                    return (
                      <Button
                        key={ele.title}
                        component={Link}
                        to={ele.path}
                        sx={{
                          color: isActive
                            ? theme.palette.primary.main
                            : "white",
                          fontWeight: isActive ? 700 : 500,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        {ele.title}
                      </Button>
                    );
                  } else if (ele.authAction === "login" && !isLoggedIn) {
                    // Show Manage Booking modal when not logged in
                    return (
                      <Button
                        key={ele.title}
                        onClick={handleManageBookingClick}
                        sx={{
                          color: "white",
                          fontWeight: 500,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        {ele.title}
                      </Button>
                    );
                  }
                }

                // Regular navigation links
                return (
                  <Button
                    key={ele.title}
                    component={Link}
                    to={ele.path}
                    sx={{
                      color: isActive ? theme.palette.primary.main : "white",
                      fontWeight: isActive ? 700 : 500,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    {ele.title}
                  </Button>
                );
              })}
            </Box>
          )}

          {/* Right Section - Empty for Desktop, Menu for Mobile */}
          <Box sx={{ flex: "0 0 auto" }}>
            {!isMobile ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Empty - all actions handled in center navigation */}
              </Box>
            ) : (
              <IconButton
                edge="end"
                color="inherit"
                onClick={toggleDrawer(true)}
                sx={{ color: "white" }}
                aria-label="MenuButton"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              // Special handling for Airport Parking dropdown in mobile
              if (link.hasDropdown && link.title === "Airport Parking") {
                return (
                  <Box key={link.title}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={handleMobileDropdownToggle}
                        sx={{
                          color: isActive
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        <ListItemText primary={link.title} />
                        {mobileDropdownOpen ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </ListItemButton>
                    </ListItem>
                    <Collapse
                      in={mobileDropdownOpen}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {getFilteredAirportOptions().map((airport) => (
                          <ListItem key={airport.title} disablePadding>
                            <ListItemButton
                              sx={{ pl: 4 }}
                              onClick={() =>
                                handleMobileAirportClick(airport.path)
                              }
                            >
                              <ListItemText
                                primary={airport.title}
                                sx={{
                                  "& .MuiListItemText-primary": {
                                    fontSize: "0.9rem",
                                    color: theme.palette.text.secondary,
                                  },
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                );
              }

              // Handle Dashboard/Manage Booking in mobile based on login state
              if (
                link.authAction === "dashboard" ||
                link.authAction === "login"
              ) {
                if (link.authAction === "dashboard" && isLoggedIn) {
                  // Show Dashboard link when logged in
                  return (
                    <ListItem key={link.title} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={link.path}
                        onClick={toggleDrawer(false)}
                        sx={{
                          color: isActive
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        <ListItemText primary={link.title} />
                      </ListItemButton>
                    </ListItem>
                  );
                } else if (link.authAction === "login" && !isLoggedIn) {
                  // Show Manage Booking modal when not logged in
                  return (
                    <ListItem key={link.title} disablePadding>
                      <ListItemButton
                        onClick={handleMobileManageBookingClick}
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 400,
                        }}
                      >
                        <ListItemText primary={link.title} />
                      </ListItemButton>
                    </ListItem>
                  );
                }
              }

              // Regular navigation links
              return (
                <ListItem key={link.title} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={link.path}
                    onClick={toggleDrawer(false)}
                    sx={{
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <ListItemText primary={link.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}

            <Divider />
          </List>
        </Box>
      </Drawer>

      {/* Manage Booking Modal */}
      <ManageBookingModal
        open={manageBookingModalOpen}
        onClose={() => setManageBookingModalOpen(false)}
        onBookingFound={handleBookingFound}
      />
    </>
  );
}
