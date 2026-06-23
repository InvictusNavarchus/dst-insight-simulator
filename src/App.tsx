import { useState, useEffect } from "react";
import { DST_CHARACTERS } from "./data";
import { Character, SavedBuild } from "./types";
import { CelestialPortalHUD } from "./components/CelestialPortalHUD";
import { SkillTreeGrid } from "./components/SkillTreeGrid";
import { SavedBuildsPanel } from "./components/SavedBuildsPanel";
import { 
  Sparkles, Shield, Swords, Users, Copy, Check, Info, Flame, AlertCircle, RefreshCw 
} from "lucide-react";

export default function App() {
  const [selectedCharId, setSelectedCharId] = useState<string>("wilson");
  const [allocatedSkillIds, setAllocatedSkillIds] = useState<string[]>([]);
  const [activePresetDesc, setActivePresetDesc] = useState<string>("");
  const [copyFeedback, setCopyFeedback] = useState<string>("");

  const activeCharacter = DST_CHARACTERS.find((c) => c.id === selectedCharId) || DST_CHARACTERS[0];

  // Auto load character build on swap if exists in current quick-session state
  useEffect(() => {
    const sessionKey = `dst_session_${selectedCharId}`;
    try {
      const stored = sessionStorage.getItem(sessionKey);
      if (stored) {
        setAllocatedSkillIds(JSON.parse(stored));
      } else {
        setAllocatedSkillIds([]);
      }
      setActivePresetDesc("");
    } catch {
      setAllocatedSkillIds([]);
    }
  }, [selectedCharId]);

  // Persist session skills on changes
  const updateAllocations = (newIds: string[]) => {
    setAllocatedSkillIds(newIds);
    try {
      sessionStorage.setItem(`dst_session_${selectedCharId}`, JSON.stringify(newIds));
    } catch {}
  };

  const handleToggleSkill = (skillId: string, errorCallback: (msg: string) => void) => {
    const isAllocated = allocatedSkillIds.includes(skillId);
    const skill = activeCharacter.skills.find(s => s.id === skillId);
    if (!skill) return;

    if (isAllocated) {
      // Deallocation Verification Rule
      // Verify no other active skill lists this node as a prerequisite
      const dependentSkills = activeCharacter.skills.filter(
        s => s.prerequisites.includes(skillId) && allocatedSkillIds.includes(s.id)
      );

      if (dependentSkills.length > 0) {
        errorCallback(
          `Deallocate Blocked! The following active skills depend on this: ${dependentSkills
            .map(d => d.name)
            .join(", ")}`
        );
        return;
      }

      const updated = allocatedSkillIds.filter(id => id !== skillId);
      updateAllocations(updated);
      setActivePresetDesc("");
    } else {
      // Allocation Verification Rules
      // 1. Max Limit
      if (allocatedSkillIds.length >= 15) {
        errorCallback("Maximum Points Allocated! You have spent all 15 Insight points. Offer Moon Idol to reset.");
        return;
      }

      // 2. Parent check
      if (skill.prerequisites.length > 0) {
        const parentsMet = skill.prerequisites.every(pid => allocatedSkillIds.includes(pid));
        if (!parentsMet) {
          errorCallback("Skill Locked! You must unlock previous prerequisite skills in this vertical track first.");
          return;
        }
      }

      // 3. Category threshold check (e.g. Winona Shelves)
      if (skill.requiredSkillsCount) {
        let count = 0;
        if (skill.requiredSkillsCount.category) {
          count = allocatedSkillIds.filter(id => {
            const s = activeCharacter.skills.find(sk => sk.id === id);
            return s?.category === skill.requiredSkillsCount?.category;
          }).length;
        } else {
          count = allocatedSkillIds.length;
        }

        if (count < skill.requiredSkillsCount.count) {
          errorCallback(
            `Threshold Locked! Must allocate at least ${skill.requiredSkillsCount.count} skills in ${
              skill.requiredSkillsCount.category || "any"
            } levels before unlocking this.`
          );
          return;
        }
      }

      // 4. Conflicts (Lunar vs Shadow Affinity)
      if (skill.conflictNodes && skill.conflictNodes.length > 0) {
        const conflictingNodes = skill.conflictNodes.filter(cid => allocatedSkillIds.includes(cid));
        if (conflictingNodes.length > 0) {
          const names = conflictingNodes
            .map(cid => activeCharacter.skills.find(s => s.id === cid)?.name || cid)
            .join(", ");
          errorCallback(
            `Alignment Conflict! You cannot choose this path while having [${names}] active.`
          );
          return;
        }
      }

      // Passed checks
      const updated = [...allocatedSkillIds, skillId];
      updateAllocations(updated);
      setActivePresetDesc("");
    }
  };

  const handleResetBuild = () => {
    updateAllocations([]);
    setActivePresetDesc("");
  };

  const handleShareBuild = () => {
    if (allocatedSkillIds.length === 0) return;
    const shareCode = `DST_BUILD:${activeCharacter.id}:${allocatedSkillIds.join(",")}`;
    
    try {
      navigator.clipboard.writeText(shareCode);
      setCopyFeedback("Build code copied to clipboard! Share it with other survivors.");
      setTimeout(() => setCopyFeedback(""), 4000);
    } catch {
      setCopyFeedback(`Could not auto-copy. Your code is: ${shareCode}`);
      setTimeout(() => setCopyFeedback(""), 8000);
    }
  };

  const handleImportBuild = (code: string) => {
    if (!code.startsWith("DST_BUILD:")) {
      throw new Error("Invalid format");
    }

    const parts = code.split(":");
    const charId = parts[1];
    const skillIdsString = parts[2];

    const targetChar = DST_CHARACTERS.find(c => c.id === charId);
    if (!targetChar) {
      throw new Error("Invalid character");
    }

    const skillIds = skillIdsString ? skillIdsString.split(",") : [];
    // verify skills belong to character
    const validSkillIds = skillIds.filter(id => targetChar.skills.some(s => s.id === id));

    setSelectedCharId(charId);
    // Directly set allocations
    setTimeout(() => {
      setAllocatedSkillIds(validSkillIds);
      try {
        sessionStorage.setItem(`dst_session_${charId}`, JSON.stringify(validSkillIds));
      } catch {}
    }, 100);
  };

  // Pre-configured custom character presets
  const applyPreset = (presetName: string, skills: string[], desc: string) => {
    setAllocatedSkillIds(skills);
    try {
      sessionStorage.setItem(`dst_session_${selectedCharId}`, JSON.stringify(skills));
    } catch {}
    setActivePresetDesc(desc);
  };

  const getCharPresets = (charId: string) => {
    switch (charId) {
      case "wilson":
        return [
          {
            name: "Gem Alchemist",
            desc: "Focuses entirely on deep alchemy, mastering Red, Blue, Purple, Yellow, Orange and Green Gem transmutations.",
            skills: ["wilson_transmutation", "wilson_gems_1", "wilson_gems_2", "wilson_gems_3"]
          },
          {
            name: "Scientific Torchthrower",
            desc: "Maximizes torch brilliance, range, longevity, and activates scientific throwing paths.",
            skills: ["wilson_torch_long_1", "wilson_torch_long_2", "wilson_torch_long_3", "wilson_torch_range_1", "wilson_torch_range_2", "wilson_torch_range_3", "wilson_torch_toss"]
          }
        ];
      case "willow":
        return [
          {
            name: "Bernie the Giant",
            desc: "Enhances Bernie's health, walking speed, drench/sanity limits, and fire combat damage.",
            skills: ["willow_patch_1", "willow_patch_2", "willow_sane_1", "willow_sane_2", "willow_accel_1", "willow_accel_2", "willow_hot_headed", "willow_stuffing_1", "willow_stuffing_2", "willow_burn_bernie"]
          },
          {
            name: "Ember Pyrokinetic",
            desc: "Collects Ethereal Embers to fuel spontaneous burning frenzies, fireballs, and area strikes.",
            skills: ["willow_burn_control", "willow_burn_dur", "willow_fire_fighter", "willow_hungry_light", "willow_ember_tender", "willow_combustion", "willow_fireball", "willow_frenzy"]
          }
        ];
      case "wolfgang":
        return [
          {
            name: "Planar Gladiator",
            desc: "Maximizes Mighty planar weapon scales, adding +25 flat physical strike damage during boss states.",
            skills: ["wolfgang_weapons_1", "wolfgang_weapons_2", "wolfgang_weapons_3", "wolfgang_weapons_4", "wolfgang_weapons_5", "wolfgang_mighty_1", "wolfgang_mighty_2", "wolfgang_mighty_3"]
          }
        ];
      case "woodie":
        return [
          {
            name: "Weremoose Brawler",
            desc: "Perfects the Weremoose, active fast slow-healing regeneration, impact defense, and third-strike planar punches.",
            skills: ["woodie_timer_1", "woodie_timer_2", "woodie_timer_3", "woodie_moose_1", "woodie_moose_2", "woodie_moose_3", "woodie_moose_master"]
          }
        ];
      case "wigfrid":
        return [
          {
            name: "Shield retaliator",
            desc: "Masters Elding electric strikes and round shield blocks to trigger colossal physical parry damage.",
            skills: ["wigfrid_spear_1", "wigfrid_spear_2", "wigfrid_elding", "wigfrid_shield", "wigfrid_shield_enh1", "wigfrid_shield_enh2", "wigfrid_mystic"]
          }
        ];
      case "wormwood":
        return [
          {
            name: "Carrat Commander",
            desc: "Transforms wild carrots into loyal Carrat armies and lightbugs to ward off shadow darkness.",
            skills: ["wormwood_seed", "wormwood_sapling", "wormwood_berry", "wormwood_juicy", "wormwood_monkey", "wormwood_cult_1", "wormwood_cult_2", "wormwood_cult_3"]
          }
        ];
      case "winona":
        return [
          {
            name: "The Artillery Specialist",
            desc: "Maximizes projectile firing rate, blast splat, and generator loading capacities.",
            skills: ["winona_portable", "winona_rapid_1", "winona_rapid_2", "winona_rapid_3", "winona_splash_1", "winona_splash_2", "winona_splash_3", "winona_gen_1"]
          }
        ];
      case "wurt":
        return [
          {
            name: "Swamp Sovereignty",
            desc: "Boosts road pace, frog friendliness, and recruits massive Royal guards directly.",
            skills: ["wurt_road", "wurt_frogs", "wurt_king", "wurt_guards", "wurt_merm_buff"]
          }
        ];
      case "wortox":
        return [
          {
            name: "Nice Healer Spec",
            desc: "Brings teammates along during hops, decreases item costs, and casts major team-wide heals.",
            skills: ["wortox_heal_1", "wortox_heal_2", "wortox_heal_3", "wortox_hop_party", "wortox_hop_eff_1", "wortox_hop_eff_2"]
          },
          {
            name: "Shadow Harvester",
            desc: "Gains souls from long distances, and releases combat souls to deal physical blast damage.",
            skills: ["wortox_combat_drop", "wortox_burst_1", "wortox_burst_2", "wortox_burst_3", "wortox_shadow_reap", "wortox_shadow_core"]
          }
        ];
      case "wendy":
        return [
          {
            name: "Guardian Sisterhood",
            desc: "Swaps Abigail to soothe state with +150 health armor boosts and protective domes.",
            skills: ["wendy_soothe", "wendy_gentle_1", "wendy_gentle_2", "wendy_gentle_3", "wendy_guard_shield", "wendy_sist_rememb", "wendy_sist_aura1"]
          }
        ];
      default:
        return [];
    }
  };

  const presets = getCharPresets(selectedCharId);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600"></div>

      {/* Styled Gothic Header Container */}
      <header className="py-8 bg-neutral-950 border-b border-neutral-900/80 px-6 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif text-amber-500 font-bold tracking-tight lowercase first-letter:uppercase flex items-center gap-3">
            <span>don't starve together</span>
            <span className="text-neutral-400 font-normal">|</span>
            <span className="text-neutral-200 font-mono text-xl tracking-normal">Insight Simulator</span>
          </h1>
          <p className="text-sm font-serif text-neutral-400 mt-2 max-w-xl leading-relaxed">
            Experiment with your survival characters, customize point allocation, and map high-tier Shadow/Lunar alignments. Designed for <strong>V15 point thresholds</strong>.
          </p>
        </div>

        {/* Global info metrics */}
        <div className="flex items-center gap-4 text-xs font-serif text-neutral-500" id="global-metrics-hud">
          <div className="px-3.5 py-1.5 bg-neutral-900/60 border border-neutral-800 rounded-lg">
            MAX POINTS: <strong className="text-amber-400">15</strong>
          </div>
          <div className="px-3.5 py-1.5 bg-neutral-900/60 border border-neutral-800 rounded-lg">
            SURVIVAL REQUIREMENTS: <strong className="text-amber-400">68 DAYS</strong>
          </div>
        </div>
      </header>

      {/* Main interactive area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left side: Character Selection and Stats/Bio */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6" id="sidebar-panel">
          {/* Character Selector Slider Card */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 shadow-lg">
            <h3 className="font-serif text-amber-500 font-medium text-sm uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Select Character
            </h3>
            
            {/* Grid of character choices */}
            <div className="grid grid-cols-5 gap-3" id="character-selector-grid">
              {DST_CHARACTERS.map((char) => {
                const selected = char.id === selectedCharId;
                return (
                  <button
                    key={char.id}
                    onClick={() => {
                      setSelectedCharId(char.id);
                    }}
                    className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all duration-200 relative ${
                      selected
                        ? `bg-amber-950/40 border-2 border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]`
                        : "bg-neutral-950 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900"
                    }`}
                    title={`${char.name} - ${char.title}`}
                    id={`char-btn-${char.id}`}
                  >
                    <span>{char.avatar}</span>
                    {selected && (
                      <div className="absolute w-1 h-1 rounded-full bg-amber-500 bottom-1"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Character Bio Card with Custom Accent Backgrounds */}
          <div 
            className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 shadow-lg relative overflow-hidden transition-all duration-300"
            id="character-bio-card"
          >
            {/* Color thematic corner glow */}
            <div className={`absolute top-0 right-0 w-16 h-16 bg-${activeCharacter.color.primary}/10 rounded-full blur-xl`}></div>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{activeCharacter.avatar}</span>
              <div>
                <h3 className="text-xl font-serif text-amber-100">{activeCharacter.name}</h3>
                <span className="text-xs text-neutral-500 font-serif italic">{activeCharacter.title}</span>
              </div>
            </div>

            <p className="text-xs text-amber-500/90 font-serif italic border-l-2 border-amber-600/40 pl-3.5 my-3 py-1 bg-amber-950/10 rounded-r">
              "{activeCharacter.quote}"
            </p>

            <p className="text-xs text-neutral-400 font-serif leading-relaxed mb-4">
              {activeCharacter.description}
            </p>

            {/* Subtree Focus Summary list */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Subtree Specialties:</span>
              {activeCharacter.categories.map((cat, idx) => (
                <div key={idx} className="flex gap-2 items-start text-xs font-serif">
                  <span className={`w-1.5 h-1.5 rounded-full bg-${activeCharacter.color.primary} mt-1.5 shrink-0`}></span>
                  <div>
                    <strong className="text-neutral-300">{cat.name}:</strong>{" "}
                    <span className="text-neutral-400 text-[11px] leading-tight block">{cat.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved builds dashboard panel */}
          <SavedBuildsPanel
            characterId={selectedCharId}
            activeSkillIds={allocatedSkillIds}
            onLoadBuild={(skillIds) => setAllocatedSkillIds(skillIds)}
          />
        </div>

        {/* Center/Right side: Interactive Tree Canvas */}
        <div className="flex-1 flex flex-col gap-6" id="canvas-column">
          {/* Copy feedback alert strip if active */}
          {copyFeedback && (
            <div className="bg-amber-950/80 border border-amber-600 p-3 rounded-lg text-xs font-serif text-amber-200 flex items-center gap-2 animate-bounce">
              <Check className="w-5 h-5 text-amber-500 shrink-0" />
              <span>{copyFeedback}</span>
            </div>
          )}

          {/* Celestial Portal HUD */}
          <CelestialPortalHUD
            allocatedCount={allocatedSkillIds.length}
            maxInsight={15}
            onReset={handleResetBuild}
            characterName={activeCharacter.name}
            onShare={handleShareBuild}
            onImport={handleImportBuild}
          />

          {/* Quick Build Presets section */}
          {presets.length > 0 && (
            <div className="bg-neutral-900/60 border border-neutral-900 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="presets-panel">
              <div className="flex-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 block mb-1">
                  Drafting Blueprints
                </span>
                <p className="text-xs text-neutral-300 font-serif">
                  {activePresetDesc ? (
                    <span className="text-amber-300/90 italic">Active: {activePresetDesc}</span>
                  ) : (
                    "Load pre-configured DST playstyles for this character instantly:"
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-serif shrink-0">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(p.name, p.skills, p.desc)}
                    className="px-3 py-1.5 bg-neutral-950/80 border border-neutral-800 hover:border-amber-600 hover:bg-amber-950/20 text-neutral-400 hover:text-amber-300 rounded-lg transition-all"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Node Tree Canvas Grid */}
          <SkillTreeGrid
            character={activeCharacter}
            allocatedSkillIds={allocatedSkillIds}
            onToggleSkill={handleToggleSkill}
          />
        </div>
      </main>

      {/* Styled Footer */}
      <footer className="mt-12 py-6 border-t border-neutral-900 bg-neutral-950 text-center text-xs font-serif text-neutral-500 max-w-7xl mx-auto w-full">
        <p className="leading-relaxed">
          Don't Starve Together Insight Point Builder Simulator. Build V32-compliant.
        </p>
        <p className="text-[10px] font-mono uppercase tracking-widest mt-1 text-neutral-600">
          Created according to official wiki survival formulas & design reference graphics
        </p>
      </footer>
    </div>
  );
}

