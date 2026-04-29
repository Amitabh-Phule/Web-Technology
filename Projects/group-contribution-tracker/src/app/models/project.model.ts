import { Member } from './member.model';
import { Task } from './task.model';

export interface Project {
  id: number;
  name: string;
  members: Member[];
  tasks: Task[];
}
