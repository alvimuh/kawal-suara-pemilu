import Layout from "@/components/Layout";
import { Insight } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { Button, Col, Row, Statistic } from "antd";
import Card from "antd/es/card/Card";
import Link from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";

export const revalidate = 0;

export default async function Page() {
  const supabase = createClient();

  const { data } = await supabase.from("kpu_tps_error_1").select();

  const insight: Insight = data !== null ? data[0] : null;
  // let dataArray: User[] = [];

  // if (data !== null && data !== undefined) {
  //   dataArray = data.map((item: User) => {
  //     return {
  //       ...item,
  //       is_match: item.total_votes === item.total_valid_votes,
  //     };
  //   });
  // }

  return (
    <Layout>
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
        <Link>pemilu2024.kpu.go.id</Link>. Kami mencoba mengumuplkan data dari
        web KPU tersebut dengan metode scraping secara berkala. Adapun dari
        beberapa indikator yang kesalahan data yang kami temukan, dibagi menjadi
        2 topik:
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
              value={insight.jumlah_sama}
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
              value={insight.jumlah_tidak_sama}
              // precision={2}
              valueStyle={{ color: "#cf1322" }}
              // prefix={<ArrowDownOutlined />}
              suffix="TPS"
            />
          </Card>
        </Col>
        <Col style={{ marginTop: "1rem" }}>
          <Paragraph>
            Data yang tidak valid adalah selisih antara jumlah suara sah dengan
            hasil penjumlahan suara dari ketiga paslon tidak sama. Misalnya,
            jika dijumlahkan hasil perolehan suara Paslon 01+02+03 adalah 300
            suara, tapi pada field Jumlah Suara Sah adalah 200, maka terdapat
            selisih 100 data yang menyebabkan tidak valid.
          </Paragraph>
          <Button size="large" type="primary" href="/error_1">
            Cek Data Terbaru
          </Button>
          <Paragraph style={{ marginTop: "0.5rem", color: "GrayText" }}>
            Terakhir disingkronkan pada{" "}
            {dayjs(insight.last_update).format("HH:MM DD/MM/YYYY")}
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
    </Layout>
  );
}
