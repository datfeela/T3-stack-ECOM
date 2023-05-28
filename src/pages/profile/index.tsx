import { useSession } from 'next-auth/react'
import Head from 'next/head'

const Profile = () => {
    const { data } = useSession()

    return (
        <>
            <Head>
                <title>Profile | T3-Ecom</title>
            </Head>
            <main>
                {data?.user ? <h3>Hello, {data.user.name}!</h3> : null}
                <div>
                    this page is currently in development, visit it later to see if we have added
                    anything new ;)
                </div>
            </main>
        </>
    )
}

export default Profile
