interface Props {
  label: string
  value: string | undefined
}
export default function InfoCard({ label, value }: Props) {
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md gap-2'>
      <p className='text-sm font-medium'>{label}</p>
      <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
        {value}
      </p>
    </div>
  )
}
