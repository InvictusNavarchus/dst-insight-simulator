import React, { useState } from "react";
import { SkillNode, Character } from "../types";
import { 
  Lock, Check, Info, Flame, Sparkles, AlertCircle, Compass, 
  Shield, Swords, Music, Users, Crown, Eye
} from "lucide-react";

interface SkillTreeGridProps {
  character: Character;
  allocatedSkillIds: string[];
  onToggleSkill: (skillId: string, errorCallback: (msg: string) => void) => void;
}

// Map categories to helpful decorative icons and colors to emulate the game's visuals
const getSkillCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "torch":
      return <Flame className="w-5 h-5 text-orange-400" />;
    case "alchemy":
      return <Sparkles className="w-5 h-5 text-rose-400" />;
    case "beard":
      return <Compass className="w-5 h-5 text-amber-500" />;
    case "lighter":
      return <Flame className="w-5 h-5 text-orange-500" />;
    case "bernie":
      return <Shield className="w-5 h-5 text-red-400" />;
    case "chores":
      return <Compass className="w-5 h-5 text-amber-600" />;
    case "training":
      return <Swords className="w-5 h-5 text-yellow-500" />;
    case "might":
      return <Crown className="w-5 h-5 text-red-500" />;
    case "curse":
      return <Eye className="w-5 h-5 text-teal-400" />;
    case "lumberjack":
      return <Compass className="w-5 h-5 text-sky-500" />;
    case "mystic":
      return <Shield className="w-5 h-5 text-purple-400" />;
    case "arsenal":
      return <Swords className="w-5 h-5 text-pink-400" />;
    case "rider":
      return <Compass className="w-5 h-5 text-yellow-600" />;
    case "headliner":
      return <Music className="w-5 h-5 text-amber-400" />;
    case "starting":
      return <Sparkles className="w-5 h-5 text-emerald-400" />;
    case "bloom":
      return <Flame className="w-5 h-5 text-green-400" />;
    case "crafting":
      return <Compass className="w-5 h-5 text-green-500" />;
    case "mushrooms":
      return <Sparkles className="w-5 h-5 text-teal-400" />;
    case "shelf 1":
      return <Shield className="w-5 h-5 text-teal-300" />;
    case "shelf 2":
      return <Swords className="w-5 h-5 text-teal-400" />;
    case "shelf 3":
      return <Crown className="w-5 h-5 text-teal-500" />;
    case "ambhibian":
    case "amphibian":
      return <Compass className="w-5 h-5 text-emerald-400" />;
    case "crafts":
      return <Compass className="w-5 h-5 text-emerald-500" />;
    case "merm king":
      return <Crown className="w-5 h-5 text-emerald-300" />;
    case "nice":
      return <Users className="w-5 h-5 text-purple-400" />;
    case "naughty":
      return <Flame className="w-5 h-5 text-red-400" />;
    case "neutral":
      return <Music className="w-5 h-5 text-neutral-400" />;
    case "soothe":
      return <Shield className="w-5 h-5 text-slate-300" />;
    case "urge":
      return <Swords className="w-5 h-5 text-slate-400" />;
    case "sisturn":
      return <Music className="w-5 h-5 text-indigo-300" />;
    case "pipspook":
      return <Users className="w-5 h-5 text-purple-300" />;
    case "elixirs":
      return <Sparkles className="w-5 h-5 text-amber-300" />;
    case "affinity":
      return <Crown className="w-5 h-5 text-amber-500" />;
    default:
      return <Sparkles className="w-5 h-5 text-amber-400" />;
  }
};

