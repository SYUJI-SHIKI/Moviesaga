import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navigationt">
        <Link href="/">
            <Image src="/logo.png" alt="Logo" width={100} height={30} /> {/* ロゴのサイズは適宜調整してね */}
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto main-nav align-items-center">
            <li className="nav-item">
              <Link href="/movies"><div>ランダム</div></Link>
              <Link href="/collections"><div>特集</div></Link>
              <Link href="/search"><div>検索</div></Link>
              <Link href="/profile"><div>マイページ</div></Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;