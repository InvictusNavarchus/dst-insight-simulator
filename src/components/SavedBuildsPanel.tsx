import React, { useState } from "react";
import { Save, Trash2, History, RotateCcw, AlertCircle } from "lucide-react";
import { SavedBuild } from "../types";

interface SavedBuildsPanelProps {
  characterId: string;
  activeSkillIds: string[];
  onLoadBuild: (skillIds: string[]) => void;
}

export const SavedBuildsPanel: React.FC<SavedBuildsPanelProps> = ({
  characterId,
  activeSkillIds,
  onLoadBuild,
}) => {
  const [builds, setBuilds] = useState<SavedBuild[]>(() => {
    try {
      const stored = localStorage.getItem("dst_sim_builds");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [newBuildName, setNewBuildName] = useState("");
  const [errorText, setErrorText] = useState("");

  const characterBuilds = builds.filter((b) => b.characterId === characterId);

  const saveBuild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBuildName.trim()) return;

    if (activeSkillIds.length === 0) {
      setErrorText("Cannot save an empty build! Allocate some skills first.");
      setTimeout(() => setErrorText(""), 3000);
      return;
    }

    const newBuild: SavedBuild = {
      id: `${characterId}_${Date.now()}`,
      name: newBuildName.trim(),
      characterId,
      skillIds: [...activeSkillIds],
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [...builds, newBuild];
    setBuilds(updated);
    localStorage.setItem("dst_sim_builds", JSON.stringify(updated));
    setNewBuildName("");
  };

  const deleteBuild = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent loading when clicking trash
    const updated = builds.filter((b) => b.id !== id);
    setBuilds(updated);
    localStorage.setItem("dst_sim_builds", JSON.stringify(updated));
  };

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 shadow-xl" id="saved-builds-panel">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-4 h-4 text-amber-500" />
        <h3 className="font-serif text-lg text-neutral-200">Local Build Arsenal</h3>
      </div>

      <p className="text-xs text-neutral-400 font-serif mb-4 leading-relaxed">
        Capture your current allocation below to lock in the setup. Click any saved build to instantly restore it.
      </p>

      {/* Save build form */}
      <form onSubmit={saveBuild} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newBuildName}
          onChange={(e) => setNewBuildName(e.target.value)}
          maxLength={30}
          placeholder="Give your build a name... (e.g. Pyro Tank)"
          className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-amber-600/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-amber-200 font-serif"
          id="input-save-name"
        />
        <button
          type="submit"
          className="flex items-center gap-1.5 px-3 py-2 bg-amber-950/40 border border-amber-600/30 hover:bg-amber-900/40 text-amber-200 rounded-lg text-xs font-serif transition-colors"
          id="btn-save-submit"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Lock In</span>
        </button>
      </form>

      {errorText && (
        <div className="mb-4 text-xs font-serif text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{errorText}</span>
        </div>
      )}

      {/* Grid of builds */}
      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1" id="saved-presets-list">
        {characterBuilds.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-neutral-800 rounded-lg text-xs text-neutral-500 font-serif">
            No custom builds stored for this character yet.
          </div>
        ) : (
          characterBuilds.map((build) => (
            <div
              key={build.id}
              onClick={() => onLoadBuild(build.skillIds)}
              className="flex items-center justify-between p-3 bg-neutral-950/50 border border-neutral-800/60 hover:bg-amber-950/20 hover:border-amber-600/30 rounded-lg cursor-pointer transition-all group"
            >
              <div>
                <h4 className="text-sm font-serif text-amber-100 group-hover:text-amber-400 transition-colors">
                  {build.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono uppercase bg-neutral-900 text-amber-500 px-1.5 py-0.5 rounded border border-neutral-800">
                    {build.skillIds.length} Points Allocated
                  </span>
                  <span className="text-[10px] text-neutral-500 font-serif">{build.createdAt}</span>
                </div>
              </div>

              <button
                onClick={(e) => deleteBuild(build.id, e)}
                className="p-1.5 text-neutral-500 hover:text-red-400 rounded-md hover:bg-red-950/20 transition-colors"
                title="Discard Build"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
