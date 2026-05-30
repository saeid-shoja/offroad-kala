import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { Public } from '../auth/custom.decorator';
import type { CreateProductDto, FindProductsQueryDto, UpdateProductDto } from './dto';
import type { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  findAll(@Query() query: FindProductsQueryDto) {
    return this.productsService.findAll({
      advertiser: query.advertiser,
      categoryId: query.categoryId,
      carBrand: query.carBrand,
      search: query.search,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
      city: query.city,
      cities: query.cities,
      sortBy: query.sortBy,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      postedWithin: query.postedWithin,
      situation: query.situation,
      hasGuarantee: query.hasGuarantee,
      auction: query.auction,
      auctionActive: query.auctionActive,
    });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateProductDto, @Request() req: { user: { userId: string } }) {
    return this.productsService.create(body, req.user.userId);
  }

  @Post('public')
  createPublic(@Body() body: CreateProductDto, @Request() req: { user: { userId: string } }) {
    return this.productsService.create({ ...body, advertiser: 'CLIENT' }, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
    @Request() req: { user: { userId: string; role: string } },
  ) {
    return this.productsService.update(id, body, req.user.userId, req.user.role);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: { userId: string; role: string } }) {
    return this.productsService.remove(id, req.user.userId, req.user.role);
  }
}
