import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <>
      <div>
        <div>
          <li className="list-inline-item">
            <Link href="#"><div className="footer-link">利用規約</div></Link>
          </li>
          <li className="list-inline-item">
            <Link href="#"><div className="footer-link">お問い合わせ</div></Link>
          </li>
          <li className="list-inline-item">
            <Link href="#"><div className="footer-link">プライバシーポリシー</div></Link>
          </li>
        </div>
      </div>
    </>
  );
};

export default Footer;