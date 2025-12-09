import { Dices } from 'lucide-react'

export function KeyGenerator({ onGenerate }) {
  const generateStrongKey = () => {
    // Extended word lists for more variety
    const adjectives = [
      'Swift', 'Brave', 'Silent', 'Cyber', 'Shadow', 'Neon', 'Dark', 'Light', 'Storm', 'Frost',
      'Crimson', 'Azure', 'Quantum', 'Stellar', 'Phantom', 'Thunder', 'Mystic', 'Cosmic', 'Electric', 'Blazing'
    ]
    const nouns = [
      'Dragon', 'Phoenix', 'Cipher', 'Guardian', 'Knight', 'Warrior', 'Hunter', 'Raven', 'Wolf', 'Tiger',
      'Falcon', 'Serpent', 'Eagle', 'Viper', 'Panther', 'Griffin', 'Sphinx', 'Hydra', 'Kraken', 'Titan'
    ]
    
    // Generate 2 word combinations + numbers for length and variety
    const adj1 = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun1 = nouns[Math.floor(Math.random() * nouns.length)]
    const adj2 = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun2 = nouns[Math.floor(Math.random() * nouns.length)]
    
    // Add random numbers at multiple positions
    const num1 = Math.floor(Math.random() * 99)
    const num2 = Math.floor(Math.random() * 999)
    
    // Mix uppercase and lowercase randomly
    const mixCase = (word) => {
      return word.split('').map(char => 
        Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
      ).join('')
    }
    
    // Create strong key with 20+ characters, mixed case, and numbers
    return `${mixCase(adj1)}${num1}${mixCase(noun1)}${mixCase(adj2)}${num2}${mixCase(noun2)}`
  }

  return (
    <button
      onClick={() => onGenerate(generateStrongKey())}
      className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-neutral-300 rounded-lg border border-zinc-700 transition-all text-sm"
      type="button"
    >
      <Dices className="w-4 h-4" />
      Generate Secure Key
    </button>
  )
}
