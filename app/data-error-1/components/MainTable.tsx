"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button, Table, Tag, Tooltip } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import ExpandedRowTable from "./ExpandedRowTable";

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
  // {
  //   key: "total_votes_01",
  //   title: () => (
  //     <Tooltip
  //       title="Dari web KPU pada section: Perolehan Suara"
  //       placement="bottom"
  //     >
  //       Jumlah Suara Paslon 01
  //     </Tooltip>
  //   ),
  //   dataIndex: "total_votes_01",
  //   width: 110,
  // },
  // {
  //   key: "total_votes_02",
  //   title: () => (
  //     <Tooltip
  //       title="Dari web KPU pada section: Perolehan Suara"
  //       placement="bottom"
  //     >
  //       Jumlah Suara Paslon 02
  //     </Tooltip>
  //   ),
  //   dataIndex: "total_votes_02",
  //   width: 110,
  // },
  // {
  //   key: "total_votes_03",
  //   title: () => (
  //     <Tooltip
  //       title="Dari web KPU pada section: Perolehan Suara"
  //       placement="bottom"
  //     >
  //       Jumlah Suara Paslon 03
  //     </Tooltip>
  //   ),
  //   dataIndex: "total_votes_03",
  //   width: 110,
  // },
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
        title="Dari web KPU pada section: Jumlah Suara Sah dan Tidak Sah"
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
    width: 160,
    render: (value, record) => {
      const colorConvension = ["green", "yellow", "red"];
      const titleConvension = ["Data Valid", "Kosong", "Potensial Tidak Valid"];
      const descriptionConvension = [
        "Jumlah Surat Suara Sah dan Jumlah Suara Seluruh Paslon sama",
        "Data masih 0",
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
    title: "Sumber",
    dataIndex: "link",
    width: 120,
    render: (value) => {
      return (
        <Button type="default" href={value} size="small" target="_blank">
          Buka
        </Button>
      );
    },
  },
];

export default function MainTable({
  data,
  total,
}: {
  data: TpsData[];
  total: number;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [currentPagination, setCurrentPagination] = useState<
    number | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (pagination: TablePaginationConfig) => {
    if (pagination.current && pagination.pageSize) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", pagination.current.toString());
      params.set("size", pagination.pageSize.toString());
      setCurrentPagination(pagination.current);
      setIsLoading(true);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const searchParamsPage = searchParams.get("page");
  useEffect(() => {
    if (typeof searchParamsPage == "string") {
      setCurrentPagination(parseInt(searchParamsPage));
    }
  }, [searchParamsPage]);

  useEffect(() => {
    setIsLoading(false);
  }, [data]);
  return (
    <Table
      columns={columns}
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
      loading={isLoading}
    />
  );
}
