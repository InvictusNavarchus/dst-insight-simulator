import React, { useState } from "react";
import { Copy, Share2, RotateCcw, Sparkles } from "lucide-react";

interface CelestialPortalHUDProps {
  allocatedCount: number;
  maxInsight: number;
  onReset: () => void;
  characterName: string;
  onShare: () => void;
  onImport: (code: string) => void;
}

// Map Insight Points to Survival Days based on Don't Starve Together wiki table
export const getSurvivalDays = (points: number): { days: number; total: number } => {
  const daysMap = [0, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
  const totalDaysMap = [0, 3, 6, 10, 14, 18, 23, 28, 33, 38, 43, 48, 53, 58, 63, 68];

  const safePoints = Math.min(Math.max(0, points), 15);
  return {
    days: daysMap[safePoints] || 0,
    total: totalDaysMap[safePoints] || 0,
  };
};

export const CelestialPortalHUD: React.FC<CelestialPortalHUDProps> = ({
  allocatedCount,
  maxInsight,
  onReset,
  characterName,
  onShare,
  onImport,
}) => {
  const [importCode, setImportCode] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importFeedback, setImportFeedback] = useState("");

  const survival = getSurvivalDays(allocatedCount);

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importCode.trim()) return;

    try {
      onImport(importCode.trim());
      setImportCode("");
      setShowImport(false);
      setImportFeedback("Build imported successfully!");
      setTimeout(() => setImportFeedback(""), 3000);
    } catch (err) {
      setImportFeedback("Invalid Build Code! Try copying again.");
      setTimeout(() => setImportFeedback(""), 3000);
    }
  };

  return (
    <div className="bg-neutral-900/90 border border-amber-900/50 rounded-xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden" id="celestial-portal-hud">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-600/60"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-600/60"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-600/60"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-600/60"></div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase text-amber-500 tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Celestial Portal HUD
            </span>
          </div>
          <h2 className="text-2xl font-serif text-amber-100 flex items-center gap-2 tracking-tight">
            <span>{characterName}'s Build</span>
            <span className="text-xs px-2.5 py-0.5 bg-amber-950/80 border border-amber-600/30 text-amber-400 font-mono rounded-full uppercase tracking-wider">
              {allocatedCount === maxInsight ? "Completed" : "In Progress"}
            </span>
          </h2>
          <p className="text-xs text-neutral-400 font-serif mt-1">
            Persists automatically to client slots. Spend your survival points wisely.
          </p>
        </div>

        {/* Insight Remaining Indicator */}
        <div className="flex items-center justify-center py-2 px-6 bg-gradient-to-r from-amber-950/40 via-amber-950/65 to-amber-950/40 border border-amber-700/35 rounded-xl min-w-[200px]" id="insight-display-badge">
          <div className="text-center">
            <div className="text-xs font-serif uppercase tracking-widest text-amber-400/80">Insight Remaining</div>
            <div className="text-3xl font-serif font-semibold text-amber-100 flex items-center justify-center gap-1">
              <span>{maxInsight - allocatedCount}</span>
              <span className="text-lg text-neutral-500 font-normal">/ {maxInsight}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* reset button */}
          <button
            onClick={onReset}
            disabled={allocatedCount === 0}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-serif transition-colors ${
              allocatedCount > 0
                ? "bg-amber-950/40 border-amber-600/40 hover:bg-amber-900/40 hover:border-amber-500 text-amber-100"
                : "bg-neutral-950/20 border-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
            title="Reset active skills using simulated Moon Rock Idol"
            id="btn-reset-build"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Offer Moon Idol</span>
          </button>

          {/* share build */}
          <button
            onClick={onShare}
            disabled={allocatedCount === 0}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-serif transition-colors ${
              allocatedCount > 0
                ? "bg-amber-600 hover:bg-amber-500 border-amber-500 text-neutral-950 font-medium"
                : "bg-neutral-950/20 border-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
            title="Create shareable build code string"
            id="btn-share-build"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Code</span>
          </button>

          {/* import button */}
          <button
            onClick={() => {
              setShowImport(!showImport);
              setImportFeedback("");
            }}
            className="px-3.5 py-2 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600 text-neutral-300 rounded-lg text-sm font-serif transition-colors"
            id="btn-toggle-import"
          >
            Import
          </button>
        </div>
      </div>

      {/* Import dropdown drawer */}
      {showImport && (
        <form onSubmit={handleImportSubmit} className="mt-4 pt-4 border-t border-neutral-800 flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-mono text-neutral-400 mb-1 uppercase tracking-wider">
              Paste Build Code String:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. DST_BUILD:wilson:wilson_torch_long_1,wilson_torch_long_2"
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-600/50 focus:outline-none rounded-lg px-3 py-1.5 text-xs text-amber-200 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-1.5 bg-amber-950 border border-amber-700 hover:bg-amber-900 text-amber-200 rounded-lg text-xs font-serif h-fit transition-colors"
          >
            Apply Code
          </button>
        </form>
      )}

      {/* Feedback banner */}
      {importFeedback && (
        <div className="mt-3 px-3 py-1.5 rounded-lg text-xs font-serif bg-amber-950/50 border border-amber-600/40 text-amber-300 text-center animate-fade-in">
          {importFeedback}
        </div>
      )}

      {/* Survival estimate info bar */}
      <div className="mt-4 pt-4 border-t border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-serif">
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>
            Survival Estimation: <strong className="text-amber-300">{survival.total} days</strong> survived in a game session
            ({allocatedCount} of {maxInsight} points achieved).
          </span>
        </div>
        <div className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">
          Max allocation cost: 15 Points after 68 Days
        </div>
      </div>
    </div>
  );
};
