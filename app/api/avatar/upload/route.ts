import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename || typeof filename !== 'string') {
        return new NextResponse(
            JSON.stringify({ error: 'Parâmetro "filename" é obrigatório.' }),
            { status: 400 }
        );
    }

    if (!request.body) {
        return NextResponse.json({ error: 'Missing request body' }, { status: 400 });
    }

    // ⚠️ The below code is for App Router Route Handlers only
    const blob = await put(filename, request.body, {
        access: 'public',
    });

    // Here's the code for Pages API Routes:
    // const blob = await put(filename, request, {
    //   access: 'public',
    // });

    return NextResponse.json(blob);
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
