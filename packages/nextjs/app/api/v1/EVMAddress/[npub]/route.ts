import { NextRequest, NextResponse } from "next/server";
import { nostrService } from "~~/services/nostrService";

export async function GET(request: NextRequest, context: { params: { npub: string } }) {
  const npub = context.params.npub;

  if (!npub) {
    return NextResponse.json({ error: "Missing npub parameter" }, { status: 400 });
  }

  try {
    const addr = await nostrService.getEthAddress(npub);
    return NextResponse.json({ "EVM-address": addr });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to resolve EVM address" }, { status: 500 });
  }
}
