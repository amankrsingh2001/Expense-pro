import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.vfs;


export const exportToPDF = (data: any) => {

  const tableBody = [ ['Date','title', 'Category', 'Amount', 'Description'], ...data.map((item:any) => [item.date, item.title, item.category, item.amount, item.description]),
  ];

  const docDefinition = {
    content: [
      { text: 'Expense Report', style: 'header' },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*','*'],
          body: tableBody,
        },
      },
    ],
    styles: {
      header: { fontSize: 18, bold: true },
    },
    pageSize: 'A4',
    pageOrientation: 'landscape',
  };

  pdfMake.createPdf(docDefinition).download('Expense_Report.pdf');
};
