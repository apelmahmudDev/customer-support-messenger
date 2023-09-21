import { NextResponse } from 'next/server'
import { isAuthenticated } from './lib/auth'

export function middleware(request) {
	if(!isAuthenticated()){
		return NextResponse.redirect(new URL('/login', request.url))
	}else {
		return NextResponse.next()
	}
}

export const config = {
  matcher: '/',
}