import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  attachments?: string;

  @IsString()
  categoryId: string;

  @IsString()
  userId: string;

  @IsBoolean()
  isExist: boolean;
}
