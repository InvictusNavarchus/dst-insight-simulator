import { Character } from "./types";

export const DST_CHARACTERS: Character[] = [
  {
    id: "wilson",
    name: "Wilson",
    title: "The Gentleman Scientist",
    quote: "With science on my side, anything is possible!",
    description: "Wilson is the classic DST character. His skill tree revolves around enhancing torches, transmuting various ores, gems, and materials, and upgrading his iconic beard to provide unmatched survival utility.",
    avatar: "🧪",
    color: {
      primary: "rose-600",
      border: "rose-800",
      bg: "bg-rose-950/20",
      glow: "rose-500/30",
      accent: "text-rose-400"
    },
    categories: [
      { name: "Torch", description: "Enhance torch duration, light radius, and gain the ability to throw torches scientifically." },
      { name: "Alchemy", description: "Learn to transmute materials like logs to twigs, nitre to gold, and gems to different colors." },
      { name: "Beard", description: "Faster beard growth, storage of food in the beard, and enhanced thermal insulation." },
      { name: "Affinity", description: "Align with either the Shadow Queen or the Cryptic Founder to unlock hidden transmutations." }
    ],
    skills: [
      // Torch
      { id: "wilson_torch_long_1", name: "Torch Longevity I", description: "Torches last a little longer (15%).", category: "Torch", prerequisites: [] },
      { id: "wilson_torch_long_2", name: "Torch Longevity II", description: "Torches last a fair amount longer (30%).", category: "Torch", prerequisites: ["wilson_torch_long_1"] },
      { id: "wilson_torch_long_3", name: "Torch Longevity III", description: "Torches last a lot longer (50%).", category: "Torch", prerequisites: ["wilson_torch_long_2"] },
      { id: "wilson_torch_range_1", name: "Torch Range I", description: "Torches are a little brighter.", category: "Torch", prerequisites: [] },
      { id: "wilson_torch_range_2", name: "Torch Range II", description: "Torches are a fair amount brighter.", category: "Torch", prerequisites: ["wilson_torch_range_1"] },
      { id: "wilson_torch_range_3", name: "Torch Range III", description: "Torches are a lot brighter.", category: "Torch", prerequisites: ["wilson_torch_range_2"] },
      { id: "wilson_torch_toss", name: "Torch Toss", description: "Uses a scientifically formulated trajectory to always land right side up when thrown.", category: "Torch", prerequisites: [], requiredSkillsCount: { category: "Torch", count: 3 } },

      // Alchemy
      { id: "wilson_transmutation", name: "Transmutation", description: "Transform 3 Twigs into a Log. Transform a Log into 2 Twigs.", category: "Alchemy", prerequisites: [] },
      
      { id: "wilson_ore_1", name: "Transmute Ore I", description: "Transform 3 Rocks into a Flint. Transform 2 Flint into Rocks.", category: "Alchemy", prerequisites: ["wilson_transmutation"] },
      { id: "wilson_ore_2", name: "Transmute Ore II", description: "Transform 3 Nitre into a Gold Nugget. Transform 2 Gold Nuggets into Nitre.", category: "Alchemy", prerequisites: ["wilson_ore_1"] },
      { id: "wilson_ore_3", name: "Transmute Ore III", description: "Transform 2 Cut Stone into Marble, Marble to Cut Stone, and Marble to Moon Rock.", category: "Alchemy", prerequisites: ["wilson_ore_2"] },
      
      { id: "wilson_gems_1", name: "Transmute Gems I", description: "Red Gem <-> Blue Gem, Red + Blue -> Purple Gem.", category: "Alchemy", prerequisites: ["wilson_transmutation"] },
      { id: "wilson_gems_2", name: "Transmute Gems II", description: "3 Purple Gems -> 1 Orange Gem. 3 Orange Gems -> 1 Yellow Gem.", category: "Alchemy", prerequisites: ["wilson_gems_1"] },
      { id: "wilson_gems_3", name: "Transmute Gems III", description: "3 Yellow Gems -> 1 Green Gem. 6 Gems of different colors -> 1 Iridescent Gem.", category: "Alchemy", prerequisites: ["wilson_gems_2"] },
      
      { id: "wilson_icky_1", name: "Transmute Icky I", description: "Transform 3 Morsels into a Meat. Transform a Meat into 2 Morsels.", category: "Alchemy", prerequisites: ["wilson_transmutation"] },
      { id: "wilson_icky_2", name: "Transmute Icky II", description: "Transform 2 Beard Hair into Beefalo Wool. Transform 2 Beefalo Wool into Beard Hair.", category: "Alchemy", prerequisites: ["wilson_icky_1"] },
      { id: "wilson_icky_3", name: "Transmute Icky III", description: "Transform 6 Rot into Manure. Transform 2 Hound's Teeth <-> Bone Shards.", category: "Alchemy", prerequisites: ["wilson_icky_2"] },

      // Beard
      { id: "wilson_beard_ins_1", name: "Beard Insulation I", description: "Gain high thermal insulation from your beard.", category: "Beard", prerequisites: [] },
      { id: "wilson_beard_ins_2", name: "Beard Insulation II", description: "Gain higher thermal insulation from your beard.", category: "Beard", prerequisites: ["wilson_beard_ins_1"] },
      { id: "wilson_beard_ins_3", name: "Beard Insulation III", description: "Gain highest thermal insulation from your beard.", category: "Beard", prerequisites: ["wilson_beard_ins_2"] },
      { id: "wilson_beard_grow_1", name: "Beard Growth I", description: "Your magnificent beard grows a little faster.", category: "Beard", prerequisites: [] },
      { id: "wilson_beard_grow_2", name: "Beard Growth II", description: "Your magnificent beard grows a fair amount faster.", category: "Beard", prerequisites: ["wilson_beard_grow_1"] },
      { id: "wilson_beard_grow_3", name: "Beard Growth III", description: "Your magnificent beard grows much faster.", category: "Beard", prerequisites: ["wilson_beard_grow_2"] },
      { id: "wilson_beard_storage", name: "Beard Hair Storage", description: "Stash food directly in your beard, slowing spoilage slightly.", category: "Beard", prerequisites: [], requiredSkillsCount: { category: "Beard", count: 3 } },

      // Affinity
      { 
        id: "wilson_shadow", 
        name: "Shadow Courtier", 
        description: "The Queen rewards your loyalty with the secrets of Shadow Transmutation.", 
        category: "Affinity", 
        prerequisites: [], 
        requiredSkillsCount: { count: 12 }, 
        conflictNodes: ["wilson_lunar"],
        additionalReqs: "Defeat the Ancient Fuelweaver"
      },
      { 
        id: "wilson_lunar", 
        name: "Lunar Innovator", 
        description: "The Cryptic Founder rewards your curiosity with the secrets of Lunar Transmutation.", 
        category: "Affinity", 
        prerequisites: [], 
        requiredSkillsCount: { count: 12 }, 
        conflictNodes: ["wilson_shadow"],
        additionalReqs: "Defeat the Celestial Champion"
      }
    ],
    layout: {
      columns: [
        {
          title: "Torch & Beard Utility",
          skills: [
            ["wilson_torch_long_1", "wilson_torch_long_2", "wilson_torch_long_3", "wilson_torch_toss"],
            ["wilson_torch_range_1", "wilson_torch_range_2", "wilson_torch_range_3"],
            ["wilson_beard_ins_1", "wilson_beard_ins_2", "wilson_beard_ins_3", "wilson_beard_storage"],
            ["wilson_beard_grow_1", "wilson_beard_grow_2", "wilson_beard_grow_3"]
          ]
        },
        {
          title: "Alchemy Transmutation",
          skills: [
            ["wilson_transmutation", "wilson_ore_1", "wilson_ore_2", "wilson_ore_3"],
            ["wilson_transmutation", "wilson_gems_1", "wilson_gems_2", "wilson_gems_3"],
            ["wilson_transmutation", "wilson_icky_1", "wilson_icky_2", "wilson_icky_3"]
          ]
        },
        {
          title: "Affinity Alignment",
          skills: [
            ["wilson_shadow"],
            ["wilson_lunar"]
          ]
        }
      ]
    }
  },
  {
    id: "willow",
    name: "Willow",
    title: "The Firestarter",
    quote: "Is it hot in here, or is it just me?",
    description: "Willow loves fire. Her skills focus on controlling flares, extracting Ethereal Embers to fuel fiery fireballs or areas of effect, and reinforcing her teddy bear Bernie to act as a colossal planar guardian.",
    avatar: "🔥",
    color: {
      primary: "orange-600",
      border: "orange-800",
      bg: "bg-orange-950/20",
      glow: "orange-500/30",
      accent: "text-orange-400"
    },
    categories: [
      { name: "Lighter", description: "Enhance your lighter, gain pyrokinetic Ember collection, and execute burning frenzies." },
      { name: "Bernie", description: "Improve Bernie's health, walking speed, sanity active threshold, and elemental defense." },
      { name: "Affinity", description: "Align with Shadow for multi-tendril black fire, or Lunar for freezing lunar explosions." }
    ],
    skills: [
      // Lighter
      { id: "willow_burn_control", name: "Controlled Burning", description: "Fires you set won't spread, and burnable loot smolders instead of turning to ash.", category: "Lighter", prerequisites: [] },
      { id: "willow_burn_dur", name: "Burn Duration", description: "Creatures burn for 25% longer time.", category: "Lighter", prerequisites: ["willow_burn_control"] },
      { id: "willow_fire_fighter", name: "Fire Fighter", description: "Your fires deal increased damage to targets over time.", category: "Lighter", prerequisites: ["willow_burn_dur"] },
      
      { id: "willow_brighter_1", name: "Brighter Lighter I", description: "Your lighter has a slightly increased light radius.", category: "Lighter", prerequisites: [] },
      { id: "willow_brighter_2", name: "Brighter Lighter II", description: "Your lighter light radius matches that of an early campfire.", category: "Lighter", prerequisites: ["willow_brighter_1"] },
      
      { id: "willow_hungry_light", name: "Hungry Lighter", description: "Stop things from burning by absorbing flames with your lighter.", category: "Lighter", prerequisites: [] },
      { id: "willow_ember_tender", name: "Ember Tender", description: "Collect Ethereal Embers from slayed burning monsters using your lighter.", category: "Lighter", prerequisites: ["willow_hungry_light"] },
      { id: "willow_combustion", name: "Spontaneous Combustion", description: "Spend 2 Embers to ignite nearby monsters in an area around you.", category: "Lighter", prerequisites: ["willow_ember_tender"] },
      { id: "willow_fireball", name: "Fire Ball", description: "Launch a fiery ball that provides portable heat and light.", category: "Lighter", prerequisites: ["willow_ember_tender"] },
      { id: "willow_frenzy", name: "Burning Frenzy", description: "Gain +25% weapon damage when attacking burning targets.", category: "Lighter", prerequisites: ["willow_ember_tender"] },

      // Bernie
      { id: "willow_patch_1", name: "Patch Up I", description: "Bernie heals slowly (0.5 HP/sec).", category: "Bernie", prerequisites: [] },
      { id: "willow_patch_2", name: "Patch Up II", description: "Bernie heals faster (1.0 HP/sec).", category: "Bernie", prerequisites: ["willow_patch_1"] },
      
      { id: "willow_sane_1", name: "Bearly Sane I", description: "Bernie animates when sanity drops below 36 (normally 30).", category: "Bernie", prerequisites: [] },
      { id: "willow_sane_2", name: "Bearly Sane II", description: "Bernie animates when sanity drops below 60.", category: "Bernie", prerequisites: ["willow_sane_1"] },
      
      { id: "willow_accel_1", name: "Accelerant I", description: "Bernie's walking speed is increased by 15%.", category: "Bernie", prerequisites: [] },
      { id: "willow_accel_2", name: "Accelerant II", description: "Bernie's walking speed is increased by 30%.", category: "Bernie", prerequisites: ["willow_accel_1"] },
      
      { id: "willow_hot_headed", name: "Hot-Headed", description: "Bernie taunts and fights Lunar or Shadow creatures even if sane.", category: "Bernie", prerequisites: ["willow_sane_2"] },
      { id: "willow_stuffing_1", name: "Tough Stuffing I", description: "Bernie's maximum health is increased by 15%.", category: "Bernie", prerequisites: [], requiredSkillsCount: { category: "Bernie", count: 4 } },
      { id: "willow_stuffing_2", name: "Tough Stuffing II", description: "Bernie's maximum health is increased by 30%.", category: "Bernie", prerequisites: ["willow_stuffing_1"] },
      { id: "willow_burn_bernie", name: "Burning Bernie", description: "Setting Bernie on fire grants him a planar damage aura.", category: "Bernie", prerequisites: [], requiredSkillsCount: { category: "Bernie", count: 8 } },

      // Affinity
      { id: "willow_shadow_raiser", name: "Shadow Fire-Raiser", description: "Summon multiple tendrils of black flame that seek out targets.", category: "Affinity", prerequisites: [], requiredSkillsCount: { category: "Lighter", count: 7 }, conflictNodes: ["willow_lunar_raiser", "willow_lunar_bernie"], additionalReqs: "Defeat Fuelweaver" },
      { id: "willow_shadow_bernie", name: "Shadow Bernie", description: "Gives Bernie +5 Planar Damage to lunar targets and +15 defense.", category: "Affinity", prerequisites: [], requiredSkillsCount: { category: "Bernie", count: 6 }, conflictNodes: ["willow_lunar_raiser", "willow_lunar_bernie"], additionalReqs: "Defeat Fuelweaver" },
      { id: "willow_lunar_raiser", name: "Lunar Fire-Raiser", description: "Synthesize cold lunar flames that freeze and burst in areas.", category: "Affinity", prerequisites: [], requiredSkillsCount: { category: "Lighter", count: 7 }, conflictNodes: ["willow_shadow_raiser", "willow_shadow_bernie"], additionalReqs: "Defeat Celestial Champion" },
      { id: "willow_lunar_bernie", name: "Lunar Bernie", description: "Gives Bernie +5 Planar Damage to shadow targets and +15 defense.", category: "Affinity", prerequisites: [], requiredSkillsCount: { category: "Bernie", count: 6 }, conflictNodes: ["willow_shadow_raiser", "willow_shadow_bernie"], additionalReqs: "Defeat Celestial Champion" }
    ],
    layout: {
      columns: [
        {
          title: "Flame & Embers",
          skills: [
            ["willow_burn_control", "willow_burn_dur", "willow_fire_fighter"],
            ["willow_brighter_1", "willow_brighter_2"],
            ["willow_hungry_light", "willow_ember_tender", "willow_combustion", "willow_fireball", "willow_frenzy"]
          ]
        },
        {
          title: "Bernie Guardian",
          skills: [
            ["willow_patch_1", "willow_patch_2", "willow_stuffing_1", "willow_stuffing_2"],
            ["willow_sane_1", "willow_sane_2", "willow_hot_headed", "willow_burn_bernie"],
            ["willow_accel_1", "willow_accel_2"]
          ]
        },
        {
          title: "Affinities",
          skills: [
            ["willow_shadow_raiser", "willow_shadow_bernie"],
            ["willow_lunar_raiser", "willow_lunar_bernie"]
          ]
        }
      ]
    }
  },
  {
    id: "wolfgang",
    name: "Wolfgang",
    title: "The Strongman",
    quote: "I am mighty! Nothing scares me!",
    description: "Wolfgang relies on his muscles. His skill tree enhances his performance in gym minigames, allows crafting custom dumbbells, increases planar damage, and unlocks buffs that protect him from shadow/lunar monsters.",
    avatar: "💪",
    color: {
      primary: "amber-600",
      border: "amber-800",
      bg: "bg-amber-950/20",
      glow: "amber-500/30",
      accent: "text-amber-400"
    },
    categories: [
      { name: "Chores", description: "Chance to instantly finish mining or chopping actions." },
      { name: "Training", description: "Perfect workouts, whistle boosts, higher Mighty limitations, and thrown dumbbells." },
      { name: "Might", description: "Add substantial Planar Damage directly to planar weapons when mighty." },
      { name: "Affinity", description: "Earn massive damage percent modifiers (+30%) against aligned foes." }
    ],
    skills: [
      // Chores
      { id: "wolfgang_chore_1", name: "Chore Workout I", description: "Mining and Chopping have a 5% chance to instantly finish the resource.", category: "Chores", prerequisites: [] },
      { id: "wolfgang_chore_2", name: "Chore Workout II", description: "Instant mining/chopping chance increased to 10%.", category: "Chores", prerequisites: ["wolfgang_chore_1"] },
      { id: "wolfgang_chore_3", name: "Chore Workout III", description: "Instant mining/chopping chance increased to 15%.", category: "Chores", prerequisites: ["wolfgang_chore_2"] },

      // Training
      { id: "wolfgang_gym_master", name: "Gym Mastery", description: "Workouts in the gym complete automatically with perfect rating.", category: "Training", prerequisites: [] },
      { id: "wolfgang_coach", name: "Coach Wolfgang", description: "Craft Coaching Whistles. Boosts allies sanity and followers' damage.", category: "Training", prerequisites: [] },
      { id: "wolfgang_leg_day", name: "Leg Day", description: "Provides a +10% movement speed boost when at Normal state.", category: "Training", prerequisites: ["wolfgang_coach"] },
      
      { id: "wolfgang_dumbbells", name: "Dumbbell Developer", description: "Learn to craft heavy custom dumbbells to work out and throw.", category: "Training", prerequisites: [] },
      { id: "wolfgang_heavy_1", name: "Heavy Hitter I", description: "Thrown dumbbells deal +50% total damage.", category: "Training", prerequisites: ["wolfgang_dumbbells"] },
      { id: "wolfgang_heavy_2", name: "Heavy Hitter II", description: "Thrown dumbbells deal +100% total damage.", category: "Training", prerequisites: ["wolfgang_heavy_1"] },
      
      { id: "wolfgang_mighty_1", name: "Push Limits I", description: "Mighty Meter maximum extended to 110.", category: "Training", prerequisites: [] },
      { id: "wolfgang_mighty_2", name: "Push Limits II", description: "Mighty Meter maximum extended to 120.", category: "Training", prerequisites: ["wolfgang_mighty_1"] },
      { id: "wolfgang_mighty_3", name: "Push Limits III", description: "Mighty Meter maximum extended to 130.", category: "Training", prerequisites: ["wolfgang_mighty_2"] },
      { id: "wolfgang_mighty_4", name: "Push Limits IV", description: "Mighty Meter maximum extended to 140.", category: "Training", prerequisites: ["wolfgang_mighty_3"] },
      { id: "wolfgang_mighty_5", name: "Push Limits V", description: "Mighty Meter maximum extended to 150.", category: "Training", prerequisites: ["wolfgang_mighty_4"] },

      // Might
      { id: "wolfgang_weapons_1", name: "Mighty Weapons I", description: "+5 Planar Damage with planar weapons when Mighty.", category: "Might", prerequisites: [] },
      { id: "wolfgang_weapons_2", name: "Mighty Weapons II", description: "+10 Planar Damage with planar weapons when Mighty.", category: "Might", prerequisites: ["wolfgang_weapons_1"] },
      { id: "wolfgang_weapons_3", name: "Mighty Weapons III", description: "+15 Planar Damage with planar weapons when Mighty.", category: "Might", prerequisites: ["wolfgang_weapons_2"] },
      { id: "wolfgang_weapons_4", name: "Mighty Weapons IV", description: "+20 Planar Damage with planar weapons when Mighty.", category: "Might", prerequisites: ["wolfgang_weapons_3"] },
      { id: "wolfgang_weapons_5", name: "Mighty Weapons V", description: "+25 Planar Damage with planar weapons when Mighty.", category: "Might", prerequisites: ["wolfgang_weapons_4"] },

      // Affinity
      { id: "wolfgang_shadow_1", name: "Shadow Guard I", description: "+10% damage against Lunar targets when Mighty.", category: "Affinity", prerequisites: [], conflictNodes: ["wolfgang_lunar_1", "wolfgang_lunar_2", "wolfgang_lunar_3"], additionalReqs: "Defeat Fuelweaver" },
      { id: "wolfgang_shadow_2", name: "Shadow Guard II", description: "+20% damage against Lunar targets when Mighty.", category: "Affinity", prerequisites: ["wolfgang_shadow_1"], conflictNodes: ["wolfgang_lunar_1", "wolfgang_lunar_2", "wolfgang_lunar_3"] },
      { id: "wolfgang_shadow_3", name: "Shadow Guard III", description: "+30% damage against Lunar targets when Mighty.", category: "Affinity", prerequisites: ["wolfgang_shadow_2"], conflictNodes: ["wolfgang_lunar_1", "wolfgang_lunar_2", "wolfgang_lunar_3"] },
      { id: "wolfgang_lunar_1", name: "Lunar Strategist I", description: "+10% damage against Shadow targets when Mighty.", category: "Affinity", prerequisites: [], conflictNodes: ["wolfgang_shadow_1", "wolfgang_shadow_2", "wolfgang_shadow_3"], additionalReqs: "Defeat Celestial Champion" },
      { id: "wolfgang_lunar_2", name: "Lunar Strategist II", description: "+20% damage against Shadow targets when Mighty.", category: "Affinity", prerequisites: ["wolfgang_lunar_1"], conflictNodes: ["wolfgang_shadow_1", "wolfgang_shadow_2", "wolfgang_shadow_3"] },
      { id: "wolfgang_lunar_3", name: "Lunar Strategist III", description: "+30% damage against Shadow targets when Mighty.", category: "Affinity", prerequisites: ["wolfgang_lunar_2"], conflictNodes: ["wolfgang_shadow_1", "wolfgang_shadow_2", "wolfgang_shadow_3"] }
    ],
    layout: {
      columns: [
        {
          title: "Activity & Chores",
          skills: [
            ["wolfgang_chore_1", "wolfgang_chore_2", "wolfgang_chore_3"],
            ["wolfgang_gym_master"],
            ["wolfgang_coach", "wolfgang_leg_day"]
          ]
        },
        {
          title: "Workout Mastery",
          skills: [
            ["wolfgang_dumbbells", "wolfgang_heavy_1", "wolfgang_heavy_2"],
            ["wolfgang_mighty_1", "wolfgang_mighty_2", "wolfgang_mighty_3", "wolfgang_mighty_4", "wolfgang_mighty_5"],
            ["wolfgang_weapons_1", "wolfgang_weapons_2", "wolfgang_weapons_3", "wolfgang_weapons_4", "wolfgang_weapons_5"]
          ]
        },
        {
          title: "Planar Alignments",
          skills: [
            ["wolfgang_shadow_1", "wolfgang_shadow_2", "wolfgang_shadow_3"],
            ["wolfgang_lunar_1", "wolfgang_lunar_2", "wolfgang_lunar_3"]
          ]
        }
      ]
    }
  },
  {
    id: "woodie",
    name: "Woodie",
    title: "The Lumberjack",
    quote: "That's a nice looking tree, eh?",
    description: "Woodie is a master of forestry and were-forms. His skill tree enhances curse forms (Beaver, Moose, Goose), increases item collecting speeds, allows carving hats and canes with Lucy, and triggers special protections.",
    avatar: "🪓",
    color: {
      primary: "sky-600",
      border: "sky-800",
      bg: "bg-sky-950/20",
      glow: "sky-500/30",
      accent: "text-sky-400"
    },
    categories: [
      { name: "Curse", description: "Increase Were-form limits and master either Werebeaver, Weremoose, or Weregoose." },
      { name: "Lumberjack", description: "Harvest items faster, carve helper utensils, and deal devastating treeguard damage." },
      { name: "Affinity", description: "Acquire shadow protections or block standard lunar curse triggers." }
    ],
    skills: [
      // Curse
      { id: "woodie_timer_1", name: "Transformation I", description: "Were-forms last 20% longer.", category: "Curse", prerequisites: [] },
      { id: "woodie_timer_2", name: "Transformation II", description: "Were-forms last 40% longer.", category: "Curse", prerequisites: ["woodie_timer_1"] },
      { id: "woodie_timer_3", name: "Transformation III", description: "Were-forms last 80% longer.", category: "Curse", prerequisites: ["woodie_timer_2"] },
      { id: "woodie_embracer", name: "Curse Embracer", description: "No health/sanity penalties for Kitschy Idols. Return to human with Full stomach.", category: "Curse", prerequisites: [], requiredSkillsCount: { category: "Curse", count: 6 } },
      
      { id: "woodie_beaver_1", name: "Werebeaver I", description: "Mine minerals extremely fast in Werebeaver form.", category: "Curse", prerequisites: [] },
      { id: "woodie_beaver_2", name: "Werebeaver II", description: "Chop trunks extremely fast in Werebeaver form.", category: "Curse", prerequisites: ["woodie_beaver_1"] },
      { id: "woodie_beaver_3", name: "Werebeaver III", description: "Chop, mine, and smash hard structures in Werebeaver form.", category: "Curse", prerequisites: ["woodie_beaver_2"] },
      { id: "woodie_beaver_master", name: "Werebeaver Mastery", description: "Unlock tailslap skill. (Mutually exclusive with other Masteries).", category: "Curse", prerequisites: ["woodie_beaver_3"], conflictNodes: ["woodie_moose_master", "woodie_goose_master"] },
      
      { id: "woodie_moose_1", name: "Weremoose I", description: "Weremoose form walks faster and is resistant to obstacles.", category: "Curse", prerequisites: [] },
      { id: "woodie_moose_2", name: "Weremoose II", description: "Gain slow health healing regeneration in Weremoose form.", category: "Curse", prerequisites: ["woodie_moose_1"] },
      { id: "woodie_moose_3", name: "Weremoose III", description: "Allows stopping instantly mid-charge in Weremoose form.", category: "Curse", prerequisites: ["woodie_moose_2"] },
      { id: "woodie_moose_master", name: "Weremoose Mastery", description: "Planar fist punch on 3rd hit + planar protection. (Mutually exclusive).", category: "Curse", prerequisites: ["woodie_moose_3"], conflictNodes: ["woodie_beaver_master", "woodie_goose_master"] },
      
      { id: "woodie_goose_1", name: "Weregoose I", description: "Move 20% faster in Weregoose form.", category: "Curse", prerequisites: [] },
      { id: "woodie_goose_2", name: "Weregoose II", description: "Become completely waterproof when in Weregoose form.", category: "Curse", prerequisites: ["woodie_goose_1"] },
      { id: "woodie_goose_3", name: "Weregoose III", description: "Allows dodging incoming strikes once every 5 seconds.", category: "Curse", prerequisites: ["woodie_goose_2"] },
      { id: "woodie_goose_master", name: "Weregoose Mastery", description: "Allows flying around to explore maps. (Mutually exclusive).", category: "Curse", prerequisites: ["woodie_goose_3"], conflictNodes: ["woodie_beaver_master", "woodie_moose_master"] },

      // Lumberjack
      { id: "woodie_picker_1", name: "Quick Picker I", description: "Collect herbs/crops 10% faster.", category: "Lumberjack", prerequisites: [] },
      { id: "woodie_picker_2", name: "Quick Picker II", description: "Collect herbs/crops 20% faster.", category: "Lumberjack", prerequisites: ["woodie_picker_1"] },
      { id: "woodie_picker_3", name: "Quick Picker III", description: "Collect herbs/crops 33% faster.", category: "Lumberjack", prerequisites: ["woodie_picker_2"] },
      
      { id: "woodie_woodworker", name: "Woodworker", description: "Use Lucy to carve boards using only 3 logs instead of 4.", category: "Lumberjack", prerequisites: [] },
      { id: "woodie_hat", name: "Hardwood Hat", description: "Carve durable protective Hardwood Hats using Lucy.", category: "Lumberjack", prerequisites: ["woodie_woodworker"] },
      { id: "woodie_cane", name: "Wooden Walking Stick", description: "Carve Wooden Walking Sticks using Lucy for mobility boost.", category: "Lumberjack", prerequisites: ["woodie_woodworker"] },
      
      { id: "woodie_feller_1", name: "Treeguard Feller I", description: "Deal +41% damage to wild Treeguards.", category: "Lumberjack", prerequisites: [] },
      { id: "woodie_feller_2", name: "Treeguard Feller II", description: "Deal +100% damage to wild Treeguards.", category: "Lumberjack", prerequisites: ["woodie_feller_1"] },
      { id: "woodie_feller_3", name: "Treeguard Idol", description: "Craft burnable Treeguard Idols that spawn Treeguards when burned.", category: "Lumberjack", prerequisites: ["woodie_feller_2"] },

      // Affinity
      { id: "woodie_shadow", name: "Shadow Wrangler", description: "Shadow monsters ignore you when you are in a Were-form.", category: "Affinity", prerequisites: [], requiredSkillsCount: { count: 12 }, conflictNodes: ["woodie_lunar"], additionalReqs: "Defeat Fuelweaver" },
      { id: "woodie_lunar", name: "Lunar Renegade", description: "Completely block the full moon's ability to trigger random curse transformations.", category: "Affinity", prerequisites: [], requiredSkillsCount: { count: 12 }, conflictNodes: ["woodie_shadow"], additionalReqs: "Defeat Celestial Champion" }
    ],
    layout: {
      columns: [
        {
          title: "Curse Forms Mastery",
          skills: [
            ["woodie_timer_1", "woodie_timer_2", "woodie_timer_3", "woodie_embracer"],
            ["woodie_beaver_1", "woodie_beaver_2", "woodie_beaver_3", "woodie_beaver_master"],
            ["woodie_moose_1", "woodie_moose_2", "woodie_moose_3", "woodie_moose_master"],
            ["woodie_goose_1", "woodie_goose_2", "woodie_goose_3", "woodie_goose_master"]
          ]
        },
        {
          title: "Woodcutting & Crafts",
          skills: [
            ["woodie_picker_1", "woodie_picker_2", "woodie_picker_3"],
            ["woodie_woodworker", "woodie_hat", "woodie_cane"],
            ["woodie_feller_1", "wolfgang_heavy_2", "woodie_feller_3"] // Note: layout spacing
          ]
        },
        {
          title: "Were-Affinity",
          skills: [
            ["woodie_shadow"],
            ["woodie_lunar"]
          ]
        }
      ]
    }
  },
  {
    id: "wigfrid",
    name: "Wigfrid",
    title: "The Performance Artist",
    quote: "All the world's a stage, and I am the star!",
    description: "Wigfrid excels in combat. Her skill tree offers Mystic Resilience, unlocks battle spears, helms, and round shields, enhances beefalo domestic speed, and changes the behavior of her Battle Songs.",
    avatar: "🛡️",
    color: {
      primary: "red-600",
      border: "red-800",
      bg: "bg-red-950/20",
      glow: "red-500/30",
      accent: "text-red-400"
    },
    categories: [
      { name: "Mystic", description: "Receive divine blessings that grant flat planar defense." },
      { name: "Arsenal", description: "Craft Elding Electric Spears, Commander shockproof Helms, and defensive Battle Shields." },
      { name: "Rider", description: "Domesticate Beefalos in half the time and gain Inspiration when riding." },
      { name: "Headliner", description: "Enable song cooldowns instead of inspiration drain, and resurrect fallen comrades." },
      { name: "Affinity", description: "Soothe shadow damage or protect against celestial planar strikes." }
    ],
    skills: [
      // Mystic
      { id: "wigfrid_mystic", name: "Mystic Resilience", description: "Receive a divine blessing that provides +5 flat Planar Defense.", category: "Mystic", prerequisites: [] },

      // Arsenal
      { id: "wigfrid_spear_1", name: "Bragi's Blessing I", description: "Inspiration gain rate increased slightly when using Battle Spears.", category: "Arsenal", prerequisites: [] },
      { id: "wigfrid_spear_2", name: "Bragi's Blessing II", description: "Inspiration gain rate increased more when using Battle Spears.", category: "Arsenal", prerequisites: ["wigfrid_spear_1"] },
      { id: "wigfrid_elding", name: "Elding Spear Crafting", description: "Craft Elding Spears: electric spears dealing more harm to wet targets.", category: "Arsenal", prerequisites: ["wigfrid_spear_2"] },
      { id: "wigfrid_elding_enh1", name: "Elding Spear Spells", description: "Elding Spears perform special strikes that self-repair elements.", category: "Arsenal", prerequisites: ["wigfrid_elding"] },
      { id: "wigfrid_elding_enh2", name: "Charged Elding", description: "Upgrade Elding Spear using Restrained Static to deal +20 Planar Damage.", category: "Arsenal", prerequisites: ["wigfrid_elding"] },
      
      { id: "wigfrid_helm_1", name: "Hard Helm I", description: "Battle Helms have increased durability when worn by Wigfrid.", category: "Arsenal", prerequisites: [] },
      { id: "wigfrid_helm_2", name: "Hard Helm II", description: "Battle Helms last significantly longer before breaking.", category: "Arsenal", prerequisites: ["wigfrid_helm_1"] },
      { id: "wigfrid_commander", name: "Commander's Helm Craft", description: "Craft Commander's Helms that grant total immunity to knockbacks.", category: "Arsenal", prerequisites: ["wigfrid_helm_2"] },
      { id: "wigfrid_comm_enh1", name: "Planar Commander", description: "Commander's Helm provides +10 planar defense.", category: "Arsenal", prerequisites: ["wigfrid_commander"] },
      { id: "wigfrid_comm_enh2", name: "Fighting Repair", description: "Combat heal actions slowly repair Commander's Helm automatically.", category: "Arsenal", prerequisites: ["wigfrid_commander"] },
      
      { id: "wigfrid_shield", name: "Battle Rönd Shield", description: "Craft the Battle Rond Shield to block, strike, and gain armor.", category: "Arsenal", prerequisites: ["wigfrid_elding"] }, // Or commander
      { id: "wigfrid_shield_enh1", name: "Rönd Retaliation I", description: "Increases blocking frame duration.", category: "Arsenal", prerequisites: ["wigfrid_shield"] },
      { id: "wigfrid_shield_enh2", name: "Rönd Retaliation II", description: "Strikes after blocking deal +15-30 bonus counterattack damage.", category: "Arsenal", prerequisites: ["wigfrid_shield"] },

      // Rider
      { id: "wigfrid_mount_1", name: "Noble Mount I", description: "Beefalo domestic progress increases 15% quicker.", category: "Rider", prerequisites: [] },
      { id: "wigfrid_mount_2", name: "Noble Mount II", description: "You are allowed to ride domesticated Beefalos 30% longer.", category: "Rider", prerequisites: ["wigfrid_mount_1"] },
      { id: "wigfrid_mount_3", name: "Noble Mount III", description: "Riding Beefalos slowly increases inspiration to a stable 50%.", category: "Rider", prerequisites: ["wigfrid_mount_2"] },
      { id: "wigfrid_saddle", name: "Battle Saddle", description: "Craft protective Battle Saddles that absorb rider damage.", category: "Rider", prerequisites: ["wigfrid_mount_3"] },

      // Head Liner
      { id: "wigfrid_words", name: "Fighting Words", description: "Battle Stingers use cooldowns instead of draining Inspiration.", category: "Headliner", prerequisites: [] },
      { id: "wigfrid_canister", name: "Battle Call Canister", description: "Allows crafting canisters that stockpile battle songs.", category: "Headliner", prerequisites: [] },
      { id: "wigfrid_encore", name: "Warrior's Reprise", description: "Enables crafting a horn to temporarily revive fallen allies.", category: "Headliner", prerequisites: [] },

      // Affinity
      { id: "wigfrid_shadow", name: "Shadow Chanteuse", description: "Sings Song of Dark Lament. Deals +10% damage to lunar entities.", category: "Affinity", prerequisites: [], requiredSkillsCount: { count: 12 }, conflictNodes: ["wigfrid_lunar"], additionalReqs: "Defeat Fuelweaver" },
      { id: "wigfrid_lunar", name: "Lunar Melodist", description: "Sings Song of Enlightened Lullaby. Deals +10% damage to shadow entities.", category: "Affinity", prerequisites: [], requiredSkillsCount: { count: 12 }, conflictNodes: ["wigfrid_shadow"], additionalReqs: "Defeat Celestial Champion" }
    ],
    layout: {
      columns: [
        {
          title: "Valkyrie Wardrobe",
          skills: [
            ["wigfrid_mystic"],
            ["wigfrid_spear_1", "wigfrid_spear_2", "wigfrid_elding", "wigfrid_elding_enh1", "wigfrid_elding_enh2"],
            ["wigfrid_helm_1", "wigfrid_helm_2", "wigfrid_commander", "wigfrid_comm_enh1", "wigfrid_comm_enh2"],
            ["wigfrid_elding", "wigfrid_shield", "wigfrid_shield_enh1", "wigfrid_shield_enh2"]
          ]
        },
        {
          title: "Symphony & Riding",
          skills: [
            ["wigfrid_mount_1", "wigfrid_mount_2", "wigfrid_mount_3", "wigfrid_saddle"],
            ["wigfrid_words"],
            ["wigfrid_canister"],
            ["wigfrid_encore"]
          ]
        },
        {
          title: "Vocal Affinities",
          skills: [
            ["wigfrid_shadow"],
            ["wigfrid_lunar"]
          ]
        }
      ]
    }
  },
  {
    id: "wormwood",
    name: "Wormwood",
    title: "The Lonesome",
    quote: "Hello friend! Hugs?",
    description: "Wormwood is an animate green plant. His tree is extremely extensive, with multiple paths specializing in blooming longevity, rapid farming capabilities, crafting organic items (Berry bushes, lureplants), mushroom multiplication, and raising Carrat companion armies.",
    avatar: "🌱",
    color: {
      primary: "green-600",
      border: "green-800",
      bg: "bg-green-950/20",
      glow: "green-500/30",
      accent: "text-green-400"
    },
    categories: [
      { name: "Starting", description: "Observe planting systems and identify crop species." },
      { name: "Bloom", description: "Decrease blooming point thresholds, gain sun-heat defense, and heal from sunlight." },
      { name: "Crafting", description: "Sacrifice health to construct Berry Bushes, Lureplants, or Monkeytails." },
      { name: "Mushrooms", description: "Accelerate mushroom planters and plant hallucinogenic sleeping Moon Shrooms." },
      { name: "Affinity", description: "Summon Carrats, Lightbugs, and Saladmanders, or trigger vines using Brightshade weapons." }
    ],
    skills: [
      // Starting
      { id: "wormwood_seed", name: "Seed Sleuth", description: "Enables examining planted wild seeds to identify what crop they are.", category: "Starting", prerequisites: [] },

      // Bloom (Right branch)
      { id: "wormwood_spurt_1", name: "Growth Spurt I", description: "Reach full bloom stage 10% quicker.", category: "Bloom", prerequisites: ["wormwood_seed"] },
      { id: "wormwood_spurt_2", name: "Growth Spurt II", description: "Reach full bloom stage 25% quicker.", category: "Bloom", prerequisites: ["wormwood_spurt_1"] },
      { id: "wormwood_shade", name: "Shade Plant", description: "Gain +120 Overheating threshold resistance while blooming.", category: "Bloom", prerequisites: ["wormwood_spurt_2"] },
      { id: "wormwood_power", name: "Flower Power", description: "Stay in peak blooming stage 50% longer in games.", category: "Bloom", prerequisites: ["wormwood_spurt_2"] },
      { id: "wormwood_photosyn", name: "Photosynthesis", description: "Heal 1 HP every 20 seconds during daylight when blooming.", category: "Bloom", prerequisites: ["wormwood_power"] },

      // Farmhand (Top-Right branch)
      { id: "wormwood_farmhand", name: "Farmhand", description: "Tend farm plants in a larger range when blooming. Faster harvesting.", category: "Bloom", prerequisites: ["wormwood_seed"] },
      { id: "wormwood_self_fer", name: "Skilled Self-Fertilizer", description: "Compost wrap animations are 60% faster.", category: "Bloom", prerequisites: ["wormwood_farmhand"] },
      { id: "wormwood_bee", name: "Bee Kind", description: "Bees and butterflies ignore cataloged Wormwood unless provoked.", category: "Bloom", prerequisites: ["wormwood_self_fer"] },
      { id: "wormwood_bramble", name: "Bramble Specialist", description: "Resets placed Bramble Traps nearby automatically.", category: "Bloom", prerequisites: ["wormwood_self_fer"] },
      { id: "wormwood_husk", name: "Bramble Husk Specialist", description: "Release defensive pine spikes after landing hits on targets.", category: "Bloom", prerequisites: ["wormwood_bramble"] },

      // Crafting (Left branch)
      { id: "wormwood_sapling", name: "Sapling Crafting", description: "Spend 5 HP and Twigs to create Lunar Saplings.", category: "Crafting", prerequisites: ["wormwood_seed"] },
      { id: "wormwood_berry", name: "Berry Bush Craft", description: "Spend 10 HP to fabricate organic Berry Bushes.", category: "Crafting", prerequisites: ["wormwood_sapling"] },
      { id: "wormwood_juicy", name: "Juicy Berry Craft", description: "Spend 10 HP to fabricate Juicy Berry Bushes.", category: "Crafting", prerequisites: ["wormwood_berry"] },
      { id: "wormwood_monkey", name: "Monkeytail Crafting", description: "Spend 15 HP to grow coastal Monkeytails anywhere.", category: "Crafting", prerequisites: ["wormwood_berry"] },
      { id: "wormwood_lure", name: "Lureplant Crafting", description: "Spend 25 HP to raise hostile Lureplants.", category: "Crafting", prerequisites: ["wormwood_monkey"] },

      // Mushrooms (Top-Left branch)
      { id: "wormwood_mush_1", name: "Mushroom Mastery I", description: "Mushrooms in planters grow 10% faster.", category: "Mushrooms", prerequisites: ["wormwood_seed"] },
      { id: "wormwood_mush_2", name: "Mushroom Mastery II", description: "Mushrooms in planters grow 20% faster.", category: "Mushrooms", prerequisites: ["wormwood_mush_1"] },
      { id: "wormwood_sap", name: "Poor Sap", description: "Carve Ipecaca Syrup to make beefalos or pigs throw up manure.", category: "Mushrooms", prerequisites: ["wormwood_mush_2"] },
      { id: "wormwood_mush_mult", name: "Mushroom Multiplier", description: "Planter yields increased from 4 caps to 5-6.", category: "Mushrooms", prerequisites: ["wormwood_mush_2"] },
      { id: "wormwood_cloud", name: "Moon Shroom Cloud", description: "Grow Moon Shrooms. Eating raw releases sleep-inducing spore clouds.", category: "Mushrooms", prerequisites: ["wormwood_mush_mult"] },

      // Affinity
      { id: "wormwood_cult_1", name: "Lunar Cultivator I", description: "Turn 1 Carrot + 5 HP into a loyal gathering Carrat (Limit 4).", category: "Affinity", prerequisites: [], requiredSkillsCount: { count: 5 }, additionalReqs: "Defeat Celestial Champion" },
      { id: "wormwood_cult_2", name: "Lunar Cultivator II", description: "Turn Lightbulbs into orbit lightbugs that block darkness sanity debuffs.", category: "Affinity", prerequisites: ["wormwood_cult_1"] },
      { id: "wormwood_cult_3", name: "Lunar Cultivator III", description: "Transform dragonfruit into combat Saladmander companions (Limit 2).", category: "Affinity", prerequisites: ["wormwood_cult_1"] },
      { id: "wormwood_guard_1", name: "Lunar Guardian I", description: "Roots targets when wearing Brightshade Armor. Fuses Bramble with Brightshade.", category: "Affinity", prerequisites: [], requiredSkillsCount: { count: 5 }, additionalReqs: "Defeat Celestial Champion" },
      { id: "wormwood_guard_2", name: "Lunar Guardian II", description: "Attacking with Brightshade weapons summons vines to whip targets.", category: "Affinity", prerequisites: ["wormwood_guard_1"] }
    ],
    layout: {
      columns: [
        {
          title: "Harvest & Blooming (Right)",
          skills: [
            ["wormwood_seed", "wormwood_spurt_1", "wormwood_spurt_2", "wormwood_shade"],
            ["wormwood_spurt_2", "wormwood_power", "wormwood_photosyn"],
            ["wormwood_seed", "wormwood_farmhand", "wormwood_self_fer", "wormwood_bee"],
            ["wormwood_self_fer", "wormwood_bramble", "wormwood_husk"]
          ]
        },
        {
          title: "Fungal & Bush Crafts (Left)",
          skills: [
            ["wormwood_seed", "wormwood_sapling", "wormwood_berry", "wormwood_juicy"],
            ["wormwood_berry", "wormwood_monkey", "wormwood_lure"],
            ["wormwood_seed", "wormwood_mush_1", "wormwood_mush_2", "wormwood_sap"],
            ["wormwood_mush_2", "wormwood_mush_mult", "wormwood_cloud"]
          ]
        },
        {
          title: "Lunar Cultivator",
          skills: [
            ["wormwood_cult_1", "wormwood_cult_2", "wormwood_cult_3"],
            ["wormwood_guard_1", "wormwood_guard_2"]
          ]
        }
      ]
    }
  },
  {
    id: "winona",
    name: "Winona",
    title: "The Handyperson",
    quote: "I can fix anything! Just hand me a wrench.",
    description: "Winona is an expert builder. Her tree improves machine speeds, cuts idle generator fuel drain down to zero, alters catapult fire rates, and maps supply cache inspections inspired by the Cryptic Founder.",
    avatar: "🔧",
    color: {
      primary: "teal-600",
      border: "teal-800",
      bg: "bg-teal-950/20",
      glow: "teal-500/30",
      accent: "text-teal-400"
    },
    categories: [
      { name: "Shelf 1", description: "Thermal spotlights, portability remotes, and saving idle generator fuel." },
      { name: "Shelf 2", description: "Upgraded Catapult firing velocity, larger explosive splash radius, and generator power multipliers." },
      { name: "Shelf 3", description: "Deploy Shadow glasses or track high-grade supply cacheboxes with tracking goggles." }
    ],
    skills: [
      // Shelf 1
      { id: "winona_hotlight", name: "Hotlight", description: "Winona's Spotlights radiate medium cozy heat when active.", category: "Shelf 1", prerequisites: [] },
      { id: "winona_spotwide", name: "Spacious Spotlight", description: "Spotlights illuminate a massive 40% wider diameter.", category: "Shelf 1", prerequisites: [] },
      { id: "winona_portable", name: "Dismantle & Remote", description: "Dismantle machinery easily. Craft remotes to control Catapults.", category: "Shelf 1", prerequisites: [] },
      { id: "winona_quick_chg", name: "Quick Charge", description: "Connected gadgets recharge twice as fast next to generators.", category: "Shelf 1", prerequisites: ["winona_portable"] },
      { id: "winona_energy_sav", name: "Energy Saver", description: "Generators consume zero energy when structures are idle.", category: "Shelf 1", prerequisites: [] },

      // Shelf 2
      { id: "winona_rapid_1", name: "Rapid Fire I", description: "Catapults fire 5% faster.", category: "Shelf 2", prerequisites: [], requiredSkillsCount: { count: 3 } },
      { id: "winona_rapid_2", name: "Rapid Fire II", description: "Catapults fire 10% faster.", category: "Shelf 2", prerequisites: ["winona_rapid_1"] },
      { id: "winona_rapid_3", name: "Rapid Fire III", description: "Catapults fire 20% faster.", category: "Shelf 2", prerequisites: ["winona_rapid_2"] },
      { id: "winona_splash_1", name: "Explosive Splash I", description: "Catapult stones deal damage in a 25% larger diameter.", category: "Shelf 2", prerequisites: [], requiredSkillsCount: { count: 3 } },
      { id: "winona_splash_2", name: "Explosive Splash II", description: "Catapult stones deal damage in a 50% larger diameter.", category: "Shelf 2", prerequisites: ["winona_splash_1"] },
      { id: "winona_splash_3", name: "Explosive Splash III", description: "Catapult stones deal damage in a 100% larger diameter.", category: "Shelf 2", prerequisites: ["winona_splash_2"] },
      { id: "winona_gen_1", name: "Generator Efficiency I", description: "Boost efficiency of all fuel sources by 25%.", category: "Shelf 2", prerequisites: [], requiredSkillsCount: { count: 3 } },
      { id: "winona_gen_2", name: "Generator Efficiency II", description: "Boost efficiency of all fuel sources by 50%.", category: "Shelf 2", prerequisites: ["winona_gen_1"] },
      { id: "winona_gen_3", name: "Generator Efficiency III", description: "Boost efficiency of all fuel sources by 100%.", category: "Shelf 2", prerequisites: ["winona_gen_2"] },
      { id: "winona_remote_target", name: "Precise Targeting", description: "All nearby catapults seek the enemy targeted by your remote.", category: "Shelf 2", prerequisites: ["winona_portable"], requiredSkillsCount: { count: 3 } },
      { id: "winona_barrage", name: "Catapult Barrage", description: "Use remote to temporarily increase nearby firing rate by 50%.", category: "Shelf 2", prerequisites: ["winona_portable"], requiredSkillsCount: { count: 3 } },

      // Shelf 3
      { id: "winona_shadow_seeker1", name: "Shadow Seeker I", description: "Synthesize enchanted spectacles to search for shadow magic traces.", category: "Shelf 3", prerequisites: [], requiredSkillsCount: { count: 6 }, conflictNodes: ["winona_lunar_seeker2"] },
      { id: "winona_shadow_seeker2", name: "Shadow Seeker II", description: "Increased sensory range locating secret shadow deposits.", category: "Shelf 3", prerequisites: ["winona_shadow_seeker1"], conflictNodes: ["winona_lunar_seeker2"] },
      { id: "winona_fuel_nightmare", name: "Nightmare Generator", description: "Allows feeding Nightmare Fuel into Winona's generators.", category: "Shelf 3", prerequisites: [], requiredSkillsCount: { count: 6 } },
      { id: "winona_fuel_pure", name: "Pure Horror Fuel", description: "Utilize Pure Horror as an extremely dense energy fuel source.", category: "Shelf 3", prerequisites: ["winona_fuel_nightmare"] },
      { id: "winona_shadow_strike", name: "Shadow Strike", description: "Charge Catapults with shadow energy via your remote targeter.", category: "Shelf 3", prerequisites: ["winona_fuel_nightmare", "winona_portable"] },
      
      { id: "winona_lunar_seeker1", name: "Founder's Keepers I", description: "Synthesize Inspectacles to locate hidden underground Cacheboxes.", category: "Shelf 3", prerequisites: [], requiredSkillsCount: { count: 6 }, conflictNodes: ["winona_shadow_seeker2"] },
      { id: "winona_lunar_seeker2", name: "Founder's Keepers II", description: "Scan wider areas to detect High-Grade supply cacheboxes.", category: "Shelf 3", prerequisites: ["winona_lunar_seeker1"], conflictNodes: ["winona_shadow_seeker2"] },
      { id: "winona_fuel_shard", name: "Enlightened G.E.M.erator", description: "Allows feeding Enlightened Shards into G.E.M.erators.", category: "Shelf 3", prerequisites: [], requiredSkillsCount: { count: 6 } },
      { id: "winona_fuel_brilliance", name: "Pure Brilliance Fuel", description: "Utilize Pure Brilliance as a glowing lunar generator load.", category: "Shelf 3", prerequisites: ["winona_fuel_shard"] },
      { id: "winona_lunar_strike", name: "Enlightened Strike", description: "Use remote to activate glowing lunar explosions from Catapults.", category: "Shelf 3", prerequisites: ["winona_fuel_brilliance", "winona_portable"] }
    ],
    layout: {
      columns: [
        {
          title: "Machinery Shelf",
          skills: [
            ["winona_hotlight", "winona_spotwide", "winona_energy_sav"],
            ["winona_portable", "winona_quick_chg"]
          ]
        },
        {
          title: "Power & Artillery",
          skills: [
            ["winona_rapid_1", "winona_rapid_2", "winona_rapid_3"],
            ["winona_splash_1", "winona_splash_2", "winona_splash_3"],
            ["winona_gen_1", "winona_gen_2", "winona_gen_3"],
            ["winona_remote_target", "winona_barrage"]
          ]
        },
        {
          title: "Goggles & Fuel",
          skills: [
            ["winona_shadow_seeker1", "winona_shadow_seeker2", "winona_fuel_nightmare", "winona_fuel_pure", "winona_shadow_strike"],
            ["winona_lunar_seeker1", "winona_lunar_seeker2", "winona_fuel_shard", "winona_fuel_brilliance", "winona_lunar_strike"]
          ]
        }
      ]
    }
  },
  {
    id: "wurt",
    name: "Wurt",
    title: "The Half-Merm",
    quote: "Flurpt! Mer-folk rule the swamp!",
    description: "Wurt is a young Merm. Her skill tree deals with amphibious talents, swamp crafts (constructing roads, frog ponds), raising Merm Kings with lavish diets, and recruiting beefed-up Merm Guard cohorts.",
    avatar: "🐸",
    color: {
      primary: "emerald-600",
      border: "emerald-800",
      bg: "bg-emerald-950/20",
      glow: "emerald-500/30",
      accent: "text-emerald-400"
    },
    categories: [
      { name: "Amphibian", description: "Restore sanity when drenched, stay warm in cold subzero water, and speedwalk across wetlands." },
      { name: "Crafts", description: "Craft wetlands, attract frogs, and summon swamp traps." },
      { name: "Merm King", description: "Set up massive golden thrones and feed the King to grant Merms huge global stat multipliers." }
    ],
    skills: [
      // Amphibian
      { id: "wurt_wet_1", name: "Mental Fluidity I", description: "Regain slow passive sanity when body drench level is above zero.", category: "Amphibian", prerequisites: [] },
      { id: "wurt_wet_2", name: "Mental Fluidity II", description: "Sanity restore level matches your water drench percentage.", category: "Amphibian", prerequisites: ["wurt_wet_1"] },
      { id: "wurt_wet_warm", name: "All-Weather Scales", description: "Water drench has zero cooling impact on internal temperature.", category: "Amphibian", prerequisites: ["wurt_wet_2"] },
      { id: "wurt_slip_1", name: "Slippery Hide I", description: "10% chance to slide out of physical grab and stun triggers.", category: "Amphibian", prerequisites: [] },
      { id: "wurt_slip_2", name: "Slippery Hide II", description: "Hold speed boost on swamp paths and move 15% faster inside wetness.", category: "Amphibian", prerequisites: ["wurt_slip_1"] },
      { id: "wurt_water_walk", name: "Water Walker", description: "Allows running across sub-ocean surfaces directly for brief frames.", category: "Amphibian", prerequisites: ["wurt_slip_2"] },

      // Crafts
      { id: "wurt_road", name: "Swamp Roadways", description: "Craft turf paths that grant Wurt and Merms +30% run speed.", category: "Crafts", prerequisites: [] },
      { id: "wurt_frogs", name: "Frog Charmer", description: "Frog ponds and frogs treat Wurt as friendly unless struck.", category: "Crafts", prerequisites: [] },
      { id: "wurt_merm_craft", name: "Swamp Construction", description: "Allows drafting specialized wood houses for Merms cheaply.", category: "Crafts", prerequisites: [] },

      // Merm King
      { id: "wurt_king", name: "King's Feast", description: "Feeding the Merm King jam or pies increases his lifespan scale.", category: "Merm King", prerequisites: [] },
      { id: "wurt_guards", name: "Loyal Royal Guards", description: "Enables summoning strong Elite Merm Guards to defend the swamp.", category: "Merm King", prerequisites: ["wurt_king"] },
      { id: "wurt_merm_buff", name: "Royal Buffs", description: "All recruited merm followers deal flat +10% damage.", category: "Merm King", prerequisites: ["wurt_guards"] }
    ],
    layout: {
      columns: [
        {
          title: "Amphibious Senses",
          skills: [
            ["wurt_wet_1", "wurt_wet_2", "wurt_wet_warm"],
            ["wurt_slip_1", "wurt_slip_2", "wurt_water_walk"]
          ]
        },
        {
          title: "Merm Community",
          skills: [
            ["wurt_road", "wurt_merm_craft"],
            ["wurt_frogs"],
            ["wurt_king", "wurt_guards", "wurt_merm_buff"]
          ]
        }
      ]
    }
  },
  {
    id: "wortox",
    name: "Wortox",
    title: "The Soul Starved",
    quote: "Pardon me if I don't shake your hand.",
    description: "Wortox's Skill Tree uses a unique Scales system that will significantly impact his playstyle. Choosing a skill on one side of the scale tips it towards that inclination. Once enough points are put into a side, Wortox will get his inclination changed.",
    avatar: "😈",
    color: {
      primary: "purple-600",
      border: "purple-800",
      bg: "bg-purple-950/20",
      glow: "purple-500/30",
      accent: "text-purple-400"
    },
    categories: [
      { name: "Nice", description: "When Nice inclined, Wortox will no longer be seen as a monster by mobs. Releasing souls gives more sanity." },
      { name: "Naughty", description: "When Naughty inclined, Wortox will be able to hold in a Soul Overload. Eating/releasing souls has no sanity effect." },
      { name: "Neutral", description: "Neutral skills do not impact The Scales in any way, but will contribute towards unlocking skills." },
      { name: "Affinity", description: "Choosing an Affinity will skew the Scales, making it easier to get Naughty or Nice Inclination." }
    ],
    skills: [
      // Nice
      { id: "wortox_lifebringer_1", name: "Lifebringer I", description: "Learn how to channel Souls into a Twintailed Heart, a creation used to revive ghostly friends.", category: "Nice", prerequisites: [] },
      { id: "wortox_lifebringer_2", name: "Lifebringer II", description: "Your ghostly friends will no longer suffer health penalties when you revive them with a Twintailed Heart.", category: "Nice", prerequisites: ["wortox_lifebringer_1"] },
      { id: "wortox_lifebringer_3", name: "Lifebringer III", description: "Allow the Twintailed Heart to be used by another which will pull them to you from near or afar.", category: "Nice", prerequisites: ["wortox_lifebringer_2"], requiredSkillsCount: { count: 5 } },
      
      { id: "wortox_reaching_souls_1", name: "Reaching Souls I", description: "Dropped Souls will heal at an increased range.", category: "Nice", prerequisites: [] },
      { id: "wortox_reaching_souls_2", name: "Reaching Souls II", description: "Dropped Souls will move towards hurt players, and heal at an increased range.", category: "Nice", prerequisites: ["wortox_reaching_souls_1"] },

      { id: "wortox_soul_bastion_1", name: "Soul Bastion I", description: "Dropped Souls will do a second healing wave for a lower amount after a delay.", category: "Nice", prerequisites: ["wortox_reaching_souls_2"], requiredSkillsCount: { count: 5 } },
      { id: "wortox_soul_bastion_2", name: "Soul Bastion II", description: "Dropped Souls will move faster towards hurt players, the second healing wave will happen quicker, and Souls are more efficient at healing multiple players.", category: "Nice", prerequisites: ["wortox_soul_bastion_1"] },
      
      { id: "wortox_lifted_spirits_1", name: "Lifted Spirits I", description: "Souls waiting to be freed in a Soul Echo will enhance your movement speed.", category: "Nice", prerequisites: [] },
      { id: "wortox_lifted_spirits_2", name: "Lifted Spirits II", description: "Soul Echo duration is increased.", category: "Nice", prerequisites: ["wortox_lifted_spirits_1"] },
      
      { id: "wortox_reverberation", name: "Reverberation", description: "Soul Echo will happen a second time. This does not decrease Soul Hop costs from the Map.", category: "Nice", prerequisites: ["wortox_lifted_spirits_2"] },
      { id: "wortox_capricious_movement", name: "Capricious Movement", description: "Soul Hop cost from the Map will be reduced by how much of the current world's land has been explored.", category: "Nice", prerequisites: ["wortox_lifted_spirits_2"] },

      // Neutral
      { id: "wortox_impromptu_flautist", name: "Impromptu Flautist", description: "You periodically feel a musical pull to play your flute. Pan Flutes will not lose durability one time when feeling this urge to play.", category: "Neutral", prerequisites: [] },
      { id: "wortox_pleasant_pastorale", name: "Pleasant Pastorale", description: "Playing your Pan Flute with such pleasing notes will bring lost Souls around for a listen.", category: "Neutral", prerequisites: ["wortox_impromptu_flautist"] },
      { id: "wortox_cloudy_carmen", name: "Cloudy Carmen", description: "Things waking up after your Pan Flute playing will not be able to become hostile towards you for a moment.", category: "Neutral", prerequisites: ["wortox_impromptu_flautist"] },

      // Naughty
      { id: "wortox_knabsacker", name: "Knabsacker", description: "You've hung around Krampus enough to create a Knabsack for your own item stealing desires.", category: "Naughty", prerequisites: [] },
      { id: "wortox_soul_jar", name: "Soul Jar", description: "Learn how to craft and use a Soul Jar to store Souls for later use. Soul Jars will leak Souls over time when not in your inventory.", category: "Naughty", prerequisites: ["wortox_knabsacker"] },
      { id: "wortox_overflowing_greed", name: "Overflowing Greed", description: "Holding Soul Jars increases your maximum Souls allowed to be held at once by 5 each, stopping you from overloading of Soul power.", category: "Naughty", prerequisites: ["wortox_soul_jar"] },
      { id: "wortox_covetous_collector", name: "Covetous Collector", description: "Held Souls and Souls inside of Soul Jars increases both the damage of the Knabsack and the damage of Souls, up to 100 total Souls collected.", category: "Naughty", prerequisites: ["wortox_soul_jar"] },

      { id: "wortox_soul_thief_1", name: "Soul Thief I", description: "Souls are created and attracted to you from further away.", category: "Naughty", prerequisites: [] },
      { id: "wortox_soul_thief_2", name: "Soul Thief II", description: "Souls will last longer while being attracted to you.", category: "Naughty", prerequisites: ["wortox_soul_thief_1"] },

      { id: "wortox_soul_pierce_1", name: "Soul Pierce I", description: "Souls attracted to you will hurt other creatures with Souls along its path.", category: "Naughty", prerequisites: ["wortox_soul_thief_2"], requiredSkillsCount: { count: 5 } },
      { id: "wortox_soul_pierce_2", name: "Soul Pierce II", description: "Souls attracted to you will repel away initially before coming towards you.", category: "Naughty", prerequisites: ["wortox_soul_pierce_1"] },

      { id: "wortox_soul_decoy_1", name: "Soul Decoy I", description: "Soul Hopping creates a Soul Decoy to draw the attention of attacking creatures that possess Souls.", category: "Naughty", prerequisites: [] },
      { id: "wortox_soul_decoy_2", name: "Soul Decoy II", description: "Soul Decoys will stay around for a bit longer if they are unharmed, and damage the thing that hit the Decoy.", category: "Naughty", prerequisites: ["wortox_soul_decoy_1"] },
      { id: "wortox_soul_decoy_3", name: "Soul Decoy III", description: "Soul Decoys will now explode and inflict damage on things lured by it or attacking you upon expiration.", category: "Naughty", prerequisites: ["wortox_soul_decoy_2"], requiredSkillsCount: { count: 5 } },

      // Affinity
      { id: "wortox_shadow_harvester", name: "Shadow Harvester", description: "Souls waiting to be freed in a Soul Echo will cause damage dealt to spread out to close enemies or hit one target twice, and expire the timer.", category: "Affinity", prerequisites: [], conflictNodes: ["wortox_lunar_swindler"], additionalReqs: "Defeat Ancient Fuelweaver" },
      { id: "wortox_lunar_swindler", name: "Lunar Swindler", description: "Souls waiting to be freed in a Soul Echo will absorb incoming damage, and expire the timer.", category: "Affinity", prerequisites: [], conflictNodes: ["wortox_shadow_harvester"], additionalReqs: "Defeat Celestial Champion" }
    ],
    layout: {
      columns: [
        {
          title: "Nice Inclination",
          skills: [
            ["wortox_lifebringer_1", "wortox_lifebringer_2", "wortox_lifebringer_3"],
            ["wortox_reaching_souls_1", "wortox_reaching_souls_2", "wortox_soul_bastion_1", "wortox_soul_bastion_2"],
            ["wortox_lifted_spirits_1", "wortox_lifted_spirits_2", "wortox_reverberation", "wortox_capricious_movement"]
          ]
        },
        {
          title: "Neutral",
          skills: [
            ["wortox_impromptu_flautist", "wortox_pleasant_pastorale", "wortox_cloudy_carmen"]
          ]
        },
        {
          title: "Naughty Inclination",
          skills: [
            ["wortox_knabsacker", "wortox_soul_jar", "wortox_overflowing_greed", "wortox_covetous_collector"],
            ["wortox_soul_thief_1", "wortox_soul_thief_2", "wortox_soul_pierce_1", "wortox_soul_pierce_2"],
            ["wortox_soul_decoy_1", "wortox_soul_decoy_2", "wortox_soul_decoy_3"]
          ]
        },
        {
          title: "Affinities",
          skills: [
            ["wortox_shadow_harvester"],
            ["wortox_lunar_swindler"]
          ]
        }
      ]
    }
  },
  {
    id: "wendy",
    name: "Wendy",
    title: "The Bereaved",
    quote: "Abigail... is that you in the wind?",
    description: "Wendy is haunted by her deceased twin sister Abigail. Her tree lets her customize Abigail's combat style ('Soothe' for defensive tanking versus 'Urge' for offensive speed), upgrade Sisturn parameters, and synthesize spectral elixirs with lightning speed.",
    avatar: "💀",
    color: {
      primary: "slate-500",
      border: "slate-700",
      bg: "bg-slate-950/20",
      glow: "slate-400/30",
      accent: "text-slate-400"
    },
    categories: [
      { name: "Soothe", description: "Abigail gains defensive shields, health multipliers, and taunt abilities." },
      { name: "Urge", description: "Abigail swings much quicker, emits planar fire, and chases retreating foes." },
      { name: "Sisturn", description: "Accelerate sanity recovery around graves, slow flower spoilage, and auto-feed flower petals." },
      { name: "Pipspook", description: "Help lost Pipspook ghosts locate toys faster, earning abundance of Mourning Glory." },
      { name: "Elixirs", description: "Craft highly complex spectral potions in seconds to buff twin mechanics." },
      { name: "Affinity", description: "Saturate Abigail with planar energy, converting her damage type to shadow or lunar flat values." }
    ],
    skills: [
      // Soothe (Gentle)
      { id: "wendy_soothe", name: "Soothe Abigail", description: "Toggle Abigail to a calmer defensive mode. She draws aggro away from Wendy.", category: "Soothe", prerequisites: [] },
      { id: "wendy_gentle_1", name: "Gentle Vigor I", description: "Abigail absorbs 10% more damage from regular monster swipes.", category: "Soothe", prerequisites: ["wendy_soothe"] },
      { id: "wendy_gentle_2", name: "Gentle Vigor II", description: "Abigail's passive health pool receives flat +150 increase.", category: "Soothe", prerequisites: ["wendy_gentle_1"] },
      { id: "wendy_gentle_3", name: "Gentle Vigor III", description: "Abigail heals 2.5 HP per second automatically when she is passive.", category: "Soothe", prerequisites: ["wendy_gentle_2"] },
      { id: "wendy_guard_shield", name: "Guardian Veil", description: "Abigail casts a protective dome shield blocking 3 incoming monster strikes.", category: "Soothe", prerequisites: ["wendy_gentle_3"] },

      // Urge (Aggressive)
      { id: "wendy_urge", name: "Urge Abigail", description: "Toggle Abigail to aggressive fury. She chases objects and strikes faster.", category: "Urge", prerequisites: [] },
      { id: "wendy_aggr_1", name: "Aggressive Vigor I", description: "Abigail's strike speed increases by 15% when attacking.", category: "Urge", prerequisites: ["wendy_urge"] },
      { id: "wendy_aggr_2", name: "Aggressive Vigor II", description: "Abigail's close range melee strikes cause minor splash damage.", category: "Urge", prerequisites: ["wendy_aggr_1"] },
      { id: "wendy_aggr_3", name: "Aggressive Vigor III", description: "Abigail's flat attack rate boosts when enemies get to low health.", category: "Urge", prerequisites: ["wendy_aggr_2"] },
      { id: "wendy_ghost_fire", name: "Spectral Fire", description: "Abigail's strikes set targets on fire with spectral, pale cold light.", category: "Urge", prerequisites: ["wendy_aggr_3"] },

      // Sisturn & Mourning
      { id: "wendy_sist_rememb", name: "Floral Memory", description: "Sisturns stay fully decorated twice as long before decaying.", category: "Sisturn", prerequisites: [] },
      { id: "wendy_sist_aura1", name: "Sisturn Aura I", description: "Wendy regains sanity 20% faster when standing close to a decorated Sisturn.", category: "Sisturn", prerequisites: ["wendy_sist_rememb"] },
      { id: "wendy_sist_aura2", name: "Sisturn Aura II", description: "Sanity aura radius is tripled. Extends cozy feel to whole team.", category: "Sisturn", prerequisites: ["wendy_sist_aura1"] },
      { id: "wendy_recon", name: "Floral Solace", description: "Nearby decayed Sisturns auto-recorate themselves if flowers are in Wendy's pockets.", category: "Sisturn", prerequisites: ["wendy_sist_aura2"] },

      // Pipspook
      { id: "wendy_ghost_guide", name: "Spiritual Guide", description: "Wendy spots hiding Pipspook ghosts on the map with custom symbols.", category: "Pipspook", prerequisites: [] },
      { id: "wendy_toy_finder", name: "Spectral Resonance", description: "Lost toys from Pipspooks hum audibly to assist search operations.", category: "Pipspook", prerequisites: ["wendy_ghost_guide"] },
      { id: "wendy_soul_gather", name: "Glory Gatherer", description: "Earning Mourning Glory yields +25% larger drop amounts.", category: "Pipspook", prerequisites: ["wendy_toy_finder"] },

      // Elixirs
      { id: "wendy_brew_speed", name: "Alchemical Distiller", description: "Crafting sisterly elixirs consumes 50% shorter crafting times.", category: "Elixirs", prerequisites: [] },
      { id: "wendy_elixir_1", name: "Elixir Synthesis I", description: "Synthesize Distilled Vengeance to cause backfire damage.", category: "Elixirs", prerequisites: ["wendy_brew_speed"] },
      { id: "wendy_elixir_2", name: "Elixir Synthesis II", description: "Synthesize Spectral Cure-all to rapidly heal Abigail in battle.", category: "Elixirs", prerequisites: ["wendy_elixir_1"] },
      { id: "wendy_mastery", name: "Distillation Master", description: "Unlocks synthesis of powerful Nightshade Nosegays for planar spikes.", category: "Elixirs", prerequisites: ["wendy_elixir_2"] },

      // Affinity
      { id: "wendy_shadow_mourn", name: "Shadow Mourner", description: "Abigail deals Shadow Planar damage, shredding lunar foes.", category: "Affinity", prerequisites: [], requiredSkillsCount: { count: 12 }, conflictNodes: ["wendy_lunar_mourn"], additionalReqs: "Defeat Fuelweaver" },
      { id: "wendy_shadow_app", name: "Shadow Apparition", description: "Wendy gains +10 Planar Spell Armor when walking close to Abigail.", category: "Affinity", prerequisites: ["wendy_shadow_mourn"], conflictNodes: ["wendy_lunar_mourn"] },
      { id: "wendy_lunar_mourn", name: "Lunar Mourner", description: "Abigail deals Lunar Planar damage, shattering shadow mobs.", category: "Affinity", prerequisites: [], requiredSkillsCount: { count: 12 }, conflictNodes: ["wendy_shadow_mourn"], additionalReqs: "Defeat Celestial Champion" },
      { id: "wendy_lunar_app", name: "Lunar Apparition", description: "Abigail's strikes apply glowing debuffs that lower monster speeds.", category: "Affinity", prerequisites: ["wendy_lunar_mourn"], conflictNodes: ["wendy_shadow_mourn"] }
    ],
    layout: {
      columns: [
        {
          title: "Sisterly Directives (Soothe vs Urge)",
          skills: [
            ["wendy_soothe", "wendy_gentle_1", "wendy_gentle_2", "wendy_gentle_3", "wendy_guard_shield"],
            ["wendy_urge", "wendy_aggr_1", "wendy_aggr_2", "wendy_aggr_3", "wendy_ghost_fire"]
          ]
        },
        {
          title: "Memorials & Ghostly Lore",
          skills: [
            ["wendy_sist_rememb", "wendy_sist_aura1", "wendy_sist_aura2", "wendy_recon"],
            ["wendy_ghost_guide", "wendy_toy_finder", "wendy_soul_gather"]
          ]
        },
        {
          title: "Apothecary Crafting",
          skills: [
            ["wendy_brew_speed", "wendy_elixir_1", "wendy_elixir_2", "wendy_mastery"]
          ]
        },
        {
          title: "Planar Sisterhood",
          skills: [
            ["wendy_shadow_mourn", "wendy_shadow_app"],
            ["wendy_lunar_mourn", "wendy_lunar_app"]
          ]
        }
      ]
    }
  }
];
