"use client";

import { useRef } from "react";
import QRCodeLib from "react-qr-code";
import { Button } from "@/components/ui/button";

// react-qr-code v2 ships a class component typed for React <19, which fails
// the JSX intrinsic-element check in React 19. Cast to a minimal FC interface.
const QRCode = QRCodeLib as unknown as React.FC<{ value: string; size?: number }>;

interface QrCodeDisplayProps {
  qrCodeId: string;
  customerCode: string;
}

export function QrCodeDisplay({ qrCodeId, customerCode }: QrCodeDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrUrl = `${typeof window !== "undefined" ? window.location.origin : "https://neumart.com"}/qr/customer/${qrCodeId}`;

  function handleDownload() {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nuemart-qr-${customerCode}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={containerRef} className="rounded-lg border bg-white p-4">
        <QRCode value={qrUrl} size={200} />
      </div>
      <Button variant="outline" size="sm" onClick={handleDownload}>
        Download QR
      </Button>
    </div>
  );
}
