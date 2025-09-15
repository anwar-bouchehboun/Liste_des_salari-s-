import { useState, useEffect } from 'react';
import LocalStorageService from '../services/LocalStorageService';
import type { Employee, Assignment, Position, Grade, Service } from '../types';

const useEmployeeManagement = () => {
  const storageService = LocalStorageService.getInstance();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  // Load data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    setEmployees(storageService.getEmployees());
    setAssignments(storageService.getAssignments());
    setPositions(storageService.getPositions());
    setGrades(storageService.getGrades());
    setServices(storageService.getServices());
  };

  // Employee operations
  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee = storageService.addEmployee(employeeData);
    setEmployees(storageService.getEmployees());
    return newEmployee;
  };

  const updateEmployee = (id: number, employeeData: Partial<Employee>) => {
    const updatedEmployee = storageService.updateEmployee(id, employeeData);
    if (updatedEmployee) {
      setEmployees(storageService.getEmployees());
    }
    return updatedEmployee;
  };

  const deleteEmployee = (id: number) => {
    const success = storageService.deleteEmployee(id);
    if (success) {
      setEmployees(storageService.getEmployees());
    }
    return success;
  };

  // Assignment operations
  const addAssignment = (assignmentData: Omit<Assignment, 'id'>) => {
    const newAssignment = storageService.addAssignment(assignmentData);
    setAssignments(storageService.getAssignments());
    return newAssignment;
  };

  const deleteAssignment = (id: number) => {
    const success = storageService.deleteAssignment(id);
    if (success) {
      setAssignments(storageService.getAssignments());
    }
    return success;
  };

  // Position operations
  const addPosition = (positionData: Omit<Position, 'id'>) => {
    const newPosition = storageService.addPosition(positionData);
    setPositions(storageService.getPositions());
    return newPosition;
  };

  const deletePosition = (id: number) => {
    const success = storageService.deletePosition(id);
    if (success) {
      setPositions(storageService.getPositions());
    }
    return success;
  };

  // Grade operations
  const addGrade = (gradeData: Omit<Grade, 'id'>) => {
    const newGrade = storageService.addGrade(gradeData);
    setGrades(storageService.getGrades());
    return newGrade;
  };

  const deleteGrade = (id: number) => {
    const success = storageService.deleteGrade(id);
    if (success) {
      setGrades(storageService.getGrades());
    }
    return success;
  };

  // Service operations
  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService = storageService.addService(serviceData);
    setServices(storageService.getServices());
    return newService;
  };

  const deleteService = (id: number) => {
    const success = storageService.deleteService(id);
    if (success) {
      setServices(storageService.getServices());
    }
    return success;
  };

  const clearAllData = () => {
    storageService.clearAllData();
    loadAllData();
  };

  const resetToDefaultData = () => {
    storageService.resetToDefaultData();
    loadAllData();
  };

  return {
    // Data
    employees,
    assignments,
    positions,
    grades,
    services,
    
    // Employee operations
    addEmployee,
    updateEmployee,
    deleteEmployee,
    
  // Other operations
  addAssignment,
  deleteAssignment,
  addPosition,
  deletePosition,
  addGrade,
  deleteGrade,
  addService,
  deleteService,    // Utility
    loadAllData,
    clearAllData,
    resetToDefaultData
  };
};

export default useEmployeeManagement;
