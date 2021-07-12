export const isAuthenticated = () => {
	let token  = sessionStorage.getItem('token');
	return (
		token ? true: false
	)
}