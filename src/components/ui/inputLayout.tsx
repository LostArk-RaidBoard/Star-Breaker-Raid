'use client'
interface Props {
  setType: string
  setName: string
  setPlaceholder: string
  setCSS: string
  setValue: (value: string) => void
  value: string
}

export default function InputLayout({
  setType,
  setName,
  setPlaceholder,
  setCSS,
  setValue,
  value,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  return (
    <input
      className={`h-12 border border-gray-500 px-1 ${setCSS}`}
      type={setType}
      name={setName}
      autoComplete='off'
      value={value}
      placeholder={setPlaceholder}
      onChange={handleChange}
    ></input>
  )
}
