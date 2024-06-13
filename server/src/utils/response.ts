export const newResponse = (message: string, status: number = 200, options?: any) => {
	return  options ? {
			status,
			message,
			...options
		}
		:
		{
			status,
			message,
			...options
		}
}
