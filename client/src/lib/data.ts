export interface Transaction {
    date: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
  }
  
  export const mockFinancialData = {
    transactions: [
      {
        date: '2023-06-01',
        description: 'Monthly Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary'
      },
      {
        date: '2023-06-03',
        description: 'Rent Payment',
        amount: 1500,
        type: 'expense',
        category: 'Housing'
      },
      {
        date: '2023-06-05',
        description: 'Grocery Shopping',
        amount: 200,
        type: 'expense',
        category: 'Food'
      },
      {
        date: '2023-06-08',
        description: 'Freelance Project',
        amount: 800,
        type: 'income',
        category: 'Freelance'
      },
      {
        date: '2023-06-10',
        description: 'Restaurant Dinner',
        amount: 120,
        type: 'expense',
        category: 'Food'
      },
      {
        date: '2023-06-12',
        description: 'Movie Tickets',
        amount: 50,
        type: 'expense',
        category: 'Entertainment'
      },
      {
        date: '2023-06-15',
        description: 'Electricity Bill',
        amount: 100,
        type: 'expense',
        category: 'Utilities'
      },
      {
        date: '2023-06-18',
        description: 'Gas',
        amount: 60,
        type: 'expense',
        category: 'Transportation'
      },
      {
        date: '2023-06-20',
        description: 'Online Course',
        amount: 200,
        type: 'expense',
        category: 'Education'
      },
      {
        date: '2023-06-23',
        description: 'Yoga Class',
        amount: 80,
        type: 'expense',
        category: 'Health'
      },
      {
        date: '2023-06-25',
        description: 'New Laptop',
        amount: 1200,
        type: 'expense',
        category: 'Shopping'
      },
      {
        date: '2023-06-28',
        description: 'Side Hustle',
        amount: 400,
        type: 'income',
        category: 'Freelance'
      },
      {
        date: '2023-05-01',
        description: 'Monthly Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary'
      },
      {
        date: '2023-05-05',
        description: 'Rent Payment',
        amount: 1500,
        type: 'expense',
        category: 'Housing'
      },
      {
        date: '2023-05-10',
        description: 'Grocery Shopping',
        amount: 180,
        type: 'expense',
        category: 'Food'
      },
      {
        date: '2023-05-15',
        description: 'Utilities',
        amount: 120,
        type: 'expense',
        category: 'Utilities'
      },
      {
        date: '2023-05-20',
        description: 'Transportation',
        amount: 80,
        type: 'expense',
        category: 'Transportation'
      },
      {
        date: '2023-04-01',
        description: 'Monthly Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary'
      },
      {
        date: '2023-04-05',
        description: 'Rent Payment',
        amount: 1500,
        type: 'expense',
        category: 'Housing'
      },
      {
        date: '2023-04-15',
        description: 'Bonus',
        amount: 1000,
        type: 'income',
        category: 'Salary'
      },
      {
        date: '2023-03-01',
        description: 'Monthly Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary'
      },
      {
        date: '2023-03-10',
        description: 'Vacation',
        amount: 800,
        type: 'expense',
        category: 'Travel'
      },
      {
        date: '2023-02-01',
        description: 'Monthly Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary'
      },
      {
        date: '2023-02-15',
        description: 'Home Repair',
        amount: 350,
        type: 'expense',
        category: 'Housing'
      },
      {
        date: '2023-01-01',
        description: 'Monthly Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary'
      },
      {
        date: '2023-01-20',
        description: 'New Phone',
        amount: 900,
        type: 'expense',
        category: 'Shopping'
      }
    ]
  };