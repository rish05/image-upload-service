const fs = require('fs');
const { OpenApiValidator } = require('express-openapi-validate');
const jsYaml = require('js-yaml');

const OpenApiDocument = jsYaml.load(
    fs.readFileSync('public/swagger-ui/openApiSpec3.0.yaml','utf-8')
);

const validator = new OpenApiValidator(OpenApiDocument,{
    ajvOptions: {coerceTypes: true},
});

module.exports = {
    validator
};
