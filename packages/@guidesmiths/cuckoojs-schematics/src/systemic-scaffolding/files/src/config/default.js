module.exports = {
	server: {
		host: '0.0.0.0',
		port: 4000,
	},
  routes: {
    admin: {},
    middleware: {
      core: {
        swaggerValidator: {
          apiDocEndpoint: '/__/docs/api',
          validateRequests: true,
          validateResponses: true,
          validationEndpoint: '/test',
          format: 'yaml',
          yaml: {
            file: './src/docs/syncapi.yaml',
          },
        },
      },
    },
  },
  logger: {
    prettyLogs: process.env.LOGGING_PRETTIFY,
    level: process.env.LOGGING_LEVEL || 'info',
    hiddenAttributes: ['req.headers', 'res.headers'],
  },
};
