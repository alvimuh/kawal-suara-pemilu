import { createClient } from "@/utils/supabase/client";
import { Col, Flex, Row } from "antd";
import MainTable from "./components/main_table";
import Filter from "./components/filter";
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

  const { data: tpsData, count } = await query.range(
    (page - 1) * pageSize,
    page * pageSize - 1
  );

  let tpsDataList: TpsData[] = [];

  if (tpsData !== null && tpsData !== undefined) {
    tpsDataList = tpsData.map((item: TpsData) => {
      return {
        ...item,
        is_match: item.total_sum_votes === item.total_valid_votes,
      };
    });
  }

  return (
    <Layout contentStyle={{ padding: 0 }}>
      <Row style={{ padding: "12px 48px" }}>
        <Col span={24}>
          <Filter />
        </Col>
      </Row>
      <Row style={{ padding: "12px 48px" }}>
        <Col span={24}>
          <MainTable data={tpsDataList} total={count ?? 0} />
        </Col>
      </Row>
    </Layout>
  );
}
