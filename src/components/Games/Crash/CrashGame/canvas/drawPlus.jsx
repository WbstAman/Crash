export  const drawPlus = (ctx, cx, cy, size = 8, lineWidth = 2.5) => {
    ctx.save();
    ctx.strokeStyle = "#282a2f"; // plus icon of grid
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy - size / 2);
    ctx.lineTo(cx, cy + size / 2);
    ctx.moveTo(cx - size / 2, cy);
    ctx.lineTo(cx + size / 2, cy);
    ctx.stroke();
    ctx.restore();
  };