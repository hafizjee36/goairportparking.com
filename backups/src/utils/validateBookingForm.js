// Form validation utility for booking forms
export default function validateBookingForm(personalData, vehicleData, agree) {
  let state = "validated";
  let errors = [];

  // Personal Details Validation
  if (!personalData.title?.trim()) {
    state = "error";
    errors.push({
      label: "title",
      message: "Title is required.",
      isValid: false,
    });
  }

  if (personalData.firstName?.trim() && !personalData.firstName.match(/^[a-z ,.'-]+$/i)) {
    state = "error";
    errors.push({
      label: "firstName",
      message: "Invalid first name",
      isValid: false,
    });
  }

  if (!personalData.firstName?.trim()) {
    state = "error";
    errors.push({
      label: "firstName",
      message: "First name field is required",
      isValid: false,
    });
  }

  if (personalData.lastName?.trim() && !personalData.lastName.match(/^[a-z ,.'-]+$/i)) {
    state = "error";
    errors.push({
      label: "lastName",
      message: "Invalid last name",
      isValid: false,
    });
  }

  if (!personalData.lastName?.trim()) {
    state = "error";
    errors.push({
      label: "lastName",
      message: "Last name field is required",
      isValid: false,
    });
  }

  // if (personalData.email?.trim() && !personalData.email.match(/^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z.]{2,6}$/)) {
  //   state = "error";
  //   errors.push({
  //     label: "email",
  //     message: "Invalid email address",
  //     isValid: false,
  //   });
  // }

  if (!personalData.email?.trim()) {
    state = "error";
    errors.push({
      label: "email",
      message: "Email field is required",
      isValid: false,
    });
  }


  if (personalData.phone?.trim() && !personalData.phone.match(/^[0-9-+\\s]+$/)) {
    state = "error";
    errors.push({
      label: "phone",
      message: "Invalid mobile number",
      isValid: false,
    });
  }

  if (!personalData.phone?.trim()) {
    state = "error";
    errors.push({
      label: "phone",
      message: "Mobile field is required",
      isValid: false,
    });
  }

  // Vehicle Details Validation
  if (!vehicleData.licensePlate?.trim()) {
    state = "error";
    errors.push({
      label: "licensePlate",
      message: "License plate is required",
      isValid: false,
    });
  }

  if (vehicleData.vehicleMake?.trim() && !vehicleData.vehicleMake.match(/^[a-z ,.'-]+$/i)) {
    state = "error";
    errors.push({
      label: "vehicleMake",
      message: "Vehicle make is invalid",
      isValid: false,
    });
  }

  if (vehicleData.vehicleModel?.trim() && !vehicleData.vehicleModel.match(/^[a-z0-9 ,.'-]+$/i)) {
    state = "error";
    errors.push({
      label: "vehicleModel",
      message: "Vehicle model is invalid",
      isValid: false,
    });
  }

  if (vehicleData.vehicleColor?.trim() && !vehicleData.vehicleColor.match(/^[a-z ,.'-]+$/i)) {
    state = "error";
    errors.push({
      label: "vehicleColor",
      message: "Vehicle color is invalid",
      isValid: false,
    });
  }

  // Terms and conditions validation
  if (!agree) {
    state = "error";
    errors.push({
      label: "agree",
      message: "Please agree to our terms and conditions to proceed with the booking.",
      isValid: false,
    });
  }

  return {
    errors,
    state,
  };
}

// Email validation helper
export const validateEmail = (email) => {
  const EMAIL_RE = /^(?!.*\\.\\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z]{2,}$/i;
  return EMAIL_RE.test(String(email).trim());
};

// Phone validation helper
export const validatePhone = (phone) => {
  return phone && phone.length >= 10;
};

// License plate validation helper
export const validateLicensePlate = (plate) => {
  return plate && plate.trim().length >= 2;
};
