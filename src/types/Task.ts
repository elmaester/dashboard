export enum TaskStatus {
  Active = "active",
  Shelved = "shelved",
  Completed = "completed",
}

export interface Task {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
  description: string;
  due?: number;
  snoozeTill?: number;
  completionTime?: number;
  pinned: boolean;
}
