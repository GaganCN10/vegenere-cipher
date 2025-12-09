import { CheckCircle2, AlertCircle } from 'lucide-react'

export function KeyValidationChecklist({ keyValue }) {
  const checks = {
    minLength: keyValue.length >= 15,
    hasUpperCase: /[A-Z]/.test(keyValue),
    hasLowerCase: /[a-z]/.test(keyValue),
    hasNumbers: /[0-9]/.test(keyValue),
    hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(keyValue),
    noRepetition: !/(.)(\1{3,})/.test(keyValue), // No 4+ repeated chars
  }

  const passedChecks = Object.values(checks).filter(Boolean).length
  const totalChecks = Object.keys(checks).length

  return (
    <div className="space-y-2 mt-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-neutral-300">Security Checklist</span>
        <span className="text-xs text-neutral-400">{passedChecks}/{totalChecks}</span>
      </div>

      <div className="space-y-2">
        {[
          { key: 'minLength', label: '15+ characters' },
          { key: 'hasUpperCase', label: 'Has UPPERCASE' },
          { key: 'hasLowerCase', label: 'Has lowercase' },
          { key: 'hasNumbers', label: 'Has numbers (0-9)' },
          { key: 'hasSpecialChars', label: 'Has special chars (!@#...)' },
          { key: 'noRepetition', label: 'No 4+ repeated chars' },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            {checks[key] ? (
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-neutral-500 flex-shrink-0" />
            )}
            <span className={checks[key] ? 'text-green-400' : 'text-neutral-500'}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {passedChecks === totalChecks && (
        <div className="mt-2 p-2 bg-green-500/10 border border-green-500/50 rounded text-xs text-green-400 font-medium">
          ✓ All security criteria met!
        </div>
      )}
    </div>
  )
}
