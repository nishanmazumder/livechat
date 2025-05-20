let authToken = null;

export const getAuthToken = () => authToken;
export const setAuthToken = (token) => (authToken = token);

// export const fetchAuthToken = async () => {

// }

export const refreshToken = async () => {
  try {
    const res = await fetch('http://localhost:3000/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (res.ok) {
      console.log(data?.authToken);
      setAuthToken(data?.authToken);
      console.log(data?.authToken);
      localStorage.setItem('token', data?.accessToken);
      return true;
    }

    return false;
  } catch (error) {
    return new Error({ error: error });
  }
};
