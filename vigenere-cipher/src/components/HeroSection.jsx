import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Shield, Zap, Lock, Key } from "lucide-react";

export function HeroSection() {
  return (
    <Card className="w-full bg-black/[0.96] relative overflow-hidden border-green-500/20 mb-8">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgb(0, 255, 136)"
      />
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Left: Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
                Vigenère Cipher
              </h1>
              
              <p className="text-lg text-neutral-300 mb-6">
                Experience classical cryptography with interactive visualization. 
                Encrypt and decrypt messages using the legendary cipher from the 16th century.
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-neutral-300">Secure Encryption</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-emerald-500/30 rounded-full px-4 py-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="text-neutral-300">Custom Keys</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-neutral-300">Instant Results</span>
                </div>
              </div>
            </div>

            {/* Right: 3D-style Lock and Key */}
            <div className="relative h-[300px] md:h-[400px] flex items-center justify-center perspective-1000">
              <div className="relative w-full h-full flex items-center justify-around">
                
                {/* Animated Lock */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-green-500/30 blur-3xl group-hover:bg-green-500/50 transition-all duration-300"></div>
                  <Lock 
                    className="relative w-32 h-32 md:w-40 md:h-40 text-green-500 
                    drop-shadow-[0_0_30px_rgba(0,255,136,0.7)]
                    animate-float
                    group-hover:scale-110 transition-transform duration-500"
                    strokeWidth={1}
                  />
                </div>

                {/* Animated Key */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-emerald-400/30 blur-3xl group-hover:bg-emerald-400/50 transition-all duration-300"></div>
                  <Key 
                    className="relative w-32 h-32 md:w-40 md:h-40 text-emerald-400 
                    drop-shadow-[0_0_30px_rgba(16,185,129,0.7)]
                    animate-float-delayed
                    group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                    strokeWidth={1}
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </Card>
  )
}
