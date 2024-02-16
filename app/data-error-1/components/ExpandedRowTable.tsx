"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Button,
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Image,
  Row,
  Space,
} from "antd";
import Title from "antd/es/typography/Title";

export default function ExpandedRowTable({ record }: { record: TpsData }) {
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
      label: "Jumlah Seluruh Suara Sah Dan Suara Tidak Sah",
      children: record.total_votes,
    },
  ];

  return (
    <Row gutter={[24, 24]} style={{ padding: 24 }}>
      <Col>
        <Descriptions
          title="Total Perolehan Suara"
          items={descItems1}
          column={1}
        />
        <Divider />
        <Descriptions
          title="Jumlah Suara Sah Dan Tidak Sah"
          items={descItems2}
          column={1}
        />
      </Col>
      <Col>
        <Title level={5}>Foto Hasil Pindai Dokumen</Title>
        <Space>
          {record.pic_urls.map((url) => (
            <Image src={url} key={url} width={150} />
          ))}
        </Space>
      </Col>
    </Row>
  );
}
