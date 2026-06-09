import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateLibraryDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'نام کتابخانه باید حداقل ۲ کاراکتر باشد' })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'اسلاگ باید حداقل ۲ کاراکتر باشد' })
  slug?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sortOrder?: number;
}
