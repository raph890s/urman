import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Scene {
  id: number;
  duration: number; // seconds
  bg: string;
  content: React.ReactNode;
}

const scenes: Scene[] = [
  {
    id: 1,
    duration: 5,
    bg: 'bg-[#DA291C]',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-white text-center px-8 space-y-6">
        <div className="text-[120px] leading-none font-black tracking-tighter text-[#FFC72C] drop-shadow-2xl animate-bounce">
          M
        </div>
        <h1 className="text-5xl font-black tracking-wide uppercase">
          I'm Lovin' It
        </h1>
        <p className="text-xl font-medium opacity-90">
          McDonald's — Making Every Moment Delicious
        </p>
      </div>
    ),
  },
  {
    id: 2,
    duration: 6,
    bg: 'bg-[#FFC72C]',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 space-y-8">
        <div className="text-8xl">🍔</div>
        <h2 className="text-5xl font-black text-[#DA291C] uppercase tracking-tight leading-tight">
          The Legendary<br />Big Mac
        </h2>
        <p className="text-xl font-semibold text-gray-800 max-w-md">
          Two all-beef patties, special sauce, lettuce, cheese — a classic that never gets old.
        </p>
        <div className="bg-[#DA291C] text-white px-8 py-3 rounded-full text-lg font-bold tracking-wide shadow-xl">
          Available All Day
        </div>
      </div>
    ),
  },
  {
    id: 3,
    duration: 6,
    bg: 'bg-gradient-to-br from-[#DA291C] to-[#8B0000]',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-white text-center px-8 space-y-8">
        <div className="text-8xl">🍟</div>
        <h2 className="text-5xl font-black uppercase tracking-tight leading-tight">
          World-Famous<br />
          <span className="text-[#FFC72C]">Fries</span>
        </h2>
        <p className="text-xl font-medium opacity-90 max-w-md">
          Golden, crispy, perfectly salted. The fries that started it all.
        </p>
        <div className="flex gap-4">
          {['S', 'M', 'L'].map(size => (
            <div
              key={size}
              className="w-16 h-16 rounded-full bg-[#FFC72C] flex items-center justify-center text-[#DA291C] font-black text-xl shadow-lg"
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    duration: 6,
    bg: 'bg-[#27251F]',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-white text-center px-8 space-y-8">
        <div className="text-8xl">🍦</div>
        <h2 className="text-5xl font-black uppercase tracking-tight leading-tight">
          Soft Serve<br />
          <span className="text-[#FFC72C]">Perfection</span>
        </h2>
        <p className="text-xl font-medium opacity-80 max-w-md">
          Smooth, creamy, and perfectly sweet. The classic McFlurry and soft-serve cones you love.
        </p>
        <div className="flex gap-3">
          {['McFlurry', 'Cone', 'Sundae'].map(item => (
            <span
              key={item}
              className="px-4 py-2 border border-[#FFC72C] text-[#FFC72C] rounded-full text-sm font-semibold"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    duration: 6,
    bg: 'bg-gradient-to-b from-[#FFC72C] to-[#FF8C00]',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 space-y-8">
        <div className="text-8xl">☕</div>
        <h2 className="text-5xl font-black text-[#DA291C] uppercase tracking-tight leading-tight">
          Start Your<br />Morning Right
        </h2>
        <p className="text-xl font-semibold text-gray-800 max-w-md">
          McCafé — premium coffee to fuel your day, every day.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          {['Espresso', 'Latte', 'Cappuccino'].map(drink => (
            <div key={drink} className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-2xl mb-1">☕</div>
              <div className="text-xs font-bold text-gray-800">{drink}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 6,
    duration: 6,
    bg: 'bg-[#DA291C]',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-white text-center px-8 space-y-8">
        <div className="text-8xl">📱</div>
        <h2 className="text-5xl font-black uppercase tracking-tight leading-tight">
          Order on the<br />
          <span className="text-[#FFC72C]">App</span>
        </h2>
        <p className="text-xl font-medium opacity-90 max-w-md">
          Exclusive deals, easy ordering, and earn points on every visit with MyMcDonald's Rewards.
        </p>
        <div className="flex gap-4">
          <div className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl">
            🍎 App Store
          </div>
          <div className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl">
            ▶ Google Play
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    duration: 7,
    bg: 'bg-gradient-to-br from-[#FFC72C] via-[#DA291C] to-[#8B0000]',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-white text-center px-8 space-y-8">
        <div className="text-[100px] leading-none font-black text-white drop-shadow-2xl">
          M
        </div>
        <h2 className="text-5xl font-black uppercase tracking-tight">
          McDonald's
        </h2>
        <p className="text-2xl font-bold text-[#FFC72C] tracking-widest uppercase">
          I'm Lovin' It
        </p>
        <p className="text-base opacity-80 max-w-sm">
          Serving smiles since 1955. Come as you are.
        </p>
        <div className="flex gap-6 text-3xl mt-4">
          🍔 🍟 🥤 🍦 ☕
        </div>
      </div>
    ),
  },
];

const TOTAL_DURATION = scenes.reduce((sum, s) => sum + s.duration, 0);

export default function McDonaldsMarketingVideo() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine current scene from elapsed time
  const currentSceneIndex = (() => {
    let acc = 0;
    for (let i = 0; i < scenes.length; i++) {
      acc += scenes[i].duration;
      if (elapsed < acc) return i;
    }
    return scenes.length - 1;
  })();

  const currentScene = scenes[currentSceneIndex];

  // Progress within current scene
  const sceneStart = scenes
    .slice(0, currentSceneIndex)
    .reduce((sum, s) => sum + s.duration, 0);
  const sceneProgress =
    ((elapsed - sceneStart) / currentScene.duration) * 100;

  // Global progress %
  const globalProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setElapsed(prev => {
          if (prev >= TOTAL_DURATION) {
            setPlaying(false);
            return TOTAL_DURATION;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const handlePlayPause = () => {
    if (elapsed >= TOTAL_DURATION) {
      setElapsed(0);
    }
    setPlaying(prev => !prev);
  };

  const handleReset = () => {
    setPlaying(false);
    setElapsed(0);
  };

  const handlePrevScene = () => {
    const prevStart = scenes
      .slice(0, Math.max(0, currentSceneIndex - 1))
      .reduce((sum, s) => sum + s.duration, 0);
    setElapsed(prevStart);
  };

  const handleNextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      const nextStart = scenes
        .slice(0, currentSceneIndex + 1)
        .reduce((sum, s) => sum + s.duration, 0);
      setElapsed(nextStart);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElapsed(parseFloat(e.target.value));
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout currentPage="mcdo-video">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#DA291C] flex items-center justify-center text-[#FFC72C] font-black text-lg">
                M
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                McDonald's Marketing Video
              </h1>
            </div>
            <p className="text-muted-foreground">
              Animated brand video — {scenes.length} scenes · {formatTime(TOTAL_DURATION)} total
            </p>
          </div>

          {/* Video Player */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
            {/* Screen */}
            <div
              className={cn(
                'relative w-full aspect-video transition-colors duration-700',
                currentScene.bg
              )}
            >
              {/* Scene content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {currentScene.content}
              </div>

              {/* Scene progress bar at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-white/80 transition-all duration-100"
                  style={{ width: `${sceneProgress}%` }}
                />
              </div>

              {/* Scene indicator chips */}
              <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 px-4">
                {scenes.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const start = scenes
                        .slice(0, i)
                        .reduce((sum, sc) => sum + sc.duration, 0);
                      setElapsed(start);
                    }}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === currentSceneIndex
                        ? 'bg-white w-6'
                        : i < currentSceneIndex
                        ? 'bg-white/60 w-3'
                        : 'bg-white/30 w-3'
                    )}
                  />
                ))}
              </div>

              {/* Scene label */}
              <div className="absolute bottom-16 left-4">
                <span className="bg-black/40 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium">
                  Scene {currentSceneIndex + 1} / {scenes.length}
                </span>
              </div>

              {/* Click to play/pause overlay */}
              {!playing && elapsed < TOTAL_DURATION && (
                <button
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors group"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-9 h-9 text-[#DA291C] ml-1" />
                  </div>
                </button>
              )}
              {elapsed >= TOTAL_DURATION && (
                <button
                  onClick={handleReset}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <div className="text-center text-white space-y-4">
                    <div className="text-6xl">🎬</div>
                    <p className="text-xl font-bold">Video Complete</p>
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center mx-auto hover:scale-110 transition-transform">
                      <RotateCcw className="w-7 h-7 text-[#DA291C]" />
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Controls bar */}
            <div className="bg-gray-900 px-4 py-3 space-y-3">
              {/* Timeline */}
              <div className="flex items-center gap-3">
                <span className="text-white/60 text-xs font-mono w-10 text-right">
                  {formatTime(elapsed)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={TOTAL_DURATION}
                  step={0.1}
                  value={elapsed}
                  onChange={handleSeek}
                  className="flex-1 accent-[#FFC72C] cursor-pointer"
                />
                <span className="text-white/60 text-xs font-mono w-10">
                  {formatTime(TOTAL_DURATION)}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevScene}
                    disabled={currentSceneIndex === 0}
                    className="text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  <Button
                    size="sm"
                    onClick={handlePlayPause}
                    className="bg-[#FFC72C] hover:bg-[#FFB300] text-black font-bold px-5 gap-2"
                  >
                    {playing ? (
                      <><Pause className="w-4 h-4" /> Pause</>
                    ) : (
                      <><Play className="w-4 h-4" /> {elapsed >= TOTAL_DURATION ? 'Replay' : 'Play'}</>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextScene}
                    disabled={currentSceneIndex === scenes.length - 1}
                    className="text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    className="text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  {/* Progress pill */}
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-[#FFC72C] transition-all duration-100"
                        style={{ width: `${globalProgress}%` }}
                      />
                    </div>
                    <span className="text-white/60 text-xs">{Math.round(globalProgress)}%</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMuted(m => !m)}
                    className="text-white hover:bg-white/10"
                  >
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Scene List */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Scenes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {scenes.map((scene, i) => {
                const start = scenes
                  .slice(0, i)
                  .reduce((sum, s) => sum + s.duration, 0);
                const isActive = i === currentSceneIndex;
                const isWatched = elapsed > start + scene.duration;

                return (
                  <button
                    key={scene.id}
                    onClick={() => setElapsed(start)}
                    className={cn(
                      'relative rounded-xl overflow-hidden border-2 transition-all duration-200 text-left group',
                      isActive
                        ? 'border-[#DA291C] shadow-lg scale-[1.02]'
                        : 'border-border hover:border-[#DA291C]/50 hover:shadow-md'
                    )}
                  >
                    {/* Mini scene preview */}
                    <div
                      className={cn(
                        'aspect-video flex items-center justify-center text-3xl',
                        scene.bg
                      )}
                    >
                      {isWatched && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                            ✓
                          </div>
                        </div>
                      )}
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                            {playing ? (
                              <Pause className="w-3 h-3 text-[#DA291C]" />
                            ) : (
                              <Play className="w-3 h-3 text-[#DA291C] ml-0.5" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-card">
                      <p className="text-xs font-semibold text-foreground">
                        Scene {i + 1}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {scene.duration}s
                      </p>
                    </div>
                    {/* Active indicator line */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DA291C]">
                        <div
                          className="h-full bg-[#FFC72C] transition-all duration-100"
                          style={{ width: `${sceneProgress}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Total Scenes', value: scenes.length },
              { label: 'Duration', value: formatTime(TOTAL_DURATION) },
              { label: 'Format', value: '16:9 HD' },
            ].map(stat => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="text-2xl font-black text-[#DA291C]">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
