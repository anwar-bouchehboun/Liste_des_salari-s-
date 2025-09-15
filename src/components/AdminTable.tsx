import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import EmptyState from './EmptyState';

interface AdminTableProps<T> {
  title: string;
  data: T[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  renderRow: (item: T) => React.ReactNode;
  headers: string[];
}

const AdminTable = <T extends { id: number; name: string }>({
  title,
  data,
  onAdd,
  onEdit,
  onDelete,
  renderRow,
  headers
}: AdminTableProps<T>) => {
  const getEmptyStateProps = () => {
    if (title.includes('التعيين')) {
      return {
        title: 'لا توجد تعيينات',
        description: 'ابدأ بإضافة تعيينات جديدة لتتمكن من إدارة الموظفين',
        actionText: 'إضافة تعيين جديد'
      };
    } else if (title.includes('الأشغال')) {
      return {
        title: 'لا توجد مناصب',
        description: 'أضف مناصب جديدة لتتمكن من تنظيم هيكل العمل',
        actionText: 'إضافة منصب جديد'
      };
    } else if (title.includes('الدرجات')) {
      return {
        title: 'لا توجد درجات',
        description: 'أضف درجات وظيفية لتصنيف الموظفين',
        actionText: 'إضافة درجة جديدة'
      };
    } else if (title.includes('الأقسام')) {
      return {
        title: 'لا توجد أقسام',
        description: 'أضف أقسام جديدة لتنظيم المؤسسة',
        actionText: 'إضافة قسم جديد'
      };
    }
    return {
      title: 'لا توجد بيانات',
      description: 'ابدأ بإضافة عناصر جديدة',
      actionText: 'إضافة جديد'
    };
  };

  if (data.length === 0) {
    const emptyProps = getEmptyStateProps();
    return (
      <div className="tab-content">
        <div className="tab-header">
          <h2>{title}</h2>
          <button className="add-btn" onClick={onAdd}>
            <Plus size={20} />
            إضافة جديد
          </button>
        </div>
        <EmptyState
          title={emptyProps.title}
          description={emptyProps.description}
          actionText={emptyProps.actionText}
          onAction={onAdd}
        />
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>{title}</h2>
        <button className="add-btn" onClick={onAdd}>
          <Plus size={20} />
          إضافة جديد
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {renderRow(item)}
                <td>
                  <div className="actions">
                    <button 
                      className="edit-btn"
                      onClick={() => onEdit(item.id)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => onDelete(item.id)}
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
    </div>
  );
};

export default AdminTable;
