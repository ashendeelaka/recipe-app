import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized: Token missing" }), {
            status: 401, headers: { 'Content-Type': 'application/json' } 
        });
    }

    try {
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret);
        
        
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized: Invalid token" }), {
            status: 401, headers: { 'Content-Type': 'application/json' } 
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