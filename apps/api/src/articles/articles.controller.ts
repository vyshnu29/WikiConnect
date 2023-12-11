import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get(':categoryId')
  findOne(@Param('categoryId') categoryId: string) {
    return this.articlesService.findByCategory(categoryId);
  }

  @Patch(':articleId')
  update(
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(articleId, updateArticleDto);
  }

  @Delete(':articleId')
  remove(@Param('articleId') articleId: string) {
    return this.articlesService.remove(articleId);
  }
}
