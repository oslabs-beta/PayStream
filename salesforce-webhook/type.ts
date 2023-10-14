export type PaymentDetails = {
	sf_unique_invoice_id?: string;
	primary_contact: string;
	contact_email: string;
	account_name?: string;
	project_name?: string;
	payment_method?: string;
	invoice_sent_date?: string;
	invoice_due_date?: string;//due 14 days from invoice date
	payment_date?: string; //invoice_paid_date
	amount: number;
	invoice_number: string;
	stripe_invoice_id: string;
}