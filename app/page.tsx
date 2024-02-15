"use client";

import { createClient } from "@/utils/supabase/client";
import { Button, Menu, Table, Tag, Tooltip } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";

interface User {
  code: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  tps: string;
  total_votes_01: number;
  total_votes_02: number;
  total_votes_03: number;
  total_votes: number;
  total_valid_votes: number;
  total_invalid_votes: number;
  is_match: boolean;
  link: string;
}

const columns: ColumnsType<User> = [
  {
    key: "code",
    title: () => (
      <Tooltip title="Dari web KPU" placement="bottom">
        Kode TPS
      </Tooltip>
    ),
    dataIndex: "code",
    fixed: "left",
    width: 150,
  },
  {
    key: "provinsi",
    title: () => (
      <Tooltip title="Dari web KPU" placement="bottom">
        Provinsi
      </Tooltip>
    ),
    dataIndex: "provinsi",
    width: 140,
  },
  {
    key: "kabupaten",
    title: () => (
      <Tooltip title="Dari web KPU" placement="bottom">
        Kabupaten
      </Tooltip>
    ),
    dataIndex: "kabupaten",
    width: 140,
  },
  {
    key: "kecamatan",
    title: () => (
      <Tooltip title="Dari web KPU" placement="bottom">
        Kecamatan
      </Tooltip>
    ),
    dataIndex: "kecamatan",
    width: 140,
  },

  {
    key: "tps",
    title: () => (
      <Tooltip title="Dari web KPU" placement="bottom">
        Nama TPS
      </Tooltip>
    ),
    dataIndex: "tps",
    width: 140,
  },
  {
    key: "total_votes_01",
    title: () => (
      <Tooltip
        title="Dari web KPU pada section: Perolehan Suara"
        placement="bottom"
      >
        Jumlah Suara Paslon 01
      </Tooltip>
    ),
    dataIndex: "total_votes_01",
    width: 110,
  },
  {
    key: "total_votes_02",
    title: () => (
      <Tooltip
        title="Dari web KPU pada section: Perolehan Suara"
        placement="bottom"
      >
        Jumlah Suara Paslon 02
      </Tooltip>
    ),
    dataIndex: "total_votes_02",
    width: 110,
  },
  {
    key: "total_votes_03",
    title: () => (
      <Tooltip
        title="Dari web KPU pada section: Perolehan Suara"
        placement="bottom"
      >
        Jumlah Suara Paslon 03
      </Tooltip>
    ),
    dataIndex: "total_votes_03",
    width: 110,
  },
  {
    key: "total_votes",
    title: () => (
      <Tooltip
        title="Dijumlahkan dari kolom Jumlah Suara Paslon 01 + 02 + 03"
        placement="bottom"
      >
        Jumlah Suara Seluruh Paslon
      </Tooltip>
    ),
    dataIndex: "total_votes",
    width: 110,
  },
  {
    key: "total_valid_votes",
    title: () => (
      <Tooltip
        title="Dari web KPU pada section: Jumlah Suara Sah dan Tidak Sah"
        placement="bottom"
      >
        Jumlah Suara Sah
      </Tooltip>
    ),
    dataIndex: "total_valid_votes",
    width: 110,
  },
  {
    key: "total_invalid_votes",
    title: () => (
      <Tooltip
        title="Dari web KPU pada section: jumlah suara sah dan tidak sah"
        placement="bottom"
      >
        Jumlah Suara Tidak Sah
      </Tooltip>
    ),
    dataIndex: "total_invalid_votes",
    width: 115,
  },
  {
    key: "is_match",
    title: () => (
      <Tooltip
        title={`Hasil perbandingan antara kolom "Jumlah Suara Seluruh Paslon" dengan "Jumlah Suara Sah"`}
        placement="bottom"
      >
        Keterangan
      </Tooltip>
    ),
    dataIndex: "is_match",
    fixed: "right",
    width: 130,
    render: (value, record) => {
      let color = value ? "green" : "red";

      return (
        <Tooltip
          title={
            value
              ? "Jumlah Surat Suara Sah dan Jumlah Suara Seluruh Paslon sama"
              : `Jumlah Surat Suara Sah adalah ${record.total_valid_votes} sedangkan Jumlah Suara Seluruh Paslon adalah ${record.total_votes}`
          }
          placement="bottom"
        >
          <Tag color={color} key={value}>
            {value ? "Sesuai" : "Tidak Sesuai"}
          </Tag>
        </Tooltip>
      );
    },
  },
  {
    key: "link",
    title: "Sumber",
    dataIndex: "link",
    width: 120,
    render: (value) => {
      return (
        <Button type="primary" href={value} size="small" target="_blank">
          Buka
        </Button>
      );
    },
  },
];

export default async function Page() {
  const supabase = createClient();

  const { data } = await supabase.from("kpu_tps").select("*");

  let dataArray: User[] = [];

  if (data !== null && data !== undefined) {
    dataArray = data.map((item: User) => {
      return {
        ...item,
        is_match: item.total_votes === item.total_valid_votes,
      };
    });
  }

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
        <Content
          style={{
            position: "relative",
          }}
        >
          <Table
            columns={columns}
            dataSource={dataArray}
            scroll={{ x: 1500 }}
            bordered
          />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}
