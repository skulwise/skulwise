export interface UserStats {
  totalXP: number;
  level: number;
  streak: number;
  notesProcessed: number;
  flashcardsCompleted: number;
  lastActivityDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  unlockedDate?: string;
}

// XP rewards for different actions
export const XP_REWARDS = {
  UPLOAD_NOTES: 10,
  COMPLETE_FLASHCARD: 5,
  DAILY_STREAK: 15,
  WEEKLY_STREAK: 50,
  GENERATE_AUDIO: 8,
  STUDY_SESSION_COMPLETE: 20,
} as const;

// Level calculation: 100 XP for level 1, then 50 more XP for each subsequent level
export function calculateLevel(totalXP: number): number {
  if (totalXP < 100) return 1;
  return Math.floor((totalXP - 100) / 50) + 2;
}

export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel === 1) return 100;
  return 100 + (currentLevel - 1) * 50;
}

export function getXPProgress(totalXP: number, currentLevel: number): number {
  const xpForCurrentLevel = getXPForNextLevel(currentLevel - 1);
  const xpForNextLevel = getXPForNextLevel(currentLevel);
  const progressXP = totalXP - xpForCurrentLevel;
  const neededXP = xpForNextLevel - xpForCurrentLevel;
  return Math.min(100, (progressXP / neededXP) * 100);
}

export function addXP(currentStats: UserStats, xpAmount: number, action: string): UserStats {
  const newTotalXP = currentStats.totalXP + xpAmount;
  const newLevel = calculateLevel(newTotalXP);
  const today = new Date().toISOString().split('T')[0];
  
  // Check for streak
  const lastActivityDate = new Date(currentStats.lastActivityDate);
  const todayDate = new Date(today);
  const daysDiff = Math.floor((todayDate.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let newStreak = currentStats.streak;
  if (daysDiff === 1) {
    // Consecutive day
    newStreak += 1;
  } else if (daysDiff > 1) {
    // Streak broken
    newStreak = 1;
  }
  // If daysDiff === 0, it's the same day, don't change streak

  // Update activity-specific counters
  let notesProcessed = currentStats.notesProcessed;
  let flashcardsCompleted = currentStats.flashcardsCompleted;
  
  if (action === 'UPLOAD_NOTES') {
    notesProcessed += 1;
  } else if (action === 'COMPLETE_FLASHCARD') {
    flashcardsCompleted += 1;
  }

  return {
    totalXP: newTotalXP,
    level: newLevel,
    streak: newStreak,
    notesProcessed,
    flashcardsCompleted,
    lastActivityDate: today,
  };
}

export function getDefaultAchievements(): Achievement[] {
  return [
    {
      id: 'first_upload',
      title: 'First Steps',
      description: 'Upload your first set of notes',
      icon: '📚',
      xpReward: 20,
      unlocked: false,
    },
    {
      id: 'flashcard_master',
      title: 'Flashcard Master',
      description: 'Complete 50 flashcards',
      icon: '🎴',
      xpReward: 100,
      unlocked: false,
    },
    {
      id: 'week_streak',
      title: 'Week Warrior',
      description: 'Maintain a 7-day study streak',
      icon: '🔥',
      xpReward: 150,
      unlocked: false,
    },
    {
      id: 'level_up',
      title: 'Rising Scholar',
      description: 'Reach level 5',
      icon: '⭐',
      xpReward: 200,
      unlocked: false,
    },
    {
      id: 'audio_lover',
      title: 'Audio Enthusiast',
      description: 'Generate 25 audio summaries',
      icon: '🎧',
      xpReward: 120,
      unlocked: false,
    },
    {
      id: 'knowledge_seeker',
      title: 'Knowledge Seeker',
      description: 'Process 100 sets of notes',
      icon: '🧠',
      xpReward: 300,
      unlocked: false,
    },
  ];
}

export function checkAchievements(stats: UserStats, achievements: Achievement[]): Achievement[] {
  const updatedAchievements = [...achievements];
  const today = new Date().toISOString();

  updatedAchievements.forEach((achievement) => {
    if (achievement.unlocked) return;

    let shouldUnlock = false;

    switch (achievement.id) {
      case 'first_upload':
        shouldUnlock = stats.notesProcessed >= 1;
        break;
      case 'flashcard_master':
        shouldUnlock = stats.flashcardsCompleted >= 50;
        break;
      case 'week_streak':
        shouldUnlock = stats.streak >= 7;
        break;
      case 'level_up':
        shouldUnlock = stats.level >= 5;
        break;
      case 'audio_lover':
        // This would need additional tracking for audio generations
        shouldUnlock = false; // Placeholder
        break;
      case 'knowledge_seeker':
        shouldUnlock = stats.notesProcessed >= 100;
        break;
    }

    if (shouldUnlock) {
      achievement.unlocked = true;
      achievement.unlockedDate = today;
    }
  });

  return updatedAchievements;
}