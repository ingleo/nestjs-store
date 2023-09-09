import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { OrdersService } from '../services/orders.service';
import { TokenPayload } from '../../auth/models/token-payload.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private ordersService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as TokenPayload;
    return this.ordersService.getOrdersByUser(user.sub);
  }
}
