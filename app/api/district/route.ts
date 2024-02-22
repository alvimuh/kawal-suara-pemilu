import { District } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { NextRequest } from "next/server";
import prisma from "@/prisma/db";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const supabase = createClient();

  let data: District[] = [];
  const provinsi = request.nextUrl.searchParams.get("provinsi");
  const kabupaten = request.nextUrl.searchParams.get("kabupaten");
  const kecamatan = request.nextUrl.searchParams.get("kecamatan");

  switch (request.nextUrl.searchParams.get("type")) {
    case "provinsi":
      data = await prisma.$queryRaw`SELECT * FROM "kpu_provinsi"`;

      break;

    case "kabupaten":
      data =
        await prisma.$queryRaw`SELECT * FROM "kpu_kabupaten" WHERE provinsi = ${provinsi}`;

      break;

    case "kecamatan":
      data =
        await prisma.$queryRaw`SELECT * FROM "kpu_kecamatan" WHERE provinsi = ${provinsi} AND kabupaten = ${kabupaten}`;

      break;

    case "kelurahan":
      data =
        await prisma.$queryRaw`SELECT * FROM "kpu_kelurahan" WHERE provinsi = ${provinsi} AND kabupaten = ${kabupaten} AND kecamatan = ${kecamatan}`;

      break;
  }

  return Response.json({ data });
}
