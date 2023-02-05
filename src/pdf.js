import React from "react";
import jsPDF from "jspdf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Chart from "./chart";

const DownloadPDF = ({ stats, image }) => {
  const handleDownload = async () => {
    const doc = new jsPDF();

    // Add the chart to the PDF
    const chartData = stats.map((obj) => ({
      name: obj.stat.name,
      base_stat: obj.base_stat,
    }));

    const chart = <Chart stats={stats} />;

    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 300;
    // console.log("chart", typeof chart);
    // const dataUrl = await new Promise((resolve) => {
    //   const canvasImg = new Image();
    //   canvasImg.src =
    //     "data:image/svg+xml;charset=utf-8," +
    //     encodeURIComponent(new XMLSerializer().serializeToString(chart));
    //   canvasImg.onload = () => {
    //     canvasContext.drawImage(canvasImg, 0, 0, 500, 300);
    //     resolve(canvas.toDataURL("image/png"));
    //   };
    // });

    // doc.addImage(dataUrl, "PNG", 15, 40, 180, 100);

    // Add the images to the PDF
    const imageUrl = image;
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const imageDataUrl = URL.createObjectURL(imageBlob);
    doc.addImage(imageDataUrl, "PNG", 15, 150, 50, 50);

    // Add the text to the PDF
    doc.setFontSize(16);
    doc.text(15, 20, "Base Stats");
    stats.forEach((stat, index) => {
      doc.setFontSize(12);
      doc.text(15, 170 + index * 60, `${stat.stat.name}: ${stat.base_stat}`);
    });

    doc.save("stats.pdf");
  };

  return <button onClick={handleDownload}>Download PDF</button>;
};

export default DownloadPDF;
