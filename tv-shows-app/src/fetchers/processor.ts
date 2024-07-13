interface IProcessRequest {
	status: string;
	data: Object;
}

export function processRequest<IProcessRequest>(args: Object) {
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
