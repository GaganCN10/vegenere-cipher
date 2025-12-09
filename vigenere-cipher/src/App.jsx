import { useState } from 'react'
import { HeroSection } from './components/HeroSection'
import { SecurityInfo } from './components/SecurityInfo'  // NEW
import TabToggle from './components/TabToggle'
import EncryptPanel from './components/EncryptPanel'
import DecryptPanel from './components/DecryptPanel'
import LearnSection from './components/LearnSection'

function App() {
  const [activeTab, setActiveTab] = useState('encrypt')

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="container mx-auto px-4 pt-8">
        <HeroSection />
        <SecurityInfo />  {/* NEW: Add security panel here */}
      </div>

      <main className="container mx-auto px-4 pb-12">
        <TabToggle activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-8">
          {activeTab === 'encrypt' && <EncryptPanel />}
          {activeTab === 'decrypt' && <DecryptPanel />}
          {activeTab === 'learn' && <LearnSection />}
        </div>
      </main>
      
      <footer className="border-t border-green-500/20 bg-zinc-950 py-6 text-center text-neutral-400">
        <p>Built with React + Vite | Vigenère Cipher Tool © 2025</p>
      </footer>
    </div>
  )
}

export default App
