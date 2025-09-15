import React, { useState } from 'react';
import { Printer, Download, X } from 'lucide-react';
import type { Employee } from '../types';
import WordDocumentService from '../services/WordDocumentService';
import './PrintModal.css';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  assignments: string[];
  services: string[];
}

const PrintModal: React.FC<PrintModalProps> = ({ isOpen, onClose, employees, assignments, services }) => {
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [selectedService, setSelectedService] = useState('');

  if (!isOpen) return null;

  // Filtrer par assignment ET service
  let filteredEmployees = employees;
  if (selectedAssignment) {
    filteredEmployees = filteredEmployees.filter(emp => emp.assignment === selectedAssignment);
  }
  if (selectedService) {
    filteredEmployees = filteredEmployees.filter(emp => emp.service === selectedService);
  }

  // Générer le titre dynamique
  let title = 'لائحة الموظفين المستفيدين من التعويض عن الأعمال الثقافة والعلوية';
  if (selectedAssignment && selectedService) {
    title = `لائحة الموظفين المستفيدين من التعويض - ${selectedAssignment} - ${selectedService}`;
  } else if (selectedAssignment) {
    title = `لائحة الموظفين المستفيدين من التعويض - ${selectedAssignment}`;
  } else if (selectedService) {
    title = `لائحة الموظفين المستفيدين من التعويض - ${selectedService}`;
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>قائمة الموظفين</title>
        <style>
          @page {
            size: A4;
            margin: 2cm;
          }
          body {
            font-family: 'Arial', sans-serif;
            direction: rtl;
            text-align: right;
            margin: 0;
            padding: 20px;
            background: white;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo-section {
            margin-bottom: 20px;
          }
          .kingdom {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .ministry {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .region {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .province {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .commune {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .main-title {
            font-size: 18px;
            font-weight: bold;
            margin: 20px 0;
            text-decoration: underline;
          }
          .subtitle {
            font-size: 14px;
            margin-bottom: 10px;
          }
          .department {
            font-size: 12px;
            margin-bottom: 30px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 12px;
          }
          th, td {
            border: 2px solid #000;
            padding: 8px;
            text-align: center;
            vertical-align: middle;
          }
          th {
            background-color: #f0f0f0;
            font-weight: bold;
            font-size: 14px;
            height: 40px;
          }
          td {
            height: 35px;
          }
          .print-date {
            text-align: left;
            font-size: 12px;
            margin-top: 30px;
            direction: ltr;
          }
          @media print {
            body { 
              margin: 0; 
              padding: 15px;
            }
            .no-print { 
              display: none; 
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-section">
            <div class="kingdom">المملكة المغربية</div>
            <div class="ministry">وزارة الداخلية</div>
            <div class="region">عمالة مراكش أسفي</div>
            <div class="province">إقليم الحوز الشرقي</div>
            <div class="commune">جماعة البورسادة</div>
          </div>
          
          <div class="main-title">${title}</div>
          <div class="subtitle">بمصلحة الميزانية والنفقات والموارد البشرية</div>
          <div class="department">بقسم الشؤون الإدارية والمالية والقانونية والممتلكات</div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 20%">القسم</th>
              <th style="width: 20%">الأشغال المسندة</th>
              <th style="width: 20%">التعيين</th>
              <th style="width: 20%">الدرجة</th>
              <th style="width: 20%">الاسم الشخصي والعائلي</th>
            </tr>
          </thead>
          <tbody>
            ${filteredEmployees.map(emp => `
              <tr>
                <td>${emp.service || ''}</td>
                <td>${emp.position || ''}</td>
                <td>${emp.assignment || ''}</td>
                <td>${emp.grade || ''}</td>
                <td>${emp.personalName || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="print-date">
          تاريخ الطباعة: ${new Date().toLocaleDateString('ar-MA')}
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleDownloadWord = async () => {
    try {
      await WordDocumentService.generateEmployeeReport(filteredEmployees, selectedAssignment, selectedService);
    } catch (error) {
      alert('خطأ في تحميل الوثيقة');
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedAssignment('');
    setSelectedService('');
  };

  return (
    <div className="modal-overlay">
      <div className="print-modal">
        <div className="print-modal-header">
          <h3>طباعة وتحميل قائمة الموظفين</h3>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="print-modal-content">
          <div className="filter-section">
            <label>اختر التعيين للفلترة:</label>
            <select 
              value={selectedAssignment} 
              onChange={(e) => setSelectedAssignment(e.target.value)}
              className="assignment-select"
            >
              <option value="">جميع التعيينات</option>
              {assignments.map(assignment => (
                <option key={assignment} value={assignment}>
                  {assignment}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <label>اختر القسم للفلترة:</label>
            <select 
              value={selectedService} 
              onChange={(e) => setSelectedService(e.target.value)}
              className="assignment-select"
            >
              <option value="">جميع الأقسام</option>
              {services.map(service => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="preview-info">
            <p>
              <strong>عدد الموظفين المحددين:</strong> {filteredEmployees.length}
            </p>
            {selectedAssignment && (
              <p>
                <strong>التعيين المحدد:</strong> {selectedAssignment}
              </p>
            )}
            {selectedService && (
              <p>
                <strong>القسم المحدد:</strong> {selectedService}
              </p>
            )}
          </div>

          <div className="action-buttons">
            <button className="print-btn" onClick={handlePrint}>
              <Printer size={20} />
              طباعة القائمة
            </button>
            
            <button className="download-btn" onClick={handleDownloadWord}>
              <Download size={20} />
              تحميل ملف Word
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;
