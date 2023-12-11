import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ArticlesModule } from './articles/articles.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    CategoryModule,
    ArticlesModule,
  ],
})
export class AppModule {}
