export enum StreakType {
  Log = "log",
  Abstain = "abstain",
  Cooldown = "cooldown",
  Reps = "reps",
}

export interface Streak {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  icon: string;
  done: number[];
  type: StreakType;
  target?: number;
  sensitive: boolean;
}

export interface SortedStreaksObject {
  [StreakType.Log]: Streak[];
  [StreakType.Abstain]: Streak[];
  [StreakType.Cooldown]: Streak[];
  [StreakType.Reps]: Streak[];
}
