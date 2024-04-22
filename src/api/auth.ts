import { AuthCredentials, GetTokenResponse } from '#types';

export const fetchToken = async ({ username, password }: AuthCredentials): Promise<GetTokenResponse> => {
  const res = await fetch('https://playground.tesonet.lt/v1/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!res.ok) {
    throw new Error('Token could not be provided.');
  }

  return res.json();
};
