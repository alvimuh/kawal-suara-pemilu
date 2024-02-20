import { Insight } from "@/lib/types";
import prisma from "@/prisma/db";
import json from "@/utils/json";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  switch (request.nextUrl.searchParams.get("type")) {
    case "data-error": {
      const queryResult: Insight[] = await prisma.$queryRaw`SELECT
        sum(
              CASE
                  WHEN kpu_tps_v2.selisih_suara_paslon_dan_jumlah_sah = 0 AND total_votes != 0 AND total_sum_votes != 0 THEN 1
                  ELSE 0
              END) AS total_data_not_error_1,
        sum(
              CASE
                  WHEN kpu_tps_v2.selisih_suara_paslon_dan_jumlah_sah != 0 AND total_votes != 0 AND total_sum_votes != 0 THEN 1
                  ELSE 0
              END) AS total_data_error_1,
        sum(
              CASE
                  WHEN kpu_tps_v2.total_sum_votes <= kpu_tps_v2.jml_hak_pilih  AND total_votes != 0 AND total_sum_votes != 0 THEN 1
                  ELSE 0
              END) AS total_data_not_error_2,
        sum(
              CASE
                  WHEN kpu_tps_v2.total_sum_votes > kpu_tps_v2.jml_hak_pilih  AND total_votes != 0 AND total_sum_votes != 0 THEN 1
                  ELSE 0
              END) AS total_data_error_2,
        sum(
              CASE
                  WHEN total_votes = 0 OR total_sum_votes = 0  THEN 1
                  ELSE 0
              END) AS total_data_null,
        count(id) AS total
        FROM kpu_tps_v2;`;

      return Response.json({ data: json(queryResult[0]) });
    }

    case "last-update": {
      const queryResult: any[] =
        await prisma.$queryRaw`SELECT last_progress_update FROM kpu_tps_stats kts  WHERE progress = 100 ORDER BY last_progress_update DESC LIMIT 1`;

      const result =
        queryResult !== null
          ? Number(queryResult[0].last_progress_update)
          : null;

      return Response.json({ data: { last_update: result } });
    }
    default:
      return Response.json({ data: null });
  }
}
