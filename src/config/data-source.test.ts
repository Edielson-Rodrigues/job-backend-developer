import { DataSource } from "typeorm";

const dataSourceTest = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: true,
  migrationsRun: true,
  migrationsTableName: 'migrations_TypeORM',
  migrationsTransactionMode: 'all',
  migrations: ['dist/migrations/*{.ts,.js}']
});

export default dataSourceTest;
