import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import MBTIModal from './MBTIModal2';
import { useUser } from '@clerk/clerk-react'; // ClerkのuseUserフックをインポート
import { useUserContext } from '../contexts/UserContext'; // UserContextのuseUserContextフックをインポート

// Profileコンポーネントの定義
const Profile = () => {
  // 状態管理のためのuseStateフック
  const [userProfile, setUserProfile] = useState(null); // ユーザープロファイル情報
  const [mbtiType, setMbtiType] = useState(null); // MBTIタイプ
  const [showMBTIModal, setShowMBTIModal] = useState(false); // MBTIモーダル表示状態
  const [userImages, setUserImages] = useState([]); // ユーザー画像

  const { user } = useUser(); // 現在のユーザー情報を取得
  const { userUpdated } = useUserContext(); // UserContextからuserUpdatedを取得

  // APIのURLを環境に応じて設定
  let API_URL;
  if (window.location.origin === 'http://localhost:3001') {
    API_URL = 'http://localhost:3000';
  } else if (
    window.location.origin ===
    'https://favorite-database-16type-f-5f78fa224595.herokuapp.com'
  ) {
    API_URL = 'https://favorite-database-16type-5020d6339517.herokuapp.com';
  } else {
    // デフォルトのURL
    API_URL = 'http://localhost:3000';
  }

  // コンポーネントがマウントされた後に実行されるuseEffectフック
  useEffect(() => {
    const clerkId = user?.id; // Clerkから取得したユーザーID
    if (clerkId) {
      // ユーザープロファイル情報を取得
      fetch(`${API_URL}/api/v1/users/${clerkId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserProfile({
            username: data.username,
            avatarUrl: data.avatar_url,
          });
        });

      // ユーザーのMBTIタイプを取得
      fetch(`${API_URL}/api/v1/mbti/${clerkId}`)
        .then((response) => response.json())
        .then((data) => setMbtiType(data.mbti_type));

      // ユーザーの投稿を取得し、関連するメディア作品の画像を取得
      fetch(`${API_URL}/api/v1/posts?user_id=${clerkId}`)
        .then((response) => response.json())
        .then((posts) => {
          posts.forEach((post) => {
            fetch(`${API_URL}/api/v1/media_works?post_id=${post.id}`)
              .then((response) => response.json())
              .then((mediaWorks) => {
                const images = mediaWorks.map((work) => work.image);
                setUserImages((prevImages) => [
                  ...new Set([...prevImages, ...images]),
                ]);
              });
          });
        });
    }
  }, [API_URL, user, userUpdated]); // 依存配列にuserUpdatedを追加

  // 選択されたセクションを管理するための状態
  const [selectedSection, setSelectedSection] = useState('posts');

  // セクションを選択する関数
  const selectSection = (section) => {
    setSelectedSection(section);
  };

  // 選択されたセクションにスタイルを適用する関数
  const getSelectedStyle = (section) => {
    if (selectedSection === section) {
      return {
        borderBottom: '4px solid #2EA9DF',
        width: '33%',
        margin: '0 auto',
        borderRadius: '10px',
      };
    }
    return {};
  };

  // ユーザー画像をレンダリングする関数
  const renderImages = () => {
    const containerClass = `image-container-${userImages.length}`;
    const imageSize = userImages.length === 1 ? 600 : 297.5;

    return (
      <div className={containerClass}>
        {userImages.map((imageUrl, index) => (
          <Image
            key={index}
            cloudName="dputyeqso"
            publicId={imageUrl}
            width={imageSize}
            height={imageSize}
          />
        ))}
      </div>
    );
  };

  // 選択されたセクションに応じたコンテンツをレンダリングする関数
  const renderContent = () => {
    switch (selectedSection) {
      case 'posts':
        return <div className="bg-black my-10">{renderImages()}</div>;
      case 'comments':
        return (
          <div className="text-center mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            本リリースで実装予定
          </div>
        );
      case 'likes':
        return (
          <div className="text-center mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            本リリースで実装予定
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {userProfile && (
        <>
          <div className="flex items-center justify-between w-full px-8">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={userProfile?.avatarUrl} alt="User profile" />
              </div>
            </div>
            <div className="ml-8">
              <h1>
                <span className="text-2xl">{userProfile.username}</span>{' '}
                <span className="ml-4">{mbtiType}</span>
              </h1>
            </div>
            <div className="ml-auto mb-12 mr-20">
              <div
                tabIndex={0}
                role="button"
                onClick={() => setShowMBTIModal(true)}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-16 w-full">
            <div
              className="flex-1 text-center cursor-pointer"
              onClick={() => selectSection('posts')}
            >
              <span className="text-xl">ポスト</span>
              <div style={getSelectedStyle('posts')}></div>
            </div>
            <div
              className="flex-1 text-center cursor-pointer"
              onClick={() => selectSection('comments')}
            >
              <span className="text-xl">コメント</span>
              <div style={getSelectedStyle('comments')}></div>
            </div>
            <div
              className="flex-1 text-center cursor-pointer"
              onClick={() => selectSection('likes')}
            >
              <span className="text-xl">いいね</span>
              <div style={getSelectedStyle('likes')}></div>
            </div>
          </div>
          <hr className="border-t border-[#2EA9DF] w-full" />
          {renderContent()}
        </>
      )}
      {showMBTIModal && (
        <MBTIModal
          onClose={() => setShowMBTIModal(false)}
          onUpdate={setMbtiType}
        />
      )}
    </div>
  );
};

export default Profile;
