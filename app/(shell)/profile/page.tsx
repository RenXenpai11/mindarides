import ProBadge from '@/components/ui/ProBadge'
import Sidebar from '@/components/layout/Sidebar'
import {
  currentUser,
  profileStats,
  recentTrips,
  routes,
} from '@/lib/data'

export default function ProfilePage() {
  return (
    <main className="xl:flex">
      <Sidebar
        title="Profile"
        description="Manage your saved trips, reminders, and membership details."
      >
        <div className="rounded-[28px] bg-[#1a6b3c] p-5 text-white">
          <p className="text-sm text-white/75">Signed in as</p>
          <h2 className="mt-2 text-2xl font-semibold">{currentUser.name}</h2>
          <p className="mt-1 text-sm text-white/80">{currentUser.email}</p>
          <ProBadge className="mt-4 bg-white/15 text-white" />
        </div>
      </Sidebar>

      <section className="flex-1 px-4 py-4 md:px-6 md:py-6 xl:px-8">
        <div className="rounded-[28px] bg-[#1a6b3c] p-6 text-white md:hidden">
          <h1 className="text-2xl font-semibold">{currentUser.name}</h1>
          <p className="mt-1 text-sm text-white/80">{currentUser.email}</p>
          <ProBadge className="mt-4 bg-white/15 text-white" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 md:mt-0">
          {profileStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-3xl border border-[#d9e2dc] bg-white p-5"
            >
              <p className="text-3xl font-semibold text-[#1a6b3c]">{stat.value}</p>
              <p className="mt-2 text-sm text-[#66746d]">{stat.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-[28px] bg-[#1a6b3c] p-5 text-white">
          <p className="text-sm text-white/75">Membership active</p>
          <h2 className="mt-2 text-xl font-semibold">MindaRide Pro Member</h2>
          <p className="mt-2 text-sm text-white/80">Renews on April 13, 2027</p>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
          <section className="rounded-[28px] border border-[#d9e2dc] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#183427]">Recent trips</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#eef2ef]">
              {recentTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="grid gap-2 border-b border-[#eef2ef] px-4 py-4 text-sm last:border-b-0 md:grid-cols-[1.6fr_1fr_0.8fr]"
                >
                  <div>
                    <p className="font-medium text-[#183427]">{trip.route}</p>
                    <p className="mt-1 text-[#66746d]">{trip.company}</p>
                  </div>
                  <p className="text-[#506157]">{trip.date}</p>
                  <p className="font-medium text-[#1a6b3c]">{trip.status}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#d9e2dc] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#183427]">Saved routes</h2>
            <div className="mt-4 space-y-3">
              {routes
                .filter((route) => currentUser.saved_routes.includes(route.id))
                .map((route) => (
                  <div
                    key={route.id}
                    className="rounded-2xl border border-[#eef2ef] px-4 py-4"
                  >
                    <p className="font-medium text-[#183427]">
                      {route.from} to {route.to}
                    </p>
                    <p className="mt-1 text-sm text-[#66746d]">
                      {route.distance_km} km • {route.duration_hrs} hrs
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
