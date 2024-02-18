"use client";
import {
  Grid,
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Image,
  Row,
  Space,
  Button,
} from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { fromUnixTime, format } from "date-fns";

const { useBreakpoint } = Grid;

export default function ExpandedRowTable({ record }: { record: TpsData }) {
  const screens = useBreakpoint();

  const descItems1: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Jumlah Suara Paslon 01",
      children: record.total_votes_01,
    },
    {
      key: "2",
      label: "Jumlah Suara Paslon 02",
      children: record.total_votes_02,
    },
    {
      key: "3",
      label: "Jumlah Suara Paslon 03",
      children: record.total_votes_03,
    },
  ];
  const descItems2: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Jumlah Seluruh Suara Sah",
      children: record.total_valid_votes,
    },
    {
      key: "2",
      label: "Jumlah Suara Tidak Sah",
      children: record.total_invalid_votes,
    },
    {
      key: "3",
      label: "Seluruh Suara Sah Dan Suara Tidak Sah",
      children: record.total_votes,
    },
  ];
  const descItems3: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Jumlah pengguna hak pilih dalam DPT",
      children: record.dpt,
    },
    {
      key: "2",
      label: "Jumlah pengguna hak pilih dalam DPTb",
      children: record.dptb,
    },
    {
      key: "3",
      label: "Jumlah pengguna hak pilih dalam DPK",
      children: record.dptk,
    },
    {
      key: "4",
      label: "Jumlah pengguna hak pilih",
      children: record.jml_hak_pilih,
    },
  ];
  const descItems4: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Terakhir di-scraping ke database web ini",
      children: dayjs(record.obtained_at).format("DD/MM/YYYY HH:MM"),
    },
  ];

  // Table & Desktop View
  if (screens.md) {
    return (
      <Row gutter={[24, 24]} style={{ padding: 24 }}>
        <Col lg={16} xl={14}>
          <Descriptions
            title="Total Perolehan Suara"
            items={descItems1}
            layout="vertical"
            colon={false}
          />
          <Divider />
          <Flex gap={40}>
            <Descriptions
              title="Data Pengguna Hak Pilih"
              items={descItems3}
              column={1}
            />
            <Descriptions
              title="Jumlah Suara Sah Dan Tidak Sah"
              items={descItems2}
              column={1}
            />
          </Flex>
          <Divider />
        </Col>
        <Col lg={8} xl={10}>
          <Title level={5}>Foto Hasil Pindai Dokumen</Title>
          <Space>
            {record.pic_urls.map((url) => (
              <Image src={url} key={url} />
            ))}
          </Space>
        </Col>
        <Col span={20} xl={10}>
          <Descriptions
            title="Data diambil langsung dari web KPU"
            items={descItems4}
            column={2}
            layout="vertical"
            colon={false}
          />
        </Col>
        <Col span={4} xl={10} style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary" href={record.link} target="_blank">
            Buka Laman KPU
          </Button>
        </Col>
      </Row>
    );
  }

  // Mobile View
  return (
    <Row gutter={[24, 24]} style={{ padding: 24 }}>
      <Col span={24}>
        <Title level={4}>
          {record.tps},{" "}
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {record.kelurahan.toLowerCase()}, {record.kecamatan.toLowerCase()},{" "}
            {record.kabupaten.toLowerCase()}, {record.provinsi.toLowerCase()}
          </span>
        </Title>
      </Col>
      <Col span={24}>
        <Descriptions
          title="Total Perolehan Suara"
          items={descItems1}
          column={3}
          layout="vertical"
          colon={false}
        />
        <Divider />
        <Descriptions
          title="Data Pengguna Hak Pilih"
          items={descItems3}
          column={2}
          layout="vertical"
          colon={false}
        />
        <Divider />
        <Descriptions
          title="Jumlah Suara Sah Dan Tidak Sah"
          items={descItems2}
          column={2}
          layout="vertical"
          colon={false}
        />
      </Col>
      <Col span={24}>
        <Title level={5}>Foto Hasil Pindai Dokumen</Title>
        <Space>
          {record.pic_urls.map((url) => (
            <Image src={url} key={url} />
          ))}
        </Space>
      </Col>
      <Col span={24}>
        <Descriptions
          title="Data diambil langsung dari web KPU"
          items={descItems4}
          column={1}
          layout="vertical"
          colon={false}
        />
      </Col>
      <Col>
        <Button type="primary" href={record.link} target="_blank">
          Buka Laman KPU
        </Button>
      </Col>
    </Row>
  );
}
