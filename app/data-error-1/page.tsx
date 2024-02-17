import { createClient } from "@/utils/supabase/client";
import { Col, Flex, Row } from "antd";
import MainTable from "./components/MainTable";
import Filter from "./components/Filter";
import Layout from "@/components/Layout";

export const revalidate = 0;

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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

  return (
    <Layout contentStyle={{ padding: 0 }}>
      <Row style={{ padding: "24px 48px" }}>
        <Col span={24}>
          <Filter />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <MainTable data={tpsDataList} total={count ?? 0} />
        </Col>
      </Row>
    </Layout>
  );
}
