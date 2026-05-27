import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Public, Roles } from '../auth/custom.decorator';
import { CreateOrderDto, PreviewOrderDto, UpdateOrderStatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('my')
  findByUser(@Request() req: { user: { userId: string } }) {
    return this.ordersService.findByUser(req.user.userId);
  }

  @Public()
  @Post('preview')
  preview(@Body() body: PreviewOrderDto) {
    return this.ordersService.preview(body);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() req: { user: { userId: string; role: string } },
  ) {
    return this.ordersService.findOne(id, req.user.userId, req.user.role);
  }

  @Post()
  create(
    @Request() req: { user: { userId: string } },
    @Body() body: CreateOrderDto,
  ) {
    return this.ordersService.create(req.user.userId, body);
  }

  @Roles('ADMIN')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, body.status);
  }
}
