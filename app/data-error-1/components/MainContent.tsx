"use client";

import Filter from "@/components/Filter";
import MainTable from "@/components/MainTable";
import { getTps } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { Alert, Col, Row } from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";

import ModalDisclaimer from "@/components/ModalDisclaimer";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

const columns: ColumnsType<TpsData> = [
  {
    key: "code",
    title: () => (
      <Tooltip title="Dari web KPU" placement="bottom">
        Kode TPS
      </Tooltip>
    ),
    dataIndex: "code",
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
    key: "kelurahan",
    title: () => (
      <Tooltip title="Dari web KPU" placement="bottom">
        Kelurahan
      </Tooltip>
    ),
    dataIndex: "kelurahan",
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
    key: "total_sum_votes",
    title: () => (
      <Tooltip
        title="Dijumlahkan dari kolom Jumlah Suara Paslon 01 + 02 + 03"
        placement="bottom"
      >
        Jumlah Suara Seluruh Paslon
      </Tooltip>
    ),
    dataIndex: "total_sum_votes",
    width: 140,
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
    key: "selisih_suara_paslon_dan_jumlah_sah",
    title: () => (
      <Tooltip
        title="Hasil selisih dari Jumlah Suara Seluruh Paslon dan Jumlah Suara Sah"
        placement="bottom"
      >
        Selisih
      </Tooltip>
    ),
    dataIndex: "selisih_suara_paslon_dan_jumlah_sah",
    width: 80,
  },
  {
    key: "is_match",
    title: () => (
      <Tooltip
        title={`Hasil perbandingan antara kolom "Jumlah Suara Seluruh Paslon" dengan "Jumlah Suara Sah"`}
        placement="bottom"
      >
        Status Data
      </Tooltip>
    ),
    dataIndex: "status",
    fixed: "right",
    width: 178,
    render: (value, record) => {
      const colorConvension = ["green", "yellow", "red"];
      const titleConvension = [
        "Data Valid",
        "Belum lengkap",
        "Berpotensi Tidak Valid",
      ];
      const descriptionConvension = [
        "Jumlah Surat Suara Sah dan Jumlah Suara Seluruh Paslon sama",
        "Data masih diproses di web KPU",
        `Jumlah Surat Suara Sah adalah ${record.total_valid_votes} sedangkan Jumlah Suara Seluruh Paslon adalah ${record.total_sum_votes}`,
      ];

      return (
        <Tooltip title={descriptionConvension[value]} placement="bottom">
          <Tag color={colorConvension[value]} key={value}>
            {titleConvension[value]}
          </Tag>
        </Tooltip>
      );
    },
  },
  {
    key: "link",
    title: "",
    dataIndex: "link",
    width: 120,
    render: (value) => {
      return (
        <Button type="default" href={value} size="small" target="_blank">
          Laman KPU
        </Button>
      );
    },
  },
];

export default function MainContent() {
  const searchParams = useSearchParams();

  const [params, setParams] = useState(searchParams.toString());
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["tps", "error-1", params],
    queryFn: () => getTps(params, "error-1"),
  });

  const reload = (params: string) => {
    setParams(params);
    window.scroll(0, 0);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <>
      <Row style={{ padding: "24px 48px" }}>
        <Col span={24}>
          <Title
            level={2}
            style={{
              fontSize: "1.3rem",
            }}
          >
            Isu Data #1: TPS Dengan Jumlah Perolehan Suara Yang Melebihi Jumlah
            Suara Sah
          </Title>
          <Paragraph>
            Pada pengujian pertama ini, kami mendefinisikan dua status data tiap
            TPS, yakni valid dan berpotensi tidak valid. Contoh: Jika
            dijumlahkan hasil perolehan suara Paslon 01 + 02 + 03 adalah 300
            suara, kemudian pada atribut Jumlah Suara Sah adalah 200, maka
            terdapat selisih 100 data yang menyebabkan data dari TPS tersebut
            berpotensi tidak valid. Jika tidak ada selisih antara dua atribut
            data tersebut, maka kami anggap data TPS tersebut adalah valid. Dari
            validasi sederhana ini saja, kami menemukan cukup banyak data yang
            berpotensi keliru.
          </Paragraph>
          <Paragraph>
            Data yang disajikan dibawah ini merupakan hasil pengujian kami,
            terhadap data perhitungan suara real count yang didapatkan melalui
            web KPU dengan melakukan proses web scraping.
          </Paragraph>
        </Col>
        <Col span={24} style={{ marginBottom: 24 }}>
          <ModalDisclaimer />
        </Col>
        <Col span={24}>
          <Filter onFilterChanged={reload} />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <MainTable
            colomns={columns}
            data={data ? data.data : []}
            total={data ? data.count : 0}
            loading={isLoading || isRefetching}
            refetch={reload}
          />
        </Col>
      </Row>
    </>
  );
}
