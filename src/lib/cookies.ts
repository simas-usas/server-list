export const getAuthToken = () => {
  const cookies = document.cookie.split('; ').find((row) => row.startsWith('token='));

  return cookies ? cookies.split('=')[1] : null;
};

export const deleteAuthToken = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};
