export function parseJwt(token) {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = atob(base64Url.replace(/-/g, '+').replace(/_/g, '/')); // Base64 decode safely
    return JSON.parse(base64); // Convert to object
  } catch (error) {
    console.error('Token decoding failed:', error);
    return null;
  }
}
