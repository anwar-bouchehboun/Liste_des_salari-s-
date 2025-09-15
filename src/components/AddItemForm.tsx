import React, { useState } from 'react';

interface AddItemFormProps {
  type: 'assignment' | 'position' | 'grade' | 'service';
  onAdd: (name: string) => void;
  onCancel: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ type, onAdd, onCancel }) => {
  const [name, setName] = useState('');

  const getTitle = () => {
    switch (type) {
      case 'assignment': return 'إضافة تعيين جديد';
      case 'position': return 'إضافة منصب جديد';
      case 'grade': return 'إضافة درجة جديدة';
      case 'service': return 'إضافة قسم جديد';
      default: return 'إضافة عنصر جديد';
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'assignment': return 'اسم التعيين';
      case 'position': return 'اسم المنصب';
      case 'grade': return 'اسم الدرجة';
      case 'service': return 'اسم القسم';
      default: return 'الاسم';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{getTitle()}</h3>
      <div className="form-group">
        <input
          type="text"
          placeholder={getPlaceholder()}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="modal-actions">
        <button type="submit" className="save-btn">
          إضافة
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          إلغاء
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
