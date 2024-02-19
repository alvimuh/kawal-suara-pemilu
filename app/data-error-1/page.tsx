import Layout from "@/components/Layout";
import MainContent from "./components/MainContent";

export const revalidate = 0;

export default function Page({}) {
  return (
    <Layout contentStyle={{ padding: 0 }}>
      <MainContent />
    </Layout>
  );
}
