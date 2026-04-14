import { useState } from "react";
import {
  AppBar,
  Toolbar,
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { authenticatedApiService } from "../services/authenticatedApiService";
import logo from "../assets/optimized/logo-1.webp";
import ManageBookingModal from "./manageBooking/ManageBookingModal";
import { useUserRegion } from "../hooks/useUserRegion";
import { useAirports } from "../hooks/useAirports";

// Base navigation links (without Manage Booking)
const navLinks = [
  { title: "About Us", path: "/about-us" },
  { title: "Airport Parking", path: "/airport-parking", hasDropdown: true },
  { title: "Why Choose Us", path: "/why-choose-us" },
  { title: "Services", path: "/services" },
  { title: "Blog", path: "/blog" },
  { title: "FAQ", path: "/faq" },
  { title: "Contact Us", path: "/contact-us" },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isDubai: isUserFromDubai } = useUserRegion();

  // Get airports from API - INSIDE COMPONENT
  const { airports: apiAirports, loading: airportsLoading, error: airportsError } = useAirports();


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [manageBookingModalOpen, setManageBookingModalOpen] = useState(false);
  const open = Boolean(anchorEl);

  // Map API airports to navbar format (title, path) - adjust based on API shape {name, slug}
  const airportOptions = apiAirports.map(airport => ({
    title: `${airport.name || airport.level}${airport.slug === 'southampton-port' ? ' Port' : ' Airport'}`,
    path: airport.path || airport.slug ? `/${airport.slug}-airport-parking` : `/${airport.value?.toLowerCase()}-airport-parking`
  }));

  const getFilteredAirportOptions = () => {
    if (airportsLoading) return []; // Disable during loading
    if (airportsError) {
      console.error('Airports load error:', airportsError);
      return []; // Or fallback static if needed
    }
    
    const options = isUserFromDubai ? airportOptions : airportOptions.filter((airport) => {
      return airport.path !== "/dubai-airport-parking";
    });
    return options;
  };



  // const navLinks = [
  //   ...baseNavLinks.slice(0, 2),
  //   {
  //     title: isLoggedIn ? "Dashboard" : "Manage Booking (Login)",
  //     path: isLoggedIn ? "/customer-dashboard" : "/manage-booking",
  //     isModal: !isLoggedIn,
  //     authAction: isLoggedIn ? "dashboard" : "login",
  //   },
  //   ...baseNavLinks.slice(2),
  // ];

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
    navigate("/customer-dashboard", { state: { bookingData } });
  };

  const handleLogout = async () => {
    try {
      await authenticatedApiService.logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout API error (continuing with local logout):", error);
    } finally {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "secondary.main",
          minHeight: { xs: 74, md: 82 },
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: { xs: "74px !important", md: "82px !important" },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Left Section - Logo */}
          <Box sx={{ flex: "0 0 auto", minWidth: { xs: 170, md: 210 } }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                lineHeight: 0,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Go Airport Parking LTD"
                width="180"
                height="50"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sx={{
                  display: "block",
                  width: { xs: 160, sm: 170, md: 180 },
                  height: { xs: 44, sm: 47, md: 50 },
                  objectFit: "contain",
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
                minHeight: 50,
              }}
            >
              {navLinks.map((ele) => {
                const isActive = location.pathname === ele.path;

                if (ele.hasDropdown && ele.title === "Airport Parking") {
                  return (
                    <Box key={ele.title} sx={{ position: "relative" }}>
                      <Button
                        onMouseEnter={handleMouseEnter}
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{
                          color: isActive ? theme.palette.primary.main : "white",
                          fontWeight: isActive ? 700 : 500,
                          textTransform: "none",
                          cursor: "pointer",
                          minHeight: 40,
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        {ele.title}
                      </Button>

                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMouseLeave}
                        keepMounted
                        MenuListProps={{
                          onMouseLeave: handleMouseLeave,
                          sx: { 
                            py: 0,
                            maxHeight: 400,
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                          },
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
                            minWidth: 280,
                            maxHeight: 400,
                            overflowY: "auto",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            borderRadius: 2,
                            scrollbarWidth: "thin",
                            scrollbarColor: "rgba(25,118,210,0.5) transparent",
                            "&::-webkit-scrollbar": { width: 6 },
                            "&::-webkit-scrollbar-track": { background: "transparent" },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "rgba(25,118,210,0.5)",
                              borderRadius: 8,
                              border: "2px solid transparent",
                              backgroundClip: "content-box",
                              minHeight: 24,
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              backgroundColor: "rgba(25,118,210,0.8)",
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              left: "50%",
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) translateX(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                      >
                        {(() => {
                          const filtered = getFilteredAirportOptions();
                          if (airportsLoading) {
                            return <MenuItem disabled>Loading airports...</MenuItem>;
                          }
                          if (airportsError) {
                            return <MenuItem disabled>Airports unavailable</MenuItem>;
                          }
                          if (filtered.length === 0) {
                            return <MenuItem disabled>No airports available</MenuItem>;
                          }
                          return filtered.map((airport) => (
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
                          ));
                        })()}

                      </Menu>
                    </Box>
                  );
                }

                if (ele.authAction === "dashboard" || ele.authAction === "login") {
                  if (ele.authAction === "dashboard" && isLoggedIn) {
                    return (
                      <Button
                        key={ele.title}
                        component={Link}
                        to={ele.path}
                        sx={{
                          color: isActive ? theme.palette.primary.main : "white",
                          fontWeight: isActive ? 700 : 500,
                          textTransform: "none",
                          minHeight: 40,
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        {ele.title}
                      </Button>
                    );
                  } else if (ele.authAction === "login" && !isLoggedIn) {
                    return (
                      <Button
                        key={ele.title}
                        onClick={handleManageBookingClick}
                        sx={{
                          color: "white",
                          fontWeight: 500,
                          textTransform: "none",
                          minHeight: 40,
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

                return (
                  <Button
                    key={ele.title}
                    component={Link}
                    to={ele.path}
                    sx={{
                      color: isActive ? theme.palette.primary.main : "white",
                      fontWeight: isActive ? 700 : 500,
                      textTransform: "none",
                      minHeight: 40,
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

          {/* Right Section */}
          <Box sx={{ flex: "0 0 auto", minWidth: { xs: 48, md: 80 }, display: "flex", justifyContent: "flex-end" }}>
            {!isMobile ? (
              <Box sx={{ display: "flex", alignItems: "center", minHeight: 40 }} />
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
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              if (link.hasDropdown && link.title === "Airport Parking") {
                return (
                  <Box key={link.title}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={handleMobileDropdownToggle}
                        sx={{
                          color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        <ListItemText primary={link.title} />
                        {mobileDropdownOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={mobileDropdownOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {(() => {
                          const filtered = getFilteredAirportOptions();
                          if (airportsLoading) {
                            return <ListItem key="loading"><ListItemText primary="Loading airports..." /></ListItem>;
                          }
                          if (airportsError) {
                            return <ListItem key="error"><ListItemText primary="Airports unavailable" /></ListItem>;
                          }
                          if (filtered.length === 0) {
                            return <ListItem key="none"><ListItemText primary="No airports available" /></ListItem>;
                          }
                          return filtered.map((airport) => (
                            <ListItem key={airport.title} disablePadding>
                              <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => handleMobileAirportClick(airport.path)}
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
                          ));
                        })()}

                      </List>
                    </Collapse>
                  </Box>
                );
              }

              if (link.authAction === "dashboard" || link.authAction === "login") {
                if (link.authAction === "dashboard" && isLoggedIn) {
                  return (
                    <ListItem key={link.title} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={link.path}
                        onClick={toggleDrawer(false)}
                        sx={{
                          color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        <ListItemText primary={link.title} />
                      </ListItemButton>
                    </ListItem>
                  );
                } else if (link.authAction === "login" && !isLoggedIn) {
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

              return (
                <ListItem key={link.title} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={link.path}
                    onClick={toggleDrawer(false)}
                    sx={{
                      color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
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

      <ManageBookingModal
        open={manageBookingModalOpen}
        onClose={() => setManageBookingModalOpen(false)}
        onBookingFound={handleBookingFound}
      />
    </>
  );
}