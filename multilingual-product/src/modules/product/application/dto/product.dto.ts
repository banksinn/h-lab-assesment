import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Book' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Mathematic Book' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
