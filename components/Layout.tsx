import LayoutAntd, { Content } from "antd/es/layout/layout";
import { Header } from "antd/es/layout/layout";
import { RiBox1Line } from "react-icons/ri";

import Title from "antd/es/typography/Title";
import { Flex, Typography } from "antd";
import Link from "next/link";
import Paragraph from "antd/es/typography/Paragraph";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { Footer } from "./Footer";

export const revalidate = 0;

export default async function Layout({
  children,
  contentStyle,
}: {
  children: React.ReactNode;
  contentStyle?: React.CSSProperties | undefined;
}) {
  const supabase = createClient();

  const { data } = await supabase
    .from("kpu_tps_data_error_1")
    .select("last_update");

  const lastUpdate: string = data !== null ? data[0].last_update : null;

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
      <Footer lastUpdate={lastUpdate} />
    </LayoutAntd>
  );
}
