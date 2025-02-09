import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'English' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {}
