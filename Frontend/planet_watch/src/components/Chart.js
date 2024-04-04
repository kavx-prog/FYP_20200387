import React, { useEffect, useRef } from "react";

const Chart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up chart dimensions
    const chartWidth = canvas.width - 100; // Adjust as needed
    const chartHeight = canvas.height - 120; // Adjust as needed

    // Calculate data points
    const minEmission = Math.min(...data.map((item) => item.emission));
    const maxEmission = Math.max(...data.map((item) => item.emission));
    const emissionRange = maxEmission - minEmission;

    const dataPoints = data.map((item, index) => ({
      x: 100 + (index * chartWidth) / (data.length - 1),
      y:
        60 +
        chartHeight -
        (chartHeight * (item.emission - minEmission)) / emissionRange,
      label: item.year.toString(),
    }));

    // Draw chart axes
    ctx.beginPath();
    ctx.moveTo(100, 40);
    ctx.lineTo(100, 40 + chartHeight);
    ctx.lineTo(100 + chartWidth, 40 + chartHeight);
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Draw data line
    ctx.beginPath();
    ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
    for (let i = 1; i < dataPoints.length; i++) {
      ctx.lineTo(dataPoints[i].x - 20, dataPoints[i].y - 20);
    }
    ctx.strokeStyle = "rgba(75, 192, 192, 1)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    dataPoints.forEach((point) => {
      ctx.fillText(point.label, point.x, canvas.height - 20);
    });

    // Draw y-axis labels
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const yAxisLabels = [minEmission, maxEmission];
    yAxisLabels.forEach((label) => {
      const y =
        60 +
        chartHeight -
        (chartHeight * (label - minEmission)) / emissionRange;
      ctx.fillText(label.toString(), 90, y);
    });
    ctx.restore();
  }, [data]);

  return <canvas ref={canvasRef} width={900} height={400} />;
};

export default Chart;
