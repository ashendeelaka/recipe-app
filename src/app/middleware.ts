import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: Request) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return new Response(JSON.stringify({ message: "Unauthorized: Token missing" }), {
            status: 401,
        });
    }

    try {
        const secret = process.env.JWT_SECRET!;
        jwt.verify(token, secret);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Unauthorized: Invalid token" }), {
            status: 401,
        });
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        '/api/categories',
        '/api/recipes/favourites',
        '/api/recipes'
    ]
};