import { DataSource } from 'typeorm';
import { configService } from './config/config.service';
export const dataSource = loadDS();

async function loadDS() {
  const typeormConfig = configService.getTypeOrmConfig();
  const dataSource = new DataSource({
    ...typeormConfig,
    migrations: [configService.getValue('ORM_MIGRATIONS_FOR_CLI')],
  });
  return dataSource;
}
