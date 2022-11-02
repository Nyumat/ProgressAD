// Set the headers to be sent with every following request.
export const setHeaders = () => {
	const headers = {
		headers: {
			"x-auth-token": localStorage.getItem("token")
		}
	};
	return headers;
};
