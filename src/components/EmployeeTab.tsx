import React from 'react';
import { Plus, Edit, Trash2, Printer } from 'lucide-react';
import type { Employee } from '../types';
import EmptyState from './EmptyState';
import PrintModal from './PrintModal';
import './EmployeeTab.css';

interface EmployeeTabProps {
  employees: Employee[];
  onAddEmployee: () => void;
  onEditEmployee: (id: number) => void;
  onDeleteEmployee: (id: number) => void;
}

const EmployeeTab: React.FC<EmployeeTabProps> = ({
  employees,
  onAddEmployee,
  onEditEmployee,
  onDeleteEmployee
}) => {
  const [assignmentSearch, setAssignmentSearch] = React.useState('');
  const [serviceFilter, setServiceFilter] = React.useState('');
  const [gradeFilter, setGradeFilter] = React.useState('');
  const [assignmentFilter, setAssignmentFilter] = React.useState('');
  const [showPrintModal, setShowPrintModal] = React.useState(false);
  
  // Fonction pour gérer l'impression par التعيين
  const handlePrintByAssignment = () => {
    if (uniqueAssignments.length === 0) {
      alert('لا توجد تعيينات متاحة للطباعة');
      return;
    }
    setShowPrintModal(true);
  };

  // Filtrer les employés en fonction de tous les critères de recherche
  const filteredEmployees = employees.filter(employee => {
    const matchesAssignment = employee.assignment.toLowerCase().includes(assignmentSearch.toLowerCase());
    const matchesService = serviceFilter === '' || employee.service === serviceFilter;
    const matchesGrade = gradeFilter === '' || employee.grade === gradeFilter;
    const matchesAssignmentFilter = assignmentFilter === '' || employee.assignment === assignmentFilter;
    return matchesAssignment && matchesService && matchesGrade && matchesAssignmentFilter;
  });

  // Obtenir les listes uniques pour les dropdowns
  const uniqueServices = [...new Set(employees.map(emp => emp.service).filter(service => service))];
  const uniqueGrades = [...new Set(employees.map(emp => emp.grade).filter(grade => grade))];
  const uniqueAssignments = [...new Set(employees.map(emp => emp.assignment).filter(assignment => assignment))];

  // Afficher l'état vide si aucun employé n'existe (pas de filtrage)
  if (employees.length === 0 && !assignmentSearch && !serviceFilter && !gradeFilter && !assignmentFilter) {
    return (
      <div className="tab-content">
        <div className="search-section">
          <button className="add-employee-btn" onClick={onAddEmployee}>
            <Plus size={20} />
            إضافة موظف
          </button>
        </div>
        <EmptyState
          title="لا يوجد موظفون"
          description="ابدأ بإضافة موظفين جدد للاستفادة من نظام إدارة التعويضات"
          actionText="إضافة موظف جديد"
          onAction={onAddEmployee}
        />
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="search-section">
        <div className="filter-section">
          <div className="filter-group">
            <select 
              className="filter-select"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              <option value="">جميع الأقسام</option>
              {uniqueServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              className="filter-select"
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              <option value="">جميع الدرجات</option>
              {uniqueGrades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="البحث بالتعيين..."
              value={assignmentSearch}
              onChange={(e) => setAssignmentSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select 
              className="filter-select"
              value={assignmentFilter}
              onChange={(e) => setAssignmentFilter(e.target.value)}
            >
              <option value="">جميع التعيينات</option>
              {uniqueAssignments.map(assignment => (
                <option key={assignment} value={assignment}>{assignment}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="print-btn" onClick={handlePrintByAssignment}>
            <Printer size={20} />
            طباعة حسب التعيين
          </button>
          
          <button className="add-employee-btn" onClick={onAddEmployee}>
            <Plus size={20} />
            إضافة موظف
          </button>
        </div>
      </div>

      {/* Afficher message si la recherche ne donne aucun résultat */}
      {filteredEmployees.length === 0 && (assignmentSearch || serviceFilter || gradeFilter || assignmentFilter) ? (
        <div className="no-results">
          <p>لا توجد نتائج للبحث</p>
          {assignmentSearch && <p>البحث في التعيين: "{assignmentSearch}"</p>}
          {assignmentFilter && <p>التعيين المحدد: "{assignmentFilter}"</p>}
          {serviceFilter && <p>القسم: "{serviceFilter}"</p>}
          {gradeFilter && <p>الدرجة: "{gradeFilter}"</p>}
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>رقم</th>
                <th>الاسم الشخصي والعائلي</th>
                <th>التعيين</th>
                <th>القسم</th>
                <th>الدرجة</th>
                <th>الأشغال المسندة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.personalName}</td>
                  <td>{employee.assignment}</td>
                  <td>{employee.service}</td>
                  <td>{employee.grade}</td>
                  <td>{employee.position}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="edit-btn"
                        onClick={() => onEditEmployee(employee.id)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => onDeleteEmployee(employee.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <PrintModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        employees={employees}
        assignments={uniqueAssignments}
        services={uniqueServices}
      />
    </div>
  );
};

export default EmployeeTab;
