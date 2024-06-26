import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <>
      <div className='relative z-20 p-0 m-0'>
        <div className="bg-gray-800 flex flex-row justify-center p-4 fixed bottom-0 w-full">
          <div className="flex flex-row justify-center space-x-10 sm:space-x-4 text-xs sm:text-sm">
            <div>
              <Link href="#"><div className="text-white hover:text-gray-300">利用規約</div></Link>
            </div>
            <div>
              <Link href="#"><div className="text-white hover:text-gray-300">プライバシーポリシー</div></Link>
            </div>
            <div>
              <Link href="#"><div className="text-white hover:text-gray-300">お問い合わせ</div></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;