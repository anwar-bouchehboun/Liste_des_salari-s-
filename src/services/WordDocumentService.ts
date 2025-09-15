import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, AlignmentType, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import type { Employee } from '../types';

class WordDocumentService {
  static async generateEmployeeReport(employees: Employee[], assignment?: string, service?: string): Promise<void> {
    try {
      // Filtrer par assignment si spécifié
      let filteredEmployees = assignment 
        ? employees.filter(emp => emp.assignment === assignment)
        : employees;
      
      // Filtrer par service si spécifié
      if (service) {
        filteredEmployees = filteredEmployees.filter(emp => emp.service === service);
      }

      // Générer le titre dynamique
      let titleLines: string[] = ['لائحة الموظفين المستفيدين من التعويض عن الاعمال الشاقة و الملوثة'];
      
      if (assignment && service) {
        titleLines = [
          'لائحة الموظفين المستفيدين من التعويض عن الاعمال الشاقة و الملوثة',
          `ب${assignment}`,
          `ب${service}`
        ];
      } else if (assignment) {
        titleLines = [
          'لائحة الموظفين المستفيدين من التعويض عن الاعمال الشاقة و الملوثة',
          `ب${assignment}`
        ];
      } else if (service) {
        titleLines = [
          'لائحة الموظفين المستفيدين من التعويض عن الاعمال الشاقة و الملوثة',
          `ب${service}`
        ];
      }


      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: [
            // En-tête officiel
            new Paragraph({
              children: [
                new TextRun({
                  text: "المملكة المغربية",
                  size: 24,
                  font: "Calibri",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 200 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "وزارة الداخلية",
                  size: 24,
                  font: "Calibri",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 200 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "عمالة مراكش أسفي",
                  size: 24,
                  font: "Calibri",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 200 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "إقليم مراكش أسفي",
                  size: 24,
                  font: "Calibri",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 200 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "جماعة اليوسفية",
                  size: 24,
                  font: "Calibri",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 400 },
            }),

            // Titre principal - chaque ligne centrée séparément
            ...titleLines.map((line, index) => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: line,
                    size: 24,
                    font: "Calibri",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { 
                  after: index === titleLines.length - 1 ? 400 : 100 
                },
              })
            ),


            // Tableau des employés
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
                insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
                insideVertical: { style: BorderStyle.SINGLE, size: 1 },
              },
              rows: [
                // En-tête du tableau
                new TableRow({
                  children: [
                 
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "الأشغال المسندة",
                              bold: true,
                              size: 22,
                              font: "Calibri",
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      width: { size: 20, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "التعيين",
                              bold: true,
                              size: 22,
                              font: "Calibri",
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      width: { size: 20, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "الدرجة",
                              bold: true,
                              size: 22,
                              font: "Calibri",
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      width: { size: 20, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "الاسم الشخصي والعائلي",
                              bold: true,
                              size: 22,
                              font: "Calibri",
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      width: { size: 20, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                // Lignes des employés
                ...filteredEmployees.map((employee) => 
                  new TableRow({
                    children: [
                     
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: employee.position || '',
                                size: 20,
                                font: "Calibri",
                              }),
                            ],
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: employee.assignment || '',
                                size: 20,
                                font: "Calibri",
                              }),
                            ],
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: employee.grade || '',
                                size: 20,
                                font: "Calibri",
                              }),
                            ],
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: employee.personalName || '',
                                size: 20,
                                font: "Calibri",
                              }),
                            ],
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                    ],
                  })
                ),
              ],
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      
      // Nom de fichier dynamique
      let fileName = `قائمة_الموظفين_${new Date().toISOString().split('T')[0]}.docx`;
      if (assignment && service) {
        fileName = `قائمة_الموظفين_${assignment}_${service}_${new Date().toISOString().split('T')[0]}.docx`;
      } else if (assignment) {
        fileName = `قائمة_الموظفين_${assignment}_${new Date().toISOString().split('T')[0]}.docx`;
      } else if (service) {
        fileName = `قائمة_الموظفين_${service}_${new Date().toISOString().split('T')[0]}.docx`;
      }
      
      saveAs(blob, fileName);
    } catch (error) {
      console.error('خطأ في إنشاء الوثيقة:', error);
      throw error;
    }
  }
}

export default WordDocumentService;
