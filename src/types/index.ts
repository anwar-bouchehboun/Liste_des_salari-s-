export interface Assignment {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  name: string;
}

export interface Grade {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  personalName: string;
  assignment: string;
  position: string;
  grade: string;
  service: string;
}

export type TabType = 'employees' | 'services' | 'grades' | 'positions' | 'assignments' | 'settings';
