'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  q: string
  a: string
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            className="w-full py-6 flex items-start justify-between gap-4 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="text-base font-medium text-ink">{item.q}</span>
            <ChevronDown
              className={cn(
                'w-5 h-5 shrink-0 text-ink-muted transition-transform duration-200',
                openIndex === i && 'rotate-180'
              )}
            />
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'
            )}
          >
            <p className="text-sm text-ink-light leading-[2] pl-0 md:pl-4">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
