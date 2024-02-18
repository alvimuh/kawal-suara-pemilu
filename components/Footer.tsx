"use client";

import { Typography } from "antd";
import { Footer as FooterAntd } from "antd/es/layout/layout";
import dayjs from "dayjs";

export function Footer({ lastUpdate }: { lastUpdate: number | null }) {
  return (
    <FooterAntd style={{ textAlign: "center", background: "white" }}>
      {lastUpdate && (
        <Typography.Paragraph style={{ color: "GrayText" }}>
          Terakhir disinkronkan pada{" "}
          {dayjs(lastUpdate).format("HH:MM DD/MM/YYYY")}
        </Typography.Paragraph>
      )}
      Alvilab ©{new Date().getFullYear()} Pemilu Damai
    </FooterAntd>
  );
}
