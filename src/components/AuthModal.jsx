import React, { useState } from 'react'
import { X, ShieldCheck, Zap, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'
import { getDiscordLoginUrl } from '../utils/discordAuth'

export const DiscordIcon = ({ size = 20, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

export default function AuthModal({ onClose, onLoginSuccess, notice }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDiscordClick = () => {
    setIsLoading(true)
    const url = getDiscordLoginUrl()
    window.location.href = url
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div 
        className="relative w-full sm:max-w-md bg-[#0c1220] border-t sm:border border-cyan-500/30 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-5 sm:px-6 py-4 border-b border-slate-800 bg-[#0f172a]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#5865F2] flex items-center justify-center">
              <DiscordIcon size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">Authentication Required</span>
              <h2 className="text-base sm:text-lg font-black text-white">Sign In with Discord</h2>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-0"
            aria-label="Close login modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {/* Informative Purchase Notice if Triggered */}
          {notice && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/40 text-indigo-200 text-xs">
              <AlertCircle size={17} className="text-[#5865F2] shrink-0 mt-0.5" />
              <span className="font-semibold leading-relaxed">{notice}</span>
            </div>
          )}

          {/* Hero Banner */}
          <div className="text-center py-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#5865F2] to-cyan-400 p-0.5 shadow-xl shadow-[#5865F2]/20 mb-3 flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0f1d] rounded-2xl flex items-center justify-center text-[#5865F2]">
                <DiscordIcon size={34} />
              </div>
            </div>
            <h3 className="text-xl font-black text-white">Connect Your Discord</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xs mx-auto">
              Verify your gamer identity to complete orders, receive digital codes, and view saved UIDs.
            </p>
          </div>

          {/* Perks */}
          <div className="bg-[#12192b]/80 border border-slate-800/80 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
              <span>Instant access to digital voucher redeem keys</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Zap size={15} className="text-cyan-400 shrink-0" />
              <span>1-Click saved Player UIDs for PUBG &amp; Free Fire</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles size={15} className="text-cyan-400 shrink-0" />
              <span>Sagarmatha VIP Member gold badge &amp; perks</span>
            </div>
          </div>

          {/* Action Buttons: ONLY official Discord login */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleDiscordClick}
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#5865F2]/30 cursor-pointer border-0 active:scale-[0.98]"
            >
              <DiscordIcon size={20} />
              <span>{isLoading ? 'Redirecting to Discord...' : 'Login with Discord'}</span>
            </button>
          </div>

          <div className="text-center pt-2 border-t border-slate-800/80">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck size={12} className="text-emerald-400" />
              We never access your passwords or private Discord messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
