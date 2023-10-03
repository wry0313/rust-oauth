import Link from 'next/link'
import { getGoogleUrl } from '@/utils/getGoogleUrl'

export default function Home() {
  const from = "/profile";

  return (
    <main>
      <Link href={getGoogleUrl(from)}>
        Sign in with Google
      </Link>

    </main>
  )
}
