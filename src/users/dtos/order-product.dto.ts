import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly orderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly quantity: number;
}

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {}
