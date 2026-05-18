import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, phone, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Log the submission (replace with email/CRM integration as needed)
  console.log("Contact form submission:", { name, phone, email, message });

  return NextResponse.json({ ok: true });
}
