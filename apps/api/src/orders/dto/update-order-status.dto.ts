import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../prisma/generated/client';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, { message: 'وضعیت سفارش معتبر نیست' })
  status!: OrderStatus;
}
