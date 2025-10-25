export interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  level: number;
  level_name: string;
  total_xp: number;
  xp_for_next_level: number;
  badges: string[];
  profile: UserProfile;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  notification_enabled: boolean;
  audio_processing_preference: "fast" | "balanced" | "accurate";
  profile_visibility: "public" | "private" | "friends";
  total_presentations: number;
  total_recordings: number;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  level: number;
  level_name: string;
  total_xp: number;
  xp_for_next_level: number;
  badges: string[];
  presentations_count: number;
  recordings_count: number;
  improvement_rate: number;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
  message: string;
}

export interface UserUpdateData {
  first_name?: string;
  last_name?: string;
  username?: string;
  profile?: Partial<UserProfile>;
}
