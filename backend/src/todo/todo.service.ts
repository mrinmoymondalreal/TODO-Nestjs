import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async create(data: Partial<Todo>): Promise<Todo> {
    const todo = this.todoRepository.create(data);
    return this.todoRepository.save(todo);
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    const todo = await this.getById(id);
    Object.assign(todo, data);
    return this.todoRepository.save(todo);
  }

  async complete(id: string, completed: boolean): Promise<Todo> {
    const todo = await this.getById(id);
    todo.completed = completed;
    return this.todoRepository.save(todo);
  }

  async delete(id: string): Promise<void> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Todo not found');
    }
  }
}
