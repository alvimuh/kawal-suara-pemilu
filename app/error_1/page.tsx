import { createClient } from "@/utils/supabase/client";
import { Col, Flex, Row } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import MainTable from "./components/main_table";
import Filter from "./components/filter";
import { District } from "@/lib/types";

export const revalidate = 0;

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();

  const page = 1;
  const pageSize = 10;

  let query = supabase.from("kpu_tps").select("*");

  if (searchParams.provinsi) {
    query.eq("provinsi", searchParams.provinsi);
  }
  if (searchParams.kabupaten) {
    query.eq("kabupaten", searchParams.kabupaten);
  }
  if (searchParams.kecamatan) {
    query.eq("kecamatan", searchParams.kecamatan);
  }

  // const { data } = await query.range(
  //   (page - 1) * pageSize,
  //   page * pageSize - 1
  // );
  const { data: tpsData } = await query;

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
          }}
        >
          <Title
            level={1}
            style={{
              color: "white",
              margin: 0,
              fontSize: "1.2rem",
            }}
          >
            Kawal Suara Pemilu
          </Title>
        </Header>
        <Content>
          {/* <Row style={{ padding: "28px 48px 12px 48px" }}>
            <Flex>
              <Filter
                provinsiDataList={provinsiDataList}
                kabupatenDataList={kabupatenDataList}
                kecamatanDataList={kecamatanDataList}
              />
            </Flex>
          </Row> */}
          <Row style={{ padding: "12px 48px" }}>
            <Col span={24}>
              <MainTable data={tpsDataList} />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}
