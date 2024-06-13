import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <>
      <div className='relative z-50 p-0 m-0'>
        <div className="bg-gray-800 flex flex-row justify-center p-4">
          <div>
            <Link href="#"><div className="text-white hover:text-gray-300 sm:text-sm">利用規約</div></Link>
          </div>
          <div className="list-inline-item  mx-20">
            <Link href="#"><div className="text-white hover:text-gray-300 sm:text-sm">プライバシーポリシー</div></Link>
          </div>
          <div>
            <Link href="#"><div className="text-white hover:text-gray-300 sm:text-sm">お問い合わせ</div></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;