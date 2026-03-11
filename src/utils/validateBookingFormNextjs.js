// Booking form validation utilities - Matching Next.js implementation
export const validateBookingForm = (formData, vehicles, hasAgreed) => {
  const errors = [];

  // Personal details validation (matching Next.js field names)
  if (!formData.first_name || formData.first_name.trim().length === 0) {
    errors.push({ field: 'first_name', message: 'First name is required' });
  }

  if (!formData.last_name || formData.last_name.trim().length === 0) {
    errors.push({ field: 'last_name', message: 'Last name is required' });
  }

  if (!formData.email || formData.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!formData.contact_no || formData.contact_no.trim().length === 0) {
    errors.push({ field: 'contact_no', message: 'Phone number is required' });
  }

  // Title validation
  if (!formData.title || formData.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required' });
  }

  // Additional personal details validation
  if (formData.first_name && formData.first_name.trim().length < 2) {
    errors.push({ field: 'first_name', message: 'First name must be at least 2 characters long' });
  }

  if (formData.last_name && formData.last_name.trim().length < 2) {
    errors.push({ field: 'last_name', message: 'Last name must be at least 2 characters long' });
  }

  // Phone number format validation (basic)
  if (formData.contact_no && formData.contact_no.trim().length > 0) {
    const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.contact_no.trim())) {
      errors.push({ field: 'contact_no', message: 'Please enter a valid phone number' });
    }
  }

  // Vehicle details validation (matching Next.js structure)
  if (!vehicles || vehicles.length === 0) {
    errors.push({ field: 'vehicles', message: 'At least one vehicle is required' });
  } else {
    vehicles.forEach((vehicle, index) => {
      // Only validate if vehicle details are not TBC (To Be Confirmed)
      const isTBC = (value) => !value || value.trim() === '' || value.trim().toUpperCase() === 'TBC';
      
      if (isTBC(vehicle.make)) {
        errors.push({ field: `vehicle_${index}_make`, message: `Vehicle ${index + 1} make is required` });
      }
      if (isTBC(vehicle.model)) {
        errors.push({ field: `vehicle_${index}_model`, message: `Vehicle ${index + 1} model is required` });
      }
      if (isTBC(vehicle.color)) {
        errors.push({ field: `vehicle_${index}_color`, message: `Vehicle ${index + 1} color is required` });
      }
      if (isTBC(vehicle.reg_no)) {
        errors.push({ field: `vehicle_${index}_reg_no`, message: `Vehicle ${index + 1} registration number is required` });
      }
      
      // Registration number format validation (basic UK format)
      if (vehicle.reg_no && vehicle.reg_no.trim().length > 0 && vehicle.reg_no.trim().toUpperCase() !== 'TBC') {
        const regNoRegex = /^[A-Z0-9\s]{2,8}$/i;
        if (!regNoRegex.test(vehicle.reg_no.trim())) {
          errors.push({ field: `vehicle_${index}_reg_no`, message: `Vehicle ${index + 1} registration number format is invalid` });
        }
      }
    });
  }

  // Terms and conditions validation (matching Next.js field name)
  if (!hasAgreed) {
    errors.push({ field: 'agree', message: 'You must agree to the terms and conditions' });
  }

  return {
    errors,
    state: errors.length > 0 ? 'error' : 'validated'
  };
};

// Additional utility functions for validation
export const validatePersonalDetails = (personalData) => {
  const errors = {};

  if (!personalData.first_name || personalData.first_name.trim().length === 0) {
    errors.first_name = 'First name is required';
  } else if (personalData.first_name.trim().length < 2) {
    errors.first_name = 'First name must be at least 2 characters long';
  }

  if (!personalData.last_name || personalData.last_name.trim().length === 0) {
    errors.last_name = 'Last name is required';
  } else if (personalData.last_name.trim().length < 2) {
    errors.last_name = 'Last name must be at least 2 characters long';
  }

  if (!personalData.email || personalData.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(personalData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!personalData.contact_no || personalData.contact_no.trim().length === 0) {
    errors.contact_no = 'Phone number is required';
  } else {
    const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(personalData.contact_no.trim())) {
      errors.contact_no = 'Please enter a valid phone number';
    }
  }

  // Title validation
  if (!personalData.title || personalData.title.trim().length === 0) {
    errors.title = 'Title is required';
  }

  return errors;
};

export const validateVehicleDetails = (vehicles) => {
  const errors = {};

  if (!vehicles || vehicles.length === 0) {
    errors.vehicles = 'At least one vehicle is required';
    return errors;
  }

  vehicles.forEach((vehicle, index) => {
    const isTBC = (value) => !value || value.trim() === '' || value.trim().toUpperCase() === 'TBC';
    
    if (isTBC(vehicle.make)) {
      errors[`vehicle_${index}_make`] = `Vehicle ${index + 1} make is required`;
    }
    if (isTBC(vehicle.model)) {
      errors[`vehicle_${index}_model`] = `Vehicle ${index + 1} model is required`;
    }
    if (isTBC(vehicle.color)) {
      errors[`vehicle_${index}_color`] = `Vehicle ${index + 1} color is required`;
    }
    if (isTBC(vehicle.reg_no)) {
      errors[`vehicle_${index}_reg_no`] = `Vehicle ${index + 1} registration number is required`;
    }
    
    // Registration number format validation
    if (vehicle.reg_no && vehicle.reg_no.trim().length > 0 && vehicle.reg_no.trim().toUpperCase() !== 'TBC') {
      const regNoRegex = /^[A-Z0-9\s]{2,8}$/i;
      if (!regNoRegex.test(vehicle.reg_no.trim())) {
        errors[`vehicle_${index}_reg_no`] = `Vehicle ${index + 1} registration number format is invalid`;
      }
    }
  });

  return errors;
};

// Utility to convert form data between Next.js and React formats
export const convertFormDataToNextjsFormat = (formData) => {
  return {
    first_name: formData.firstName || '',
    last_name: formData.lastName || '',
    email: formData.email || '',
    contact_no: formData.phone || '',
    title: formData.title || 'Mr',
    address: formData.address || '',
    city: formData.city || '',
    postcode: formData.postcode || '',
    country: formData.country || 'UK',
  };
};

export const convertVehicleDataToNextjsFormat = (vehicleData) => {
  if (Array.isArray(vehicleData)) {
    return vehicleData.map(vehicle => ({
      make: vehicle.vehicleMake || vehicle.make || '',
      model: vehicle.vehicleModel || vehicle.model || '',
      color: vehicle.vehicleColor || vehicle.color || '',
      reg_no: vehicle.licensePlate || vehicle.reg_no || '',
    }));
  }
  
  // Convert single vehicle object
  return [{
    make: vehicleData.vehicleMake || vehicleData.make || '',
    model: vehicleData.vehicleModel || vehicleData.model || '',
    color: vehicleData.vehicleColor || vehicleData.color || '',
    reg_no: vehicleData.licensePlate || vehicleData.reg_no || '',
  }];
};

export default validateBookingForm;
