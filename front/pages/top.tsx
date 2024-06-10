import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';

const Top: React.FC = () => {
  const isUserSignedIn = true;

  return (
    <>
      <Header />
      <div className='top-wrapper center-form'>
        <div className='top-inner-text'>
          <div>MovieSaga</div>
        </div>
        <Image src="/top.png" width={400} height={200} className="top-image" alt="Top Image" />
        <div className="container">
          <div className="rounded-box">機能の説明</div>
          <div className="image-container">
            <Image src="/top_info_1.png" width={400} height={200} className="side-image" alt="Info 1" />
            <Image src="/top_info_2.png" width={400} height={200} className="side-image" alt="Info 2" />
          </div>
        </div>
        <div className="top-button">
          {isUserSignedIn ? (
            <>
              <Link href="/collections"><div className="rounded-box" id="collection-button">特集</div></Link>
              <Link href="/movies"><div className="rounded-box" id="random-button">ランダム</div></Link>
              <Link href="/search"><div className="rounded-box" id="search-button">検索</div></Link>
            </>
          ) : (
            <Link href="/movies"><div className="rounded-box" id="before-login-button">ランダム機能を試してみる</div></Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Top;