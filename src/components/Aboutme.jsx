import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ashutosh from "../assets/ashutosh.jpeg";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FaLinkedin,
  FaEnvelope,
  FaGithub,
  FaFileDownload,
  FaCode,
  FaLightbulb,
  FaRocket,
  FaPlay,
  FaTerminal,
  FaBug,
  FaCoffee,
  FaStar,
  FaTrophy,
  FaGraduationCap,
  FaBriefcase,
  FaEye,
  FaMousePointer,
} from "react-icons/fa";

const styles = {
  sectionText:
    "text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent",
};

/* ------------------ Confetti (canvas constrained to targetRef) ------------------ */
/* Usage: <Confetti isActive={showPartyAnimation} targetRef={editorRef} /> */
/* If targetRef is missing or not attached, it falls back to document.body. */
const Confetti = ({ isActive, targetRef = null, duration = 3500 }) => {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const particlesRef = React.useRef([]);
  const startedRef = React.useRef(false);
  const containerId = "cg-confetti-canvas-root"; // used only for fallback body container

  // ensure container (either targetRef.current or body container) and canvas exist
  const ensureCanvas = () => {
    // prefer target element if present
    const targetEl = targetRef && targetRef.current ? targetRef.current : null;

    if (targetEl) {
      // if a canvas already present inside the target, reuse it
      let cv = targetEl.querySelector("canvas.cg-confetti-canvas");
      if (!cv) {
        cv = document.createElement("canvas");
        cv.className = "cg-confetti-canvas";
        Object.assign(cv.style, {
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2147483646, // make sure it's above content inside target
        });
        // ensure target is position: relative so absolute canvas positions correctly
        const prevPosition = window.getComputedStyle(targetEl).position;
        if (prevPosition === "static" || !prevPosition) {
          targetEl.style.position = "relative";
        }
        targetEl.appendChild(cv);
        console.log("[Confetti] canvas created inside targetRef");
      }
      canvasRef.current = cv;
      return { canvas: cv, container: targetEl };
    }

    // fallback: top-level fixed container on body
    if (canvasRef.current && document.body.contains(canvasRef.current))
      return { canvas: canvasRef.current, container: document.body };

    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      Object.assign(container.style, {
        position: "fixed",
        inset: "0px",
        pointerEvents: "none",
        zIndex: String(2147483646),
        overflow: "hidden",
      });
      document.body.appendChild(container);
      console.log("[Confetti] fallback container created on body");
    }

    let cv = container.querySelector("canvas.cg-confetti-canvas");
    if (!cv) {
      cv = document.createElement("canvas");
      cv.className = "cg-confetti-canvas";
      Object.assign(cv.style, {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      });
      container.appendChild(cv);
      console.log("[Confetti] fallback canvas created in body container");
    }

    canvasRef.current = cv;
    return { canvas: cv, container };
  };

  // create particles
  const createParticles = (w, h, count = 80) => {
    const colors = [
      "#60a5fa",
      "#a78bfa",
      "#f472b6",
      "#fbbf24",
      "#34d399",
      "#f87171",
      "#fb923c",
      "#c084fc",
    ];
    const particles = [];
    for (let i = 0; i < count; i++) {
      const size = 6 + Math.random() * 12;
      // start around top-third of container so it looks like popping from editor header
      const x = Math.random() * w;
      const y = Math.random() * (h * 0.25) - 40; // may start slightly above
      const vx = (Math.random() - 0.5) * 6;
      const vy = 1 + Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      const spin = (Math.random() - 0.5) * 0.2;
      const life = 0;
      const ttl = 1.6 + Math.random() * 1.2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = Math.random() > 0.5 ? "rect" : "circle";
      particles.push({
        x,
        y,
        vx,
        vy,
        size,
        angle,
        spin,
        life,
        ttl,
        color,
        shape,
      });
    }
    return particles;
  };

  // resize canvas for element rect and DPR
  const resizeCanvasToElement = (canvas, container) => {
    const dpr = window.devicePixelRatio || 1;
    // use container's inner size (clientWidth/clientHeight)
    const w = Math.max(
      1,
      Math.floor(container.clientWidth || window.innerWidth)
    );
    const h = Math.max(
      1,
      Math.floor(container.clientHeight || window.innerHeight)
    );
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w, h, ctx };
  };

  // animation loop
  const animate = (canvas, container, stopAt) => {
    const { w, h, ctx } = resizeCanvasToElement(canvas, container);
    let pList = particlesRef.current;

    const step = (ts) => {
      if (!startedRef.current) return;
      // in case container resized mid-animation, keep it updated
      const dims = resizeCanvasToElement(canvas, container);
      const cw = dims.w,
        ch = dims.h;
      ctx.clearRect(0, 0, cw, ch);

      for (let i = 0; i < pList.length; i++) {
        const p = pList[i];
        p.life += (ts - (p._lastTs || ts)) / 1000;
        p._lastTs = ts;

        p.vy += 0.05; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;

        const t = Math.min(1, p.life / p.ttl);
        const alpha = 1 - t;

        ctx.globalAlpha = alpha;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.shape === "rect") {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.85);
        } else {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        ctx.globalAlpha = 1;
      }

      particlesRef.current = pList.filter(
        (p) => p.life < p.ttl && p.y < ch + 200
      );
      pList = particlesRef.current;

      const now = performance.now();
      if (now < stopAt && particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        ctx.clearRect(0, 0, cw, ch);
        startedRef.current = false;
        console.log("[Confetti] animation finished inside target");
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  // start burst
  const startBurst = (msDuration = duration, count = 80) => {
    try {
      const { canvas, container } = ensureCanvas();
      if (!canvas || !container) return;
      const { w, h } = resizeCanvasToElement(canvas, container);
      // create particles relative to container size
      particlesRef.current = createParticles(w, h, count);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      startedRef.current = true;
      const stopAt = performance.now() + msDuration;
      console.log(
        "[Confetti] starting burst inside targetRef (or fallback)",
        particlesRef.current.length,
        "particles"
      );
      animate(canvas, container, stopAt);
    } catch (err) {
      console.error("[Confetti] startBurst error", err);
    }
  };

  // cleanup: keep canvas for reuse (avoid StrictMode thrash)
  useEffect(() => {
    return () => {
      try {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        startedRef.current = false;
        console.log("[Confetti] cleanup (canvas left for reuse)");
      } catch (e) {}
    };
  }, []);

  // trigger on isActive
  useEffect(() => {
    if (isActive) {
      startBurst(duration, 80);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return null;
};

/* ---------------- Robust Portal Suggestive Tooltip (measures itself & clamps) ---------------- */
const SuggestiveTooltip = ({ show, children, targetRef }) => {
  const [pos, setPos] = React.useState({ top: -9999, left: -9999 });
  const tooltipRef = React.useRef(null);

  useEffect(() => {
    if (!show || !targetRef?.current) return;

    const updatePosition = () => {
      const rect = targetRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      const tooltipWidth = tooltipEl ? tooltipEl.offsetWidth : 220; // fallback
      const tooltipHeight = tooltipEl ? tooltipEl.offsetHeight : 40;

      // prefer placing above
      let top = rect.top - tooltipHeight - 12;
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;

      // clamp horizontally within viewport
      const pad = 8;
      const maxLeft = window.innerWidth - tooltipWidth - pad;
      left = Math.max(pad, Math.min(left, maxLeft));

      // if not enough space above, place below the button
      if (top < 8) {
        top = rect.bottom + 12;
      }

      setPos({ top, left });
    };

    // initial
    updatePosition();

    // update on scroll/resize and capture ancestor scrolling
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    // Also track mutations that might change layout (safe small polling)
    const ro = new ResizeObserver(updatePosition);
    try {
      if (targetRef.current) ro.observe(targetRef.current);
    } catch (e) {
      /* ignore */
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      try {
        ro.disconnect();
      } catch (e) {}
    };
  }, [show, targetRef]);

  if (!show) return null;

  const tooltip = (
    <AnimatePresence>
      <motion.div
        ref={tooltipRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: `${pos.top}px`,
          left: `${pos.left}px`,
          transform: "translateX(0)", // already centered in left calc
          zIndex: 99999,
        }}
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.18 }}
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            className="px-3 py-2 rounded-xl shadow-lg whitespace-nowrap font-medium text-sm"
            style={{
              background:
                "linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(139,92,246,1) 100%)",
              color: "white",
              WebkitBackdropFilter: "blur(6px)",
              backdropFilter: "blur(6px)",
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <FaMousePointer className="animate-pulse" size={14} />
              {children}
            </div>
          </motion.div>

          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid rgba(139,92,246,1)",
              position: "absolute",
              bottom: -7,
              left: "50%",
              transform: "translateX(-50%)",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return ReactDOM.createPortal(tooltip, document.body);
};

/* ---------------------- Code Editor Typewriter Component ---------------------- */
const CodeEditorTypewriter = ({ isVisible, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  // hoverTooltip is only for hover; persistentTooltip will keep it until button click
  const [hoverTooltip, setHoverTooltip] = useState(false);
  const [persistentTooltip, setPersistentTooltip] = useState(false); // main change
  const [buttonState, setButtonState] = useState("compile"); // compile | compiling | view-resume
  const [showPartyAnimation, setShowPartyAnimation] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const buttonRef = React.useRef(null);
  const editorRef = React.useRef(null); // NEW: editor container ref for confetti

  const codeLines = [
    { text: "const ashutosh = {", indent: 0, delay: 100 },
    { text: "  name: 'Ashutosh Panda',", indent: 1, delay: 50 },
    { text: "  role: 'SWE Intern @ Nielsen',", indent: 1, delay: 50 },
    { text: "  location: 'Bangalore, India',", indent: 1, delay: 50 },
    {
      text: "  summary: 'CS student | 1800+ LeetCode Rating | 400+ problems solved | CGPA 9.10',",
      indent: 1,
      delay: 50,
    },
    { text: "", indent: 0, delay: 0 },

    {
      text: "  experience (@Nielsen): 'Built cross-browser Nielsen Netsight extension based Meter Product for analyzing user Media behaviours and delivering data insights for OTTs & broadcasters',",
      indent: 1,
      delay: 50,
    },
    {
      text: "  projects: ['Rule Engine AST', 'Anvesha Compiler', 'Car Listings System'],",
      indent: 1,
      delay: 50,
    },
    { text: "  patents: '4 (2 Published, 2 Granted)',", indent: 1, delay: 50 },
    {
      text: "  publication: 'IEEE ICRAIE 2022 – IoT Drug Dispensing',",
      indent: 1,
      delay: 50,
    },
    {
      text: "  achievements: ['Dean’s List', 'Top-20 SIH 2024', 'CBSE Nat. Sci. Challenge'],",
      indent: 1,
      delay: 50,
    },
    { text: "", indent: 0, delay: 0 },

    { text: "  skills: [", indent: 1, delay: 50 },
    {
      text: "    'Java', 'Python', 'C/C++', 'JavaScript', 'PL/SQL',",
      indent: 2,
      delay: 50,
    },
    {
      text: "    'React', 'Node.js', 'Express', 'Tailwind', 'Bootstrap',",
      indent: 2,
      delay: 50,
    },
    {
      text: "    'JWT', 'GSAP', 'Three.js', 'Chart.js', 'AWS'",
      indent: 2,
      delay: 50,
    },
    { text: "  ],", indent: 1, delay: 50 },

    {
      text: "  mindset: 'Clean Code | Fast Learner | Innovator'",
      indent: 1,
      delay: 50,
    },
    { text: "};", indent: 0, delay: 100 },
  ];

  useEffect(() => {
    if (!isVisible) return;
    const typingInterval = setInterval(() => {
      if (currentLineIndex < codeLines.length) {
        const currentLine = codeLines[currentLineIndex];
        if (currentCharIndex < currentLine.text.length) {
          setDisplayedText((prev) => prev + currentLine.text[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          if (currentLineIndex < codeLines.length - 1) {
            setDisplayedText((prev) => prev + "\n");
            setCurrentLineIndex((prev) => prev + 1);
            setCurrentCharIndex(0);
          } else {
            clearInterval(typingInterval);
            setIsTypingComplete(true);
            // Make tooltip persistent after typing completes (user asked it stays until they click)
            setPersistentTooltip(true);
            // no auto-hide anymore
            setTimeout(() => onComplete && onComplete(), 400); // keep previous behavior of calling onComplete soon
          }
        }
      }
    }, 25);
    return () => clearInterval(typingInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, currentLineIndex, currentCharIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(
      () => setShowCursor((prev) => !prev),
      500
    );
    return () => clearInterval(cursorInterval);
  }, []);

  // debug log when party flag changes
  useEffect(() => {
    console.log("[State] showPartyAnimation =", showPartyAnimation);
  }, [showPartyAnimation]);

  const handleCompile = () => {
    console.log("[Compile] clicked. buttonState:", buttonState);
    if (buttonState === "view-resume") {
      console.log("[Compile] opening resume link");
      window.open(
        "https://drive.google.com/file/d/1q8l7xumj5hBJn2u28C_1vmdEMaM30Z1P/view?usp=sharing",
        "_blank"
      );
      return;
    }

    // hide tooltip only when compile is initiated (user clicked)
    setHoverTooltip(false);
    setPersistentTooltip(false);

    setButtonState("compiling");
    setIsCompiling(true);
    setTerminalOutput([]);

    console.log("[Compile] starting compile simulation");

    const outputs = [
      "$ npm run compile",
      "Compiling ashutosh.js...",
      "✓ Syntax check passed",
      "✓ Type checking completed",
      "✓ Building resume module...",
      "✓ Optimizing performance metrics...",
      "✓ Generating portfolio assets...",
      "",
      "🎉 Build successful!",
      "📄 Resume ready for viewing",
    ];

    outputs.forEach((text, index) => {
      setTimeout(
        () => setTerminalOutput((prev) => [...prev, text]),
        index * 200
      );
    });

    setTimeout(() => {
      setIsCompiling(false);
      // trigger party inside editor
      console.log(
        "[Compile] compile finished - triggering party animation inside editor"
      );
      setShowPartyAnimation(true);
      setShowSparkles(true);

      setTimeout(() => {
        setButtonState("view-resume");
        setShowSparkles(false);
      }, 1500);

      // auto-hide party after 5s
      setTimeout(() => {
        console.log("[Compile] hiding party animation");
        setShowPartyAnimation(false);
      }, 5000);
    }, outputs.length * 200 + 500);
  };

  const getLineNumbering = () => displayedText.split("\n").map((_, i) => i + 1);

  // safe, single-pass tokenizer-based syntax highlighter
  const escapeHtml = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // colors (you can tweak hexes to match your theme)
  const COLORS = {
    keyword: "#a78bfa", // purple
    string: "#34d399", // green
    number: "#facc15", // yellow
    punct: "#60a5fa", // blue
    ident: "#d1d5db", // light gray (identifiers / plain text)
  };

  const highlightSyntax = (line) => {
    const tokenRe =
      /('(?:[^'\\]|\\.)*')|(\b(?:const|let|var|function|return|new)\b)|(\b\d+(?:\.\d+)?\b)|([{}\[\]\(\),:])|(\s+)|([^{}\[\]\(\),:'"\s]+)/g;

    let out = "";
    let m;
    while ((m = tokenRe.exec(line)) !== null) {
      if (m[1]) {
        out += `<span style="color:${COLORS.string}">${escapeHtml(
          m[1]
        )}</span>`;
      } else if (m[2]) {
        out += `<span style="color:${COLORS.keyword}">${escapeHtml(
          m[2]
        )}</span>`;
      } else if (m[3]) {
        out += `<span style="color:${COLORS.number}">${escapeHtml(
          m[3]
        )}</span>`;
      } else if (m[4]) {
        out += `<span style="color:${COLORS.punct}">${escapeHtml(m[4])}</span>`;
      } else if (m[5]) {
        out += escapeHtml(m[5]);
      } else if (m[6]) {
        out += `<span style="color:${COLORS.ident}">${escapeHtml(m[6])}</span>`;
      }
    }
    return out;
  };

  const getButtonContent = () => {
    switch (buttonState) {
      case "compile":
        return (
          <>
            {" "}
            <FaPlay size={10} /> Compile & Run
          </>
        );
      case "compiling":
        return (
          <>
            <motion.div
              className="w-3 h-3 border-2 border-black border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Compiling...
          </>
        );
      case "view-resume":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex items-center gap-2"
          >
            <FaEye size={12} /> View Resume
          </motion.div>
        );
      default:
        return null;
    }
  };

  const getButtonStyles = () => {
    switch (buttonState) {
      case "compile":
        return "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl";
      case "compiling":
        return "bg-yellow-500 text-black";
      case "view-resume":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl animate-pulse";
      default:
        return "";
    }
  };

  // combine hover vs persistent (persistent wins)
  const tooltipVisible =
    (persistentTooltip || hoverTooltip) && buttonState === "compile";

  return (
    <>
      {/* Confetti will draw inside editorRef now */}
      <Confetti
        isActive={showPartyAnimation}
        targetRef={editorRef}
        duration={3500}
      />

      <SuggestiveTooltip show={tooltipVisible} targetRef={buttonRef}>
        Click to compile and view my resume! 🚀
      </SuggestiveTooltip>

      <motion.div
        className="bg-[#1e1e2e] rounded-lg shadow-2xl border border-gray-700/50 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-[#2b2b3c] px-4 py-2 flex items-center justify-between border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-gray-400 text-xs font-mono flex items-center gap-2">
              <FaCode className="text-blue-400" /> ashutosh.js
            </div>
            <div className="text-gray-500 text-xs"></div>
          </div>

          {/* Action Buttons in Header */}
          <div className="flex items-center gap-2">
            <motion.button
              ref={buttonRef}
              onClick={handleCompile}
              disabled={!isTypingComplete || buttonState === "compiling"}
              className={`
                px-4 py-1.5 rounded text-xs font-semibold transition-all duration-300 flex items-center gap-2 relative overflow-hidden
                ${
                  !isTypingComplete
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : buttonState === "compiling"
                    ? "bg-yellow-500 text-black cursor-wait"
                    : "cursor-pointer"
                }
                ${getButtonStyles()}
              `}
              whileHover={
                isTypingComplete && buttonState !== "compiling"
                  ? { scale: 1.05 }
                  : {}
              }
              whileTap={
                isTypingComplete && buttonState !== "compiling"
                  ? { scale: 0.95 }
                  : {}
              }
              onMouseEnter={() => {
                // show tooltip on hover, but don't hide persistent tooltip when mouse leaves
                if (buttonState === "compile" && isTypingComplete) {
                  setHoverTooltip(true);
                }
              }}
              onMouseLeave={() => {
                setHoverTooltip(false);
              }}
            >
              {buttonState === "view-resume" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <div className="relative z-10 flex items-center gap-2">
                {getButtonContent()}
              </div>
            </motion.button>

            {!isTypingComplete && (
              <motion.div
                className="text-xs text-gray-400 px-3 py-1 bg-gray-700/50 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Writing code...
              </motion.div>
            )}
          </div>
        </div>

        {/* main editor area */}
        <div className="flex">
          <div className="bg-[#252526] w-12 flex flex-col items-center py-2 border-r border-gray-700/30">
            <div className="p-2 my-1 rounded cursor-pointer bg-gray-700/50 text-blue-400">
              <FaCode size={18} />
            </div>
            <div className="p-2 my-1 rounded cursor-pointer text-gray-500">
              <FaBug size={18} />
            </div>
            <div className="p-2 my-1 rounded cursor-pointer text-gray-500">
              <FaTerminal size={18} />
            </div>
          </div>

          {/* IMPORTANT: this wrapper will host the canvas */}
          <div ref={editorRef} className="flex-1 flex flex-col relative">
            <div className="flex flex-1">
              <div className="bg-[#1a1a2a] px-3 py-4 text-gray-500 text-sm font-mono select-none">
                {getLineNumbering().map((num) => (
                  <div key={num} className="leading-6 text-right">
                    {num}
                  </div>
                ))}
              </div>

              <div className="flex-1 px-4 py-4 font-mono text-sm">
                <div className="text-gray-300 leading-6 whitespace-pre-wrap">
                  {displayedText.split("\n").map((line, lineIdx) => (
                    <div key={lineIdx}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightSyntax(line),
                        }}
                      />
                      {lineIdx === displayedText.split("\n").length - 1 &&
                        showCursor &&
                        !isTypingComplete && (
                          <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-1" />
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {terminalOutput.length > 0 && (
              <motion.div
                className="bg-[#1a1a2a] border-t border-gray-700/30 p-4 max-h-32 overflow-y-auto"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs font-mono">
                  {terminalOutput.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={
                        line.includes("✓")
                          ? "text-green-400"
                          : line.includes("$")
                          ? "text-blue-400"
                          : line.includes("🎉")
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* status bar */}
        <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-4">
            <span>
              Ln {getLineNumbering().length}, Col{" "}
              {displayedText.split("\n").pop()?.length || 0}
            </span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center space-x-4">
            {isTypingComplete && (
              <motion.span
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Ready
              </motion.span>
            )}
            <span className="flex items-center gap-1">
              <FaCoffee /> Powered by Coffee
            </span>
            <span>JavaScript</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

/* ---------------- ProfessionalCard (moved buttons inside card) ---------------- */
const ProfessionalCard = ({
  socialLinks = [],
  showResumeButton = false,
  resumeLink = "",
}) => {
  const stats = [
    {
      icon: FaTrophy,
      label: "LeetCode Rating",
      value: "1800+",
      color: "text-yellow-400",
    },
    {
      icon: FaCode,
      label: "Problems Solved",
      value: "400+",
      color: "text-blue-400",
    },
    {
      icon: FaGraduationCap,
      label: "CGPA (scale of 10)",
      value: "9.10",
      color: "text-purple-400",
    },
    {
      icon: FaStar,
      label: "Patents Filed",
      value: "4",
      color: "text-green-400",
    },
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-[#1e1e2e] to-[#2b2b3c] rounded-2xl p-6 border border-gray-700/50 shadow-2xl"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="w-3 h-3 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-gray-400 text-sm">Currently Active</span>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">Ashutosh Panda</h3>
      <div className="flex items-center gap-2 mb-4">
        <FaBriefcase className="text-blue-400" size={14} />
        <p className="text-blue-400 text-sm">
          Software Engineer Intern @ Nielsen
        </p>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        Passionate about building scalable web applications and data pipelines.
        Always exploring new technologies and solving complex problems.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="bg-[#1a1a2a] p-3 rounded-lg"
            whileHover={{ scale: 1.05, backgroundColor: "#252536" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={s.color} size={16} />
              <span className="text-xs text-gray-400">{s.label}</span>
            </div>
            <div className="text-lg font-bold text-white">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* NEW: Social icons + View Resume button placed beautifully below the image */}
      <div className="pt-4 border-t border-gray-700/20">
        <div className="flex items-center justify-center gap-4 mb-3">
          {socialLinks.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={
                s.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="p-3 bg-[#161623] rounded-full border border-indigo-800/30 hover:scale-105 transform transition"
            >
              <s.icon className="text-white" size={18} />
            </a>
          ))}
        </div>

        {showResumeButton && (
          <div className="text-center">
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <FaFileDownload className="mr-2" /> View Resume
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ---------------------- AboutMe wrapper ---------------------- */
const AboutMe = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isCodeEditorVisible, setIsCodeEditorVisible] = useState(false);
  const [showResumeButton, setShowResumeButton] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8 },
    },
  };

  const socialLinks = [
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/ashutosh2004",
      label: "LinkedIn",
    },
    {
      icon: FaEnvelope,
      href: "mailto:ashutoshpanda.india@gmail.com",
      label: "Email",
    },
    {
      icon: FaGithub,
      href: "https://github.com/Ashutosh-Panda2004",
      label: "GitHub",
    },
  ];

  const highlights = [
    { icon: FaCode, text: "Clean Code Advocate" },
    { icon: FaLightbulb, text: "Innovative Thinker" },
    { icon: FaRocket, text: "Fast Learner" },
  ];

  useEffect(() => {
    const t = setTimeout(() => setIsCodeEditorVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleCompilationComplete = () =>
    setTimeout(() => setShowResumeButton(true), 1000);

  return (
    <>
      <motion.div
        className="relative bg-[#0a0a1f] py-16 px-4 md:px-20 lg:px-40 overflow-hidden"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.h2
              className={styles.sectionText}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              About Me
            </motion.h2>
            <motion.div
              className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <motion.div variants={imageVariants} className="relative group">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity }}
                />
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={ashutosh}
                    alt="Ashutosh"
                    className="relative w-full h-auto rounded-2xl shadow-2xl"
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </motion.div>
              </motion.div>

              {/* Pass socialLinks and resume props down to the card */}
              <ProfessionalCard
                socialLinks={socialLinks}
                showResumeButton={showResumeButton}
                resumeLink={
                  "https://drive.google.com/file/d/1q8l7xumj5hBJn2u28C_1vmdEMaM30Z1P/view?usp=sharing"
                }
              />
            </div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-4xl font-bold text-white mb-2">
                  Ashutosh Panda
                </h3>
                <motion.div
                  className="inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Software Engineer Intern at Nielsen
                  </span>
                </motion.div>
              </div>

              <motion.div className="flex flex-wrap gap-3">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-2 bg-[#1a1a3e]/50 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-800/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h.icon className="text-blue-400" size={16} />
                    <span className="text-sm text-gray-300">{h.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div>
                <CodeEditorTypewriter
                  isVisible={isCodeEditorVisible}
                  onComplete={handleCompilationComplete}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <div className="bg-[#0a0a1f] py-16" />
    </>
  );
};

export default AboutMe;
