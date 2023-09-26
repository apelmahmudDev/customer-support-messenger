import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname
  
    const isPublicPath = path === '/login' || path === '/test'
  
    const token = true;
  
    if(isPublicPath && token) {
      return NextResponse.redirect(new URL('/test', request.nextUrl))
    }
  
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
      
  }
  
   
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: [
      '/test',
      '/login',
    ]
  }