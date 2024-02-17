"use client";

import Filter from "@/components/Filter";
import MainTable from "@/components/MainTable";
import { getTps } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MainContent() {
  const searchParams = useSearchParams();

  const [params, setParams] = useState(searchParams.toString());
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["tps", params],
    queryFn: () => getTps(params),
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
          <Filter onFilterChanged={reload} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <MainTable
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
