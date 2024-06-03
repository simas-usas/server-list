export const getAuthToken = (): string | null => {
  const cookies = document.cookie.split('; ').find((row) => row.startsWith('token='));
  return cookies ? cookies.split('=')[1] : null;
};

export const deleteAuthToken = (): void => {
  try {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; HttpOnly; SameSite=Strict';
  } catch (error) {
    console.error('Error deleting auth token:', error);
  }
};
