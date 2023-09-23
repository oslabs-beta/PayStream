import { MouseEventHandler } from "react";

export interface CustButtonProps {
    btnType?: "button" | "submit";
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface PaymentProps {
    account_name?: string;
    project_name?: string;
    payment_method?: string;
    invoice_sent_date?: string;
    payment_date?: string; //invoice_paid_date
    amount: number;
    invoice_id: string;
    invoice_due_date?: string;//due 14 days from invoice date
}

export interface PaymentContProps {
    project_name?: string;    
    invoice_id: string;
    invoice_sent_date?: string;
    invoice_due_date?: string;
    amount: number
    }

      
      export interface OptionProps {
        title: string;
        value: string;
      }
      
      export interface SearchFilterProps {
        title: string;
        options: OptionProps[];
        onFilter: (value: string) => void;
      }
      
      export interface SearchProps {
        invoice_ID: string;
        setInvoice_ID: (account: string) => void;
      }