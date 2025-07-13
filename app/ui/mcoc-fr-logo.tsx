import Image from 'next/image';

export default function MCOCFRLogo() {
  return (
    <div
      className={`flex w-full items-center gap-4 leading-none text-white`}
      aria-label='MCOCFR Logo'
    >
      {/* TODO ADD IAMGE */}
      {/* <Image
        src='/logos/mcocfr_logo.png'
        alt='Logo MCOCFR'
        width={48}
        height={48}
      /> */}
      <p className='text-xl font-semibold md:text-2xl w-full text-center'>MCOCFR</p>
    </div>
  );
}
