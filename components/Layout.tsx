"use client";

import LayoutAntd, { Content, Footer } from "antd/es/layout/layout";
import { Header } from "antd/es/layout/layout";
import { RiBox1Line } from "react-icons/ri";

import Title from "antd/es/typography/Title";
import { Flex, Skeleton, Typography } from "antd";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getInsight } from "@/lib/fetch";
import dayjs from "dayjs";

export default function Layout({
  children,
  contentStyle,
}: {
  children: React.ReactNode;
  contentStyle?: React.CSSProperties | undefined;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["insight", "last-update"],
    queryFn: () => getInsight("last-update"),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <LayoutAntd>
      <Header
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          zIndex: 10,
          background: "white",
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <Link href="/">
          <Flex align="center">
            <RiBox1Line size={34} style={{ marginRight: 4 }} />
            <Title
              level={1}
              style={{
                margin: 0,
                fontSize: "1.2rem",
              }}
            >
              Kawal Suara Pemilu
            </Title>
          </Flex>
        </Link>
      </Header>
      <Content style={contentStyle}>{children}</Content>
      <Footer style={{ textAlign: "center", background: "white" }}>
        <Skeleton
          loading={isLoading || isError}
          paragraph={false}
          active
          style={{
            width: 200,
            margin: "auto",
            marginBottom: 10,
          }}
        >
          <Typography.Paragraph style={{ color: "GrayText" }}>
            Terakhir disinkronkan pada{" "}
            {dayjs(data?.data.last_update).format("HH:MM DD/MM/YYYY")}
          </Typography.Paragraph>
        </Skeleton>
        Alvilab ©{new Date().getFullYear()} Pemilu Damai
      </Footer>
    </LayoutAntd>
  );
}
