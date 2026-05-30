import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { PaymentMethod } from '../../prisma/generated/client';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @IsString()
  @MinLength(10, { message: 'آدرس تحویل باید حداقل ۱۰ کاراکتر باشد' })
  address!: string;

  @IsOptional()
  @IsString()
  @MinLength(11, { message: 'شماره تماس معتبر نیست' })
  phone?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsEnum(PaymentMethod, { message: 'روش پرداخت معتبر نیست' })
  paymentMethod!: PaymentMethod;
}
