const DTO_PROPERTY_NAMES = ['email', 'password']

const loginDTOSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
    required: ['email', 'password'],
    additionalProperties: false,
}
const validateLoginDTO = (req, res, next) => {
    const loginDTO = req.body;
    if (typeof loginDTO !== 'object') res.status(400).sned("El body tiene que venir en formato JSON")

    const bodyPropertyNames = Object.keys(loginDTO);

    const checkProperties = bodyPropertyNames.length === DTO_PROPERTY_NAMES.length && bodyPropertyNames.every(propertyName => DTO_PROPERTY_NAMES.includes(propertyName))

    if (!checkProperties) res.status(400).sned("El body debe contener únicamente email y password")

}
export default validateLoginDTO;