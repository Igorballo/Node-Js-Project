
const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node Js API Description',
            version: '1.0.0',
            contact: {
                name: "Dr Hfx",
                email: "sodballo@gmail.com",
                url: "ballo.com"
            },
            "license": {
                "name": "Apache 2.0",
                "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
            },
        },
        servers: [
            {
                url: "http://localhost:8080/api",
                description: "Developement server"
            }
        ],
        components: {
            schemas: {
                Topic: {
                    type: 'object',
                    required: ['title', 'subject'],
                    properties: {
                        title: {
                            type: 'string',
                            description: 'The title of the fucking topic'
                        },
                        subject: {
                            type: 'string',
                            description: 'The subject of the fucking topic'
                        },
                        status: {
                            type: 'boolean',
                            description: 'The status of the fucking topic'
                        }
                    },
                    example: {
                        title: "Christmas day",
                        subject: "Christmas day is coming soon",
                        status: true,
                    }
                }
            },

            responses: {
                400: {
                    description: 'API key is missing',
                    contents: 'application/json'
                },
                401: {
                    description: 'Unauthorize error - incorrect API key or incorrect format',
                    contents: 'application/json'
                },
                404: {
                    description: 'Not found - The topic was not found',
                    contents: 'application/json'
                }
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                }
            }
        },
        security: [{
            ApiKeyAuth: []
        }]
    },
    apis: ['./routes/api.js'],
    // apis: ['./app/routes*.js'],
};

module.exports = options
