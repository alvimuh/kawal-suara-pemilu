"use client";

import { useSearchParams } from "next/navigation";
import { Alert, Grid, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import ExpandedRowTable from "./ExpandedRowTable";

export default function MainTable({
  colomns,
  data,
  total,
  loading,
  refetch,
}: {
  colomns: ColumnsType<TpsData>;
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

  return (
    <>
      <Alert
        style={{
          margin: "12px 40px",
        }}
        message="Website sedang dalam Maintenance"
        description="Mohon maaf, saat ini kami sedang melakukan maintenance database. Mohon untuk bisa mencoba beberapa saat lagi."
        type="warning"
        showIcon
      />
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
    </>
  );
}
