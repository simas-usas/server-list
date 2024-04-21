import { useSuspenseQuery } from '@tanstack/react-query';
import { getServersQuery } from '../../api/servers';
import Table from '../../components/Table/Table';

const Servers = () => {
  const { data } = useSuspenseQuery(getServersQuery());
  return <Table data={data} />;
};

export default Servers;
