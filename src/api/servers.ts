import { GetServersResponse } from '#types';

export const fetchServers = async (): Promise<GetServersResponse> => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/servers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Servers could not be provided.');
  }

  return res.json();
};

export const getServersQuery = () => ({
  queryKey: ['servers'],
  queryFn: fetchServers,
});
