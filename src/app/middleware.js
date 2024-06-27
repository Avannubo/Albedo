import { NextResponse } from 'next/server'


const protectedRoutes = ['/dashboard']
const publicRoutes = ['/admin', '/signup', '/']
// This function can be marked `async` if using `await` inside
export function middleware(request) {

    let cookie = request.cookies.get('token')
    //console.log(cookie) 

    return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/admin/:path*',
// }