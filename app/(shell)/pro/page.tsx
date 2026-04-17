import ProPricingPanel from '@/components/pro/ProPricingPanel'

export default function ProPage() {
  return (
    <main className="min-h-[calc(100dvh-80px)] px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-3xl">
        <ProPricingPanel />
      </div>
    </main>
  )
}
