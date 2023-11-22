import { getRevenueData } from '@/lib/utils';

describe('getRevenueData', () => {
  it('should format revenue data correctly', () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const mockData = [
      {
        sf_unique_id: '1',
        invoice_id: '2',
        amount: 10000,
        invoice_sent_date: '2023-10-14',
        payment_date: formattedDate,
        invoice_due_date: '2023-11-14',
        payment_method: 'credit card',
        project_name: 'C12',
        account_name: 'VendorSeekr',
      },
      {
        sf_unique_id: '2',
        invoice_id: '3',
        amount: 3500,
        invoice_sent_date: '2023-11-14',
        payment_date: formattedDate,
        invoice_due_date: '2023-12-14',
        payment_method: 'credit card',
        project_name: 'C23',
        account_name: 'BillBotBaggins',
      },
      {
        sf_unique_id: '3',
        invoice_id: '4',
        amount: 5000,
        invoice_sent_date: '2023-08-14',
        payment_date: formattedDate,
        invoice_due_date: '2023-09-14',
        payment_method: 'credit card',
        project_name: 'C34',
        account_name: 'Aimbu',
      },
    ];
    const result = getRevenueData(mockData);

    expect(result.payments).toBeDefined();
    expect(result.monthRevenue).toBe(18500);
  });
});
