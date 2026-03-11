import { createSlice } from '@reduxjs/toolkit';

// Load auth data from localStorage on app start
const token = localStorage.getItem('authToken');
const customerData = localStorage.getItem('customerData');
let parsedCustomerData = null;

try {
  parsedCustomerData = customerData ? JSON.parse(customerData) : null;
} catch (error) {
  console.error('Error parsing customer data from localStorage:', error);
  localStorage.removeItem('customerData');
}

const initialState = {
  isAuthenticated: !!token,
  isLoggedIn: !!token,
  token: token || null,
  customerEmail: parsedCustomerData?.email || null,
  searchMethod: parsedCustomerData?.searchMethod || null,
  site: parsedCustomerData?.site || null,
  password: parsedCustomerData?.password || null,
  loginTime: parsedCustomerData?.loginTime || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Legacy login action for backwards compatibility
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
      localStorage.setItem('authToken', action.payload);
    },
    
    // New comprehensive auth data setter
    setAuthData: (state, action) => {
      const { token, customerEmail, searchMethod, site, password, loginTime, isLoggedIn = true } = action.payload;
      
      state.token = token;
      state.customerEmail = customerEmail;
      state.searchMethod = searchMethod;
      state.site = site;
      state.password = password;
      state.loginTime = loginTime;
      state.isAuthenticated = isLoggedIn;
      state.isLoggedIn = isLoggedIn;
      
      // Store in localStorage for persistence
      if (token) {
        localStorage.setItem('authToken', token);
      }
      
      if (customerEmail || searchMethod || site || password) {
        localStorage.setItem('customerData', JSON.stringify({
          email: customerEmail,
          searchMethod,
          site,
          password,
          loginTime
        }));
      }
    },
    
    // Update specific auth fields
    updateAuthData: (state, action) => {
      const updates = action.payload;
      Object.keys(updates).forEach(key => {
        if (state.hasOwnProperty(key)) {
          state[key] = updates[key];
        }
      });
      
      // Update localStorage with new data
      const customerData = {
        email: state.customerEmail,
        searchMethod: state.searchMethod,
        site: state.site,
        password: state.password,
        loginTime: state.loginTime
      };
      localStorage.setItem('customerData', JSON.stringify(customerData));
    },
    
    // Logout and clear all auth data
    logout: (state) => {
      state.token = null;
      state.customerEmail = null;
      state.searchMethod = null;
      state.site = null;
      state.password = null;
      state.loginTime = null;
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('customerData');
    },
    
    // Clear authentication but keep customer data
    clearAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');
    },
    
    // Initialize auth from localStorage (useful for app startup)
    initializeAuth: (state) => {
      const token = localStorage.getItem('authToken');
      const customerData = localStorage.getItem('customerData');
      
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        state.isLoggedIn = true;
      }
      
      if (customerData) {
        try {
          const parsed = JSON.parse(customerData);
          state.customerEmail = parsed.email;
          state.searchMethod = parsed.searchMethod;
          state.site = parsed.site;
          state.password = parsed.password;
          state.loginTime = parsed.loginTime;
        } catch (error) {
          console.error('Error parsing customer data during initialization:', error);
          localStorage.removeItem('customerData');
        }
      }
    },
  },
});

export const { 
  login, 
  logout, 
  setAuthData, 
  updateAuthData, 
  clearAuth, 
  initializeAuth 
} = authSlice.actions;

export default authSlice.reducer;
