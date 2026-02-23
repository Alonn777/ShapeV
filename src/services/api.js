const base_url = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${base_url}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message || `Erro ${response.status}`
    );
  }

  return response.status !== 204 ? response.json() : null;
};

export default request