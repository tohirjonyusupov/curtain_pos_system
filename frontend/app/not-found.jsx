import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linier-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">Sahifa topilmadi</p>
        <p className="text-gray-400 mb-12 max-w-md">
          Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chrib yuborilgan.
        </p>
        <Link href="/" className="inline-block px-8 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  )
}