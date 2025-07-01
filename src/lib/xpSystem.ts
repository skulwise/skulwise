export interface UserXP {
  totalXP: number;
  level: number;
  currentLevelXP: number;
  xpToNextLevel: number;
  streak: number;
  lastActivity: Date;
}

export interface XPActivity {
  type: 'upload_notes' | 'complete_flashcard' | 'daily_login' | 'study_session';
  points: number;
  description: string;
}

// XP values for different activities
export const XP_VALUES: Record<XPActivity['type'], number> = {
  upload_notes: 50,
  complete_flashcard: 10,
  daily_login: 20,
  study_session: 30,
};

// XP required for each level (exponential growth)
export const getXPRequiredForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Calculate total XP required to reach a specific level
export const getTotalXPForLevel = (level: number): number => {
  let totalXP = 0;
  for (let i = 1; i < level; i++) {
    totalXP += getXPRequiredForLevel(i);
  }
  return totalXP;
};

// Calculate user level from total XP
export const calculateLevel = (totalXP: number): number => {
  let level = 1;
  let xpUsed = 0;
  
  while (xpUsed + getXPRequiredForLevel(level) <= totalXP) {
    xpUsed += getXPRequiredForLevel(level);
    level++;
  }
  
  return level;
};

// Calculate current progress within the level
export const calculateLevelProgress = (totalXP: number): {
  level: number;
  currentLevelXP: number;
  xpToNextLevel: number;
  progressPercentage: number;
} => {
  const level = calculateLevel(totalXP);
  const totalXPForCurrentLevel = getTotalXPForLevel(level);
  const currentLevelXP = totalXP - totalXPForCurrentLevel;
  const xpRequiredForNextLevel = getXPRequiredForLevel(level);
  const xpToNextLevel = xpRequiredForNextLevel - currentLevelXP;
  const progressPercentage = (currentLevelXP / xpRequiredForNextLevel) * 100;

  return {
    level,
    currentLevelXP,
    xpToNextLevel,
    progressPercentage: Math.min(100, Math.max(0, progressPercentage)),
  };
};

// Add XP to user's total
export const addXP = (currentXP: number, activity: XPActivity['type']): {
  newTotalXP: number;
  xpGained: number;
  leveledUp: boolean;
  newLevel: number;
} => {
  const xpGained = XP_VALUES[activity];
  const newTotalXP = currentXP + xpGained;
  
  const oldLevel = calculateLevel(currentXP);
  const newLevel = calculateLevel(newTotalXP);
  const leveledUp = newLevel > oldLevel;

  return {
    newTotalXP,
    xpGained,
    leveledUp,
    newLevel,
  };
};

// Check if user maintains daily streak
export const updateStreak = (lastActivity: Date): {
  newStreak: number;
  streakBroken: boolean;
  bonusXP: number;
} => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastActivityDate = new Date(lastActivity);
  const daysSinceLastActivity = Math.floor(
    (now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceLastActivity === 1) {
    // Continued streak
    return {
      newStreak: 1, // This would be incremented in the calling function
      streakBroken: false,
      bonusXP: 10, // Bonus XP for maintaining streak
    };
  } else if (daysSinceLastActivity > 1) {
    // Streak broken
    return {
      newStreak: 1,
      streakBroken: true,
      bonusXP: 0,
    };
  } else {
    // Same day activity
    return {
      newStreak: 0, // No change to streak
      streakBroken: false,
      bonusXP: 0,
    };
  }
};

// Get user's achievements based on their stats
export const getUserAchievements = (userXP: UserXP): string[] => {
  const achievements: string[] = [];
  
  if (userXP.level >= 5) achievements.push('Scholar');
  if (userXP.level >= 10) achievements.push('Expert');
  if (userXP.level >= 20) achievements.push('Master');
  
  if (userXP.streak >= 7) achievements.push('Week Warrior');
  if (userXP.streak >= 30) achievements.push('Monthly Master');
  if (userXP.streak >= 100) achievements.push('Centurion');
  
  if (userXP.totalXP >= 1000) achievements.push('Knowledge Seeker');
  if (userXP.totalXP >= 5000) achievements.push('Wisdom Collector');
  if (userXP.totalXP >= 10000) achievements.push('Encyclopedia');
  
  return achievements;
};