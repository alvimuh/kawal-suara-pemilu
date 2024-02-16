import { District, Insight } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const supabase = createClient();

  let data: District[] = [];
  const provinsi = request.nextUrl.searchParams.get("provinsi");
  const kabupaten = request.nextUrl.searchParams.get("kabupaten");

  switch (request.nextUrl.searchParams.get("type")) {
    case "provinsi":
      const { data: provinsiData } = await supabase
        .from("kpu_provinsi")
        .select();

      if (provinsiData !== null && provinsiData !== undefined) {
        data = provinsiData;
      }
      break;

    case "kabupaten":
      const kabupatenQuery = supabase.from("kpu_kabupaten").select();
      kabupatenQuery.eq("provinsi", provinsi);

      const { data: kabupatenData } = await kabupatenQuery;

      if (kabupatenData !== null && kabupatenData !== undefined) {
        data = kabupatenData;
      }
      break;

    case "kecamatan":
      const kecamatanQuery = supabase.from("kpu_kecamatan").select();
      kecamatanQuery.eq("provinsi", provinsi);
      kecamatanQuery.eq("kabupaten", kabupaten);

      const { data: kecamatanData } = await kecamatanQuery;

      if (kecamatanData !== null && kecamatanData !== undefined) {
        data = kecamatanData;
      }
      break;
  }

  return Response.json({ data });

  //   return Response.json({ data });
}
