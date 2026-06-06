import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { LibraryKind } from '../../prisma/generated/client';

export class CreateLibraryDto {
  @IsString()
  @MinLength(2, { message: 'نام کتابخانه باید حداقل ۲ کاراکتر باشد' })
  name!: string;

  @IsString()
  @MinLength(2, { message: 'اسلاگ باید حداقل ۲ کاراکتر باشد' })
  slug!: string;

  @IsEnum(LibraryKind, { message: 'نوع کتابخانه نامعتبر است' })
  kind!: LibraryKind;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sortOrder?: number;
}
