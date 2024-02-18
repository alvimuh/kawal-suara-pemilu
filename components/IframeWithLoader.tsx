"use client";

import { Skeleton, Spin, Typography } from "antd";
import { CSSProperties, useState } from "react";
import { HiOutlinePresentationChartBar } from "react-icons/hi2";

const IframeWithLoader = ({
  src,
  style,
}: {
  src: string;
  style: CSSProperties | undefined;
}) => {
  const [loading, setLoading] = useState(true);

  const handleIframeLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            ...style,
            background: "#f0f0f0",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Spin />
          <Typography
            style={{
              color: "GrayText",
              fontWeight: 500,
              marginTop: 8,
            }}
          >
            Memuat Grafik
          </Typography>
        </div>
      )}
      <iframe
        src={src}
        onLoad={handleIframeLoad}
        style={{ ...style, display: loading ? "none" : "block" }}
      />
    </div>
  );
};

export default IframeWithLoader;
