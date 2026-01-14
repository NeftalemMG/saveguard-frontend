'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-semibold mb-3">Product</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div><Link href="/#features">Features</Link></div>
              <div><Link href="/#pricing">Pricing</Link></div>
            </div>
          </div>
          
          <div>
            <div className="font-semibold mb-3">Company</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div><Link href="/about">About</Link></div>
              <div><Link href="/contact">Contact</Link></div>
            </div>
          </div>
          
          <div>
            <div className="font-semibold mb-3">Legal</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div><Link href="/privacy">Privacy</Link></div>
              <div><Link href="/terms">Terms</Link></div>
            </div>
          </div>
          
          <div>
            <div className="font-semibold mb-3">Connect</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div><Link href="#">Twitter</Link></div>
              <div><Link href="#">GitHub</Link></div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 text-sm text-gray-600">
          © 2025 SaveGuard. Built for Canadians.
        </div>
      </div>
    </footer>
  )
}