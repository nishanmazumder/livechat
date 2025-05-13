let authToken = null;

export const getAuthToken = () => authToken;
export const setAuthToken = (token) => (authToken = token);

export const refreshToken = async () => {
  try {
    const res = await fetch('http://localhost:3000/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (res.ok) {
      setAuthToken(data);
      return true;
    }

    return false;
  } catch (error) {
    return new Error({ error: error });
  }
};
