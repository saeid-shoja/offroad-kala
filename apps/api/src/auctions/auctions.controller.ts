import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/custom.decorator';
import { SWAGGER_BEARER_KEY } from '../swagger';
import { AuctionsService } from './auctions.service';
import { PlaceBidDto } from './dto';

@ApiTags('Auctions')
@ApiBearerAuth(SWAGGER_BEARER_KEY)
@Controller('auctions')
export class AuctionsController {
  constructor(private auctionsService: AuctionsService) {}

  @Public()
  @Get(':productId/summary')
  getSummary(@Param('productId') productId: string, @Request() req: { user?: { userId: string } }) {
    return this.auctionsService.getSummary(productId, req.user?.userId);
  }

  @Post(':productId/bids')
  placeBid(
    @Param('productId') productId: string,
    @Body() body: PlaceBidDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.auctionsService.placeBid(productId, req.user.userId, body);
  }
}
