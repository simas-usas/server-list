import { useQuery } from '@tanstack/react-query';
import { getServersQuery } from '../api/servers';
import Table from '../components/Table';

const ServerList = () => {
  const { data } = useQuery(getServersQuery());

  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default ServerList;
