import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
