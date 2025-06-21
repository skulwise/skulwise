import { ProtectedRoute } from "@/components/auth/protected-route"
import FlashcardsContent from "@/components/flashcards-content"

export default function FlashcardsPage() {
  return (
    <ProtectedRoute>
      <FlashcardsContent />
    </ProtectedRoute>
  )
}
