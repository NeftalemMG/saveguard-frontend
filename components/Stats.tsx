'use client'

export default function Stats() {
  return (
    <section className="py-32 px-8 md:px-16 lg:px-24" style={{ background: '#1E488F' }}>
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <div 
            className="text-sm font-medium tracking-wider uppercase mb-4"
            style={{ color: '#DBE64C' }}
          >
            The Problem
          </div>
          <h2 
            className="text-5xl lg:text-6xl font-bold tracking-tight jp-spacing mb-6"
            style={{ color: '#F6F7ED' }}
          >
            Subscriptions are quietly <span className="sketch-underline-yellow">Draining Canadian Wallets</span>
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: '#F6F7ED', opacity: 0.8 }}
          >
            Canadian data shows subscriptions cost more than most people realize
          </p>
        </div>

        {/* Main Stats Grid - Redesigned */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Stat 1 - 73% */}
          <div 
            className="relative p-10 text-center group transition-all duration-300 hover:translate-y-[-8px]"
            style={{
              background: 'linear-gradient(135deg, rgba(219, 230, 76, 0.15) 0%, rgba(219, 230, 76, 0.05) 100%)',
              border: '2px solid rgba(219, 230, 76, 0.4)',
              borderRadius: '12px'
            }}
          >
            <div className="mb-6">
              <div 
                className="text-8xl font-black mb-2 leading-none"
                style={{ color: '#DBE64C' }}
              >
                73<span style={{ fontSize: '0.5em' }}>%</span>
              </div>
              <div 
                className="w-20 h-1 mx-auto"
                style={{ background: '#DBE64C' }}
              />
            </div>
            <div 
              className="text-xl font-bold mb-3"
              style={{ color: '#F6F7ED' }}
            >
              Forgot to Cancel
            </div>
            <p 
              className="text-sm leading-relaxed mb-8"
              style={{ color: '#F6F7ED', opacity: 0.8 }}
            >
              of Canadians signed up for a free trial or promo and forgot to cancel it
            </p>
            <div 
              className="pt-4 border-t text-xs font-bold tracking-wider"
              style={{ 
                borderColor: 'rgba(219, 230, 76, 0.3)',
                color: '#74C365'
              }}
            >
              HARDBACON 2024
            </div>
          </div>

          {/* Stat 2 - 66% */}
          <div 
            className="relative p-10 text-center group transition-all duration-300 hover:translate-y-[-8px]"
            style={{
              background: 'linear-gradient(135deg, rgba(116, 195, 101, 0.2) 0%, rgba(116, 195, 101, 0.05) 100%)',
              border: '2px solid rgba(116, 195, 101, 0.5)',
              borderRadius: '12px'
            }}
          >
            <div className="mb-6">
              <div 
                className="text-8xl font-black mb-2 leading-none"
                style={{ color: '#74C365' }}
              >
                66<span style={{ fontSize: '0.5em' }}>%</span>
              </div>
              <div 
                className="w-20 h-1 mx-auto"
                style={{ background: '#74C365' }}
              />
            </div>
            <div 
              className="text-xl font-bold mb-3"
              style={{ color: '#F6F7ED' }}
            >
              Paying for Ghosts
            </div>
            <p 
              className="text-sm leading-relaxed mb-8"
              style={{ color: '#F6F7ED', opacity: 0.8 }}
            >
              have paid for a subscription they completely forgot they had
            </p>
            <div 
              className="pt-4 border-t text-xs font-bold tracking-wider"
              style={{ 
                borderColor: 'rgba(116, 195, 101, 0.3)',
                color: '#DBE64C'
              }}
            >
              HARDBACON 2024
            </div>
          </div>

          {/* Stat 3 - 55% */}
          <div 
            className="relative p-10 text-center group transition-all duration-300 hover:translate-y-[-8px]"
            style={{
              background: 'linear-gradient(135deg, rgba(246, 247, 237, 0.15) 0%, rgba(246, 247, 237, 0.05) 100%)',
              border: '2px solid rgba(246, 247, 237, 0.3)',
              borderRadius: '12px'
            }}
          >
            <div className="mb-6">
              <div 
                className="text-8xl font-black mb-2 leading-none"
                style={{ color: '#F6F7ED' }}
              >
                55<span style={{ fontSize: '0.5em' }}>%</span>
              </div>
              <div 
                className="w-20 h-1 mx-auto"
                style={{ background: '#F6F7ED' }}
              />
            </div>
            <div 
              className="text-xl font-bold mb-3"
              style={{ color: '#F6F7ED' }}
            >
              Too Hard to Cancel
            </div>
            <p 
              className="text-sm leading-relaxed mb-8"
              style={{ color: '#F6F7ED', opacity: 0.8 }}
            >
              delay unsubscribing because the cancellation process is too difficult
            </p>
            <div 
              className="pt-4 border-t text-xs font-bold tracking-wider"
              style={{ 
                borderColor: 'rgba(246, 247, 237, 0.3)',
                color: '#DBE64C'
              }}
            >
              HARDBACON 2024
            </div>
          </div>
        </div>

        {/* Subscription Reality Check */}
        <div 
          className="mb-16 p-12 relative"
          style={{
            background: 'rgba(219, 230, 76, 0.05)',
            border: '2px solid rgba(219, 230, 76, 0.2)'
          }}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 
                className="text-3xl font-bold mb-6"
                style={{ color: '#DBE64C' }}
              >
                The Hidden Reality
              </h3>
              <p 
                className="text-lg mb-4"
                style={{ color: '#F6F7ED', opacity: 0.9 }}
              >
                When asked, Canadians estimated they had <strong style={{ color: '#DBE64C' }}>4 subscriptions</strong>.
              </p>
              <p 
                className="text-lg mb-4"
                style={{ color: '#F6F7ED', opacity: 0.9 }}
              >
                When actually counted across all categories, the real average was <strong style={{ color: '#DBE64C' }}>8 subscriptions</strong>.
              </p>
              <div 
                className="inline-block px-6 py-3 mt-4 font-bold"
                style={{
                  background: '#00804C',
                  color: '#DBE64C',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                }}
              >
                100% Underestimation Rate
              </div>
              <div 
                className="mt-6 text-xs font-medium tracking-wider"
                style={{ color: '#74C365' }}
              >
                Source: Hardbacon Survey 2024
              </div>
            </div>

            {/* Visual Comparison */}
            <div className="space-y-8">
              <div>
                <div 
                  className="text-sm font-bold mb-2"
                  style={{ color: '#F6F7ED', opacity: 0.6 }}
                >
                  What People Think
                </div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 flex items-center justify-center font-black text-2xl"
                      style={{
                        background: '#74C365',
                        color: '#001F3F',
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div 
                  className="text-sm font-bold mb-2"
                  style={{ color: '#DBE64C' }}
                >
                  The Reality
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 flex items-center justify-center font-black text-2xl animate-pulse-slow"
                      style={{
                        background: '#DBE64C',
                        color: '#001F3F',
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
                        animationDelay: `${i * 0.1}s`
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Growth Stats */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* OTT Growth */}
          <div 
            className="p-10"
            style={{
              background: 'rgba(0, 128, 76, 0.2)',
              border: '2px solid #00804C'
            }}
          >
            <div 
              className="text-sm font-bold tracking-wider uppercase mb-4"
              style={{ color: '#74C365' }}
            >
              Market Growth
            </div>
            <div className="space-y-6">
              <div>
                <div 
                  className="text-6xl font-black mb-2"
                  style={{ color: '#DBE64C' }}
                >
                  $4.2B
                </div>
                <div 
                  className="text-lg font-bold mb-2"
                  style={{ color: '#F6F7ED' }}
                >
                  Canadian OTT Revenue in 2024
                </div>
                <p 
                  className="text-sm"
                  style={{ color: '#F6F7ED', opacity: 0.7 }}
                >
                  Grew 15% year-over-year, with continued strong growth expected
                </p>
              </div>

              <div 
                className="pt-6 border-t-2"
                style={{ borderColor: 'rgba(116, 195, 101, 0.3)' }}
              >
                <div 
                  className="text-4xl font-black mb-2"
                  style={{ color: '#74C365' }}
                >
                  ~6%
                </div>
                <div 
                  className="text-sm"
                  style={{ color: '#F6F7ED', opacity: 0.8 }}
                >
                  Average price increase of major services, with more hikes expected
                </div>
              </div>

              <div 
                className="mt-6 text-xs font-medium tracking-wider"
                style={{ color: '#DBE64C' }}
              >
                Source: Convergence Research / Media in Canada 2025
              </div>
            </div>
          </div>

          {/* The Cost Crisis */}
          <div 
            className="p-10 relative overflow-hidden"
            style={{
              background: 'rgba(246, 247, 237, 0.05)',
              border: '2px solid rgba(246, 247, 237, 0.2)'
            }}
          >
            <div 
              className="text-sm font-bold tracking-wider uppercase mb-4"
              style={{ color: '#DBE64C' }}
            >
              The Crisis
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: '#DBE64C' }}
                />
                <div 
                  className="text-lg"
                  style={{ color: '#F6F7ED' }}
                >
                  Prices rising faster than awareness
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: '#74C365' }}
                />
                <div 
                  className="text-lg"
                  style={{ color: '#F6F7ED' }}
                >
                  Hidden subscriptions multiplying
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: '#00804C' }}
                />
                <div 
                  className="text-lg"
                  style={{ color: '#F6F7ED' }}
                >
                  Cancellation deliberately difficult
                </div>
              </div>
            </div>

            <div 
              className="mt-8 p-6 text-center"
              style={{
                background: '#00804C',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
              }}
            >
              <div 
                className="text-3xl font-black"
                style={{ color: '#DBE64C' }}
              >
                SaveGuard’s Got Your Back
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}