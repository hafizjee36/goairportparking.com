import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Chip,
  Grid,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Badge,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Person as PersonIcon,
  DirectionsCar as CarIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  BookmarkBorder as BookingIcon,
  ConfirmationNumber as TicketIcon,
  RateReview as ReviewIcon,
  Edit as EditIcon,
  ExitToApp as LogoutIcon,
  Visibility as ViewIcon,
  Cancel as CancelIcon,
  Email as ResendIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import bookingManagementService from '../../services/bookingManagementService';
import { logout } from '../../redux/slice/authSlice';
import PageWrapper from '../../components/reusable/PageWrapper';
import BookingFormAlt from '../../components/bookingForm/BookingFormAlt';
import BookingsTab from './components/BookingsTab';
import ProfileTab from './components/ProfileTab';
import SupportTicketTab from './components/SupportTicketTab';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const authData = useSelector((state) => state.auth);
  const highlightColor = '#ffc107';

  // State management
  const [userDetails, setUserDetails] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMainTab, setSelectedMainTab] = useState(0); // 0: Bookings, 1: Profile, 2: Support Tickets
  
  // Check URL parameters for tab selection
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'profile') {
      setSelectedMainTab(1);
    } else if (tab === 'support') {
      setSelectedMainTab(2);
    }
  }, [location.search]);

  // Helper functions
  const getUserName = () => {
    // First try to get name from latest booking
    if (bookings && bookings.length > 0) {
      const latestBooking = bookings[0]; // Bookings are already sorted by created_at desc
      const customer = latestBooking.booking_details_current?.customer;
      if (customer?.first_name || customer?.last_name) {
        return `${customer.first_name || ''} ${customer.last_name || ''}`.trim();
      }
    }
    
    // Fallback to email-based name
    const email = authData?.customerEmail || bookingData?.customerEmail;
    if (!email) return 'Unknown User';
    
    // Extract name from email (before @)
    const namePart = email.split('@')[0];
    // Capitalize first letter and replace dots/underscores with spaces
    return namePart
      .replace(/[._]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  // Fetch user details after component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError('');
        
        const userEmail = authData?.customerEmail || bookingData?.customerEmail;
        const token = authData?.token || localStorage.getItem('authToken');
        
        if (!userEmail) {
          setError('No email found. Please log in again.');
          setLoading(false);
          // Redirect to manage-booking page after 2 seconds
          setTimeout(() => {
            navigate('/manage-booking', { replace: true });
          }, 2000);
          return;
        }
        
        console.log('🔄 Fetching user details for:', userEmail);
        
        const response = await bookingManagementService.getUserDetails(userEmail, token);
        
        console.log('📥 User details response:', response);
        
        if (response?.success && response?.data) {
          // New API response structure - data is directly an array of bookings
          const bookingsData = Array.isArray(response.data) ? response.data : [];
          setUserDetails({ bookings: bookingsData });
          setBookings(bookingsData);
          
          // Extract reviews and tickets from bookings
          const allReviews = [];
          const allTickets = [];
          bookingsData.forEach(booking => {
            if (booking.review) {
              allReviews.push(booking.review);
            }
            if (booking.ticket && Array.isArray(booking.ticket)) {
              allTickets.push(...booking.ticket);
            }
          });
          
          setReviews(allReviews);
          setTickets(allTickets);
        } else {
          setError(response?.message || 'Failed to fetch user details');
        }
      } catch (error) {
        console.error('❌ Error fetching user details:', error);
        setError(error.message || 'Failed to load dashboard data');
        
        // Show error toast
        toast.error(error.message || 'Failed to load dashboard data', {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [authData?.customerEmail, bookingData?.customerEmail, authData?.token]);


  const handleLogout = () => {
    // Clear authentication data
    dispatch(logout());
    localStorage.removeItem('authToken');
    localStorage.removeItem('customerData');
    
    toast.success('Logged out successfully', {
      position: "top-right",
      autoClose: 3000,
    });
    
    // Navigate to home
    navigate('/');
  };
  
  const handleEditProfile = () => {
    setSelectedMainTab(1); // Switch to Profile tab (index 1)
  };


  // Loading state
  if (loading) {
    return (
      <Box sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading your dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <PageWrapper>
          <Container maxWidth="lg">
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: 2,
                '& .MuiAlert-message': {
                  width: '100%'
                }
              }}
              action={
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              }
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Failed to Load Dashboard
              </Typography>
              <Typography variant="body2">
                {error}
              </Typography>
            </Alert>
          </Container>
        </PageWrapper>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <PageWrapper>
        <Container maxWidth="lg" sx={{ px: { xs: '0px', sm: 3, md: 4 } }}>
          {/* Header Section */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2 
          }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Customer Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                From your account dashboard, you can easily add, check, view and manage your bookings, account details, service reviews and support tickets.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                bgcolor: '#dc3545',
                color: 'white',
                '&:hover': {
                  bgcolor: '#c82333',
                },
                px: 3,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Logout
            </Button>
          </Box>

       {/* Stats Cards Row */}
<Grid container spacing={3} sx={{ mb: 4 }}>
  {/* User Profile Card - 25% on desktop */}
  <Grid item xs={12} md={3}>
    <Card
      sx={{
        borderRadius: 3,
         width: { xs: '100%', sm: '250px' },
        height: "100%",
        bgcolor: "#e9ecef",
        border: "none",
        position: "relative",
      }}
    >
      <CardContent sx={{ p: 3, textAlign: "center" }}>
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <IconButton size="small" onClick={handleEditProfile}>
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        <Avatar
          sx={{
            bgcolor: "#6c757d",
            width: 60,
            height: 60,
            mx: "auto",
            mb: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: 30 }} />
        </Avatar>

        <Typography
          variant="body2"
          sx={{ fontWeight: 600, mb: 0.5, color: "#495057" }}
        >
          {getUserName()}
        </Typography>

        <Button
          variant="contained"
          size="small"
          onClick={handleEditProfile}
          sx={{
            bgcolor: "#343a40",
            color: "white",
            "&:hover": { bgcolor: "#23272b" },
            fontSize: "0.75rem",
            px: 2,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  </Grid>

  {/* Right side cards wrapper (Bookings, Tickets, Reviews) */}
  <Grid item xs={12} md={9}>
    <Grid container spacing={3}>
      {/* Bookings Card */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
           width: { xs: '100%', sm: '250px' },
            height: "100%",
            bgcolor: "#dc3545",
            color: "white",
          }}
        >
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <BookingIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {bookings.length}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 800,
                textTransform: "capitalize",
                fontSize: "20px",
              }}
            >
              Booking(s)
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Tickets Card */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
             width: { xs: '100%', sm: '250px' },
            height: "100%",
            bgcolor: "#28a745",
            color: "white",
          }}
        >
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <TicketIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {tickets.length}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 800,
                textTransform: "capitalize",
                fontSize: "20px",
              }}
            >
              Ticket(s)
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Reviews Card */}
      {/* <Grid item xs={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            height: "100%",
             width: { xs: '100%', sm: '250px' },
            bgcolor: "#ffc107",
            color: "white",
          }}
        >
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <ReviewIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {reviews.length}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 800,
                textTransform: "capitalize",
                fontSize: "20px",
              }}
            >
              Review(s)
            </Typography>
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  </Grid>
</Grid>


          {/* Navigation Tabs - Removed logout */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 0,
              borderBottom: '1px solid #dee2e6',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: 4,
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: '#888',
                borderRadius: 2,
              },
            }}>
              {[
                { label: 'BOOKINGS', color: '#ffc107', active: selectedMainTab === 0, index: 0 },
                { label: 'PROFILE', color: '#6c757d', active: selectedMainTab === 1, index: 1 },
                { label: 'SUPPORT TICKETS', color: '#6c757d', active: selectedMainTab === 2, index: 2 },
                // { label: 'REVIEWS', color: '#6c757d', active: false, index: 3 },
                // { label: 'CREDIT VOUCHERS', color: '#6c757d', active: false, index: 4 }
              ].map((tab) => (
                <Button
                  key={tab.index}
                  onClick={() => {
                    if (tab.index <= 2) { // Allow clicking on BOOKINGS, PROFILE, and SUPPORT TICKETS
                      setSelectedMainTab(tab.index);
                    }
                  }}
                  sx={{
                    color: tab.active ? highlightColor : '#6c757d',
                    borderBottom: tab.active ? `3px solid ${highlightColor}` : '3px solid transparent',
                    borderRadius: 0,
                    px: 3,
                    py: 2,
                    fontWeight: tab.active ? 600 : 400,
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    minWidth: 'auto',
                    cursor: tab.index <= 2 ? 'pointer' : 'not-allowed',
                    opacity: tab.index <= 2 ? 1 : 0.6,
                    '&:hover': {
                      bgcolor: tab.index <= 2 ? 'rgba(0,0,0,0.04)' : 'transparent',
                    },
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Main Content + Right Sidebar (BookingFormAlt) */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {/* Left - Tab content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {selectedMainTab === 0 ? (
                <BookingsTab bookings={bookings} />
              ) : selectedMainTab === 1 ? (
                <ProfileTab bookings={bookings} />
              ) : selectedMainTab === 2 ? (
                <SupportTicketTab bookings={bookings} />
              ) : null}
            </Box>

            {/* Right - New booking sidebar shown for every tab */}
            <Box sx={{ width: { xs: '100%', md: 360, lg: 370 }, flexShrink: 0 }}>
              <Card sx={{ borderRadius: 3, bgcolor: 'white', position: { md: 'sticky' }, top: { md: 20 } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 3,
                    pb: 2,
                    borderBottom: '1px solid #dee2e6'
                  }}>
                    <Box sx={{ 
                      bgcolor: '#ffc107', 
                      p: 1,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <BookingIcon sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#495057', mb: 0.5 }}>
                        New booking
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Create a new parking reservation
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    '& .MuiGrid-root': {
                      '& > .MuiGrid-item': {
                        '& > *': {
                          minHeight: 50,
                        },
                      },
                    },
                  }}>
                    <BookingFormAlt forceMobile={true} />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </PageWrapper>
    </Box>
  );
};

export default CustomerDashboard;
