interface IProcessRequest {
	status: string;
	data: Object;
}

export function processRequest(args: Object): IProcessRequest {
	if ('errors' in args) {
		return {
			status: 'error',
			data: args.errors,
		};
	}

	return {
		status: 'success',
		data: args,
	};
}
