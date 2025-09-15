import type { Employee, Assignment, Position, Grade, Service } from '../types';

class LocalStorageService {
  private static instance: LocalStorageService;
  
  private constructor() {}
  
  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  // Generic methods for localStorage operations
  private getFromStorage<T>(key: string, defaultValue: T[]): T[] {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }

  private saveToStorage<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }

  // Employee methods
  getEmployees(): Employee[] {
    return this.getFromStorage('employees', this.getDefaultEmployees());
  }

  saveEmployees(employees: Employee[]): void {
    this.saveToStorage('employees', employees);
  }

  addEmployee(employee: Omit<Employee, 'id'>): Employee {
    const employees = this.getEmployees();
    const newEmployee: Employee = {
      ...employee,
      id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
    };
    employees.push(newEmployee);
    this.saveEmployees(employees);
    return newEmployee;
  }

  updateEmployee(id: number, employee: Partial<Employee>): Employee | null {
    const employees = this.getEmployees();
    const index = employees.findIndex(e => e.id === id);
    if (index !== -1) {
      employees[index] = { ...employees[index], ...employee };
      this.saveEmployees(employees);
      return employees[index];
    }
    return null;
  }

  deleteEmployee(id: number): boolean {
    const employees = this.getEmployees();
    const filteredEmployees = employees.filter(e => e.id !== id);
    if (filteredEmployees.length !== employees.length) {
      this.saveEmployees(filteredEmployees);
      return true;
    }
    return false;
  }

  // Assignment methods
  getAssignments(): Assignment[] {
    return this.getFromStorage('assignments', this.getDefaultAssignments());
  }

  saveAssignments(assignments: Assignment[]): void {
    this.saveToStorage('assignments', assignments);
  }

  addAssignment(assignment: Omit<Assignment, 'id'>): Assignment {
    const assignments = this.getAssignments();
    const newAssignment: Assignment = {
      ...assignment,
      id: assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1
    };
    assignments.push(newAssignment);
    this.saveAssignments(assignments);
    return newAssignment;
  }

  deleteAssignment(id: number): boolean {
    const assignments = this.getAssignments();
    const filteredAssignments = assignments.filter(a => a.id !== id);
    if (filteredAssignments.length !== assignments.length) {
      this.saveAssignments(filteredAssignments);
      return true;
    }
    return false;
  }

  // Position methods
  getPositions(): Position[] {
    return this.getFromStorage('positions', this.getDefaultPositions());
  }

  savePositions(positions: Position[]): void {
    this.saveToStorage('positions', positions);
  }

  addPosition(position: Omit<Position, 'id'>): Position {
    const positions = this.getPositions();
    const newPosition: Position = {
      ...position,
      id: positions.length > 0 ? Math.max(...positions.map(p => p.id)) + 1 : 1
    };
    positions.push(newPosition);
    this.savePositions(positions);
    return newPosition;
  }

  deletePosition(id: number): boolean {
    const positions = this.getPositions();
    const filteredPositions = positions.filter(p => p.id !== id);
    if (filteredPositions.length !== positions.length) {
      this.savePositions(filteredPositions);
      return true;
    }
    return false;
  }

  // Grade methods
  getGrades(): Grade[] {
    return this.getFromStorage('grades', this.getDefaultGrades());
  }

  saveGrades(grades: Grade[]): void {
    this.saveToStorage('grades', grades);
  }

  addGrade(grade: Omit<Grade, 'id'>): Grade {
    const grades = this.getGrades();
    const newGrade: Grade = {
      ...grade,
      id: grades.length > 0 ? Math.max(...grades.map(g => g.id)) + 1 : 1
    };
    grades.push(newGrade);
    this.saveGrades(grades);
    return newGrade;
  }

  deleteGrade(id: number): boolean {
    const grades = this.getGrades();
    const filteredGrades = grades.filter(g => g.id !== id);
    if (filteredGrades.length !== grades.length) {
      this.saveGrades(filteredGrades);
      return true;
    }
    return false;
  }

  // Service methods
  getServices(): Service[] {
    return this.getFromStorage('services', this.getDefaultServices());
  }

  saveServices(services: Service[]): void {
    this.saveToStorage('services', services);
  }

  addService(service: Omit<Service, 'id'>): Service {
    const services = this.getServices();
    const newService: Service = {
      ...service,
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1
    };
    services.push(newService);
    this.saveServices(services);
    return newService;
  }

  deleteService(id: number): boolean {
    const services = this.getServices();
    const filteredServices = services.filter(s => s.id !== id);
    if (filteredServices.length !== services.length) {
      this.saveServices(filteredServices);
      return true;
    }
    return false;
  }

  // Default data
  private getDefaultEmployees(): Employee[] {
    return [];
  }

  private getDefaultAssignments(): Assignment[] {
    return [];
  }

  private getDefaultPositions(): Position[] {
    return [];
  }

  private getDefaultGrades(): Grade[] {
    return [];
  }

  private getDefaultServices(): Service[] {
    return [];
  }

  // Clear all data
  clearAllData(): void {
    localStorage.removeItem('employees');
    localStorage.removeItem('assignments');
    localStorage.removeItem('positions');
    localStorage.removeItem('grades');
    localStorage.removeItem('services');
  }

  // Reset all data to default values
  resetToDefaultData(): void {
    this.saveEmployees(this.getDefaultEmployees());
    this.saveAssignments(this.getDefaultAssignments());
    this.savePositions(this.getDefaultPositions());
    this.saveGrades(this.getDefaultGrades());
    this.saveServices(this.getDefaultServices());
  }
}

export default LocalStorageService;
