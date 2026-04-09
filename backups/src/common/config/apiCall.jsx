import { apiUrl, apiKey } from './api.jsx';

// Default headers for API requests
const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`,
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': ' https://www.goairportparking.com'
});

// Global API call function for GET requests
export const apiGet = async (endpoint, options = {}) => {
  try {
    const url = `${apiUrl}${endpoint}`;

    const config = {
      method: 'GET',
      headers: {
        ...getDefaultHeaders(),
        ...options.headers
      },
      ...options
    };

    const response = await fetch(url, config);

    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Non-JSON response:', { status: response.status, contentType, preview: text.substring(0, 200) });
      throw new Error(`Server returned non-JSON response (${contentType || 'unknown'})`);
    }

    if (!response.ok) {
      // Try to parse error response
      const text = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }

    // Parse JSON safely
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError.message, text.substring(0, 300));
      throw new Error('Failed to parse server response');
    }

    return {
      success: true,
      data,
      status: response.status
    };

  } catch (error) {
    console.error('API GET Error:', error);
    return {
      success: false,
      error: error.message,
      status: error.status || 500
    };
  }
};

// Global API call function for POST requests
export const apiPost = async (endpoint, body = {}, options = {}) => {
  try {
    const url = `${apiUrl}${endpoint}`;

    const config = {
      method: 'POST',
      headers: {
        ...getDefaultHeaders(),
        ...options.headers
      },
      body: JSON.stringify(body),
      ...options
    };

    const response = await fetch(url, config);

    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Non-JSON response:', { status: response.status, contentType, preview: text.substring(0, 200) });
      throw new Error(`Server returned non-JSON response (${contentType || 'unknown'})`);
    }

    if (!response.ok) {
      // Try to parse error response
      const text = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }

    // Parse JSON safely
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError.message, text.substring(0, 300));
      throw new Error('Failed to parse server response');
    }

    return {
      success: true,
      data,
      status: response.status
    };

  } catch (error) {
    console.error('API POST Error:', error);
    return {
      success: false,
      error: error.message,
      status: error.status || 500
    };
  }
};

// Global API call function for PUT requests
export const apiPut = async (endpoint, body = {}, options = {}) => {
  try {
    const url = `${apiUrl}${endpoint}`;

    const config = {
      method: 'PUT',
      headers: {
        ...getDefaultHeaders(),
        ...options.headers
      },
      body: JSON.stringify(body),
      ...options
    };

    const response = await fetch(url, config);

    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Non-JSON response:', { status: response.status, contentType, preview: text.substring(0, 200) });
      throw new Error(`Server returned non-JSON response (${contentType || 'unknown'})`);
    }

    if (!response.ok) {
      // Try to parse error response
      const text = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }

    // Parse JSON safely
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError.message, text.substring(0, 300));
      throw new Error('Failed to parse server response');
    }

    return {
      success: true,
      data,
      status: response.status
    };

  } catch (error) {
    console.error('API PUT Error:', error);
    return {
      success: false,
      error: error.message,
      status: error.status || 500
    };
  }
};

// Global API call function for DELETE requests
export const apiDelete = async (endpoint, options = {}) => {
  try {
    const url = `${apiUrl}${endpoint}`;

    const config = {
      method: 'DELETE',
      headers: {
        ...getDefaultHeaders(),
        ...options.headers
      },
      ...options
    };

    const response = await fetch(url, config);

    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Non-JSON response:', { status: response.status, contentType, preview: text.substring(0, 200) });
      throw new Error(`Server returned non-JSON response (${contentType || 'unknown'})`);
    }

    if (!response.ok) {
      // Try to parse error response
      const text = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }

    // Parse JSON safely
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError.message, text.substring(0, 300));
      throw new Error('Failed to parse server response');
    }

    return {
      success: true,
      data,
      status: response.status
    };

  } catch (error) {
    console.error('API DELETE Error:', error);
    return {
      success: false,
      error: error.message,
      status: error.status || 500
    };
  }
};

// Generic API call function
export const apiCall = async (method, endpoint, body = null, options = {}) => {
  switch (method.toUpperCase()) {
    case 'GET':
      return apiGet(endpoint, options);
    case 'POST':
      return apiPost(endpoint, body, options);
    case 'PUT':
      return apiPut(endpoint, body, options);
    case 'DELETE':
      return apiDelete(endpoint, options);
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
};
