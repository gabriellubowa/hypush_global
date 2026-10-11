import { CELL, NOT_FOUND_LEVELS } from "../../data/notFoundLevels";
import {
  INITIAL_LEVEL,
  cloneGrid,
  findCell,
  gravityDest,
  rotateGrid,
  type Dir,
  type Grid,
  type Pos,
} from "../../lib/notFound/gameLogic";
import styles from "./NotFoundGame.module.css";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Phase = "intro" | "playing" | "victory" | "outro";

const INTRO_MS = 2600;

function cellClass(
  value: number,
  r: number,
  c: number,
  player: Pos,
  exit: Pos,
  hidePlayer: boolean,
): string {
  const parts = [styles.cell];
  if (value === CELL.WALL) parts.push(styles.wall);
  if (exit.r === r && exit.c === c) parts.push(styles.exit);
  if (player.r === r && player.c === c && value === CELL.PLAYER) {
    parts.push(styles.player);
    if (hidePlayer) parts.push(styles.playerHidden);
  }
  return parts.join(" ");
}

export const NotFoundGame = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const fallGhostRef = useRef<HTMLDivElement>(null);
  const fallGen = useRef(0);
  const pendingDir = useRef<Dir | null>(null);
  const gridRef = useRef<Grid>(INITIAL_LEVEL.grid);

  const [levelIndex, setLevelIndex] = useState<number>(INITIAL_LEVEL.index);
  const [grid, setGrid] = useState<Grid>(INITIAL_LEVEL.grid);
  const [player, setPlayer] = useState<Pos>(INITIAL_LEVEL.player);
  const [exit, setExit] = useState<Pos>(INITIAL_LEVEL.exit);
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const [angle, setAngle] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [playerHidden, setPlayerHidden] = useState(false);

  const level = NOT_FOUND_LEVELS[levelIndex];
  const size = grid.length;

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const dismissIntro = useCallback(() => {
    setPhase((current) => (current === "intro" ? "playing" : current));
  }, []);

  useEffect(() => {
    if (phase !== "intro") return;
    const timer = window.setTimeout(dismissIntro, INTRO_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dismissIntro();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [dismissIntro, phase]);

  const loadLevel = useCallback((index: number) => {
    const next = NOT_FOUND_LEVELS[index];
    const nextGrid = cloneGrid(next);
    fallGen.current += 1;
    if (fallGhostRef.current) fallGhostRef.current.hidden = true;
    setLevelIndex(index);
    setGrid(nextGrid);
    gridRef.current = nextGrid;
    setPlayer(findCell(nextGrid, CELL.PLAYER));
    setExit(findCell(nextGrid, CELL.EXIT));
    setMoves(0);
    setBusy(false);
    setAngle(0);
    setRotating(false);
    setPlayerHidden(false);
    pendingDir.current = null;
    setPhase("playing");
  }, []);

  const finishTurn = useCallback(
    (nextPlayer: Pos, nextExit: Pos) => {
      setBusy(false);
      if (nextPlayer.r === nextExit.r && nextPlayer.c === nextExit.c) {
        if (levelIndex >= NOT_FOUND_LEVELS.length - 1) setPhase("outro");
        else setPhase("victory");
      }
    },
    [levelIndex],
  );

  const runGravity = useCallback(
    (nextGrid: Grid, nextPlayer: Pos, nextExit: Pos) => {
      const destR = gravityDest(nextGrid, nextPlayer);
      if (destR === nextPlayer.r) {
        setGrid(nextGrid);
        gridRef.current = nextGrid;
        setPlayer(nextPlayer);
        setExit(nextExit);
        finishTurn(nextPlayer, nextExit);
        return;
      }

      const working = nextGrid.map((row) => row.slice() as typeof row);
      if (working[nextPlayer.r][nextPlayer.c] !== CELL.EXIT) {
        working[nextPlayer.r][nextPlayer.c] = CELL.EMPTY;
      }
      working[nextExit.r][nextExit.c] = CELL.EXIT;
      setGrid(working);
      gridRef.current = working;
      setPlayer(nextPlayer);
      setExit(nextExit);

      const board = boardRef.current;
      const ghost = fallGhostRef.current;
      if (!board || !ghost) {
        working[destR][nextPlayer.c] = CELL.PLAYER;
        const landed = { r: destR, c: nextPlayer.c };
        setGrid(working);
        gridRef.current = working;
        setPlayer(landed);
        finishTurn(landed, nextExit);
        return;
      }

      const cellSize = board.clientWidth / size;
      const startY = nextPlayer.r * cellSize;
      const endY = destR * cellSize;
      const dist = destR - nextPlayer.r;
      const totalMs = Math.min(80 + dist * 38, 420);
      const gen = ++fallGen.current;

      setPlayerHidden(true);
      ghost.hidden = false;
      ghost.style.width = `${cellSize}px`;
      ghost.style.height = `${cellSize}px`;
      ghost.style.transform = `translate3d(${nextPlayer.c * cellSize}px, ${startY}px, 0)`;

      let startTs: number | null = null;
      const step = (ts: number) => {
        if (fallGen.current !== gen) return;
        if (startTs === null) startTs = ts;
        const t = Math.min((ts - startTs) / totalMs, 1);
        const eased = t * t * t;
        const y = startY + (endY - startY) * eased;
        ghost.style.transform = `translate3d(${nextPlayer.c * cellSize}px, ${y}px, 0)`;

        if (t < 1) {
          requestAnimationFrame(step);
          return;
        }

        ghost.hidden = true;
        working[destR][nextPlayer.c] = CELL.PLAYER;
        const landed = { r: destR, c: nextPlayer.c };
        const settled = working.map((row) => row.slice() as typeof row);
        setPlayerHidden(false);
        setGrid(settled);
        gridRef.current = settled;
        setPlayer(landed);
        finishTurn(landed, nextExit);
      };

      requestAnimationFrame(step);
    },
    [finishTurn, size],
  );

  const rotate = useCallback(
    (dir: Dir) => {
      if (busy || phase !== "playing") return;
      setBusy(true);
      setMoves((n) => n + 1);
      pendingDir.current = dir;
      setRotating(true);
      setAngle(dir === "right" ? 90 : -90);
    },
    [busy, phase],
  );

  const onRotateEnd = useCallback(() => {
    if (!pendingDir.current) return;
    const dir = pendingDir.current;
    pendingDir.current = null;
    setRotating(false);
    setAngle(0);
    const rotated = rotateGrid(gridRef.current, dir);
    runGravity(rotated.grid, rotated.player, rotated.exit);
  }, [runGravity]);

  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        rotate("left");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        rotate("right");
      } else if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        loadLevel(levelIndex);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, rotate, loadLevel, levelIndex]);

  const victoryCopy = useMemo(() => {
    const plural = moves === 1 ? "" : "s";
    return moves <= level.par
      ? `Your score: ${moves} move${plural} · Perfect.`
      : `Your score: ${moves} move${plural} · Par is ${level.par}.`;
  }, [level.par, moves]);

  const boardStyle = useMemo(
    () =>
      ({
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        transform: `rotate(${angle}deg)`,
      }) as React.CSSProperties,
    [size, angle],
  );

  const canPlay = phase === "playing" && !busy;

  return (
    <div className={styles.shell}>
      <div
        className={`${styles.textOverlay} ${phase === "intro" ? styles.textOverlayVisible : ""}`}
        aria-hidden={phase !== "intro"}
      >
        <p className={styles.introLine}>You&apos;ve stepped outside the intended release plan.</p>
        <p className={`${styles.introLine} ${styles.introLineMuted}`}>
          Rotate the board. Let it fall. Find the exit.
        </p>
        <button type="button" className={styles.skipIntro} onClick={dismissIntro}>
          Skip intro
        </button>
      </div>

      <div
        className={`${styles.textOverlay} ${phase === "outro" ? styles.textOverlayVisible : ""}`}
        aria-hidden={phase !== "outro"}
      >
        <p className={styles.introLine}>Exit found.</p>
        <p className={`${styles.introLine} ${styles.introLineMuted}`}>
          You&apos;re back on the intended track.
        </p>
        <p className={styles.introLine}>
          The path back is open.{" "}
          <Link className={styles.introLink} href="/">
            Head home
          </Link>
        </p>
      </div>

      <div className={styles.core} aria-hidden={phase === "intro" || phase === "outro"}>
        <div className={styles.header}>
          <span className={styles.score}>Moves: {moves}</span>
          <span className={styles.title}>404</span>
          <span className={styles.level}>{level.label}</span>
        </div>

        <div className={styles.boardFrame}>
          <div
            ref={boardRef}
            className={`${styles.board} ${rotating ? styles.boardRotating : ""}`}
            style={boardStyle}
            onTransitionEnd={(event) => {
              if (event.propertyName === "transform" && rotating) onRotateEnd();
            }}
          >
            {grid.map((row, r) =>
              row.map((value, c) => (
                <div
                  key={`${r}-${c}`}
                  className={cellClass(value, r, c, player, exit, playerHidden)}
                />
              )),
            )}
            <div ref={fallGhostRef} className={styles.fallGhost} hidden />
          </div>

          <div
            className={`${styles.overlay} ${phase === "victory" ? styles.overlayVisible : ""}`}
          >
            <h2 className={styles.victoryTitle}>Level complete</h2>
            <p className={styles.victoryMsg}>{victoryCopy}</p>
            <button type="button" className={styles.btn} onClick={() => loadLevel(levelIndex + 1)}>
              Next level →
            </button>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.btn}
            disabled={!canPlay}
            onClick={() => rotate("left")}
          >
            ← Left
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            disabled={phase !== "playing" && phase !== "victory"}
            onClick={() => loadLevel(levelIndex)}
          >
            Restart
          </button>
          <button
            type="button"
            className={styles.btn}
            disabled={!canPlay}
            onClick={() => rotate("right")}
          >
            Right →
          </button>
        </div>

        <div className={styles.homeRow}>
          <Link className={styles.homeLink} href="/">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};
