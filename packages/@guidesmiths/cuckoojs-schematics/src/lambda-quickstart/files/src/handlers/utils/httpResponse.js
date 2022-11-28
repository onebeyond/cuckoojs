const ok = (payload, statusCode = 200) => ({
	statusCode,
	body: payload,
});

const error = (errorMessage, statusCode = 500) => ({
	statusCode,
	body: {error: errorMessage},
});

module.exports = {
	ok,
	error,
};
