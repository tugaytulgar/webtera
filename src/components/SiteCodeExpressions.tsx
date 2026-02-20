"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CODE_WORDS = ["else", "type", "()", "from", "const", "=>", "return", "async", "import", "if", "{}", "[]", "export", "function", "await", "try", "catch"];

const MAX_EXPRESSIONS = 12;
const FADE_DURATION_MS = 800;
const VISIBLE_MS = 2200;
const THROTTLE_MS = 180;

type Expression = { id: number; x: number; y: number; text: string };

export default function SiteCodeExpressions() {
  const [expressions, setExpressions] = useState<Expression[]>([]);
  const idRef = useRef(0);
  const lastMoveRef = useRef(0);

  const addAt = useCallback((clientX: number, clientY: number) => {
    const now = Date.now();
    if (now - lastMoveRef.current < THROTTLE_MS) return;
    lastMoveRef.current = now;

    setExpressions((prev) => {
      if (prev.length >= MAX_EXPRESSIONS) return prev;
      const id = ++idRef.current;
      const offsetX = (id % 7 - 3) * 24;
      const offsetY = (id % 5 - 2) * 20;
      const text = CODE_WORDS[id % CODE_WORDS.length];
      const next = [...prev, { id, x: clientX + offsetX, y: clientY + offsetY, text }];
      setTimeout(() => {
        setExpressions((p) => p.filter((e) => e.id !== id));
      }, VISIBLE_MS + FADE_DURATION_MS);
      return next;
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const handleMouseMove = (e: MouseEvent) => addAt(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) addAt(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [addAt]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[25] overflow-hidden"
      aria-hidden
    >
      {expressions.map(({ id, x, y, text }) => (
        <span
          key={id}
          className="fixed font-mono text-xs tracking-wider text-cyan-400/50"
          style={{
            left: x,
            top: y,
            transform: "translate(-50%, -50%)",
            textShadow: "0 0 8px rgba(34, 211, 238, 0.2)",
            opacity: 0,
            animation: `code-expr-fade ${FADE_DURATION_MS}ms ease-out forwards, code-expr-fadeout 400ms ease-in ${VISIBLE_MS}ms forwards`,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
