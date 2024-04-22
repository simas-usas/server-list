import { getAuthToken } from '#lib/cookies';
import { GetServersResponse } from '#types';

const fetchServers = async (): Promise<GetServersResponse> => {
  const token = getAuthToken();
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/servers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getServersQuery = () => ({
  queryKey: ['servers'],
  queryFn: fetchServers,
});
