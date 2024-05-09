export async function POST(req: Request) {
	const body = await req.text();
	try {
		const result = eval(body);
		return Response.json(result);
	} catch (err) {
		if (err instanceof Error)
			return Response.json({ error: err.message }, { status: 400 });
		else {
			return Response.json({ error: 'An error occurred' }, { status: 500 });
		}
	}
}
