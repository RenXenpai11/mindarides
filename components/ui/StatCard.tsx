interface StatCardProps {
  label: string
  value: string
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <article className="rounded-3xl border border-[#d9e2dc] bg-white p-5">
      <p className="text-3xl font-semibold text-[#1a6b3c]">{value}</p>
      <p className="mt-2 text-sm text-[#66746d]">{label}</p>
    </article>
  )
}
