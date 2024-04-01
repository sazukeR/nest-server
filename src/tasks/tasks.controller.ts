import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}


  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.tasksService.findAll( paginationDto );
  }

  @Get(':term')
  getOneTask( @Param( "term" ) term: string) { 
     return this.tasksService.findOneTask( term );
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateTaskDto: UpdateTaskDto,
    ) {
    return this.tasksService.update( id, updateTaskDto );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove( id );
  }
}
