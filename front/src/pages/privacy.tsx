import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen lg:mb-10 p-8">
      <div className="max-w-4xl mx-auto bg-black bg-opacity-80 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-xl md:text-3xl font-bold mb-6 text-yellow-300">MovieSaga プライバシーポリシー</h1>
        
        <p className="mb-6 text-gray-300">
          MovieSaga（以下，「当社」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）におけるユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
        </p>

        {[
          { title: "1. 収集する情報", content: [
            "氏名（ニックネームやペンネームを含む）",
            "メールアドレス",
            "パスワード",
            "プロフィール情報（任意で提供される場合）",
            "映画の視聴履歴やレビュー",
            "作成した映画コレクション",
            "外部サービス（TMDBやYouTube）との連携情報",
            "Cookie（クッキー）を用いて生成された識別情報"
          ]},
          { title: "2. 情報の利用目的", content: [
            "本サービスの提供・運営のため",
            "ユーザーの認証、登録情報や利用履歴の管理のため",
            "ユーザーからのお問い合わせ対応のため",
            "本サービスの利用規約に違反する行為への対応のため",
            "本サービスの改善や新機能開発のため",
            "利用状況の分析や統計情報の作成のため（個人を特定しない形式）"
          ]},
          { title: "3. 外部APIの利用と情報共有", content: [
            "本サービスはTMDBとYouTubeのAPIを利用しています。",
            "これらの外部サービスとの情報共有は、各サービスの利用規約とプライバシーポリシーに従います。",
            "外部サービスから取得した情報は、本サービスの提供以外の目的で使用しません。"
          ]},
          { title: "4. 情報の保護", content: [
            "当社は、ユーザーの個人情報の安全性を確保するため、適切な技術的・組織的措置を講じます。",
            "ただし、インターネット上での完全なセキュリティを保証することはできません。"
          ]},
          { title: "5. 第三者提供", content: [
            "当社は、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供しません：",
            "- 法令に基づく場合",
            "- 人の生命、身体または財産の保護のために必要がある場合",
            "- 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合",
            "- 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合"
          ]},
          { title: "6. プライバシーポリシーの変更", content: "当社は、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本ウェブサイト上に表示した時点から効力を生じるものとします。" },
          { title: "7. お問い合わせ", content: "本ポリシーに関するお問い合わせは、本サービス内のお問い合わせフォームよりご連絡ください。" }
        ].map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-yellow-300">{section.title}</h2>
            {Array.isArray(section.content) ? (
              <ul className="list-disc list-inside text-gray-300">
                {section.content.map((item, i) => (
                  <li key={i} className="mb-2">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">{section.content}</p>
            )}
          </div>
        ))}

        <p className="mt-8 text-gray-400">制定日：2024年7月16日</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;