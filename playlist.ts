export type Track = {
  id: number;
  title: string;
  /** No per-song artist credits were supplied, so every track carries the
   *  playlist's own name as its subtitle rather than a guessed-at artist. */
  subtitle: string;
  /** Deterministic placeholder duration (mm:ss) since no audio files were provided. */
  duration: string;
};

const RAW_TITLES: string[] = [
  "Aaoge Tum Kabhi", "Choo Lo", "Kya Hua Tera Wada", "Meri Banogi Kya", "Raabta",
  "Khulke Jeene Ka", "Raanjhanaa", "Aaja Piya Tohe Pyar Doon", "Ajib Dastan Hai Yeh",
  "Ham Tere Pyar Mein", "Pal Pal Dil Ke Paas", "Maskhari", "Lag Ja Gale Se Phir",
  "Oboseshe", "A Thousand Years", "Tumi Aashe Paashe", "Yeh Fitoor Mera", "Gulbahar",
  "Jawl Phoring 2.0", "As It Was", "Golden Brown - Slowed Down Version",
  "Shudhu Tomakei Bhalobese", "Jodi Abar", "Egiye De", "Darkhaast",
  "Long Distance Love | Coke Studio Bangla", "BIRDS OF A FEATHER", "Bariye Dao",
  "Ekhon Onek Raat", "Kun Faya Kun", "Ei Srabon", "Bye", "Preet Re", "O Bekhabar",
  "Parbona", "blue (with MINNIE)", "Perfect", "Night Changes", "Haal Kaisa Hai Janab Ka",
  "Aaoge Jab Tum", "Baarishein", "Jage Re (Male)", "Prithibi Ta Naki Chhoto Hote Hote",
  "Arz Kiya Hai | Coke Studio Bharat", "Mitwa", "Iktara", "Bus Sohokari",
  "Jane Woh Kaise Log The", "Tera Mera Pyar Amar", "Aashiq Tera", "Meri Kahani",
  "Hawaayein", "Itna Na Mujhse Tu Pyar Badha", "Beggin'", "Bade Acche Lagte Hain",
  "Abhi Na Jao Chhod Kar", "Hua Hain Aaj Pehli Baar", "Dil To Bachcha Hai",
  "Yahan Koi Nahi", "Ishq Risk", "Chaar Kadam", "Lae Dooba", "Chahun Main Ya Naa",
  "O Meri Laila", "Unse Jaake Kehdo", "Dekha Hi Nahi", "Dhadak - Title Track",
  "Pehli Baar", "Rabba", "Pehla Pyaar", "Hona Tha Pyar", "Pee Loon",
  "Tera Hone Laga Hoon", "Aashona", "Hote Paare Na", "Ajab Si", "Pehli Dafa",
  "Labon Ko", "Tere Liye", "Te Amo (Duet)", "Jab Tak", "Love Me Not", "Samjhawan",
  "Bahon Mein Chale Aao", "Kete Geche Din", "Kehne Lagaa", "Tomar Pichu Charbo Na",
  "Kothin", "Ki Name Deke Bolbo Tomake", "Dariya", "Dil Se Dil", "Channa Ve",
  "Naino Ne Baandhi", "Sang Rahiyo", "Yeh Dil Deewana", "Pink Lips",
  "Subha Hone Na De", "Barbaadiyan", "Ishq Bulaava", "Ishaqzaade", "Sada Kalo Prem",
  "Zaalima", "Mast Magan", "Main Hoon Saath Tere", "Toota Jo Kabhi Tara", "Sab Tera",
  "Dagabaaz Re", "Tum Ho",
];

export const PLAYLIST_NAME = "Dolyy's playlist";

/** Deterministic mm:ss so re-renders never jitter; swap for real metadata later. */
function fakeDuration(seed: number): string {
  const totalSeconds = 150 + ((seed * 37) % 150); // 2:30–5:00 range
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const playlist: Track[] = RAW_TITLES.map((title, i) => ({
  id: i + 1,
  title,
  subtitle: PLAYLIST_NAME,
  duration: fakeDuration(i + 1),
}));
