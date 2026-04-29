export interface Task {
  id: number;
  title: string;
  assignedTo: number;
  status: 'pending' | 'completed';
  projectId: number;
}
