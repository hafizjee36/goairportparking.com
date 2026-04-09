import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import {
  BookmarkBorder as BookingIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import BookingDetailsModal from './BookingDetailsModal';

const BookingsTab = ({ bookings = [] }) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0); // 0: Completed, 1: Incomplete, 2: Cancelled
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filterBookingsByStatus = (status) => {
    return bookings.filter(booking => {
      const bookingStatus = booking.booking_details_current?.status?.toLowerCase();
      switch (status) {
        case 'completed':
          return bookingStatus === 'completed' || bookingStatus === 'confirmed';
        case 'incomplete':
          return bookingStatus === 'incompleted' || bookingStatus === 'pending';
        case 'cancelled':
          return bookingStatus === 'cancelled';
        default:
          return false;
      }
    });
  };

  const getFilteredBookings = () => {
    switch (selectedTab) {
      case 0:
        return filterBookingsByStatus('completed');
      case 1:
        return filterBookingsByStatus('incomplete');
      case 2:
        return filterBookingsByStatus('cancelled');
      default:
        return bookings;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return theme.palette.success.main;
      case 'confirmed':
        return theme.palette.info.main;
      case 'incompleted':
        return theme.palette.warning.main;
      case 'cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'Completed';
      case 'confirmed':
        return 'Confirmed';
      case 'incompleted':
        return 'Incomplete';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status || 'Unknown';
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  return (
    <Box>
      {/* Booking Status Tabs */}
      <Card sx={{ mb: 3, borderRadius: 3, bgcolor: 'white' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={selectedTab}
            onChange={(event, newValue) => setSelectedTab(newValue)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                minWidth: { xs: 'auto', sm: 120 },
                padding: { xs: '6px 8px', sm: '8px 12px', md: '8px 16px' },
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: '#ffc107',
                      color: 'white',
                      minWidth: 'auto',
                      px: { xs: 1, sm: 1.5, md: 2 },
                      py: { xs: 0.5, sm: 0.75 },
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                      '&:hover': { bgcolor: '#e0a800' },
                    }}
                  >
                    Completed
                  </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                    ({filterBookingsByStatus('completed').length})
                  </Typography>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: '#17a2b8',
                      color: 'white',
                      minWidth: 'auto',
                      px: { xs: 1, sm: 1.5, md: 2 },
                      py: { xs: 0.5, sm: 0.75 },
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                      '&:hover': { bgcolor: '#138496' },
                    }}
                  >
                    Incomplete
                  </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                    ({filterBookingsByStatus('incomplete').length})
                  </Typography>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: '#495057',
                      color: 'white',
                      minWidth: 'auto',
                      px: { xs: 1, sm: 1.5, md: 2 },
                      py: { xs: 0.5, sm: 0.75 },
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                      '&:hover': { bgcolor: '#343a40' },
                    }}
                  >
                    Cancelled
                  </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                    ({filterBookingsByStatus('cancelled').length})
                  </Typography>
                </Box>
              }
            />
          </Tabs>
        </Box>
      </Card>

      {/* Bookings Table */}
      <Card sx={{ borderRadius: 3, bgcolor: 'white', width: '100%' }}>
        <CardContent sx={{ p: 0 }}>
          {getFilteredBookings().length > 0 ? (
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap" }}
                    >
                      Reference
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap" }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap" }}
                    >
                      Customer
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap" }}
                    >
                      Vehicle
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap" }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getFilteredBookings().map((booking) => (
                    <TableRow
                      key={booking.id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.02)",
                        },
                      }}
                    >
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#495057" }}
                        >
                          {booking.reference_no}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {format(new Date(booking.created_at), "dd MMM yyyy")}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Typography variant="body2">
                          {booking.booking_details_current?.departure_date &&
                            booking.booking_details_current?.arrival_date
                            ? `${format(new Date(booking.booking_details_current.departure_date), "dd MMM")} - ${format(new Date(booking.booking_details_current.arrival_date), "dd MMM")}`
                            : "TBC"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Typography variant="body2">
                          {booking.booking_details_current?.customer
                            ? `${booking.booking_details_current.customer.first_name} ${booking.booking_details_current.customer.last_name}`
                            : "TBC"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Typography variant="body2">
                          {booking.booking_details_current?.vehicle?.reg_no !== "TBC"
                            ? booking.booking_details_current?.vehicle?.reg_no
                            : "TBC"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Chip
                          label={getStatusLabel(
                            booking.booking_details_current?.status
                          )}
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(
                              booking.booking_details_current?.status
                            ),
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                      </TableCell>

                      <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewBooking(booking)}
                          sx={{
                            color: "#007bff",
                            "&:hover": {
                              bgcolor: "rgba(0,123,255,0.1)",
                            },
                          }}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <BookingIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                No {selectedTab === 0 ? 'Completed' : selectedTab === 1 ? 'Incomplete' : 'Cancelled'} Bookings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {selectedTab === 0 ?
                  'You don\'t have any completed bookings yet.' :
                  selectedTab === 1 ?
                    'You don\'t have any incomplete bookings.' :
                    'You don\'t have any cancelled bookings.'
                }
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <BookingDetailsModal
        open={detailsOpen}
        booking={selectedBooking}
        onClose={() => setDetailsOpen(false)}
      />
    </Box>
  );
};

export default BookingsTab;
