import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Shield, Server, Lock, Zap, Eye } from 'lucide-react'

export function SecurityInfo() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Shield className="w-6 h-6" />
          Security & Privacy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Data Safety */}
        <div className="space-y-3">
          <h3 className="font-semibold text-neutral-300 text-sm">✓ Data Safety</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Lock className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-green-400">Encrypted Client-Side</p>
                <p className="text-xs text-green-300 mt-1">All encryption happens in your browser. No data sent to servers.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Eye className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-green-400">No Data Collection</p>
                <p className="text-xs text-green-300 mt-1">We never store, log, or track your messages or keys.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Zap className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-green-400">Instant Processing</p>
                <p className="text-xs text-green-300 mt-1">Results generated instantly without network calls.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-neutral-300 text-sm">🔐 Vigenère Cipher Algorithm</h3>
          <div className="p-3 bg-zinc-800 rounded-lg border border-zinc-700 space-y-2 text-xs text-neutral-400">
            <p><strong>Type:</strong> Polyalphabetic Substitution Cipher</p>
            <p><strong>Invented:</strong> 16th Century (Blaise de Vigenère)</p>
            <p><strong>Security:</strong> Strong against frequency analysis</p>
            <p className="pt-2"><strong>Key Formula:</strong></p>
            <div className="font-mono bg-zinc-950 p-2 rounded text-neutral-300">
              C = (P + K) mod 26<br/>
              P = (C - K + 26) mod 26
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="space-y-3">
          <h3 className="font-semibold text-neutral-300 text-sm">💡 Best Practices</h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">•</span>
              <span>Use the "Generate Secure Key" button for cryptographically strong keys</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">•</span>
              <span>Keep your key private and share it only through secure channels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">•</span>
              <span>Use long, complex keys (15+ characters) for better security</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">•</span>
              <span>Note: This is a classical cipher for educational purposes, not for sensitive data</span>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-yellow-300">
            <p className="font-semibold mb-1">Educational Purpose</p>
            <p>The Vigenère Cipher is a classical cipher demonstrated here for learning. For sensitive data, use modern encryption standards like AES-256.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
