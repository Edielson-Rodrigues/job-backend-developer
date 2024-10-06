import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const TypeORMConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: true, // ! TODO: verify this in production
    migrationsRun: true,
    migrationsTableName: 'migrations_TypeORM',
    migrationsTransactionMode: 'all'
  })
}; 

export const TypeORMConfigTest: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    dropSchema: true,
    autoLoadEntities: true
  })
}