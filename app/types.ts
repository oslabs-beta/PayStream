
// declaring an interface to reassign AxiosResponse implicit "any" return to acess array properties

import { PaymentProps } from "@/lib/types";

export type ServerResponse = {
	data: ServerData | PaymentProps | null;
}
type ServerData = {
	node: string;
}