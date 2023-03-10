import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @Post('/add')
  addCategories(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.categoriesService.addCategories(createCategoryDto.name);
  }

  @Get('/getAll')
  getAllCategories(): Promise<any> {
    return this.categoriesService.getAllCategories();
  }

}
