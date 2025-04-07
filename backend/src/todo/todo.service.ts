import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async getAll(userId: string): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user: { id: userId } } });
  }

  async getById(userId: string, id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
    });
    // const todo = await this.todoRepository.findOne({ where: { id, user } });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async create(user: User, data: Partial<Todo>): Promise<Todo> {
    const todo = this.todoRepository.create({ ...data, user });
    return this.todoRepository.save(todo);
  }

  async update(userId: string, id: string, data: Partial<Todo>): Promise<Todo> {
    const todo = await this.getById(userId, id);
    Object.assign(todo, data);
    return this.todoRepository.save(todo);
  }

  async complete(
    userId: string,
    id: string,
    completed: boolean,
  ): Promise<Todo> {
    const todo = await this.getById(userId, id);
    todo.completed = completed;
    return this.todoRepository.save(todo);
  }

  async delete(userId: string, id: string): Promise<void> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Todo not found');
    }
  }
}
