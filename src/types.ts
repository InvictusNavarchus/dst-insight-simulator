export interface SkillNode {
  id: string; // unique node id e.g. "wilson_torch_long_1"
  name: string;
  description: string;
  category: string; // e.g. "Torch"
  prerequisites: string[]; // parent node IDs
  requiredSkillsCount?: {
    category?: string; // category filter (empty means any)
    count: number;
  };
  conflictNodes?: string[]; // IDs of nodes that conflict (e.g. Shadow vs Lunar affinity)
  additionalReqs?: string; // text description of custom game requirements (like bosses)
}

export interface SkillCategory {
  name: string;
  description: string;
  icon?: string; // lucide icon name
}

export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  quote: string;
  avatar: string; // url or custom display emoji/symbol
  color: {
    primary: string; // tailwind blue-500, etc.
    border: string;
    bg: string;
    glow: string;
    accent: string;
  };
  categories: SkillCategory[];
  skills: SkillNode[];
  layout?: {
    // Custom grid structure or columns/branches mapping for rendering
    columns: {
      title: string;
      skills: string[][]; // Array of columns, each column is a vertical sequence of skill IDs
    }[];
  };
}

export interface SavedBuild {
  id: string;
  name: string;
  characterId: string;
  skillIds: string[];
  createdAt: string;
}
