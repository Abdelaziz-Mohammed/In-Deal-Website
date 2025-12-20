import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/en/home" className="flex items-center gap-2">
      <Image
        src={"/assets/logo.svg"}
        alt="In-Deal Logo"
        width={32}
        height={48}
        className="object-cover"
      />
      <span className="font-normal sm:font-medium text-[14px] sm:text-base text-black hover:text-primary hoverEffect">
        InDeal
      </span>
    </Link>
  );
}
