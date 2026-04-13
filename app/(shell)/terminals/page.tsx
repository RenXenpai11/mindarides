import Badge from '@/components/ui/Badge'
import SearchInput from '@/components/ui/SearchInput'
import TerminalCard from '@/components/cards/TerminalCard'
import Sidebar from '@/components/layout/Sidebar'
import TerminalMapShell from '@/components/map/TerminalMapShell'
import { terminals } from '@/lib/data'

export default function TerminalsPage() {
  const featuredTerminal = terminals[0]

  return (
    <main className="xl:flex">
      <Sidebar
        title="Terminal directory"
        description="Look up major bus terminals and the routes they serve."
      >
        <div className="space-y-6">
          <SearchInput placeholder="Search terminal, city, or region" />
          <div className="flex flex-wrap gap-2">
            {['All regions', 'Davao Region', 'Caraga', 'Northern Mindanao'].map(
              (region) => (
                <Badge key={region} variant="outline">
                  {region}
                </Badge>
              )
            )}
          </div>
          <TerminalCard terminal={featuredTerminal} />
        </div>
      </Sidebar>

      <section className="flex-1 px-4 py-4 md:px-6 md:py-6 xl:px-8">
        <div className="grid gap-4 xl:grid-cols-[1.45fr_0.9fr]">
          <div className="rounded-[28px] border border-[#d9e2dc] bg-white p-3">
            <TerminalMapShell terminals={terminals} />
          </div>
          <aside className="rounded-[28px] border border-[#d9e2dc] bg-white p-5">
            <p className="text-sm font-medium text-[#66746d]">Selected terminal</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#183427]">
              {featuredTerminal.name}
            </h2>
            <p className="mt-2 text-sm text-[#506157]">{featuredTerminal.address}</p>
            <p className="mt-1 text-sm text-[#66746d]">
              {featuredTerminal.city}, {featuredTerminal.region}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {featuredTerminal.routes.map((route) => (
                <Badge key={route}>{route}</Badge>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:hidden">
          {terminals.map((terminal) => (
            <TerminalCard key={terminal.id} terminal={terminal} />
          ))}
        </div>
      </section>
    </main>
  )
}
