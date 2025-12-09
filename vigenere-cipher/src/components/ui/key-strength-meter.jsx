import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react'

export function KeyStrengthMeter({ keyValue }) {
  const calculateStrength = (key) => {
    if (!key) return { level: 0, label: 'No Key', color: 'text-gray-500', bg: 'bg-gray-500' }
    
    let score = 0
    const length = key.replace(/[^a-zA-Z]/g, '').length
    
    // Length scoring
    if (length >= 15) score += 3
    else if (length >= 10) score += 2
    else if (length >= 5) score += 1
    
    // Character variety
    const hasUpper = /[A-Z]/.test(key)
    const hasLower = /[a-z]/.test(key)
    const hasNumbers = /[0-9]/.test(key)
    
    if (hasUpper && hasLower) score += 1
    if (hasNumbers) score += 1
    
    // Unique characters
    const uniqueChars = new Set(key.toUpperCase().replace(/[^A-Z]/g, '')).size
    if (uniqueChars >= 10) score += 1
    
    // Determine strength level
    if (score <= 2) return { 
      level: 1, 
      label: 'Weak', 
      color: 'text-red-400', 
      bg: 'bg-red-500',
      icon: AlertTriangle,
      width: '33%'
    }
    if (score <= 4) return { 
      level: 2, 
      label: 'Medium', 
      color: 'text-yellow-400', 
      bg: 'bg-yellow-500',
      icon: Shield,
      width: '66%'
    }
    return { 
      level: 3, 
      label: 'Strong', 
      color: 'text-green-400', 
      bg: 'bg-green-500',
      icon: CheckCircle2,
      width: '100%'
    }
  }

  const strength = calculateStrength(keyValue)
  const Icon = strength.icon

  if (!keyValue) return null

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className={`w-4 h-4 ${strength.color}`} />}
          <span className={`text-sm font-medium ${strength.color}`}>
            Key Strength: {strength.label}
          </span>
        </div>
        <span className="text-xs text-neutral-500">
          {keyValue.replace(/[^a-zA-Z]/g, '').length} chars
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full ${strength.bg} transition-all duration-500 ease-out`}
          style={{ width: strength.width }}
        />
      </div>

      {/* Tips */}
      {strength.level < 3 && (
        <div className="text-xs text-neutral-500 space-y-1">
          {strength.level === 1 && (
            <>
              <p>💡 Tip: Use at least 10 letters for better security</p>
              <p>💡 Mix uppercase and lowercase letters</p>
            </>
          )}
          {strength.level === 2 && (
            <p>💡 Add more unique characters for maximum strength</p>
          )}
        </div>
      )}
    </div>
  )
}
