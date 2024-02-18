import { NextRequest } from "next/server";
import prisma from "@/prisma/db";
import json from "@/utils/json";

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

  let page = 1;
  let pageSize = 10;

  if (
    typeof searchParams.page == "string" &&
    typeof searchParams.size == "string"
  ) {
    page = parseInt(searchParams.page);
    pageSize = parseInt(searchParams.size);
  }

  let where: any = {};

  if (searchParams.provinsi) {
    where.provinsi = searchParams.provinsi;
  }
  if (searchParams.kabupaten) {
    where.kabupaten = searchParams.kabupaten;
  }
  if (searchParams.kecamatan) {
    where.kecamatan = searchParams.kecamatan;
  }
  if (searchParams.kelurahan) {
    where.kelurahan = searchParams.kelurahan;
  }

  if (searchParams.status) {
    switch (searchParams.status) {
      case "valid":
        where.selisih_suara_paslon_dan_jumlah_sah = 0;
        where.total_votes = { not: 0 };
        where.total_sum_votes = { not: 0 };
        break;
      case "invalid":
        where.selisih_suara_paslon_dan_jumlah_sah = { not: 0 };
        where.total_votes = { not: 0 };
        where.total_sum_votes = { not: 0 };
        break;
    }
  }

  let tpsData = await prisma.kpu_tps_v2.findMany({
    where,
    orderBy: { code: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  let count = await prisma.kpu_tps_v2.count({ where });

  if (tpsData !== null && tpsData !== undefined) {
    tpsData = tpsData.map((item) => {
      let status = 0;
      if (Number(item.total_votes) == 0 || Number(item.total_sum_votes) === 0) {
        status = 1; // kosong
      } else if (Number(item.selisih_suara_paslon_dan_jumlah_sah) !== 0) {
        status = 2;
      }

      return {
        ...item,
        status: status,
      };
    });
  }

  return Response.json({ data: json(tpsData), count });
}
