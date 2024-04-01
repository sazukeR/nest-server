import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid'
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class TasksService {

  private readonly logger = new Logger('TasksService');

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {

    try {
    
    const task = this.taskRepository.create(createTaskDto);

    await this.taskRepository.save(task);

    return task;

    } catch (error) {

      this.handleDBExceptions(error);

    }

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


  async update(id: string, updateTaskDto: UpdateTaskDto) {

    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto
    });

    if ( !task ) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    if ( updateTaskDto.title ) {
      updateTaskDto.title = updateTaskDto.title.toLocaleLowerCase();
    }

    try {
      
      await this.taskRepository.save(task)
      
    } catch (error) {
      
      this.handleDBExceptions(error);

    }

    return task;

  }

  async remove(id: string) {
    
    const task = await this.findOneTask( id );
    await this.taskRepository.remove( task );

    return `the product with id: ${id} was removed`;

  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' ) {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
