import { Insight } from "@/lib/types";
import prisma from "@/prisma/db";
import json from "@/utils/json";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  switch (request.nextUrl.searchParams.get("type")) {
    case "error-1": {
      const queryResult: Insight[] = await prisma.$queryRaw`SELECT
        sum(
              CASE
                  WHEN kpu_tps_v2.total_votes = kpu_tps_v2.total_sum_votes THEN 1
                  ELSE 0
              END) AS jumlah_sama,
        sum(
              CASE
                  WHEN kpu_tps_v2.total_votes <> kpu_tps_v2.total_sum_votes THEN 1
                  ELSE 0
              END) AS jumlah_tidak_sama,
        count(*) AS jumlah_tps
      FROM
        kpu_tps_v2;`;

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
