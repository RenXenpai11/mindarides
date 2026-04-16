"use client";

import { useState, useEffect, Fragment, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { BusTypeBadge } from "@/components/ui/Badge";
import { schedules, popularRoutes, busCompanies } from "@/lib/mockData";
import { Search, Bus, ChevronLeft } from "lucide-react";

const MindanaoMap = dynamic(
  () => import("@/components/map/MindanaoMap").then((m) => m.MindanaoMap),
  { ssr: false }
);

import { getRouteCities } from "@/components/map/MindanaoMap";

type BusType = "aircon" | "ordinary" | "premium";

interface Schedule {
  id: number;
  from: string;
  to: string;
  route: string;
  company: string;
  type: BusType;
  departs: string;
  fare: string;
  travelTime: string;
  distance: string;
  stopovers: string[];
}

function getRouteKey(from: string, to: string): string {
  const n = (s: string) => s.toLowerCase().trim().replace(/\s+/g, " ");
  const f = n(from);
  const t = n(to);
  if (f.includes("davao") && t.includes("surigao")) return "davao-surigao";
  if (f.includes("davao") && (t.includes("cagayan") || t.includes("cdo"))) return "davao-cdo";
  if (f.includes("davao") && t.includes("general santos")) return "davao-gensan";
  if (f.includes("davao") && t.includes("butuan")) return "davao-butuan";
  if (f.includes("davao") && t.includes("cotabato")) return "davao-cotabato";
  if ((f.includes("cagayan") || f.includes("cdo")) && t.includes("iligan")) return "cdo-iligan";
  return "davao-surigao";
}

interface SidebarProps {
  from: string;
  to: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  onSearch: () => void;
  results: Schedule[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
}

function PlannerSidebar({
  from, to, setFrom, setTo, onSearch,
  results, selectedId, setSelectedId,
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-[#e0e0dc]">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Plan your trip
        </h3>
        <div className="relative">
          <div className="flex items-center gap-3 p-3 border border-[#e0e0dc] rounded-lg mb-1 bg-white">
            <div className="w-3 h-3 rounded-full flex-shrink-0 bg-[#1a6b3c]" />
            <input
              type="text"
              placeholder="From city"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flex-1 text-sm outline-none placeholder-gray-400"
            />
          </div>
          <div className="absolute left-[22px] top-[46px] w-0.5 h-4 bg-gray-200 z-10" />
          <div className="flex items-center gap-3 p-3 border border-[#e0e0dc] rounded-lg mt-1 bg-white">
            <div className="w-3 h-3 rounded-full flex-shrink-0 bg-[#e24b4a]" />
            <input
              type="text"
              placeholder="To city"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 text-sm outline-none placeholder-gray-400"
            />
          </div>
        </div>
        <button
          onClick={onSearch}
          className="w-full mt-3 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 bg-[#1a6b3c]"
        >
          <Search className="w-4 h-4" />
          Find Bus Routes
        </button>
      </div>

      <div className="px-5 py-3 border-b border-[#e0e0dc]">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Popular routes
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {popularRoutes.slice(0, 5).map((r) => (
            <button
              key={r.id}
              onClick={() => { setFrom(r.from); setTo(r.to); onSearch(); }}
              className="px-2.5 py-1 rounded-full text-xs border border-[#e0e0dc] text-gray-600 hover:border-[#1a6b3c] hover:text-[#1a6b3c] transition-colors bg-white"
            >
              {r.from}  {r.to}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {results.length > 0 ? (
          <>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {results.length} bus{results.length !== 1 ? "es" : ""} found
            </h3>
            <div className="flex flex-col gap-2">
              {results.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className="border rounded-xl overflow-hidden cursor-pointer transition-all"
                  style={{
                    borderColor: selectedId === s.id ? "#1a6b3c" : "#e0e0dc",
                    borderWidth: selectedId === s.id ? "1.5px" : "1px",
                  }}
                >
                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">{s.company}</span>
                      <BusTypeBadge type={s.type} />
                    </div>
                    <div className="text-xs text-gray-400">{s.route}</div>
                  </div>
                  <div className="px-3 py-2 flex justify-between bg-[#f8f8f6] border-t border-[#e0e0dc]">
                    <div className="text-center">
                      <div className="text-xs text-gray-400">Departs</div>
                      <div className="text-xs font-semibold text-gray-700">{s.departs}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400">Fare</div>
                      <div className="text-xs font-semibold text-[#1a6b3c]">{s.fare}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400">Travel time</div>
                      <div className="text-xs font-semibold text-gray-700">{s.travelTime}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-[#f0fdf4]">
              <Bus className="w-6 h-6 text-[#1a6b3c]" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">No routes yet</p>
            <p className="text-xs text-gray-400">Enter origin and destination to find buses</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [from, setFrom] = useState(searchParams.get("from") || "Davao");
  const [to, setTo] = useState(searchParams.get("to") || "Surigao City");
  const [searched, setSearched] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showMobileMap, setShowMobileMap] = useState(false);

  const results = schedules.filter(
    (s) =>
      s.from.toLowerCase().includes(from.toLowerCase()) &&
      s.to.toLowerCase().includes(to.toLowerCase())
  );

  useEffect(() => {
    if (results.length > 0) setSelectedId(results[0].id);
  }, [from, to]);

  const selectedSchedule = results.find((s) => s.id === selectedId) || results[0];
  const routeKey = getRouteKey(from, to);
  const routeCities = getRouteCities(routeKey);

  const mapRoute = {
    points: routeCities.length > 0 ? routeCities : getRouteCities("davao-surigao"),
    color: "#1a6b3c",
  };

  const handleSearch = () => setSearched(true);

  return (
    <div className="flex h-[calc(100vh-52px)]">
      <div className="hidden lg:flex flex-col w-[300px] border-r border-[#e0e0dc] bg-white flex-shrink-0 h-full overflow-hidden">
        <PlannerSidebar
          from={from}
          to={to}
          setFrom={setFrom}
          setTo={setTo}
          onSearch={handleSearch}
          results={searched ? results : []}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </div>

      <div className="hidden lg:flex flex-col flex-1 h-full overflow-hidden">
        <div
          className="flex items-center justify-between px-5 border-b border-[#e0e0dc] bg-white flex-shrink-0"
          style={{ height: "48px" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {from || "Origin"}  {to || "Destination"}
            </span>
            {selectedSchedule && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">{selectedSchedule.company}</span>
                <BusTypeBadge type={selectedSchedule.type} />
              </>
            )}
          </div>
          <span className="text-xs text-gray-400">{results.length} results</span>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <MindanaoMap
            highlightedRoute={mapRoute}
            showAllCities={true}
            className="w-full h-full"
          />
        </div>

        {selectedSchedule && (
          <div className="border-t border-[#e0e0dc] bg-white px-5 py-3 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-8">
                <div>
                  <div className="text-xs text-gray-400">Distance</div>
                  <div className="text-sm font-semibold text-gray-800">{selectedSchedule.distance}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Travel time</div>
                  <div className="text-sm font-semibold text-gray-800">{selectedSchedule.travelTime}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Fare from</div>
                  <div className="text-sm font-semibold text-[#1a6b3c]">{selectedSchedule.fare}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Bus type</div>
                  <BusTypeBadge type={selectedSchedule.type} />
                </div>
              </div>
              <button
                onClick={() => router.push("/routes")}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 bg-[#1a6b3c]"
              >
                View all schedules
              </button>
            </div>

            {selectedSchedule.stopovers.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">Stopovers:</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#1a6b3c]" />
                  <span className="text-xs text-gray-600">{selectedSchedule.from}</span>
                  {selectedSchedule.stopovers.map((stop, i) => (
                    <Fragment key={i}>
                      <div className="w-6 h-0.5 bg-gray-200" />
                      <div className="w-2 h-2 rounded-full bg-gray-300" />
                      <span className="text-xs text-gray-600">{stop}</span>
                    </Fragment>
                  ))}
                  <div className="w-6 h-0.5 bg-gray-200" />
                  <div className="w-2 h-2 rounded-full bg-[#e24b4a]" />
                  <span className="text-xs text-gray-600">{selectedSchedule.to}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="lg:hidden w-full overflow-y-auto">
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1a6b3c]">
          <button className="text-white" onClick={() => router.push("/")}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-white font-medium">Find a Bus</h1>
            <p className="text-white/60 text-xs">Search Mindanao routes</p>
          </div>
        </div>

        <div className="px-4 pt-4">
          <div className="bg-white border border-[#e0e0dc] rounded-xl p-4">
            <div className="relative mb-3">
              <div className="flex items-center gap-3 p-3 border border-[#e0e0dc] rounded-lg mb-1">
                <div className="w-3 h-3 rounded-full flex-shrink-0 bg-[#1a6b3c]" />
                <input
                  type="text"
                  placeholder="FROM  Origin city"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="flex-1 text-sm outline-none placeholder-gray-400"
                />
              </div>
              <div className="absolute left-[22px] top-[46px] w-0.5 h-4 bg-gray-200 z-10" />
              <div className="flex items-center gap-3 p-3 border border-[#e0e0dc] rounded-lg mt-1">
                <div className="w-3 h-3 rounded-full flex-shrink-0 bg-[#e24b4a]" />
                <input
                  type="text"
                  placeholder="TO  Destination city"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="flex-1 text-sm outline-none placeholder-gray-400"
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 flex items-center justify-center gap-2 bg-[#1a6b3c]"
            >
              <Search className="w-4 h-4" />
              Find Bus Routes
            </button>
          </div>
        </div>

        <div className="px-4 mt-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Popular routes
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {popularRoutes.map((r) => (
              <button
                key={r.id}
                onClick={() => { setFrom(r.from); setTo(r.to); setSearched(true); }}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border border-[#e0e0dc] bg-white text-gray-600"
              >
                {r.from}  {r.to}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 mt-4 pb-6">
          {searched && results.length > 0 ? (
            <>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {results.length} buses found
              </h3>
              <div className="flex flex-col gap-3">
                {results.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white border border-[#e0e0dc] rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => { setSelectedId(s.id); setShowMobileMap(true); }}
                  >
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800">{s.company}</span>
                        <BusTypeBadge type={s.type} />
                      </div>
                      <div className="text-xs text-gray-400">{s.route}</div>
                    </div>
                    <div className="px-3 py-2 flex justify-between bg-[#f8f8f6] border-t border-[#e0e0dc]">
                      <div className="text-center">
                        <div className="text-[10px] text-gray-400">Departs</div>
                        <div className="text-xs font-semibold text-gray-700">{s.departs}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-gray-400">Fare</div>
                        <div className="text-xs font-semibold text-[#1a6b3c]">{s.fare}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-gray-400">Travel time</div>
                        <div className="text-xs font-semibold text-gray-700">{s.travelTime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Bus companies
              </h3>
              <div className="flex flex-col gap-3">
                { busCompanies.slice(0, 4).map((company) => (
                  <div key={company.id} className="bg-white border border-[#e0e0dc] rounded-xl p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: company.color }}
                      >
                        {company.logo}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">{company.name}</div>
                        <div className="text-xs text-gray-400">{company.routes} routes</div>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {company.types.map((t) => <BusTypeBadge key={t} type={t as 'aircon' | 'ordinary' | 'premium'} />)}
                    </div>
                    <div className="flex gap-1 flex-wrap mt-2">
                      {company.cities.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded-full text-[10px] bg-[#f8f8f6] text-gray-500">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {showMobileMap && selectedSchedule && (
          <div className="fixed inset-0 z-[200] bg-white flex flex-col">
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 bg-[#1a6b3c]">
              <button onClick={() => setShowMobileMap(false)} className="text-white">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-white font-medium">{selectedSchedule.route}</h1>
                <p className="text-white/60 text-xs">{selectedSchedule.company}</p>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <MindanaoMap
                highlightedRoute={mapRoute}
                showAllCities={true}
                className="w-full h-full"
              />
            </div>
            <div className="bg-white border-t border-[#e0e0dc] p-4 flex-shrink-0">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">{selectedSchedule.route}</h3>
              <div className="flex justify-between mb-3">
                <div className="text-center">
                  <div className="text-xs text-gray-400">Distance</div>
                  <div className="text-sm font-semibold text-gray-800">{selectedSchedule.distance}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Travel time</div>
                  <div className="text-sm font-semibold text-gray-800">{selectedSchedule.travelTime}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Fare</div>
                  <div className="text-sm font-semibold text-[#1a6b3c]">{selectedSchedule.fare}</div>
                </div>
              </div>

              {selectedSchedule.stopovers.length > 0 && (
                <div className="mb-3">
                  <span className="text-xs text-gray-400 mr-2">Stopovers:</span>
                  <div className="flex items-center gap-1 flex-wrap mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1a6b3c]" />
                    <span className="text-xs text-gray-600">{selectedSchedule.from}</span>
                    {selectedSchedule.stopovers.map((stop, i) => (
                      <Fragment key={i}>
                        <div className="w-4 h-0.5 bg-gray-200" />
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <span className="text-xs text-gray-600">{stop}</span>
                      </Fragment>
                    ))}
                    <div className="w-4 h-0.5 bg-gray-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e24b4a]" />
                    <span className="text-xs text-gray-600">{selectedSchedule.to}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => router.push("/routes")}
                className="w-full py-3 rounded-lg text-sm font-medium text-white hover:opacity-90 bg-[#1a6b3c]"
              >
                View Schedules & Fares
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-gray-50" />}>
      <PageContent />
    </Suspense>
  );
}