export const SkillTreeGrid: React.FC<SkillTreeGridProps> = ({
  character,
  allocatedSkillIds,
  onToggleSkill,
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const triggerAlert = (msg: string) => {
    setAlertMessage(msg);
    // Auto clear alert
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  };

  const isSkillAllocated = (id: string) => allocatedSkillIds.includes(id);

  // Check if prerequisites are fully satisfied for a skill
  const isPrereqsSatisfied = (node: SkillNode) => {
    // 1. Direct parent prerequisites check
    if (node.prerequisites.length > 0) {
      const allParentAllocated = node.prerequisites.every((pid) =>
        allocatedSkillIds.includes(pid)
      );
      if (!allParentAllocated) return false;
    }

    // 2. Count threshold requirement (e.g. must unlock at least 6 skills below)
    if (node.requiredSkillsCount) {
      let count = 0;
      if (node.requiredSkillsCount.category) {
        // filter by category
        count = allocatedSkillIds.filter((id) => {
          const s = character.skills.find((skill) => skill.id === id);
          return s?.category === node.requiredSkillsCount?.category;
        }).length;
      } else {
        // total count
        count = allocatedSkillIds.length;
      }

      if (count < node.requiredSkillsCount.count) {
        return false;
      }
    }

    // 3. Conflicts check (Lunar vs Shadow cannot occupy together)
    if (node.conflictNodes && node.conflictNodes.length > 0) {
      const hasConflict = node.conflictNodes.some((cid) =>
        allocatedSkillIds.includes(cid)
      );
      if (hasConflict) return false;
    }

    return true;
  };

  const handleNodeClick = (skill: SkillNode) => {
    onToggleSkill(skill.id, triggerAlert);
  };

  // Generate CSS styles for characters to support their distinctive moods
  const accentTheme = character.color;

  return (
    <div className="flex flex-col gap-6" id="skill-tree-grid-workspace">
      {/* Dynamic validation warnings panel */}
      {alertMessage && (
        <div className="bg-red-950/80 border border-red-700/60 p-3 rounded-lg flex items-center gap-2 text-xs text-red-200 animate-slide-in shadow-lg" id="alert-banner">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span className="font-serif leading-relaxed">{alertMessage}</span>
        </div>
      )}

      {/* Main Grid mapping of categorized columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {character.layout?.columns.map((column, colIdx) => (
          <div
            key={colIdx}
            className="bg-neutral-950/40 border border-neutral-900 rounded-xl p-5 relative overflow-hidden flex flex-col gap-5 min-h-[350px]"
            id={`skill-column-${colIdx}`}
          >
            {/* Column accent ribbon */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${accentTheme.primary} to-transparent opacity-80`}></div>

            <h3 className="font-serif text-sm font-medium uppercase tracking-wider text-amber-500/80 text-center pb-2 border-b border-neutral-900 border-dashed">
              {column.title}
            </h3>

            {/* Render vertical tracks of connected circles inside col */}
            <div className="flex flex-nowrap justify-center gap-4 relative py-4 overflow-x-auto">
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current opacity-30">
                {/* SVG link lines drawn back-to-front between nodes */}
              </svg>

              {column.skills.map((track, trackIdx) => (
                <div key={trackIdx} className="flex flex-col items-center gap-4 relative z-10 w-24">
                  {track.map((skillId, rowIdx) => {
                    const skill = character.skills.find((s) => s.id === skillId);
                    if (!skill) return null;

                    const active = isSkillAllocated(skillId);
                    const satisfies = isPrereqsSatisfied(skill);
                    const isHovered = hoveredSkill?.id === skillId;

                    return (
                      <div
                        key={skillId}
                        className="relative flex flex-col items-center"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {/* Connecting Line to next node downwards if present */}
                        {rowIdx < track.length - 1 && (
                          <div
                            className={`absolute top-12 w-0.5 h-6 transition-all -z-10 ${
                              isSkillAllocated(track[rowIdx + 1])
                                ? `bg-${accentTheme.primary} shadow-[0_0_8px_#f59e0b]`
                                : "bg-neutral-800"
                            }`}
                          ></div>
                        )}

                        {/* Interactive Node Button slot */}
                        <button
                          onClick={() => handleNodeClick(skill)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative ${
                            active
                              ? `bg-amber-950/40 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]`
                              : satisfies
                              ? "bg-neutral-900 border-neutral-600 hover:border-amber-600 cursor-pointer"
                              : "bg-neutral-950 border-neutral-800 text-neutral-600 cursor-pointer relative group"
                          }`}
                          id={`node-btn-${skillId}`}
                        >
                          {/* Inner decoration matching character's visual */}
                          {getSkillCategoryIcon(skill.category)}

                          {/* Level badge lock indicator */}
                          {!satisfies && (
                            <div className="absolute -top-1 -right-1 bg-neutral-900 border border-neutral-700/50 p-0.5 rounded-full z-20">
                              <Lock className="w-2.5 h-2.5 text-neutral-500" />
                            </div>
                          )}

                          {active && (
                            <div className="absolute -top-1 -right-1 bg-amber-500 p-0.5 rounded-full z-20 shadow">
                              <Check className="w-2.5 h-2.5 text-neutral-950 stroke-[3px]" />
                            </div>
                          )}
                        </button>

                        {/* Quick label display under the circle */}
                        <span className={`text-[10px] text-center font-serif mt-1 max-w-[80px] line-clamp-2 select-none tracking-tight leading-relaxed ${
                          active ? "text-amber-300 font-medium" : satisfies ? "text-neutral-400" : "text-neutral-600"
                        }`}>
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Detailed Inspection Card */}
      <div 
        className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-2xl transition-all h-fit"
        id="skill-details-inspector"
      >
        {hoveredSkill ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3 mb-3">
              <div>
                <span className={`text-[10px] font-mono uppercase bg-neutral-950 border border-neutral-800/80 px-2 py-0.5 rounded ${character.color.accent}`}>
                  {hoveredSkill.category} Subtree
                </span>
                <h4 className="text-lg font-serif text-amber-100 mt-1">{hoveredSkill.name}</h4>
              </div>
              <div className="text-right">
                <span className={`text-xs font-serif ${isSkillAllocated(hoveredSkill.id) ? "text-amber-400 font-medium" : isPrereqsSatisfied(hoveredSkill) ? "text-green-400" : "text-red-400 flex items-center gap-1 justify-end"}`}>
                  {!isPrereqsSatisfied(hoveredSkill) && <Lock className="w-3 h-3" />}
                  {isSkillAllocated(hoveredSkill.id) ? "Active Skill" : isPrereqsSatisfied(hoveredSkill) ? "Unlockable" : "Locked"}
                </span>
              </div>
            </div>

            <p className="text-sm font-serif text-neutral-300 leading-relaxed mb-4">
              "{hoveredSkill.description}"
            </p>

            {/* Prerequisites and conditions */}
            <div className="space-y-2 text-xs font-serif pt-2 border-t border-neutral-800/50">
              {hoveredSkill.prerequisites.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 font-medium">Requires Parent:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {hoveredSkill.prerequisites.map((pid) => {
                      const par = character.skills.find((s) => s.id === pid);
                      return (
                        <span
                          key={pid}
                          className={`px-1.5 py-0.5 rounded text-[10px] border ${
                            isSkillAllocated(pid)
                              ? "bg-amber-950/30 border-amber-600/30 text-amber-300"
                              : "bg-neutral-950 border-neutral-800 text-neutral-400"
                          }`}
                        >
                          {par?.name || pid}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {hoveredSkill.requiredSkillsCount && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 font-medium">Shelf Requirement:</span>
                  <span className="text-amber-300/90 font-mono">
                    Must unlock at least {hoveredSkill.requiredSkillsCount.count} skills{" "}
                    {hoveredSkill.requiredSkillsCount.category ? `in ${hoveredSkill.requiredSkillsCount.category}` : "overall"} first.
                  </span>
                </div>
              )}

              {hoveredSkill.conflictNodes && (
                <div className="flex items-center gap-2">
                  <span className="text-red-400/90 font-medium">Affinity Conflict:</span>
                  <span className="text-neutral-400">
                    Cannot be taken alongside {hoveredSkill.conflictNodes.map(cid => {
                      const c = character.skills.find(s => s.id === cid);
                      return c?.name || cid;
                    }).join(", ")}.
                  </span>
                </div>
              )}

              {hoveredSkill.additionalReqs && (
                <div className="flex items-center gap-2 text-amber-500">
                  <span className="text-neutral-500 font-medium">Defeat Target:</span>
                  <span className="italic">{hoveredSkill.additionalReqs}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-neutral-500 font-serif flex flex-col items-center justify-center gap-2 min-h-[141px]">
            <Info className="w-6 h-6 text-neutral-600" />
            <p className="text-xs">Hover over any skill node in the columns above to inspect description, game formulas, and requirements.</p>
          </div>
        )}
      </div>
    </div>
  );
};
