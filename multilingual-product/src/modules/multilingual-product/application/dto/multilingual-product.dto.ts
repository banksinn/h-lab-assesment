import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMultilingualProductDto {
  @ApiProperty({ example: 'Book' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Mathematic Book' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'English' })
  @IsString()
  @IsNotEmpty()
  language: string;
}

export class SearchMultilingualProductDto {
  @ApiProperty({ example: 'Book' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'English' })
  @IsString()
  @IsNotEmpty()
  language: string;
}
