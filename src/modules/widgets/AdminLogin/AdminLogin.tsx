import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { adminLoginSchema } from '~/modules/entities/admin'
import type { InputProps } from '~/modules/shared/components/Inputs/InputTypes'
import { Input } from '~/modules/shared/components/Inputs/Input'
import { useAdminLogIn } from './hooks/useAdminLogIn'

export const AdminLogin: React.FC = () => {
    const { handleLogin, loginError } = useAdminLogIn()

    return (
        <div>
            <h1>Log in</h1>
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                    rememberMe: false,
                }}
                validationSchema={toFormikValidationSchema(adminLoginSchema)}
                onSubmit={(values) => {
                    for (const key in values) {
                        let value = values[key as keyof typeof values]
                        if (typeof value === 'string') {
                            value = value.trim()
                        }
                    }
                    handleLogin(values)
                }}
                validateOnBlur
            >
                {({ errors, touched, initialValues }) => {
                    const initialValuesKeys = Object.keys(initialValues) as Array<
                        keyof typeof initialValues
                    >
                    const inputs = initialValuesKeys.map((name) => {
                        const props: InputProps = {
                            name,
                            touched: touched[name],
                            errors: errors[name] && touched[name] ? errors[name] : undefined,
                            title: name,
                        }

                        if (name === 'password') props.type = 'password'
                        if (name === 'rememberMe') {
                            props.placeholder = 'Remember me'
                            props.type = 'checkbox'
                        }

                        return <Input key={`adminLoginInput${name}`} {...props} />
                    })

                    return (
                        <Form>
                            {inputs}
                            {loginError ? <div>{loginError}</div> : null}
                            <button type='submit'>Sign Up</button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
