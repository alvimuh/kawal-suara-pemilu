import Layout from "@/components/Layout";
import { Insight } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { Avatar, Button, Col, Flex, Row, Statistic, Tooltip } from "antd";
import { Group } from "antd/es/avatar";
import Card from "antd/es/card/Card";
import Link from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import {
  MdOutlineDataExploration,
  MdOutlineRunningWithErrors,
} from "react-icons/md";
import { PiChartPieDuotone } from "react-icons/pi";

export const revalidate = 0;

export default async function Page() {
  const supabase = createClient();

  const { data } = await supabase.from("kpu_tps_data_error_1").select();

  const insight: Insight = data !== null ? data[0] : null;

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
        Balakangan ini ramai di media sosial terkait kesalahan input data dari
        aplikasi Sirekap, di mana banyak yang mengunggah foto/video aplikasi
        Sirekap yang menunjukan scan formulir C, dan data yang terinput di
        aplikasi tersebut berbeda.
      </Paragraph>
      <Paragraph>
        Sebagai warga negara, kami merasa hal tersebut tidak boleh diabaikan,
        dan perlu data yang cukup untuk membuktikan apakah benar terdapat
        kekeliruan tersebut, atau hanya asumsi saja.
      </Paragraph>
      <Paragraph>
        Asumsi awal kami adalah adanya kekurangan dari aplikasi Sirekap,
        terutama pada fitur scan lembar formulir C, dan beberapa fungsi validasi
        data, sehingga berpotensi adanya kesalahan data mulai dari proses
        penginputan. Hal tersebut cukup dikuatkan dengan cuitan thread dari akun
        @lakamarta di platform X yang menjelaskan apa yang terjadi dengan
        aplikasi Sirekap,{" "}
        <Link
          href="https://twitter.com/lakamarta/status/1757908278762492207"
          target="blank"
        >
          baca lengkap disini
        </Link>
        .
      </Paragraph>
      <Paragraph>
        Oleh karena itu kami mencoba mengumpulkan data dari web resmi KPU, yakni{" "}
        <Link href="https://pemilu2024.kpu.go.id" target="_blank">
          pemilu2024.kpu.go.id
        </Link>{" "}
        dengan metode web scraping secara berkala.
      </Paragraph>
      <Paragraph>
        Kemudian kami mencoba menguji data tersebut valid atau berpotensi tidak
        valid dengan validasi data yang cukup sederhana:
      </Paragraph>
      <Title
        level={3}
        style={{
          fontSize: "1.3rem",
        }}
      >
        #1 Menguji selisih antara jumlah suara sah dengan hasil penjumlahan
        suara dari ketiga paslon
      </Title>
      <Row gutter={[16, 16]}>
        <Col style={{ marginTop: "1rem" }}>
          <Paragraph>
            Kami mendefinisikan dua status data tiap TPS, yakni valid dan
            berpotensi tidak valid. Contoh: Jika dijumlahkan hasil perolehan
            suara Paslon 01 + 02 + 03 adalah 300 suara, kemudian pada atribut
            Jumlah Suara Sah adalah 200, maka terdapat selisih 100 data yang
            menyebabkan data dari TPS tersebut berpotensi tidak valid. Jika
            tidak ada selisih antara dua atribut data tersebut, maka kami anggap
            data TPS tersebut adalah valid. Dari validasi sederhana ini saja,
            kami menemukan cukup banyak data yang berpotensi keliru.
          </Paragraph>
          <Paragraph>
            Sejauh ini, dari{" "}
            {insight.jumlah_tps.toLocaleString().replace(",", ".")} TPS yang
            kami dapatkan, kami menemukan:
          </Paragraph>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Data Valid"
              value={insight.jumlah_sama}
              valueStyle={{ color: "#3f8600" }}
              groupSeparator="."
              prefix={
                <PiChartPieDuotone
                  size={30}
                  style={{
                    verticalAlign: "-0.25em",
                  }}
                />
              }
              suffix="TPS"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Data Berpotensi Tidak Valid"
              value={insight.jumlah_tidak_sama}
              valueStyle={{ color: "#cf1322" }}
              groupSeparator="."
              prefix={
                <MdOutlineRunningWithErrors
                  size={30}
                  style={{
                    verticalAlign: "-0.25em",
                  }}
                />
              }
              suffix="TPS"
            />
          </Card>
        </Col>
        <Col xs={24}>
          <Link href="/data-error-1">
            <Button
              size="large"
              type="primary"
              icon={
                <MdOutlineDataExploration
                  fontSize={20}
                  style={{
                    verticalAlign: "-0.18em",
                  }}
                />
              }
            >
              Buka Detail Data
            </Button>
          </Link>
        </Col>
      </Row>
      <Title
        level={3}
        style={{
          fontSize: "1.8rem",
          marginTop: "2rem",
        }}
      >
        #2 Mengecek jumlah perolehan suara yang melebihi jumlah pengguna hak
        pilih TPS
      </Title>
      <Row gutter={16}>
        <Col span={24}>
          <Card bordered={false}>
            <Paragraph style={{ margin: "0.5rem", color: "GrayText" }}>
              Data masih kami siapkan
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Paragraph style={{ marginTop: 32, marginBottom: 48 }}>
        Kami berharap data yang kami sajikan dapat membantu mengawal suara
        pemilu khususnya pilpres kali ini.
      </Paragraph>
      <Flex align="center">
        <Title
          level={3}
          style={{
            marginRight: 12,
            marginBottom: 0,
            fontWeight: 300,
            color: "InfoText",
          }}
        >
          Dikembangkan oleh
        </Title>
        <Group size={40}>
          <Tooltip title="Alfian Isnan - Backend Engineer" placement="top">
            <Avatar src="https://media.licdn.com/dms/image/C4D03AQHnkg-cFBsk_g/profile-displayphoto-shrink_100_100/0/1644459244130?e=1713398400&v=beta&t=iBT_kkfSds8zsCbMTGGv0k39bT8AoTAN31e_xo-QH5U" />
          </Tooltip>
          <Tooltip title="Alvi Mohamad - Frontend Engineer" placement="top">
            <Avatar src="https://media.licdn.com/dms/image/C5603AQHRYkTKabcPwA/profile-displayphoto-shrink_100_100/0/1648181494002?e=1713398400&v=beta&t=al5W726Na0x2A1f5-BDWKIhUqw0Immr1Bn9GwCfT5mQ" />
          </Tooltip>
        </Group>
      </Flex>
    </Layout>
  );
}
