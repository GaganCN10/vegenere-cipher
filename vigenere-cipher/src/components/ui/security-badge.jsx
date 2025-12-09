import { Shield, Lock, Globe } from 'lucide-react'

export function SecurityBadge() {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/50 rounded-full text-xs">
        <Shield className="w-4 h-4 text-green-400" />
        <span className="text-green-400 font-medium">Client-Side Only</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/50 rounded-full text-xs">
        <Lock className="w-4 h-4 text-blue-400" />
        <span className="text-blue-400 font-medium">No Server Storage</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/50 rounded-full text-xs">
        <Globe className="w-4 h-4 text-purple-400" />
        <span className="text-purple-400 font-medium">HTTPS Recommended</span>
      </div>
    </div>
  )
}
