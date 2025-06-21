import { ProtectedRoute } from "@/components/auth/protected-route"
import UploadContent from "@/components/upload-content"

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <UploadContent />
    </ProtectedRoute>
  )
}
