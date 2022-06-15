import { Type } from '@sinclair/typebox'
const DTO_PROPERTY_NAMES = ['email', 'password']
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'

const LoginDTOSchema = Type.Object(
    {
        email: Type.String({
            format: 'email',
            errorMessage: {
                type: 'El tipo debe ser un string',
                format: 'Email debe contener un correo electrónico válido'
            }
        }),
        password: Type.String({
            errorMessage: {
                type: "El tipo de password debe ser un string"
            }
        }),
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "No puede haber propiedades adicionales. Formato de objeto nó válido"
        }
    }
)
const ajv = new Ajv({ allErrors: true })

addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv)
const validate = ajv.compile(LoginDTOSchema)
const validateLoginDTO = (req, res, next) => {
    const isDTOValid = validate(req.body)
    console.log(validate.errors)
    if (!isDTOValid) return res.status(400).send(ajv.errorsText(validate.errors, { separator: '\n' }))

    next();
}
export default validateLoginDTO;