"use client"
import { ColumnDef } from "@tanstack/react-table"
import { PaymentProps } from '@/lib/types';
export const columns: ColumnDef<PaymentProps>[] = [
    {
      accessorKey: "project_name",
      header: "Project Name",
    },
    {
      accessorKey: "invoice_id",
      header: "Invoice ID",
    },
    {
      accessorKey: "invoice_sent_date",
      header: "Invoice Sent Date",
    },
    {
      accessorKey: "invoice_due_date",
      header: "Invoice Due Date",
    },
    {
     accessorKey: "amount",
     header: "Amount",
    },
  ]