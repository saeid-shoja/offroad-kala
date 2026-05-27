import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

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
  @Type(() => Number)
  @IsInt()
  sortOrder?: number;
}
