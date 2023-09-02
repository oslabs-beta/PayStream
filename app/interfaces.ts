
// declaring an interface to reassign AxiosResponse implicit "any" return to acess array properties

export interface ServerResponse {
	data: ServerData | null;
}
interface ServerData {
	node: string[];
}