import { createClient } from "@/utils/supabase/client";
import { Button, Menu, Tag, Tooltip } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import MainTable from "./components/main_table";

export default async function Page() {
  const supabase = createClient();

  const { data } = await supabase.from("kpu_tps").select("*");

  let dataArray: TpsData[] = [];

  if (data !== null && data !== undefined) {
    dataArray = data.map((item: TpsData) => {
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
          <MainTable data={dataArray} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}
