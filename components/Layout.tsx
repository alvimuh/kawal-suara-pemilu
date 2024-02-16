import LayoutAntd, { Content, Footer } from "antd/es/layout/layout";
import { Header } from "antd/es/layout/layout";
import { RiBox1Line } from "react-icons/ri";

import Title from "antd/es/typography/Title";
import { Flex } from "antd";
import Link from "next/link";

export default function Layout({
  children,
  contentStyle,
}: {
  children: React.ReactNode;
  contentStyle?: React.CSSProperties | undefined;
}) {
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
            <RiBox1Line size={34} />
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

      <Content style={{ padding: "32px 48px", ...contentStyle }}>
        {children}
      </Content>

      <Footer style={{ textAlign: "center", background: "white" }}>
        Alvilab ©{new Date().getFullYear()} Pemilu Damai
      </Footer>
    </LayoutAntd>
  );
}
