import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import type { UpdateProfileDto } from './dto';
import type { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Get('products')
  getUserProducts(@Request() req: { user: { userId: string } }) {
    return this.usersService.getUserProducts(req.user.userId);
  }

  @Patch('profile')
  updateProfile(@Request() req: { user: { userId: string } }, @Body() body: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.userId, body);
  }
}
