
"use client";

import React, { useState } from "react";
import { Printer, Download, Loader2 } from "lucide-react";
import * as htmlToImage from "html-to-image";

import jsPDF from "jspdf";

export default function ReceiptActions({ receiptId }: { receiptId: string }) {
  const [isDownloading, setIsDownloading] = useState(false);


  const onPrint = () => window.print();


  const onDownload = async () => {
    setIsDownloading(true);

    const element = document.getElementById(receiptId);
    if (!element) {
      console.error("Receipt element not found!");
      setIsDownloading(false);
      return;
    }

    try {
     
      const dataUrl = await htmlToImage.toPng(element, {
        cacheBust: true,
      });

    
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();

      const img = new Image();
      img.src = dataUrl;

      await new Promise((resolve) => (img.onload = resolve));

      const ratio = img.height / img.width;
      const pdfHeight = pdfWidth * ratio;

      pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`booking-receipt-${receiptId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const buttonStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium text-white px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={onPrint}
        className={`${buttonStyles} bg-gray-700 hover:bg-gray-800 focus:ring-gray-500`}
      >
        <Printer className="mr-2 h-4 w-4" />
        Print Receipt
      </button>

      <button
        onClick={onDownload}
        disabled={isDownloading}
        className={`${buttonStyles} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`}
      >
        {isDownloading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        {isDownloading ? "Generating..." : "Download PDF"}
      </button>
    </div>
  );
}
