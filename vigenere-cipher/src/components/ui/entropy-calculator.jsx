import { Zap, AlertTriangle } from 'lucide-react'

export function EntropyCalculator({ keyValue }) {
  const calculateEntropy = (key) => {
    if (!key) return 0

    const cleanKey = key.replace(/[^a-zA-Z0-9]/g, '')
    const charSet = new Set(cleanKey.toUpperCase())
    
    // Possible character set size
    let possibleChars = 0
    if (/[a-z]/.test(key)) possibleChars += 26
    if (/[A-Z]/.test(key)) possibleChars += 26
    if (/[0-9]/.test(key)) possibleChars += 10
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(key)) possibleChars += 32

    // Shannon entropy
    const frequencies = {}
    for (const char of cleanKey.toUpperCase()) {
      frequencies[char] = (frequencies[char] || 0) + 1
    }

    let shannonEntropy = 0
    for (const freq of Object.values(frequencies)) {
      const p = freq / cleanKey.length
      shannonEntropy -= p * Math.log2(p)
    }

    // Total entropy bits
    const totalEntropy = cleanKey.length * Math.log2(possibleChars)

    return {
      totalEntropy: Math.round(totalEntropy),
      shannonEntropy: shannonEntropy.toFixed(2),
      uniqueChars: charSet.size,
      keyLength: cleanKey.length,
      possibleChars
    }
  }

  const entropy = calculateEntropy(keyValue)

  if (!keyValue) return null

  // Entropy rating
  const getEntropyRating = (bits) => {
    if (bits < 30) return { label: 'Low', color: 'text-red-400', bg: 'bg-red-500/20' }
    if (bits < 60) return { label: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    if (bits < 100) return { label: 'Good', color: 'text-green-400', bg: 'bg-green-500/20' }
    return { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-500/20' }
  }

  const rating = getEntropyRating(entropy.totalEntropy)

  return (
    <div className="space-y-3 mt-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className={`w-4 h-4 ${rating.color}`} />
          <span className={`text-sm font-medium ${rating.color}`}>
            Entropy: {entropy.totalEntropy} bits ({rating.label})
          </span>
        </div>
      </div>

      {/* Entropy bar */}
      <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full ${rating.color.replace('text-', 'bg-')} transition-all duration-500`}
          style={{ width: `${Math.min((entropy.totalEntropy / 120) * 100, 100)}%` }}
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
        <div>Key Length: <span className="text-neutral-200 font-mono">{entropy.keyLength}</span></div>
        <div>Unique Chars: <span className="text-neutral-200 font-mono">{entropy.uniqueChars}</span></div>
        <div>Shannon Entropy: <span className="text-neutral-200 font-mono">{entropy.shannonEntropy}</span></div>
        <div>Possible Chars: <span className="text-neutral-200 font-mono">{entropy.possibleChars}</span></div>
      </div>

      {entropy.totalEntropy < 60 && (
        <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/50 rounded p-2">
          <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <span className="text-xs text-yellow-300">Entropy below 60 bits. Use longer or more varied keys.</span>
        </div>
      )}
    </div>
  )
}
