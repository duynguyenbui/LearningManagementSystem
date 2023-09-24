import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <Image priority height={130} width={130} alt="logo" src="/logo.svg" />
    </Link>
  );
};
