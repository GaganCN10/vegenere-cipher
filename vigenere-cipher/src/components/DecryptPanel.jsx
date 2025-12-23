import { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner'
import { decryptVigenere, validateKey } from '../utils/vigenere'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KeyStrengthMeter } from '@/components/ui/key-strength-meter'
import { AnimatedText } from '@/components/ui/animated-text'
import { Unlock, AlertCircle, Copy, CheckCircle } from 'lucide-react'

function DecryptPanel() {
  const [ciphertext, setCiphertext] = useState('')
  const [key, setKey] = useState('')
  const [plaintext, setPlaintext] = useState('')
  const [error, setError] = useState('')
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(50)
  const resultRef = useRef(null)

  useEffect(() => {
    if (plaintext && resultRef.current) {
      resultRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      })
    }
  }, [plaintext])

  const handleDecrypt = () => {
    setError('')
    
    if (!ciphertext.trim()) {
      setError('Please enter ciphertext to decrypt')
      toast.error('Please enter ciphertext to decrypt')
      return
    }
    
    if (!validateKey(key)) {
      setError('Key must contain at least one alphabetic character')
      toast.error('Invalid key format')
      return
    }
    
    const result = decryptVigenere(ciphertext, key)
    
    if (showAnimation) {
      setPlaintext('')
      setTimeout(() => setPlaintext(result), 100)
    } else {
      setPlaintext(result)
    }
    
    toast.success('Message decrypted successfully!', {
      icon: <Unlock className="w-4 h-4" />
    })
  }

  const handleClear = () => {
    setCiphertext('')
    setKey('')
    setPlaintext('')
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

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Unlock className="w-6 h-6" />
          Decrypt Message
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="ciphertext" className="block text-sm font-medium text-neutral-300 mb-2">
            Ciphertext
          </label>
          <textarea
            id="ciphertext"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-neutral-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
            placeholder="Enter encrypted message here..."
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            rows="6"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="decrypt-key" className="block text-sm font-medium text-neutral-300">
              Decryption Key
            </label>
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
          <input
            id="decrypt-key"
            type="text"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-neutral-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter key (e.g., LEMON)"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          
          <KeyStrengthMeter keyValue={key} />
        </div>

        {/* Animation Toggle */}
        <div className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showAnimation}
              onChange={(e) => setShowAnimation(e.target.checked)}
              className="w-4 h-4 accent-blue-400"
            />
            <span className="text-sm text-neutral-300">Enable Animation Mode</span>
          </label>
          
          {showAnimation && (
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-xs text-neutral-400">Speed:</label>
              <input
                type="range"
                min="10"
                max="200"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-24 accent-blue-400"
              />
              <span className="text-xs text-neutral-400 w-12">{animationSpeed}ms</span>
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
            onClick={handleDecrypt}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Decrypt
          </button>
          <button 
            onClick={handleClear}
            className="flex-1 bg-zinc-800 text-neutral-300 font-bold py-3 rounded-lg hover:bg-zinc-700 border border-zinc-700 transition-all"
          >
            Clear
          </button>
        </div>

        {plaintext && (
          <div className="mt-6 pt-6 border-t border-zinc-800" ref={resultRef}>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-neutral-300">
                Decrypted Plaintext
              </label>
              <button
                onClick={() => copyToClipboard(plaintext, 'Plaintext')}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-neutral-300 rounded-lg border border-zinc-700 transition-all text-sm"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
            <div className="bg-zinc-950 border-2 border-blue-400 rounded-lg p-4 text-blue-300 text-lg break-all shadow-lg shadow-blue-400/20 min-h-[60px]">
              {showAnimation ? (
                <AnimatedText text={plaintext} speed={animationSpeed} />
              ) : (
                plaintext
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DecryptPanel
