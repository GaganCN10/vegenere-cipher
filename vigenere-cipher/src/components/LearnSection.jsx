import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Lock, Key, Shield } from 'lucide-react'

function LearnSection() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <BookOpen className="w-6 h-6" />
          How Vigenère Cipher Works
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="bg-zinc-800/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Overview</h3>
          <p className="text-neutral-300 leading-relaxed">
            The Vigenère Cipher is a method of encrypting alphabetic text using a series of 
            different Caesar ciphers based on the letters of a keyword. It was invented in the 
            16th century and remained unbroken for centuries.
          </p>
        </section>

        <section className="bg-zinc-800/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-3">How It Works</h3>
          <div className="bg-zinc-950 border-2 border-purple-500 rounded-lg p-6 my-4 font-mono">
            <p className="text-purple-300 mb-2"><strong>Encryption:</strong> C<sub>i</sub> = (P<sub>i</sub> + K<sub>i</sub>) mod 26</p>
            <p className="text-purple-300"><strong>Decryption:</strong> P<sub>i</sub> = (C<sub>i</sub> - K<sub>i</sub> + 26) mod 26</p>
          </div>
          <p className="text-neutral-400 text-sm italic">
            Where P is plaintext, C is ciphertext, K is key, and i is the position.
          </p>
        </section>

        <section className="bg-zinc-800/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Example</h3>
          <div className="bg-zinc-950 border-2 border-blue-500 rounded-lg p-6 space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-zinc-700">
              <span className="text-neutral-400 font-semibold">Plaintext:</span>
              <span className="text-blue-300 font-mono tracking-wider">ATTACKATDAWN</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-700">
              <span className="text-neutral-400 font-semibold">Key:</span>
              <span className="text-blue-300 font-mono tracking-wider">LEMON</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-700">
              <span className="text-neutral-400 font-semibold">Key (repeated):</span>
              <span className="text-blue-300 font-mono tracking-wider">LEMONLEMONLE</span>
            </div>
            <div className="flex justify-between items-center py-2 bg-blue-500/10 rounded px-2">
              <span className="text-blue-400 font-semibold">Ciphertext:</span>
              <span className="text-blue-400 font-mono tracking-wider font-bold">LXFOPVEFRNHR</span>
            </div>
          </div>
        </section>

        <section className="bg-zinc-800/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Key Features</h3>
          <ul className="space-y-2">
            {[
              { icon: Shield, text: 'Case preservation (uppercase/lowercase maintained)' },
              { icon: Key, text: 'Non-alphabetic characters remain unchanged' },
              { icon: Lock, text: 'Key automatically repeats to match text length' },
              { icon: Shield, text: 'More secure than simple substitution ciphers' },
            ].map(({ icon: Icon, text }, index) => (
              <li key={index} className="flex items-start gap-3 bg-zinc-950 border-l-4 border-green-500 rounded p-3">
                <Icon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300">{text}</span>
              </li>
            ))}
          </ul>
        </section>
      </CardContent>
    </Card>
  )
}

export default LearnSection
