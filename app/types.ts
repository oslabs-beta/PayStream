
// declaring an interface to reassign AxiosResponse implicit "any" return to acess array properties

import { SetStateAction } from "react";

export type ServerResponse = {
	data: ServerData | null;
}
type ServerData = {
	node: string | SetStateAction<string>;
}