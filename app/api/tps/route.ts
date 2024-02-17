import { Insight } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = {
    page: request.nextUrl.searchParams.get("page"),
    size: request.nextUrl.searchParams.get("size"),
    provinsi: request.nextUrl.searchParams.get("provinsi"),
    kabupaten: request.nextUrl.searchParams.get("kabupaten"),
    kecamatan: request.nextUrl.searchParams.get("kecamatan"),
    kelurahan: request.nextUrl.searchParams.get("kelurahan"),
    status: request.nextUrl.searchParams.get("status"),
  };

  const supabase = createClient();

  let page = 1;
  let pageSize = 10;

  if (
    typeof searchParams.page == "string" &&
    typeof searchParams.size == "string"
  ) {
    page = parseInt(searchParams.page);
    pageSize = parseInt(searchParams.size);
  }

  let query = supabase.from("kpu_tps").select("*", { count: "exact" });

  if (searchParams.provinsi) {
    query.eq("provinsi", searchParams.provinsi);
  }
  if (searchParams.kabupaten) {
    query.eq("kabupaten", searchParams.kabupaten);
  }
  if (searchParams.kecamatan) {
    query.eq("kecamatan", searchParams.kecamatan);
  }
  if (searchParams.kelurahan) {
    query.eq("kelurahan", searchParams.kelurahan);
  }

  if (searchParams.status) {
    switch (searchParams.status) {
      case "valid":
        query.filter("selisih_suara_paslon_dan_jumlah_sah", "eq", 0);
        query.filter("total_votes", "not.eq", 0);
        query.filter("total_sum_votes", "not.eq", 0);
        break;
      case "invalid":
        query.filter("selisih_suara_paslon_dan_jumlah_sah", "not.eq", 0);
        query.filter("total_votes", "not.eq", 0);
        query.filter("total_sum_votes", "not.eq", 0);
        break;
    }
  }

  const { data: tpsData, count } = await query
    .order("code")
    .range((page - 1) * pageSize, page * pageSize - 1);

  let tpsDataList: TpsData[] = [];

  if (tpsData !== null && tpsData !== undefined) {
    tpsDataList = tpsData.map((item) => {
      let status = 0;
      if (item.total_votes === 0 || item.total_sum_votes === 0) {
        status = 1; // kosong
      } else if (parseInt(item.selisih_suara_paslon_dan_jumlah_sah) !== 0) {
        status = 2;
      }

      return {
        ...item,
        status: status,
      };
    });
  }
  return Response.json({ data: tpsDataList, count });
}
