import { Injectable } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {


  constructor(
    private readonly tasksService: TasksService,
  ) {}

  async runSeed() {

      await this.insertNewTasks();

      return 'SEED EXECUTED';

    }

  private async insertNewTasks() {

    await this.tasksService.deleteAllTasks();

    const tasks = initialData.tasks;

    const insertPromises = [];

    tasks.forEach( task => {
      insertPromises.push( this.tasksService.create( task ) );
    })

    await Promise.all( insertPromises );

    return true;

  }

}
