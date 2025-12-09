import { Lock, Unlock, BookOpen } from 'lucide-react'

function TabToggle({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'encrypt', label: 'Encrypt', icon: Lock },
    { id: 'decrypt', label: 'Decrypt', icon: Unlock },
    { id: 'learn', label: 'Learn', icon: BookOpen },
  ]

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
            ${activeTab === id 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-lg shadow-green-500/50' 
              : 'bg-zinc-800 text-neutral-300 hover:bg-zinc-700 border border-zinc-700'
            }
          `}
        >
          <Icon className="w-5 h-5" />
          {label}
        </button>
      ))}
    </div>
  )
}

export default TabToggle
