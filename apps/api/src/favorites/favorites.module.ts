import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [ProductsModule],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
