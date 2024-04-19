import { useQuery } from '@tanstack/react-query';
import { getServersQuery } from '../api/servers';

const ServerList = () => {
  const { data } = useQuery(getServersQuery());
  return (
    <div>
      {data?.map((server) => (
        <div key={`${server.name}-${server.distance}`} className="flex gap-4">
          <div>{server.name}</div>
          <div>{server.distance}</div>
        </div>
      ))}
    </div>
  );
};

export default ServerList;
