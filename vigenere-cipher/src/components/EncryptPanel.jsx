import { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner'
import { encryptVigenere, validateKey } from '../utils/vigenere'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KeyStrengthMeter } from '@/components/ui/key-strength-meter'
import { EntropyCalculator } from '@/components/ui/entropy-calculator'  // NEW
import { KeyValidationChecklist } from '@/components/ui/key-validation'  // NEW
import { KeyGenerator } from '@/components/ui/key-generator'
import { AnimatedText } from '@/components/ui/animated-text'
import { Lock, AlertCircle, Copy, CheckCircle } from 'lucide-react'

function EncryptPanel() {
  const [plaintext, setPlaintext] = useState('')
  const [key, setKey] = useState('')
  const [ciphertext, setCiphertext] = useState('')
  const [error, setError] = useState('')
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(50)
  const resultRef = useRef(null)

  useEffect(() => {
    if (ciphertext && resultRef.current) {
      resultRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      })
    }
  }, [ciphertext])

  const handleEncrypt = () => {
    setError('')
    
    if (!plaintext.trim()) {
      setError('Please enter text to encrypt')
      toast.error('Please enter text to encrypt')
      return
    }
    
    if (!validateKey(key)) {
      setError('Key must contain at least one alphabetic character')
      toast.error('Invalid key format')
      return
    }
    
    const cleanKeyLength = key.replace(/[^a-zA-Z]/g, '').length
    if (cleanKeyLength < 10) {
      setError('Key must be at least 10 letters for security')
      toast.error('Key too short! Use at least 10 letters or click "Generate Key"')
      return
    }
    
    const result = encryptVigenere(plaintext, key)
    
    if (showAnimation) {
      setCiphertext('')
      setTimeout(() => setCiphertext(result), 100)
    } else {
      setCiphertext(result)
    }
    
    toast.success('Message encrypted successfully!', {
      icon: <Lock className="w-4 h-4" />
    })
  }

  const handleClear = () => {
    setPlaintext('')
    setKey('')
    setCiphertext('')
    setError('')
    toast.info('Cleared all fields')
  }

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard!`, {
        icon: <CheckCircle className="w-4 h-4" />
      })
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleKeyGenerate = (newKey) => {
    setKey(newKey)
    toast.success('Secure key generated!', {
      description: newKey,
      icon: <CheckCircle className="w-4 h-4" />
    })
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-500">
          <Lock className="w-6 h-6" />
          Encrypt Message
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="plaintext" className="block text-sm font-medium text-neutral-300 mb-2">
            Plaintext
          </label>
          <textarea
            id="plaintext"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-neutral-100 font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            placeholder="Enter your message here..."
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            rows="6"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="encrypt-key" className="block text-sm font-medium text-neutral-300">
              Encryption Key
            </label>
            <div className="flex gap-2">
              <KeyGenerator onGenerate={handleKeyGenerate} />
              {key && (
                <button
                  onClick={() => copyToClipboard(key, 'Key')}
                  className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-neutral-300 rounded-lg border border-zinc-700 transition-all text-sm"
                  type="button"
                >
                  <Copy className="w-4 h-4" />
                  Copy Key
                </button>
              )}
            </div>
          </div>
          <input
            id="encrypt-key"
            type="text"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-neutral-100 font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter key (e.g., LEMON)"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          
          {/* NEW: Security Features */}
          {key && (
            <>
              <KeyStrengthMeter keyValue={key} />
              <EntropyCalculator keyValue={key} />
              <KeyValidationChecklist keyValue={key} />
            </>
          )}
        </div>

        {/* Animation Toggle */}
        <div className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showAnimation}
              onChange={(e) => setShowAnimation(e.target.checked)}
              className="w-4 h-4 accent-green-500"
            />
            <span className="text-sm text-neutral-300">Enable Animation Mode</span>
          </label>
          
          {showAnimation && (
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-xs text-neutral-400">Speed:</label>
              <input
                type="range"
                min="10"
                max="1000"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-24 accent-green-500"
              />
              <span className="text-xs text-neutral-400 w-16">{animationSpeed}ms</span>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button 
            onClick={handleEncrypt}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all"
          >
            Encrypt
          </button>
          <button 
            onClick={handleClear}
            className="flex-1 bg-zinc-800 text-neutral-300 font-bold py-3 rounded-lg hover:bg-zinc-700 border border-zinc-700 transition-all"
          >
            Clear
          </button>
        </div>

        {ciphertext && (
          <div className="mt-6 pt-6 border-t border-zinc-800" ref={resultRef}>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-neutral-300">
                Encrypted Ciphertext
              </label>
              <button
                onClick={() => copyToClipboard(ciphertext, 'Ciphertext')}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-neutral-300 rounded-lg border border-zinc-700 transition-all text-sm"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
            <div className="bg-zinc-950 border-2 border-green-500 rounded-lg p-4 text-green-400 text-lg break-all shadow-lg shadow-green-500/20 min-h-[60px]">
              {showAnimation ? (
                <AnimatedText text={ciphertext} speed={animationSpeed} className="text-green-400" />
              ) : (
                ciphertext
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default EncryptPanel
