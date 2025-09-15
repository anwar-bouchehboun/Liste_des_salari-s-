import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import type { TabType } from '../types';
import useEmployeeManagement from '../hooks/useEmployeeManagement';
import EmployeeTab from './EmployeeTab';
import AdminTable from './AdminTable';
import SettingsTab from './SettingsTab';
import AddItemForm from './AddItemForm';
import Modal from './Modal';
import EditEmployeeModal from './EditEmployeeModal';
import './EmployeeManagement.css';

const EmployeeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('employees');
  const [showModal, setShowModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [addItemType, setAddItemType] = useState<'assignment' | 'position' | 'grade' | 'service'>('assignment');
  const [newEmployee, setNewEmployee] = useState({
    personalName: '',
    assignment: '',
    position: '',
    grade: '',
    service: ''
  });

  const {
    employees,
    assignments,
    positions,
    grades,
    services,
    addEmployee,
    deleteEmployee,
    addAssignment,
    deleteAssignment,
    addPosition,
    deletePosition,
    addGrade,
    deleteGrade,
    addService,
    deleteService,
    clearAllData,
    resetToDefaultData
  } = useEmployeeManagement();

  const handleAddEmployee = () => {
    if (newEmployee.personalName) {
      addEmployee(newEmployee);
      setNewEmployee({
        personalName: '',
        assignment: '',
        position: '',
        grade: '',
        service: ''
      });
      setShowModal(false);
    }
  };

  const handleEditEmployee = (id: number) => {
    const employee = employees.find(e => e.id === id);
    if (employee) {
      setEditingEmployee(employee);
      setShowEditEmployeeModal(true);
    }
  };

  const handleSaveEmployee = (updatedEmployee: any) => {
    const updatedEmployees = employees.map(e => 
      e.id === updatedEmployee.id ? updatedEmployee : e
    );
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setShowEditEmployeeModal(false);
    setEditingEmployee(null);
    window.location.reload();
  };

  const handleDeleteEmployee = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      deleteEmployee(id);
    }
  };

  const handleExportData = () => {
    const allData = {
      employees,
      assignments,
      positions,
      grades,
      services,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `employee-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          
          if (window.confirm('هل تريد استبدال جميع البيانات الحالية بالبيانات المستوردة؟')) {
            // يمكن إضافة التحقق من صحة البيانات هنا
            if (importedData.employees) {
              // تحديث البيانات في localStorage مباشرة
              localStorage.setItem('employees', JSON.stringify(importedData.employees));
              localStorage.setItem('assignments', JSON.stringify(importedData.assignments || []));
              localStorage.setItem('positions', JSON.stringify(importedData.positions || []));
              localStorage.setItem('grades', JSON.stringify(importedData.grades || []));
              localStorage.setItem('services', JSON.stringify(importedData.services || []));
              
              // إعادة تحميل البيانات
              window.location.reload();
            }
          }
        } catch (error) {
          alert('خطأ في قراءة الملف. تأكد من أن الملف صحيح.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAddItem = (name: string) => {
    switch (addItemType) {
      case 'assignment':
        addAssignment({ name });
        break;
      case 'position':
        addPosition({ name });
        break;
      case 'grade':
        addGrade({ name });
        break;
      case 'service':
        addService({ name });
        break;
    }
    setShowAddItemModal(false);
  };

  const openAddItemModal = (type: 'assignment' | 'position' | 'grade' | 'service') => {
    setAddItemType(type);
    setShowAddItemModal(true);
  };

  const handleEditAssignment = (id: number) => {
    const assignment = assignments.find(a => a.id === id);
    if (!assignment) return;
    
    const newName = window.prompt('تعديل اسم التعيين:', assignment.name);
    if (newName && newName.trim()) {
      // Mise à jour directe dans localStorage
      const updatedAssignments = assignments.map(a => 
        a.id === id ? { ...a, name: newName.trim() } : a
      );
      localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
      window.location.reload();
    }
  };

  const handleEditPosition = (id: number) => {
    const position = positions.find(p => p.id === id);
    if (!position) return;
    
    const newName = window.prompt('تعديل اسم المنصب:', position.name);
    if (newName && newName.trim()) {
      const updatedPositions = positions.map(p => 
        p.id === id ? { ...p, name: newName.trim() } : p
      );
      localStorage.setItem('positions', JSON.stringify(updatedPositions));
      window.location.reload();
    }
  };

  const handleEditGrade = (id: number) => {
    const grade = grades.find(g => g.id === id);
    if (!grade) return;
    
    const newName = window.prompt('تعديل اسم الدرجة:', grade.name);
    if (newName && newName.trim()) {
      const updatedGrades = grades.map(g => 
        g.id === id ? { ...g, name: newName.trim() } : g
      );
      localStorage.setItem('grades', JSON.stringify(updatedGrades));
      window.location.reload();
    }
  };

  const handleEditService = (id: number) => {
    const service = services.find(s => s.id === id);
    if (!service) return;
    
    const newName = window.prompt('تعديل اسم القسم:', service.name);
    if (newName && newName.trim()) {
      const updatedServices = services.map(s => 
        s.id === id ? { ...s, name: newName.trim() } : s
      );
      localStorage.setItem('services', JSON.stringify(updatedServices));
      window.location.reload();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'employees':
        return (
          <EmployeeTab
            employees={employees}
            onAddEmployee={() => setShowModal(true)}
            onEditEmployee={handleEditEmployee}
            onDeleteEmployee={handleDeleteEmployee}
          />
        );

      case 'assignments':
        return (
          <AdminTable
            title="إدارة التعيين"
            data={assignments}
            headers={['رقم', 'اسم التعيين']}
            onAdd={() => openAddItemModal('assignment')}
            onEdit={handleEditAssignment}
            onDelete={(id) => {
              if (window.confirm('هل أنت متأكد من حذف هذا التعيين؟')) {
                deleteAssignment(id);
              }
            }}
            renderRow={(assignment) => (
              <>
                <td>{assignment.id}</td>
                <td>{assignment.name}</td>
              </>
            )}
          />
        );

      case 'positions':
        return (
          <AdminTable
            title="إدارة الأشغال"
            data={positions}
            headers={['رقم', 'اسم المنصب']}
            onAdd={() => openAddItemModal('position')}
            onEdit={handleEditPosition}
            onDelete={(id) => {
              if (window.confirm('هل أنت متأكد من حذف هذا المنصب؟')) {
                deletePosition(id);
              }
            }}
            renderRow={(position) => (
              <>
                <td>{position.id}</td>
                <td>{position.name}</td>
              </>
            )}
          />
        );

      case 'grades':
        return (
          <AdminTable
            title="إدارة الدرجات"
            data={grades}
            headers={['رقم', 'اسم الدرجة']}
            onAdd={() => openAddItemModal('grade')}
            onEdit={handleEditGrade}
            onDelete={(id) => {
              if (window.confirm('هل أنت متأكد من حذف هذه الدرجة؟')) {
                deleteGrade(id);
              }
            }}
            renderRow={(grade) => (
              <>
                <td>{grade.id}</td>
                <td>{grade.name}</td>
              </>
            )}
          />
        );

      case 'services':
        return (
          <AdminTable
            title="إدارة الأقسام"
            data={services}
            headers={['رقم', 'اسم القسم']}
            onAdd={() => openAddItemModal('service')}
            onEdit={handleEditService}
            onDelete={(id) => {
              if (window.confirm('هل أنت متأكد من حذف هذا القسم؟')) {
                deleteService(id);
              }
            }}
            renderRow={(service) => (
              <>
                <td>{service.id}</td>
                <td>{service.name}</td>
              </>
            )}
          />
        );

      case 'settings':
        return (
          <SettingsTab
            onClearAllData={clearAllData}
            onResetToDefault={resetToDefaultData}
            onExportData={handleExportData}
            onImportData={handleImportData}
            stats={{
              employees: employees.length,
              services: services.length,
              grades: grades.length,
              positions: positions.length
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="employee-management">
      <header className="header">
        <h1>لائحة الموظفين المستفيدين من التعويض</h1>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          <Settings size={20} />
          الموظفين
        </button>
        <button
          className={`tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <Settings size={20} />
          الأقسام
        </button>
        <button
          className={`tab ${activeTab === 'grades' ? 'active' : ''}`}
          onClick={() => setActiveTab('grades')}
        >
          <Settings size={20} />
          الدرجات
        </button>
        <button
          className={`tab ${activeTab === 'positions' ? 'active' : ''}`}
          onClick={() => setActiveTab('positions')}
        >
          <Settings size={20} />
          الأشغال
        </button>
        <button
          className={`tab ${activeTab === 'assignments' ? 'active' : ''}`}
          onClick={() => setActiveTab('assignments')}
        >
          <Settings size={20} />
          التعيين
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={20} />
          الإعدادات
        </button>
      </nav>

      <main className="main-content">
        {renderTabContent()}
      </main>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="إضافة موظف"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleAddEmployee(); }}>
          <div className="form-group">
            <input
              type="text"
              placeholder="الاسم الشخصي والعائلي"
              value={newEmployee.personalName}
              onChange={(e) => setNewEmployee({...newEmployee, personalName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <select
              value={newEmployee.grade}
              onChange={(e) => setNewEmployee({...newEmployee, grade: e.target.value})}
            >
              <option value="">اختر الدرجة</option>
              {grades.map(grade => (
                <option key={grade.id} value={grade.name}>{grade.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              value={newEmployee.assignment}
              onChange={(e) => setNewEmployee({...newEmployee, assignment: e.target.value})}
            >
              <option value="">اختر التعيين</option>
              {assignments.map(assignment => (
                <option key={assignment.id} value={assignment.name}>{assignment.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
            >
              <option value="">اختر الأشغال المسندة</option>
              {positions.map(position => (
                <option key={position.id} value={position.name}>{position.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              value={newEmployee.service}
              onChange={(e) => setNewEmployee({...newEmployee, service: e.target.value})}
            >
              <option value="">اختر القسم</option>
              {services.map(service => (
                <option key={service.id} value={service.name}>{service.name}</option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-btn">حفظ</button>
            <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
              إلغاء
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        title="إضافة عنصر جديد"
      >
        <AddItemForm
          type={addItemType}
          onAdd={handleAddItem}
          onCancel={() => setShowAddItemModal(false)}
        />
      </Modal>

      <EditEmployeeModal
        isOpen={showEditEmployeeModal}
        onClose={() => {
          setShowEditEmployeeModal(false);
          setEditingEmployee(null);
        }}
        employee={editingEmployee}
        assignments={assignments}
        positions={positions}
        grades={grades}
        services={services}
        onSave={handleSaveEmployee}
      />
    </div>
  );
};

export default EmployeeManagement;
