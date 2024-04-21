import { useSuspenseQuery } from '@tanstack/react-query';
import { getServersQuery } from '../api/servers';
import Table from '../components/Table/Table';

const ServerList = () => {
  const { data } = useSuspenseQuery(getServersQuery());

  return <Table data={data} />;
};

export default ServerList;
