import React, { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';
import type { Employee, Assignment, Position, Grade, Service } from '../types';

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  assignments: Assignment[];
  positions: Position[];
  grades: Grade[];
  services: Service[];
  onSave: (updatedEmployee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
  assignments,
  positions,
  grades,
  services,
  onSave
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    personalName: '',
    assignment: '',
    position: '',
    grade: '',
    service: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id,
        personalName: employee.personalName || '',
        assignment: employee.assignment || '',
        position: employee.position || '',
        grade: employee.grade || '',
        service: employee.service || ''
      });
      setErrors({});
    }
  }, [employee]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.personalName.trim()) {
      newErrors.personalName = 'الاسم الشخصي والعائلي مطلوب';
    }

    if (!formData.assignment) {
      newErrors.assignment = 'يجب اختيار التعيين';
    }

    if (!formData.position) {
      newErrors.position = 'يجب اختيار الأشغال المسندة';
    }

    if (!formData.grade) {
      newErrors.grade = 'يجب اختيار الدرجة';
    }

    if (!formData.service) {
      newErrors.service = 'يجب اختيار القسم';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData as Employee);
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="modal-overlay">
      <div className="edit-employee-modal">
        <div className="modal-header">
          <div className="modal-title">
            <User size={24} />
            <h2>تعديل بيانات الموظف</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-employee-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="personalName">الاسم الشخصي والعائلي *</label>
              <input
                id="personalName"
                type="text"
                value={formData.personalName}
                onChange={(e) => handleInputChange('personalName', e.target.value)}
                className={errors.personalName ? 'error' : ''}
                placeholder="أدخل الاسم الشخصي والعائلي"
              />
              {errors.personalName && <span className="error-message">{errors.personalName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="assignment">التعيين *</label>
              <select
                id="assignment"
                value={formData.assignment}
                onChange={(e) => handleInputChange('assignment', e.target.value)}
                className={errors.assignment ? 'error' : ''}
              >
                <option value="">اختر التعيين</option>
                {assignments.map(assignment => (
                  <option key={assignment.id} value={assignment.name}>
                    {assignment.name}
                  </option>
                ))}
              </select>
              {errors.assignment && <span className="error-message">{errors.assignment}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="service">القسم *</label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                className={errors.service ? 'error' : ''}
              >
                <option value="">اختر القسم</option>
                {services.map(service => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service && <span className="error-message">{errors.service}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="grade">الدرجة *</label>
              <select
                id="grade"
                value={formData.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                className={errors.grade ? 'error' : ''}
              >
                <option value="">اختر الدرجة</option>
                {grades.map(grade => (
                  <option key={grade.id} value={grade.name}>
                    {grade.name}
                  </option>
                ))}
              </select>
              {errors.grade && <span className="error-message">{errors.grade}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="position">الأشغال المسندة *</label>
              <select
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className={errors.position ? 'error' : ''}
              >
                <option value="">اختر الأشغال المسندة</option>
                {positions.map(position => (
                  <option key={position.id} value={position.name}>
                    {position.name}
                  </option>
                ))}
              </select>
              {errors.position && <span className="error-message">{errors.position}</span>}
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              <Save size={18} />
              حفظ التغييرات
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
