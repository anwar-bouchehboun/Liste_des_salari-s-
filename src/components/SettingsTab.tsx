import React from 'react';
import { Trash2, RotateCcw, Download, Upload } from 'lucide-react';

interface SettingsTabProps {
  onClearAllData: () => void;
  onResetToDefault: () => void;
  onExportData: () => void;
  onImportData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stats?: {
    employees: number;
    services: number;
    grades: number;
    positions: number;
  };
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  onClearAllData,
  onResetToDefault,
  onExportData,
  onImportData,
  stats
}) => {
  const handleClearData = () => {
    if (window.confirm('هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.')) {
      onClearAllData();
      alert('تم حذف جميع البيانات بنجاح');
    }
  };

  const handleResetData = () => {
    if (window.confirm('هل تريد إعادة تعيين جميع البيانات إلى القيم الافتراضية؟')) {
      onResetToDefault();
      alert('تم إعادة تعيين البيانات بنجاح');
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>إعدادات التطبيق</h2>
      </div>
      
      <div className="settings-section">
        <h3>إدارة البيانات</h3>
        <div className="settings-grid">
          
          <div className="setting-item">
            <div className="setting-info">
              <h4>مسح جميع البيانات</h4>
              <p>حذف جميع البيانات المحفوظة نهائياً</p>
            </div>
            <button 
              className="danger-btn"
              onClick={handleClearData}
            >
              <Trash2 size={20} />
              مسح الكل
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>إعادة تعيين البيانات</h4>
              <p>إعادة تعيين جميع البيانات إلى القيم الافتراضية</p>
            </div>
            <button 
              className="warning-btn"
              onClick={handleResetData}
            >
              <RotateCcw size={20} />
              إعادة تعيين
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>تصدير البيانات</h4>
              <p>تحميل جميع البيانات في ملف JSON</p>
            </div>
            <button 
              className="primary-btn"
              onClick={onExportData}
            >
              <Download size={20} />
              تصدير
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>استيراد البيانات</h4>
              <p>تحميل البيانات من ملف JSON</p>
            </div>
            <label className="upload-btn">
              <Upload size={20} />
              استيراد
              <input 
                type="file" 
                accept=".json"
                onChange={onImportData}
                style={{ display: 'none' }}
              />
            </label>
          </div>

        </div>
      </div>

      <div className="settings-section">
        <h3>إحصائيات التطبيق</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <h4>إجمالي الموظفين</h4>
            <span className="stat-number">{stats?.employees || 0}</span>
          </div>
          <div className="stat-item">
            <h4>إجمالي الأقسام</h4>
            <span className="stat-number">{stats?.services || 0}</span>
          </div>
          <div className="stat-item">
            <h4>إجمالي الدرجات</h4>
            <span className="stat-number">{stats?.grades || 0}</span>
          </div>
          <div className="stat-item">
            <h4>إجمالي المناصب</h4>
            <span className="stat-number">{stats?.positions || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
