import { useEffect, useRef, useState } from "react";
import explosion1 from "../../../../../assets/images/explosion1.webp";
import rocket from "../../../../../assets/images/rocket.png";
import fire3 from "../../../../../assets/images/fire3.png"

import "./crashGraph.css";

const circlePath = (ctx, x, y, radius) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
};

const CrashGraph = ({ multiplier = 1.0, gameState = "waiting", windowLength = 8 }) => {
  const canvasRef = useRef(null);
  const rocketRef = useRef(null);

  const maxSeenRef = useRef(Math.max(3, multiplier));
  const displayMultiplierRef = useRef(multiplier);
  const rafRef = useRef(null);

  const pointsRef = useRef({ points: [], w: 0, h: 0 });
  const prevNormalizedRef = useRef(0);
  const startTimestampRef = useRef(null);

  const [elapsed, setElapsed] = useState(0);
  const [windowIndex, setWindowIndex] = useState(0);
  const [pulseRight, setPulseRight] = useState(false);

  // === configurable label count & step ===
  const labelsCount = 6;
  const step = labelsCount - 1;
  const slotCount = labelsCount;

  const axisGap = 0;
  const yDisplayMaxRef = useRef(Math.max(2, Math.ceil(maxSeenRef.current * 5) / 5));
  const lastDrawTsRef = useRef(performance.now());

  const [displaySlots, setDisplaySlots] = useState(() =>
    Array.from({ length: labelsCount }, (_, i) => i)
  );
  const [swapping, setSwapping] = useState(false);
  const swapTimeoutRef = useRef(null);

  // <-- change this to move curve + rocket horizontally (px)
  const curveOffset = 80; // default: shift curve 80px to the right of the axis start

  const buildPoints = (startX, startY, endX, endY, totalPoints = 900) => {
    const arr = new Array(totalPoints + 1);
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const curveProgress = Math.pow(t, 2.2);
      const x = startX + (endX - startX) * t;
      const y = startY - (startY - endY) * curveProgress;
      arr[i] = { x, y, t, curveProgress };
    }
    pointsRef.current = { points: arr, w: endX - startX, h: startY - endY };
  };

  // grid intersection plus
  const drawPlus = (ctx, cx, cy, size = 8, lineWidth = 2.5) => {
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

  const draw = () => {
    const canvas = canvasRef.current;
    const rocketEl = rocketRef.current;
    if (!canvas || !rocketEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    const DPR = window.devicePixelRatio || 1;
    const pixelW = Math.max(1, Math.floor(cssW * DPR));
    const pixelH = Math.max(1, Math.floor(cssH * DPR));
    if (canvas.width !== pixelW || canvas.height !== pixelH) {
      canvas.width = pixelW;
      canvas.height = pixelH;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
    }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    // BACKGROUND
    const bgGrad = ctx.createLinearGradient(0, 0, 0, cssH);
    bgGrad.addColorStop(0, "#0f0f12");
    bgGrad.addColorStop(1, "#0d0d10");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, cssW, cssH);

    // subtle bottom-left radial shadow
    const shadowGrad = ctx.createRadialGradient(
      cssW * 0.18,
      cssH * 0.85,
      0,
      cssW * 0.6,
      cssH * 0.95,
      Math.max(cssW, cssH) * 0.6
    );
    shadowGrad.addColorStop(0, "rgba(0,0,0,0.45)");
    shadowGrad.addColorStop(0.55, "rgba(0,0,0,0.18)");
    shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.rect(0, 0, cssW, cssH);
    ctx.fill();

    // vignette
    const vignette = ctx.createRadialGradient(
      cssW / 2,
      cssH / 2,
      Math.min(cssW, cssH) * 0.3,
      cssW / 2,
      cssH / 2,
      Math.max(cssW, cssH)
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(0.7, "rgba(0,0,0,0.12)");
    vignette.addColorStop(1, "rgba(0,0,0,0.35)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, cssW, cssH);

    // axis geometry
    const leftPadding = 10;
    const rightPadding = 36;
    const topPadding = 36;
    const bottomPadding = 56;

    const axisStartX = leftPadding + axisGap;
    const startY = cssH - bottomPadding;
    const endX = cssW - rightPadding;
    const endY = topPadding;

    const curveStartX = axisStartX + curveOffset;

    // GRID: align grid verticals with x-label slots
    ctx.save();
    const cols = slotCount - 1; // IMPORTANT: vertical grid lines count = slotCount - 1 (so there are slotCount joints)
    const rows = 5;
    const chartLeft = axisStartX;
    const chartW = endX - chartLeft;
    const chartH = startY - endY;
    const gapX = chartW / cols;
    const gapY = chartH / rows;

    ctx.lineWidth = 1;
    ctx.setLineDash([6, 10]);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    for (let i = 0; i <= rows; i++) {
      const y = endY + i * gapY;
      ctx.beginPath();
      ctx.moveTo(chartLeft, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }
    for (let i = 0; i <= cols; i++) {
      const x = chartLeft + i * gapX;
      ctx.beginPath();
      ctx.moveTo(x, endY);
      ctx.lineTo(x, startY);
      ctx.stroke();
    }

    // intersections: plus icons
    ctx.setLineDash([]);
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = Math.round(chartLeft + i * gapX);
        const y = Math.round(endY + j * gapY);
        const plusSize = Math.max(6, Math.min(12, (cssW + cssH) / 700));
        const plusLineW = Math.max(1, Math.round(plusSize / 4));
        drawPlus(ctx, x, y, plusSize, plusLineW);
      }
    }
    ctx.restore();

    // If waiting: draw axis + y labels below dots and return (grid stays visible)
    if (gameState === "waiting") {
      rocketEl.style.opacity = "0";

      const spineX = axisStartX;
      const panelTop = endY - 8;
      const bottomSpineY = startY + 34;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = "#282A2F";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(spineX, panelTop + 12);
      ctx.lineTo(spineX, bottomSpineY);
      ctx.lineTo(endX, bottomSpineY);
      ctx.stroke();
      ctx.restore();

      // y labels BELOW dots (first joint has no dot)
      ctx.font = "14px Inter, sans-serif";
      const dotRadius = 4;
      const labelOffsetX = dotRadius + 10;
      const ySteps = labelsCount;
      for (let i = 0; i < ySteps; i++) {
        const t = i / (ySteps - 1);
        const y = startY - t * (startY - endY);
        const value = 1 + i * ((Math.max(2, Math.ceil(maxSeenRef.current * 5) / 5) - 1) / (ySteps - 1));
        const labelText = `${value.toFixed(2)}x`;
        ctx.save();
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#767b86";
        ctx.font = "600 13px Inter, sans-serif";
        const labelY = y + dotRadius + 6;
        ctx.fillText(labelText, spineX + labelOffsetX, labelY);
        ctx.restore();
      }

      return;
    }

    // rebuild points for curve
    if (
      !pointsRef.current.points.length ||
      pointsRef.current.w !== endX - curveStartX ||
      pointsRef.current.h !== startY - endY
    ) {
      buildPoints(curveStartX, startY, endX, endY, 900);
    }
    const points = pointsRef.current.points;

    if (multiplier > maxSeenRef.current) maxSeenRef.current = multiplier * 1.25;
    const maxMultiplier = Math.max(2, maxSeenRef.current);

    const spineX = axisStartX;
    const panelTop = endY - 8;
    const bottomSpineY = startY + 34;

    // y smoothing
    const now = performance.now();
    const dt = Math.min(0.06, (now - lastDrawTsRef.current) / 1000);
    lastDrawTsRef.current = now;
    const smoothing = 12.0;
    const targetRoundedMax = Math.max(2, Math.ceil(maxMultiplier * 5) / 5);
    yDisplayMaxRef.current = yDisplayMaxRef.current + (targetRoundedMax - yDisplayMaxRef.current) * (1 - Math.exp(-smoothing * dt));
    const ySteps = labelsCount;
    const yRange = yDisplayMaxRef.current - 1;
    const yStepValue = yRange / (ySteps - 1);

    // axis L-shape
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#282A2F";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(spineX, panelTop + 12);
    ctx.lineTo(spineX, bottomSpineY);
    ctx.lineTo(endX, bottomSpineY);
    ctx.stroke();
    ctx.restore();

    // Y dots & labels below dots — SKIP the dot at the bottom joint (i === 0)
    ctx.font = "14px Inter, sans-serif";
    const dotRadius = 4;
    const labelOffsetX = dotRadius + 10;

    for (let i = 0; i < ySteps; i++) {
      const t = i / (ySteps - 1);
      const y = startY - t * (startY - endY);
      const value = 1 + i * yStepValue;
      const labelText = `${value.toFixed(2)}x`;
      const dropOffset = (1 - Math.exp(-8 * dt)) * Math.sign(targetRoundedMax - yDisplayMaxRef.current) * 6;
      const visualCenterY = y + dropOffset;

      // DON'T draw the circle/dot at the axis joint (i === 0)
      if (i !== 0) {
        ctx.save();
        const g = ctx.createRadialGradient(spineX - dotRadius * 0.3, visualCenterY - dotRadius * 0.3, 2, spineX, visualCenterY, dotRadius);
        g.addColorStop(1, "#282a2f");
        circlePath(ctx, spineX, visualCenterY, dotRadius);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#282a2f";
        ctx.stroke();
        ctx.restore();
      }

      // label always drawn below (so the axis 'starts' from joint visually but has no dot)
      ctx.save();
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#767b86";
      ctx.font = "600 13px Inter, sans-serif";
      // if there's no dot (i === 0) the label sits slightly closer to the joint
      const labelY = visualCenterY + (i === 0 ? 6 : dotRadius + 6);
      ctx.fillText(labelText, spineX + labelOffsetX, labelY);
      ctx.restore();
    }

    // X ticks and small dots on axis end
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "13px Inter, sans-serif";
    for (let i = 0; i < slotCount; i++) {
      const posRatio = i / (slotCount - 1);
      const x = spineX + posRatio * (endX - spineX);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, startY - 6);
      ctx.lineTo(x, startY + 6);
      ctx.stroke();
    }

    const dotRadiusX = 4;
    for (let i = 0; i < slotCount; i++) {
      const posRatio = i / (slotCount - 1);
      const x = spineX + posRatio * (endX - spineX);
      const visualY = bottomSpineY;
      if (i === 0 || i === slotCount - 1) continue;
      ctx.save();
      const gX = ctx.createRadialGradient(x - dotRadiusX * 0.3, visualY - dotRadiusX * 0.3, 2, x, visualY, dotRadiusX);
      gX.addColorStop(1, "#282a2f");
      circlePath(ctx, x, visualY, dotRadiusX);
      ctx.fillStyle = gX;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#282a2f";
      ctx.stroke();
      ctx.restore();
    }

    // curve + rocket (unchanged)
    const visibleMaxMultiplier = Math.max(2, maxMultiplier * 1.0);
    const normalizedRaw = Math.min(Math.max((displayMultiplierRef.current - 1) / (visibleMaxMultiplier - 1), 0), 1);
    const normalized = Math.max(prevNormalizedRef.current, normalizedRaw);
    prevNormalizedRef.current = normalized;

    const totalPoints = points.length - 1;
    const floatIndex = normalized * totalPoints;
    const fi = Math.max(0, Math.min(totalPoints, floatIndex));
    const idx0 = Math.floor(fi);
    const idx1 = Math.min(totalPoints, idx0 + 1);
    const frac = fi - idx0;
    const p0 = points[idx0];
    const p1 = points[idx1];
    const rocketX = p0.x + (p1.x - p0.x) * frac;
    const rocketY = p0.y + (p1.y - p0.y) * frac;

    if (gameState !== "crashed") {


      // area under curve
      ctx.save();
      const areaGrad = ctx.createLinearGradient(0, endY, 0, startY);
      areaGrad.addColorStop(0, "rgba(255,220,120,0.0)");
      areaGrad.addColorStop(0.6, "rgba(255,160,40,0.06)");
      areaGrad.addColorStop(1, "rgba(255,130,20,0.12)");
      ctx.fillStyle = areaGrad;
      ctx.shadowColor = "rgba(255,140,20,0.12)";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(curveStartX, startY);
      for (let i = 0; i <= idx0; i++) ctx.lineTo(points[i].x, points[i].y);
      if (frac > 0) ctx.lineTo(rocketX, rocketY);
      ctx.lineTo(rocketX, startY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Rocket Path Color
      const strokeGrad = ctx.createLinearGradient(curveStartX, 0, endX, 0);
      strokeGrad.addColorStop(0, "#E3E3DC");
      strokeGrad.addColorStop(0.4, "#625817");
      strokeGrad.addColorStop(0.65, "#ffb24a");
      strokeGrad.addColorStop(1, "#827522");

      ctx.save();
      ctx.lineWidth = 8;
      ctx.lineCap = "butt";
      ctx.lineJoin = "butt";
      ctx.strokeStyle = strokeGrad;
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowBlur = 28;
      ctx.beginPath();
      for (let i = 0; i <= idx0; i++) {
        const p = points[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      if (frac > 0) ctx.lineTo(rocketX, rocketY);
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = strokeGrad;
      for (let i = 0; i <= idx0; i++) {
        const p = points[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      if (frac > 0) ctx.lineTo(rocketX, rocketY);
      ctx.stroke();

      // trail, rocket glow
      const trailLen = 28;
      const startTrailIdx = Math.max(0, idx0 - trailLen);
      for (let i = startTrailIdx; i <= idx0; i++) {
        const p = points[i];
        const age = idx0 - i;
        const alpha = Math.max(0, 1 - age / (trailLen + 2));
        const r = Math.max(2, 12 * (1 - age / (trailLen + 1)));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        g.addColorStop(0, `rgba(255,230,160,${0.95 * alpha})`);
        g.addColorStop(0.5, `rgba(255,150,40,${0.35 * alpha})`);
        g.addColorStop(1, `rgba(255,120,30,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.arc(rocketX, rocketY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "#ff9900";
      ctx.arc(rocketX, rocketY, 3, 0, Math.PI * 2);
      ctx.fill();

      const lookaheadIndex = Math.min(totalPoints, Math.floor(fi + 3));
      const lookahead = points[lookaheadIndex];
      const dx = lookahead.x - rocketX;
      const dy = lookahead.y - rocketY;
      const rocketAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      ctx.save();
      const glowRadius = 60;
      const rg = ctx.createRadialGradient(rocketX, rocketY, 0, rocketX, rocketY, glowRadius);
      rg.addColorStop(0, "rgba(255,220,120,0.95)");
      rg.addColorStop(0.2, "rgba(255,170,60,0.5)");
      rg.addColorStop(1, "rgba(255,120,20,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(rocketX, rocketY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rocketEl.style.opacity = "1";
      rocketEl.style.left = `${rocketX}px`;
      rocketEl.style.top = `${rocketY}px`;
      rocketEl.style.transform = `translate(-50%, -50%) rotate(${rocketAngle}deg) scale(${gameState === "crashed" ? 1.05 : 1})`;
      rocketEl.style.filter =
        "drop-shadow(0 0 14px rgba(255, 240, 100, 0.95))";
      // center text
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 64px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${displayMultiplierRef.current.toFixed(2)}x`, cssW / 2, cssH / 2 - 10);
      ctx.shadowBlur = 0;
      ctx.font = "bold 16px Inter, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText(`Current payout`, cssW / 2, cssH / 2 + 30);
    };
  }
  // RAF loop
  useEffect(() => {
    let lastTs = performance.now();
    const stepFn = (ts) => {
      const dt = Math.min(0.06, (ts - lastTs) / 1000);
      lastTs = ts;

      if (multiplier > maxSeenRef.current) maxSeenRef.current = multiplier * 1.25;

      const cur = displayMultiplierRef.current;
      const target = multiplier;
      const stiffness = 8.0;
      const delta = target - cur;
      const change = delta * (1 - Math.exp(-stiffness * dt));
      displayMultiplierRef.current = cur + change;
      if (Math.abs(displayMultiplierRef.current - target) < 0.0005) displayMultiplierRef.current = target;
      try {
        draw();
      } catch (e) {
        // swallow draw errors
      }
      rafRef.current = requestAnimationFrame(stepFn);
    };

    rafRef.current = requestAnimationFrame(stepFn);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplier, gameState, windowLength]);

  // resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onResize = () => {
      pointsRef.current = { points: [], w: 0, h: 0 };
      try {
        draw();
      } catch (e) { }
    };
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(onResize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", onResize);
    }
    onResize();
    return () => {
      if (ro) {
        try {
          ro.disconnect();
        } catch (e) { }
      } else {
        window.removeEventListener("resize", onResize);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowLength, labelsCount]);

  // timer / windowIndex
  useEffect(() => {
    let tickId = null;
    if (gameState === "running") {
      if (!startTimestampRef.current) startTimestampRef.current = performance.now();
      tickId = setInterval(() => {
        const now = performance.now();
        const elapsedSec = Math.max(0, (now - startTimestampRef.current) / 1000);
        setElapsed(elapsedSec);
        const newWindowIndex = Math.floor(elapsedSec / windowLength);
        setWindowIndex((prev) => {
          if (newWindowIndex > prev) {
            setPulseRight(true);
            setTimeout(() => setPulseRight(false), 400);
            return newWindowIndex;
          }
          return prev;
        });
      }, 100);
    } else if (gameState === "waiting") {
      startTimestampRef.current = null;
      setElapsed(0);
      setWindowIndex(0);
      setPulseRight(false);
      prevNormalizedRef.current = 0;
      displayMultiplierRef.current = multiplier;
    } else if (gameState === "crashed") {
      displayMultiplierRef.current = multiplier;
    }

    return () => {
      if (tickId) clearInterval(tickId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, windowLength, multiplier]);

  // compute sliding window labels
  const computeSlotsFromWindowIndex = (wi) => {
    const base = wi * step;
    return Array.from({ length: labelsCount }, (_, i) => base + i);
  };

  useEffect(() => {
    const nextSlots = computeSlotsFromWindowIndex(windowIndex);
    const same =
      displaySlots.length === nextSlots.length &&
      displaySlots.every((v, i) => v === nextSlots[i]);
    if (same) return;

    setSwapping(true);
    if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current);
    swapTimeoutRef.current = setTimeout(() => {
      setDisplaySlots(nextSlots);
      setTimeout(() => setSwapping(false), 320);
    }, 180);
  }, [windowIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // label rects: align to chartLeft joints (so x labels start from joints)
  const [labelRects, setLabelRects] = useState(null);
  const labelContainerRef = useRef(null);

  useEffect(() => {
    const container = labelContainerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const leftPadding = 10;
    const startX = leftPadding + axisGap; // chartLeft = axisStartX
    const rightPadding = 36;
    const endX = rect.width - rightPadding;
    const cols = slotCount - 1;
    const chartW = endX - startX;
    const arr = [];
    for (let i = 0; i < slotCount; i++) {
      const posRatio = i / (slotCount - 1);
      const x = Math.round(startX + posRatio * chartW);
      arr.push(x);
    }
    setLabelRects({ rect, xs: arr, y: rect.height - 56 + 12 });
  }, [windowLength, slotCount, multiplier, axisGap]);

  const style = (
    <style>{`
      .x-labels { position: absolute; left:0; top:0; pointer-events:none; width:100%; height:100%; }
      .x-label { position:absolute; transform:translate(-50%,0); color:#fff; font-weight:700; transition: transform 300ms ease, opacity 300ms ease; opacity:1; }
      .x-label.out { transform: translate(calc(-50% + 18px), -6px); opacity:0; }
      .x-label.in { transform: translate(calc(-50% - 18px), 0); opacity:0; animation: slideInFromLeft 320ms forwards ease; }
      @keyframes slideInFromLeft {
        from { transform: translate(calc(-50% - 18px), 0); opacity:0; }
        to { transform: translate(-50%, 0); opacity:1; }
      }
      .right-pulse { box-shadow: 0 0 0 rgba(255,153,0,0.0); animation: pulse 420ms ease-out; border-radius:6px; }
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(255,153,0,0.9); }
        40% { box-shadow: 0 0 12px 6px rgba(255,153,0,0.24); }
        100% { box-shadow: 0 0 0 0 rgba(255,153,0,0); }
      }
      .timer-chip {
        position:absolute;
        left:12px;
        top:12px;
        background:rgba(24,24,24,0.9);
        color:#fff;
        padding:6px 10px;
        border-radius:999px;
        font-weight:600;
        font-size:13px;
        box-shadow: 0 6px 16px rgba(0,0,0,0.6);
      }
    `}</style>
  );

  const renderSlots = displaySlots;

  return (
    // <div className="relative w-full h-[520px] bg-card rounded-lg overflow-hidden">
    <div className="relative w-full h-full bg-card rounded-lg overflow-hidden">
      {style}
      {/* label container is always rendered so x labels show even in waiting */}
      <div
        ref={labelContainerRef}
        className="x-labels"
        aria-hidden
      >
        {labelRects &&
          renderSlots.map((s, i) => {
            const left = labelRects.xs[i] + 2;
            const classNames = ["x-label"];
            if (swapping) {
              const computed = computeSlotsFromWindowIndex(windowIndex);
              if (computed[i] !== undefined && computed[i] === s) {
                classNames.push("in");
              } else {
                classNames.push("out");
              }
            } else {
              classNames.push("show");
            }

            return (
              <div
                key={i + "-" + s}
                className={classNames.join(" ")}
                style={{
                  left,
                  bottom: "-3px",
                  color: "#767b86",
                  fontSize: 13,
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                {s}s
              </div>
            );
          })}
      </div>

      <canvas ref={canvasRef} className="w-full h-full block" />

      <div
        ref={rocketRef}
        className="absolute pointer-events-none transition-opacity duration-200 left-0 top-0"
        style={{ opacity: 0, filter: "drop-shadow(0 0 5px red)" }}
      >
        {gameState === "crashed" ? (
          <div className="relative explosion-container">
            <div className="w-[400px] h-[400px] relative">
              <img src={explosion1} alt={explosion1} className="w-full" />
            </div>
          </div>
        ) : (
          <div className="relative rocket-img">
            <img src={fire3} alt={fire3} className="flame" />
            <div className="w-[60px] h-[60px] rotate-[75deg] relative">
              <img src={rocket} alt="rocket" className="w-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrashGraph;
