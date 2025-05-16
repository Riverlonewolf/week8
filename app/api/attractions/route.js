import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request) {
  try {
    const promisePool = mysqlPool.promise();
    const [rows, fields] = await promisePool.query(`SELECT * FROM attractions;`);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to read attractions:', error);
    return NextResponse.json({ error: 'failed to read' }, { status: 500 });
  }
}


