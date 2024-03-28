import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid'
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class TasksService {


  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async findAll( paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.taskRepository.find({
      take: limit,
      skip: offset,
    });

    return products;
  }

  async findOneTask(term: string) {
    
    let task: Task;

    if ( !task && isUUID(term) ) {
      task = await this.taskRepository.findOneBy({ id: term });
    }

    if ( !task ) {
      task = await this.taskRepository.findOneBy({ title: term });
    }

    if ( !task ) {
      throw new NotFoundException(`Task with id or title. ${term} not found`);
    }

    return task;

  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
