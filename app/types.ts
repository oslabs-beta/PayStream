
// declaring an interface to reassign AxiosResponse implicit "any" return to acess array properties

export type ServerResponse = {
	data: ServerData | null;
}
type ServerData = {
	node: string[];
}