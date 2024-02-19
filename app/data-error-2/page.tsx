import Layout from "@/components/Layout";
import MainContent from "./components/MainContent";

export const revalidate = 0;

export const metadata = {
  title: "Isu Data #2 - Kawal Suara Pemilu",
  description:
    "Data TPS Dengan Jumlah Perolehan Suara Yang Melebihi Jumlah Pengguna Hak Pilih.",
};

export default function Page({}) {
  return (
    <Layout contentStyle={{ padding: 0 }}>
      <MainContent />
    </Layout>
  );
}
