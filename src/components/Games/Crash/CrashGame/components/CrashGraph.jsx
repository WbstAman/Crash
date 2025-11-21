import React, { useEffect, useRef, useState } from "react";
import rocket from "../../../../../assets/images/rocket.png";
import rocketExplosion from "../../../../../assets/images/rocket-explosion.svg";

const roundRectPath = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

const CrashGraph = ({ multiplier = 1.0, gameState = "waiting", windowLength = 8 }) => {
  const canvasRef = useRef(null);
  const rocketRef = useRef(null);

  // scale + smoothing
  const maxSeenRef = useRef(Math.max(3, multiplier));
  const displayMultiplierRef = useRef(multiplier);
  const rafRef = useRef(null);

  // geometry cache
  const pointsRef = useRef({ points: [], w: 0, h: 0 });

  // prevent backward progress visually
  const prevNormalizedRef = useRef(0);

  // real time start
  const startTimestampRef = useRef(null);

  // DOM state for animated labels & timer
  const [elapsed, setElapsed] = useState(0);
  const [windowIndex, setWindowIndex] = useState(0);
  const [pulseRight, setPulseRight] = useState(false);
  const slotCount = 4;

  // CONFIG: gap (px) between Y-axis boxes and graph start (rocket & curve)
  const axisGap = 20;

  // Y-axis animated display max (interpolated)
  const yDisplayMaxRef = useRef(Math.max(2, Math.ceil(maxSeenRef.current * 5) / 5));
  const lastDrawTsRef = useRef(performance.now());

  // X-axis label swap state (for left->right slide)
  const [displaySlots, setDisplaySlots] = useState([2, 4, 6, 8]); // what's currently shown
  const [swapping, setSwapping] = useState(false);
  const swapTimeoutRef = useRef(null);

  // build curve points
  const buildPoints = (startX, startY, endX, endY, totalPoints = 900) => {
    const arr = new Array(totalPoints + 1);
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const curveProgress = Math.sin(t * Math.PI - Math.PI / 2) * 0.5 + 0.5;
      const x = startX + (endX - startX) * t;
      const y = startY - (startY - endY) * curveProgress;
      arr[i] = { x, y, t, curveProgress };
    }
    pointsRef.current = { points: arr, w: endX - startX, h: startY - endY };
  };

  // draw canvas (uses yDisplayMaxRef to animate Y-axis)
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

    if (gameState === "waiting") {
      rocketEl.style.opacity = "0";
      return;
    }

    // paddings (visual layout)
    const leftPadding = 90; // base left padding (keeps space for Y boxes)
    const rightPadding = 36;
    const topPadding = 36;
    const bottomPadding = 56;

    // startX is the left edge of the graph area (we shift it right by axisGap)
    const startX = leftPadding + axisGap;
    const startY = cssH - bottomPadding;
    const endX = cssW - rightPadding;
    const endY = topPadding;

    // Build points if geometry changed
    if (
      !pointsRef.current.points.length ||
      pointsRef.current.w !== endX - startX ||
      pointsRef.current.h !== startY - endY
    ) {
      buildPoints(startX, startY, endX, endY, 900);
    }
    const points = pointsRef.current.points;

    if (multiplier > maxSeenRef.current) maxSeenRef.current = multiplier * 1.25;
    const maxMultiplier = Math.max(2, maxSeenRef.current);

    // smoothing displayMultiplier
    const displayMultiplier = Math.max(1, displayMultiplierRef.current);

    // ====== PANEL / BORDER behind Y axis boxes ======
    const leftBoxX = 8; // Y boxes remain at the left area (unchanged)
    const boxW = 48;
    const boxH = 28;
    const panelPad = 8;
    const panelX = leftBoxX - panelPad;
    const panelWidth = boxW + panelPad * 2;
    const panelTop = endY - 8;
    const panelBottom = startY + 8;
    const panelRadius = 12;

    // draw panel spine/background
    ctx.save();
    roundRectPath(ctx, panelX, panelTop, panelWidth, panelBottom - panelTop, panelRadius);
    ctx.fillStyle = "transparent";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "transparent";
    ctx.stroke();
    ctx.restore();

    const spineX = panelX + panelWidth / 2;
    ctx.beginPath();
    ctx.strokeStyle = "#282A2F"; // y axis border
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.moveTo(spineX, panelTop + 12);
    ctx.lineTo(spineX, panelBottom - 12);
    ctx.stroke();

    // ====== Y boxes (draw over panel) ======
    const ySteps = 6;
    const targetRoundedMax = Math.max(2, Math.ceil(maxMultiplier * 5) / 5);

    // compute dt to smoothly animate yDisplayMaxRef
    const now = performance.now();
    const dt = Math.min(0.06, (now - lastDrawTsRef.current) / 1000);
    lastDrawTsRef.current = now;
    // smoothing factor (higher -> faster animation)
    const smoothing = 12.0;
    yDisplayMaxRef.current = yDisplayMaxRef.current + (targetRoundedMax - yDisplayMaxRef.current) * (1 - Math.exp(-smoothing * dt));

    const yRange = yDisplayMaxRef.current - 1;
    const yStepValue = yRange / (ySteps - 1);
    ctx.font = "14px Inter, sans-serif";

    for (let i = 0; i < ySteps; i++) {
      const t = i / (ySteps - 1);
      const y = startY - t * (startY - endY);
      // animated numeric value
      const value = 1 + i * yStepValue;
      const labelText = `${value.toFixed(2)}x`; // more precision while animating
      const boxY = y - boxH / 2;

      // small vertical offset so new numbers appear dropping in (map difference -> offset)
      // compute how far targetRoundedMax is from current display max as fraction
      const maxDiff = Math.abs(targetRoundedMax - yDisplayMaxRef.current);
      // small easing offset for visual 'drop' (when display is changing)
      const dropOffset = (1 - Math.exp(-8 * dt)) * Math.sign(targetRoundedMax - yDisplayMaxRef.current) * 6;
      // when yDisplayMaxRef is moving upward, text slides up slightly; when moving downward, slides down.
      const visualBoxY = boxY + dropOffset;

      // draw box
      roundRectPath(ctx, leftBoxX, visualBoxY, boxW, boxH, 8);
      ctx.fillStyle = "#282a2f"; // y axis score box
      ctx.fill();

      // text
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(labelText, leftBoxX + boxW / 2, visualBoxY + boxH / 2);

      // connector from box to graph (alpha slightly depends on distance from center)
      const centerRatio = Math.abs(t - prevNormalizedRef.current) || 0.01;
      const alpha = Math.max(0.06, 0.12 - centerRatio * 0.12);
      ctx.strokeStyle = `transparent`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(leftBoxX + boxW + 6, visualBoxY + boxH / 2);
      ctx.lineTo(startX - 6, visualBoxY + boxH / 2);
      ctx.stroke();
    }

    // ====== X ticks (canvas guide) ======
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "13px Inter, sans-serif";
    for (let i = 0; i < slotCount; i++) {
      const posRatio = i / (slotCount - 1);
      const x = startX + posRatio * (endX - startX);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, startY - 6);
      ctx.lineTo(x, startY + 6);
      ctx.stroke();
    }

    // ====== CURVE & ROCKET ======
    const visibleMaxMultiplier = Math.max(2, maxMultiplier * 1.0);
    const normalizedRaw = Math.min(Math.max((displayMultiplier - 1) / (visibleMaxMultiplier - 1), 0), 1);
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

    // area fill
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    for (let i = 0; i <= idx0; i++) ctx.lineTo(points[i].x, points[i].y);
    if (frac > 0) ctx.lineTo(rocketX, rocketY);
    ctx.lineTo(rocketX, startY);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, endY, 0, startY);
    ctx.shadowColor = "rgba(255,153,0,0.25)";
    ctx.fillStyle = grad;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.shadowBlur = 0;

    // stroke curve
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ffffff";
    for (let i = 0; i <= idx0; i++) {
      const p = points[i];
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    if (frac > 0) ctx.lineTo(rocketX, rocketY);
    ctx.stroke();

    // end dot
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(rocketX, rocketY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#ff9900";
    ctx.arc(rocketX, rocketY, 3, 0, Math.PI * 2);
    ctx.fill();

    // rocket transform (angle using lookahead)
    const lookaheadIndex = Math.min(totalPoints, Math.floor(fi + 3));
    const lookahead = points[lookaheadIndex];
    const dx = lookahead.x - rocketX;
    const dy = lookahead.y - rocketY;
    const rocketAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    rocketEl.style.opacity = "1";
    rocketEl.style.left = `${rocketX}px`;
    rocketEl.style.top = `${rocketY}px`;
    rocketEl.style.transform = `translate(-50%, -50%) rotate(${rocketAngle}deg)`;

    // center text
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#ffffff"; // Score Color
    ctx.font = "bold 64px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${displayMultiplierRef.current.toFixed(2)}x`, cssW / 2, cssH / 2 - 10);
    ctx.shadowBlur = 0;
    ctx.font = "bold 16px Inter, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)"; // Score Text Color
    ctx.fillText(`Current payout`, cssW / 2, cssH / 2 + 30);
  };

  // RAF loop
  useEffect(() => {
    let lastTs = performance.now();
    const step = (ts) => {
      const dt = Math.min(0.06, (ts - lastTs) / 1000);
      lastTs = ts;

      if (multiplier > maxSeenRef.current) maxSeenRef.current = multiplier * 1.25;

      // smoothing for multiplier
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
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
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
      } catch (e) {}
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
        } catch (e) {}
      } else {
        window.removeEventListener("resize", onResize);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowLength]);

  // Manage timer and DOM windowIndex for animated labels
  useEffect(() => {
    let tickId = null;
    if (gameState === "running") {
      if (!startTimestampRef.current) startTimestampRef.current = performance.now();
      // update elapsed frequently for smooth timer & to compute windowIndex
      tickId = setInterval(() => {
        const now = performance.now();
        const elapsedSec = Math.max(0, (now - startTimestampRef.current) / 1000);
        setElapsed(elapsedSec);
        const newWindowIndex = Math.floor(elapsedSec / windowLength);
        // when window index increases -> trigger pulse and update
        setWindowIndex((prev) => {
          if (newWindowIndex > prev) {
            setPulseRight(true);
            // clear pulse after 400ms
            setTimeout(() => setPulseRight(false), 400);
            return newWindowIndex;
          }
          return prev;
        });
      }, 100); // update every 100ms
    } else if (gameState === "waiting") {
      // reset
      startTimestampRef.current = null;
      setElapsed(0);
      setWindowIndex(0);
      setPulseRight(false);
      prevNormalizedRef.current = 0;
      displayMultiplierRef.current = multiplier;
    } else if (gameState === "crashed") {
      // snapshot final
      displayMultiplierRef.current = multiplier;
    }

    return () => {
      if (tickId) clearInterval(tickId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, windowLength, multiplier]);

  // build label numbers from windowIndex
  const computeSlotsFromWindowIndex = (wi) => {
    if (wi === 0) {
      return [2, 4, 6, 8];
    } else {
      const base = wi * windowLength;
      return [base, base + 2, base + 4, base + 6];
    }
  };

  // When windowIndex changes, trigger a swap animation for X labels (left->right)
  useEffect(() => {
    const nextSlots = computeSlotsFromWindowIndex(windowIndex);
    // if identical, nothing to do
    const same =
      displaySlots.length === nextSlots.length &&
      displaySlots.every((v, i) => v === nextSlots[i]);
    if (same) return;

    // start swap: mark swapping so current labels can animate out
    setSwapping(true);
    // after short out animation we set new labels which animate in from left
    if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current);
    swapTimeoutRef.current = setTimeout(() => {
      setDisplaySlots(nextSlots);
      // allow in-animation to finish then clear swapping
      const finishDelay = 320; // match CSS transition
      setTimeout(() => setSwapping(false), finishDelay);
    }, 180); // small delay for out-animation
  }, [windowIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // overlay label positions (we position them with CSS using canvas bounding rect)
  const [labelRects, setLabelRects] = useState(null);
  const labelContainerRef = useRef(null);

  // compute label positions whenever canvas resizes or windowLength changes
  useEffect(() => {
    const container = labelContainerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    // NOTE: keep consistent with draw() logic:
    const leftPadding = 64;
    const startX = leftPadding + axisGap; // same startX used by draw()
    const rightPadding = 36;
    const endX = rect.width - rightPadding;
    const arr = [];
    for (let i = 0; i < slotCount; i++) {
      const posRatio = i / (slotCount - 1);
      const x = startX + posRatio * (endX - startX);
      arr.push(x);
    }
    setLabelRects({ rect, xs: arr, y: rect.height - 56 + 12 }); // y under axis (canvas code used bottomPadding=56)
  }, [windowLength, slotCount, multiplier, axisGap]);

  // small CSS for animation/pulse and x-label slide (left->right)
  const style = (
    <style>{`
      .x-labels { position: absolute; left:0; top:0; pointer-events:none; width:100%; height:100%; }
      .x-label { position:absolute; transform:translate(-50%,0); color:#fff; font-weight:700; transition: transform 300ms ease, opacity 300ms ease; opacity:1; }
      /* Outgoing labels slide right and fade */
      .x-label.out { transform: translate(calc(-50% + 18px), -6px); opacity:0; }
      /* Incoming labels start slightly left and slide into place */
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

  // compute current slots for render (we render displaySlots; while swapping we add out/in classes)
  const renderSlots = displaySlots;

  return (
    <div className="relative w-full h-[520px] bg-card rounded-lg overflow-hidden">
      {style}
      <div
        ref={labelContainerRef}
        className="x-labels"
        aria-hidden
        style={{ display: gameState === "waiting" ? "none" : "block" }}
      >
        {labelRects &&
          renderSlots.map((s, i) => {
            const left = labelRects.xs[i];
            const top = labelRects.y;
            const isRight = i === slotCount - 1;

            // decide classes:
            const classNames = ["x-label"];
            if (swapping) {
              const computed = computeSlotsFromWindowIndex(windowIndex);
              // if computed slot matches current value -> it's incoming (it will have 'in') otherwise outgoing
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
                  top,
                  color: "#fff",
                  fontSize: 13,
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                {s}s
              </div>
            );
          })}
      </div>

      {/* canvas + rocket */}
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div
        ref={rocketRef}
        className="absolute pointer-events-none transition-opacity duration-200 left-0 top-0"
        style={{ opacity: 0, filter: "drop-shadow(0 0 10px #FF9D02)" }}
      >
        {gameState === "crashed" ? (
          <img src={rocketExplosion} alt="rocket" width={100} height={100} className="rotate-[47deg]" />
        ) : (
          <img src={rocket} alt="rocket" width={88} height={88} className="rotate-[47deg]" />
        )}
      </div>
    </div>
  );
};

export default CrashGraph;
