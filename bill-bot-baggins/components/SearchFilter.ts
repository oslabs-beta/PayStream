import { DataArray, InvoiceDatas } from "@/lib/types";
type ColumnName = keyof(InvoiceDatas);
export function SearchFilter(data: DataArray, query: string, columnname: ColumnName, filtertype: string) {
let filtered;
    switch (columnname) {
    case 'invoice_id' :
    case 'account_name' : 
    case 'project_name' :
        filtered = data.filter((item) =>
            item[columnname]
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
            );
    break;   
}
return filtered;
}