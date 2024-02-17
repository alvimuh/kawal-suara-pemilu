"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button, Grid, Table, Tag, Tooltip } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Suspense, useEffect, useState } from "react";
import ExpandedRowTable from "./ExpandedRowTable";

const columns: (isMobile: boolean) => ColumnsType<TpsData> = (
  isMobile: boolean
) => [
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
    fixed: !isMobile ? "right" : undefined,
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

export default function MainTable({
  data,
  total,
  loading,
  refetch,
}: {
  data: TpsData[];
  total: number;
  loading: boolean;
  refetch: (params: string) => void;
}) {
  const breakpoint = Grid.useBreakpoint();
  const searchParams = useSearchParams();
  const [currentPagination, setCurrentPagination] = useState<
    number | undefined
  >(undefined);

  const handleChange = (pagination: TablePaginationConfig) => {
    if (pagination.current && pagination.pageSize) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", pagination.current.toString());
      params.set("size", pagination.pageSize.toString());
      setCurrentPagination(pagination.current);

      refetch(params.toString());
    }
  };

  const searchParamsPage = searchParams.get("page");
  useEffect(() => {
    if (typeof searchParamsPage == "string") {
      setCurrentPagination(parseInt(searchParamsPage));
    }
  }, [searchParamsPage]);

  const colomns = columns(!breakpoint.md);
  return (
    <Table
      columns={colomns}
      dataSource={data}
      scroll={{ x: 1500 }}
      bordered
      rowKey="code"
      pagination={{
        total: total,
        current: currentPagination,
        style: {
          padding: "0 48px",
        },
      }}
      expandable={{
        expandedRowRender: (record) => <ExpandedRowTable record={record} />,
      }}
      onChange={handleChange}
      loading={loading}
    />
  );
}
