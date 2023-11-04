'use client';

import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
export default function Filter() {
    const searchFunction = () => {
        let dataArray;
        if (invoice_ID !== '') {
          dataArray = SearchFilter(data, invoice_ID, 'invoice_id', '');
        }
        if (accountName !== '') {
          dataArray = SearchFilter(dataArray || data, accountName, 'account_name', '');
        }  
        if (dataArray !== undefined) {
          setFilteredData(dataArray); 
        }
      } 
    return (<form>
        <Label htmlFor="invoice_ID">Invoice ID</Label>
        <Input id="invoice_ID" placeholder="Search by invoice ID" ></Input>
        </form>)
}