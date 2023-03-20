import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { verifyAdmin } from './server/helpers/adminAuth'

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('admin-token')?.value

    const verificationToken =
        token &&
        (await verifyAdmin(token).catch((e) => {
            console.log(e)
        }))

    if (req.nextUrl.pathname === '/admin/auth' && !verificationToken) return

    if (req.nextUrl.pathname === '/admin/auth' && verificationToken)
        return NextResponse.redirect(new URL('/admin', req.url))

    if (!verificationToken) return NextResponse.redirect(new URL('/admin/auth', req.url))
}

// 37:52

export const config = {
    matcher: '/admin/:path*',
}
