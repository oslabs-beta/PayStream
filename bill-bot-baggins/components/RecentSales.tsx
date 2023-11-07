import { PaymentProps } from '@/lib/types';

export function RecentSales({ payments }: { payments: PaymentProps[] }) {
  return (
    <div className='space-y-8'>
      {payments.map((payment) => (
        <div className='flex items-center rounded-md border border-neutral-800 bg-neutral-900 p-2'>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {payment.account_name}
            </p>
            <p className='text-sm text-muted-foreground'>
              ESC-{payment.invoice_id}
            </p>
          </div>
          <div className='ml-auto font-medium text-green-800'>
            +
            {payment.amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
