import Image from "next/image";

type PageTitleProps = {
  children: React.ReactNode;
  className?: string;
  imgSrc: string;
  imgAlt: string;
};

export default function PageTitle({
  children,
  className,
  imgSrc,
  imgAlt,
}: PageTitleProps) {
  return (
    <div className="max-w-380 w-full mx-auto">
      <h1 className={className}>{children}</h1>
      {imgSrc && (
        <Image
          width={380}
          height={380}
          src={imgSrc}
          alt={imgAlt}
          className="py-6 md:py-12 h-full w-full"
        />
      )}
    </div>
  );
}
