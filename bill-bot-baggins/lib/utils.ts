import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PaymentProps } from "./types";

export const getMonthlyRevenueData = (data: PaymentProps[] ) => {
  // initialize the revenue data for each month to zero
  const revenueByMonth = [
    { month: 'Jan', revenue: 0 },
    { month: 'Feb', revenue: 0 },
    { month: 'Mar', revenue: 0 },
    { month: 'Apr', revenue: 0 },
    { month: 'May', revenue: 0 },
    { month: 'Jun', revenue: 0 },
    { month: 'Jul', revenue: 0 },
    { month: 'Aug', revenue: 0 },
    { month: 'Sep', revenue: 0 },
    { month: 'Oct', revenue: 0 },
    { month: 'Nov', revenue: 0 },
    { month: 'Dec', revenue: 0 },
  ];
  // loop through the resulting data from salesforce and add the revenue data to the specific month
  data.forEach((invoice) => {
    const { payment_date, amount } = invoice;
    const currentYear = new Date().getFullYear().toString();

    if (payment_date && payment_date?.includes(currentYear)) {
      const date = new Date(payment_date);
      revenueByMonth[date.getMonth()].revenue += amount;
    }
  });

  return revenueByMonth;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ResultsProps = {
  revenueData: number | null,
  payments: PaymentProps[] | any[]
  yearRevenue: number,
  outstandingInvoices: number,
  monthRevenue: number,
  monthRevenueGrowth: number,
  yearRevenueGrowth: number,
  revenueDataByMonth: {
    month: string;
    revenue: number;
  }[] | undefined
}

export const getRevenueData = (data: PaymentProps[] | undefined) => {

  const results: ResultsProps  = {
    revenueData: null, 
    payments: [], 
    yearRevenue: 0, 
    outstandingInvoices: 0, 
    monthRevenue: 0, 
    monthRevenueGrowth: 0, 
    yearRevenueGrowth: 0,
    revenueDataByMonth: undefined
  }

  let pastMonthRevenue = 0;
  let pastYearRevenue = 0;
  const currentYear = new Date().getFullYear().toString();
  const pastYear = (new Date().getFullYear() - 1).toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const pastMonth = new Date().getMonth().toString();
  const currentDate = new Date();

  sortDataByPaymentDate(data);

  if (data) {
    // get 5 most recent payments (array is now sorted by most recent payment)
    for (let i = 0; i < data.length && i < 5; i++) {
      if (data[i].payment_date && data[i].payment_date?.includes(currentYear)) {
        results.payments.push(data[i]);
      }
    }

    data.forEach((invoice) => {
      if (invoice.payment_date && invoice.payment_date.includes(currentYear)) {
        results.yearRevenue += invoice.amount;
      }
      if (invoice.payment_date && invoice.payment_date.includes(pastYear)) {
        pastYearRevenue += invoice.amount;
      }
      if (
        invoice.payment_date &&
        invoice.payment_date.slice(5, 7).includes(currentMonth)
      ) {
        results.monthRevenue += invoice.amount;
      }
      if (
        invoice.payment_date &&
        invoice.payment_date.slice(5, 7).includes(pastMonth)
      ) {
        pastMonthRevenue += invoice.amount;
      }
      if (
        invoice.invoice_due_date &&
        new Date(invoice.invoice_due_date) < currentDate &&
        invoice.payment_date === undefined
      ) {
        results.outstandingInvoices += 1;
      }
    });
    results.revenueDataByMonth = getMonthlyRevenueData(data);

    results.monthRevenueGrowth = getRevenueGrowth(pastMonthRevenue, results.monthRevenue);

    results.yearRevenueGrowth = getRevenueGrowth(pastYearRevenue, results.yearRevenue);

  }
  return (results)
} 

const getRevenueGrowth = (pastRevenue: number, currentRevenue: number) => {
  return pastRevenue !== 0
      ? (currentRevenue - pastRevenue) / pastRevenue * 100
      : currentRevenue === 0
      ? 0
      : 100;
}

const sortDataByPaymentDate = (paymentArray: PaymentProps[] | undefined) => {

  // sort the data array by payment_date, which allows for the 5 most recent sales to be shown
  if (paymentArray) {
    paymentArray.sort((a, b) => {
      const dateA = a.payment_date ? new Date(a.payment_date).getTime() : 0;
      const dateB = b.payment_date ? new Date(b.payment_date).getTime() : 0;
      
      return dateB - dateA;
    });
  }
}