"use client";

import { useEffect, useState } from "react";

export default function PageTimestamp() {
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleString());
  }, []);

  if (!timestamp) {
    return <span>⏱️ Loading...</span>;
  }

  return <span>⏱️ Page rendered at: {timestamp}</span>;
}
