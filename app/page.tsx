import { createClient } from "@/utils/supabase/client";
import { Button, Col, Menu, Row, Statistic, Table, Tag, Tooltip } from "antd";
import Card from "antd/es/card/Card";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { valueType } from "antd/es/statistic/utils";
import { ColumnsType } from "antd/es/table";
import Link from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

interface KpuTpsError_1 {
  jumlah_sama: valueType;
  jumlah_tidak_sama: valueType;
}

export default async function Page() {
  const supabase = createClient();

  const { data } = await supabase.from("kpu_tps_error_1").select();

  const kpuTpsErrorData: KpuTpsError_1 = data !== null ? data[0] : null;
  // let dataArray: User[] = [];
  console.log(kpuTpsErrorData);

  // if (data !== null && data !== undefined) {
  //   dataArray = data.map((item: User) => {
  //     return {
  //       ...item,
  //       is_match: item.total_votes === item.total_valid_votes,
  //     };
  //   });
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
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            // items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: "64px 48px" }}>
          <Title
            level={2}
            style={{
              fontSize: "1.8rem",
            }}
          >
            Tentang Kawal Suara Pemilu 2024
          </Title>
          <Paragraph>
            Website ini dilatarbelakangi karena keresahan banyaknya data yang
            menurut kami tidak valid dari website resmi KPU:{" "}
            <Link>pemilu2024.kpu.go.id</Link>. Kami mencoba mengumuplkan data
            dari web KPU tersebut dengan metode scraping secara berkala. Adapun
            dari beberapa indikator yang kesalahan data yang kami temukan,
            dibagi menjadi 2 topik:
          </Paragraph>
          <Paragraph></Paragraph>
          <Title
            level={3}
            style={{
              fontSize: "1.3rem",
            }}
          >
            #1 Terdapat selisih antara jumlah suara sah dengan hasil penjumlahan
            suara dari ketiga paslon
          </Title>
          <Row gutter={16}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Valid"
                  value={kpuTpsErrorData.jumlah_sama}
                  // precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  // prefix={<ArrowUpOutlined />}
                  suffix="TPS"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Tidak Valid"
                  value={kpuTpsErrorData.jumlah_tidak_sama}
                  // precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  // prefix={<ArrowDownOutlined />}
                  suffix="TPS"
                />
              </Card>
            </Col>
            <Col style={{ marginTop: "1rem" }}>
              <Paragraph>
                Data yang tidak valid adalah selisih antara jumlah suara sah
                dengan hasil penjumlahan suara dari ketiga paslon tidak sama.
                Misalnya, jika dijumlahkan hasil perolehan suara Paslon 01+02+03
                adalah 300 suara, tapi pada field Jumlah Suara Sah adalah 200,
                maka terdapat selisih 100 data yang menyebabkan tidak valid.
              </Paragraph>
              <Button size="large" type="primary" href="/error_1">
                Cek Data Terbaru
              </Button>
              <Paragraph style={{ marginTop: "0.5rem", color: "GrayText" }}>
                Terakhir disingkronkan pada {new Date().toDateString()}
              </Paragraph>
            </Col>
          </Row>
          <Title
            level={3}
            style={{
              fontSize: "1.3rem",
              marginTop: "2rem",
            }}
          >
            #2 Terdapat jumlah perolehan suara yang melebihi jumlah pengguna hak
            pilih TPS
          </Title>
          <Row gutter={16}>
            <Col span={24}>
              <Card bordered={false}>
                <Paragraph style={{ margin: "1rem" }}>
                  Data masih kami siapkan
                </Paragraph>
              </Card>
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
