import { ProtectedRoute } from "@/components/auth/protected-route"
import DashboardContent from "@/components/dashboard-content"

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
