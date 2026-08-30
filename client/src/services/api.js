const baseURL = 'http://localhost:5000/api';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return {
    'Content-Type': 'application/json',
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
  };
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'API Error');
  }
  return { data };
};

const api = {
  get: async (url) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  post: async (url, body) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },
  put: async (url, body) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },
  delete: async (url) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  }
};

export default api;
