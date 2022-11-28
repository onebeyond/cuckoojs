const fromSNS = event => JSON.parse(event.Records[0].Sns.Message);

const fromHttpRequest = request => request.body;

module.exports = {
	fromSNS,
	fromHttpRequest,
};
