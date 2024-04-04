import React, { useEffect } from "react";

const DoughnutChart = () => {
  useEffect(() => {
    const canvas = document.getElementById("doughnut-chart");

    if (canvas) {
      const ctx = canvas.getContext("2d");

      const data = [100, 350, 220, 50];
      const colors = ["#FF6384", "#36A2EB ", "#FFCE56 ", "#4BC0C0 "];
      const labels = ["Food", "Transportation", "Electricity","Industrial"];

      const total = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      let startAngle = 0;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY);

      for (let i = 0; i < data.length; i++) {
        const endAngle = startAngle + Math.PI * 2 * (data[i] / total);

        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

        // Calculate label position
        const labelAngle = startAngle + (endAngle - startAngle) / 2;
        const labelRadius = radius * 0.6; // Adjust the label radius as needed
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;

        // Draw label
        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; // Center the label vertically
        ctx.fillText(labels[i], labelX, labelY);

        startAngle = endAngle;
      }
    }
  }, []);

  return (
    <div>
      <canvas id="doughnut-chart" width="200" height="200"></canvas>
    </div>
  );
};

export default DoughnutChart;
