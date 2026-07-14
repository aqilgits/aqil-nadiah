import { promises as fs } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const DATA_FILE = join(process.cwd(), "public/data/wishes.json");

async function readWishes() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeWishes(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  const wishes = await readWishes();
  return NextResponse.json(wishes);
}

export async function POST(req: NextRequest) {
  const { name, msg } = await req.json();

  if (!name || !msg) {
    return NextResponse.json(
      { error: "Missing name or message" },
      { status: 400 }
    );
  }

  const wishes = await readWishes();
  wishes.unshift({ name, msg, timestamp: new Date().toISOString() });
  await writeWishes(wishes);

  return NextResponse.json({ success: true, wish: { name, msg } });
}
