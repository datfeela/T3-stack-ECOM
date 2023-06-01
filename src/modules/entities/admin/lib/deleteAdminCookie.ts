export const deleteAdminCookie = () => {
    const name = 'admin-token'
    const value = ''

    const options = {
        path: '/',
        secure: true,
        sameSite: 'lax',
        'max-age': '-1',
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

    for (const optionKey in options) {
        updatedCookie += '; ' + optionKey
        const optionValue = options[optionKey as keyof typeof options]
        if (optionValue !== true) {
            updatedCookie += '=' + `${optionValue}`
        }
    }

    document.cookie = updatedCookie
}
