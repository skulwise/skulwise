"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase" // Import Supabase client

interface OfflineAction {
  id: string
  type: "STUDY_SESSION" | "FLASHCARD_PROGRESS" | "XP_UPDATE" // Define specific action types
  data: any // Payload for the action
  timestamp: number
}

export function useOfflineStorage() {
  const [offlineActions, setOfflineActions] = useState<OfflineAction[]>([])
  const [isOnline, setIsOnline] = useState(true)

  // Function to process and sync a single action
  const processAction = async (action: OfflineAction) => {
    try {
      switch (action.type) {
        case "STUDY_SESSION":
          console.log("Attempting to sync study session:", action.data)
          const { error: sessionError } = await supabase.from("study_sessions").insert({
            user_id: action.data.userId,
            subject: action.data.subject,
            topic: action.data.topic,
            duration_minutes: action.data.duration,
            xp_earned: action.data.xpEarned,
            session_type: action.data.sessionType,
            completed_at: new Date(action.data.completedAt).toISOString(),
          })
          if (sessionError) throw sessionError
          console.log("Study session synced successfully:", action.data)
          break
        case "FLASHCARD_PROGRESS":
          console.log("Attempting to sync flashcard progress:", action.data)
          // For flashcard progress, we'll increment counters on the existing card
          // This assumes the card already exists in the DB.
          // In a real app, you might fetch the card first, then update.
          const { data: existingCard, error: fetchError } = await supabase
            .from("flashcards")
            .select("times_reviewed, times_correct")
            .eq("id", action.data.cardId)
            .eq("user_id", action.data.userId)
            .single()

          if (fetchError && fetchError.code !== "PGRST116") {
            // PGRST116 means no rows found
            throw fetchError
          }

          const newTimesReviewed = existingCard ? existingCard.times_reviewed + 1 : 1
          const newTimesCorrect = existingCard
            ? existingCard.times_correct + (action.data.actionType === "got-it" ? 1 : 0)
            : action.data.actionType === "got-it"
              ? 1
              : 0

          const { error: updateError } = await supabase
            .from("flashcards")
            .update({
              times_reviewed: newTimesReviewed,
              times_correct: newTimesCorrect,
              last_reviewed: new Date(action.data.timestamp).toISOString(),
            })
            .eq("id", action.data.cardId)
            .eq("user_id", action.data.userId)

          if (updateError) throw updateError
          console.log("Flashcard progress synced successfully:", action.data)
          break
        case "XP_UPDATE":
          console.log("Attempting to sync XP update:", action.data)
          // This would typically be handled by a server-side function or trigger
          // based on study sessions/flashcards. For demonstration, we'll update directly.
          const { error: xpError } = await supabase
            .from("user_profiles")
            .update({
              xp_points: action.data.newXp,
            })
            .eq("id", action.data.userId)
          if (xpError) throw xpError
          console.log("XP update synced successfully:", action.data)
          break
        default:
          console.warn("Unknown offline action type:", action.type)
      }
      return true // Action processed successfully
    } catch (error) {
      console.error("Failed to process offline action:", action, error)
      return false // Action failed
    }
  }

  const syncOfflineActions = useCallback(async () => {
    if (offlineActions.length === 0 || !isOnline) return

    console.log("Attempting to sync offline actions...")
    const successfulActionIds: string[] = []

    for (const action of offlineActions) {
      const success = await processAction(action)
      if (success) {
        successfulActionIds.push(action.id)
      }
    }

    // Remove successfully processed actions from the queue
    if (successfulActionIds.length > 0) {
      const remainingActions = offlineActions.filter((action) => !successfulActionIds.includes(action.id))
      setOfflineActions(remainingActions)
      localStorage.setItem("skulwise-offline-actions", JSON.stringify(remainingActions))
      console.log(`Synced ${successfulActionIds.length} actions. ${remainingActions.length} remaining.`)
    } else {
      console.log("No actions synced in this attempt.")
    }
  }, [offlineActions, isOnline]) // Depend on offlineActions and isOnline

  useEffect(() => {
    // Load offline actions from localStorage on mount
    const stored = localStorage.getItem("skulwise-offline-actions")
    if (stored) {
      setOfflineActions(JSON.parse(stored))
    }

    // Monitor online status
    const handleOnline = () => {
      setIsOnline(true)
      // Give a small delay to ensure network is stable before syncing
      setTimeout(syncOfflineActions, 1000)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    setIsOnline(navigator.onLine)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial sync attempt if online
    if (navigator.onLine) {
      syncOfflineActions()
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [syncOfflineActions]) // Depend on syncOfflineActions

  const addOfflineAction = (type: OfflineAction["type"], data: any) => {
    const action: OfflineAction = {
      id: Date.now().toString(), // Unique ID for each action
      type,
      data,
      timestamp: Date.now(),
    }

    const newActions = [...offlineActions, action]
    setOfflineActions(newActions)
    localStorage.setItem("skulwise-offline-actions", JSON.stringify(newActions))
    console.log("Offline action added:", action)

    // If online, try to sync immediately
    if (isOnline) {
      syncOfflineActions()
    }
  }

  return {
    isOnline,
    offlineActions,
    addOfflineAction,
    syncOfflineActions,
  }
}
