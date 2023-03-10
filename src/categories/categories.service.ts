import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/helper/auth.messages';
import { Codes } from 'src/helper/codes';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>
  ) {}

  async addCategories(name: string): Promise<any> {
    try {
      const category = new Categories();
      category.name = name;

      const result = await this.categoriesRepository.save(category);

      if(!result) {
        throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
      }
      return {
        message: 'added'
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories(): Promise<any> {
    try {
      const categories = await this.categoriesRepository.find();

      if(!categories) {
        throw new HttpException('Failed to fetch', HttpStatus.BAD_REQUEST);
      }
      return {
        statusCode: Codes.Success,
        message: 'Categories found',
        categories
      }
    } catch (error) {
      throw error;
    }
  }

}
