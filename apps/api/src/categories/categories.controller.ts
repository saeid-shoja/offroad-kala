import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from '../auth/custom.decorator';
import { SWAGGER_BEARER_KEY } from '../swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, CreateLibraryDto, UpdateCategoryDto, UpdateLibraryDto } from './dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiBearerAuth(SWAGGER_BEARER_KEY)
  @Roles('ADMIN')
  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }

  @ApiBearerAuth(SWAGGER_BEARER_KEY)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoriesService.update(id, body);
  }

  @ApiBearerAuth(SWAGGER_BEARER_KEY)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}

@ApiTags('Libraries')
@ApiBearerAuth(SWAGGER_BEARER_KEY)
@Controller('libraries')
export class LibrariesController {
  constructor(private categoriesService: CategoriesService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() body: CreateLibraryDto) {
    return this.categoriesService.createLibrary(body);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateLibraryDto) {
    return this.categoriesService.updateLibrary(id, body);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.removeLibrary(id);
  }
}
