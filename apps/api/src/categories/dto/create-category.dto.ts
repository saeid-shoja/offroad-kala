import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { CategoryGroup } from '../../prisma/generated/client';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2, { message: 'نام دسته‌بندی باید حداقل ۲ کاراکتر باشد' })
  name!: string;

  @IsString()
  @MinLength(2, { message: 'اسلاگ باید حداقل ۲ کاراکتر باشد' })
  slug!: string;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsOptional()
  @IsString()
  libraryId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sortOrder?: number;

  @IsOptional()
  @IsEnum(CategoryGroup, { message: 'گروه دسته‌بندی نامعتبر است' })
  group?: CategoryGroup;

  @IsOptional()
  @IsString()
  brandCode?: string;
}
