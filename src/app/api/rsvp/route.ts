import { promises as fs } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const DATA_FILE = join(process.cwd(), "public/data/rsvp.json");

async function readRSVPs() {
    try {
        const data = await fs.readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeRSVPs(data: any) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
    const rsvps = await readRSVPs();
    return NextResponse.json(rsvps);
}

export async function POST(req: NextRequest) {
    const { name, count } = await req.json();

    if (!name || !count) {
        return NextResponse.json(
            { error: "Missing name or count" },
            { status: 400 }
        );
    }

    const rsvps = await readRSVPs();
    rsvps.push({ name, count, timestamp: new Date().toISOString() });
    await writeRSVPs(rsvps);

    return NextResponse.json({ success: true, rsvp: { name, count } });
}
