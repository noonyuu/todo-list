export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum Status {
  Completed = "完了",
  InProgress = "着手",
  NotStarted = "未着手",
}

export type TodoItem = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  startDate?: Date;
  endDate?: Date;
  labels?: string[] | undefined;
};
