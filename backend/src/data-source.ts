import { DataSource } from 'typeorm';
import { configService } from './config/config.service';

export let dataSource: DataSource;

export const initializeDataSource = async () => {
  let config = configService.getTypeOrmConfig();
  dataSource = new DataSource(config);
  await dataSource.initialize();
  console.log('Data Source has been initialized!');
};
