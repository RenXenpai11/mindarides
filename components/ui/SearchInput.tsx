import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  placeholder: string
  defaultValue?: string
  className?: string
}

export default function SearchInput({
  placeholder,
  defaultValue,
  className,
}: SearchInputProps) {
  return (
    <label
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-[#d9e2dc] bg-white px-4 py-3 text-sm text-[#506157]',
        className
      )}
    >
      <Search className="h-4 w-4 text-[#7a8a82]" />
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent p-0 text-[#183427] outline-none placeholder:text-[#7a8a82]"
      />
    </label>
  )
}
