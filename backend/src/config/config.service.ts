import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(__dirname + '/**/*.entity{.ts,.js}');

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwError = true): string {
    let value = this.env[key];
    if (value === undefined && throwError) {
      throw new Error(`config error - missing env.${key}`);
    }
    if (!value) value = '';
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  public getTypeOrmConfig(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.getValue('PG_HOST'),
      port: +this.getValue('PG_PORT'),
      username: this.getValue('PG_USERNAME'),
      password: process.env['PG_PASSWORD'],
      database: this.getValue('PG_DATABASE'),
      entities: [this.getValue('ORM_ENTITIES')],

      migrationsTableName: 'migration',
      migrations: [this.getValue('ORM_MIGRATIONS')],
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
