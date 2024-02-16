import { createClient } from "@/utils/supabase/client";
import { Col, Flex, Row } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import MainTable from "./components/main_table";
import Filter from "./components/filter";

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
        is_match: item.total_votes === item.total_valid_votes,
      };
    });
  }

  // const { data: provinceData } = await supabase.from("kpu_provinsi").select();

  // let provinsiDataList: District[] = [];
  // if (provinceData !== null && provinceData !== undefined) {
  //   provinsiDataList = provinceData;
  // }

  // const kabupatenQuery = supabase.from("kpu_kecamatan").select();
  // if (searchParams.provinsi) {
  //   kabupatenQuery.eq("provinsi", searchParams.provinsi);
  // }
  // const { data: kabupatenData } = await kabupatenQuery;

  // let kabupatenDataList: District[] = [];
  // if (kabupatenData !== null && kabupatenData !== undefined) {
  //   kabupatenDataList = kabupatenData;
  // }

  // const { data: kecamatanData } = await supabase.from("kpu_kecamatan").select();

  // let kecamatanDataList: District[] = [];
  // if (kecamatanData !== null && kecamatanData !== undefined) {
  //   kecamatanDataList = kecamatanData;
  // }

  return (
    <div>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            zIndex: 10,
            background: "white",
            boxShadow:
              "0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          }}
        >
          <Title
            level={1}
            style={{
              margin: 0,
              fontSize: "1.2rem",
            }}
          >
            Kawal Suara Pemilu
          </Title>
        </Header>
        <Content>
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
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Alvilab ©{new Date().getFullYear()} Pemilu Damai
        </Footer>
      </Layout>
    </div>
  );
}
