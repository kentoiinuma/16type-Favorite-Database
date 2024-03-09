import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from '@mui/material'; // MUIのLinkコンポーネントをインポート
import Alert from '@mui/material/Alert'; // MUIのAlertコンポーネントをインポート

// MBTIのタイプを定義
const MBTI_TYPES = [
  'ESFP',
  'ESTP',
  'ISFP',
  'ISTP', // Se
  'ESFJ',
  'ESTJ',
  'ISFJ',
  'ISTJ', // Si
  'ENFP',
  'ENTP',
  'INFP',
  'INTP', // Ne
  'ENFJ',
  'ENTJ',
  'INFJ',
  'INTJ', // Ni
];

// MBTIModalコンポーネントの定義
const MBTIModal = ({ onClose, onUpdate }) => {
  const { user } = useUser(); // Clerkからユーザー情報を取得
  const [selectedMBTI, setSelectedMBTI] = useState(''); // 選択されたMBTIタイプの状態
  const [diagnosisMethod, setDiagnosisMethod] = useState(''); // 診断方法の状態
  const [mbtiError, setMbtiError] = useState(false); // MBTIタイプ選択エラーの状態
  const [methodError, setMethodError] = useState(false); // 診断方法選択エラーの状態

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

  // MBTIタイプ選択時の処理
  const handleMBTIChange = (event) => {
    setSelectedMBTI(event.target.value);
  };

  // 診断方法選択時の処理
  const handleDiagnosisMethodChange = (event) => {
    setDiagnosisMethod(event.target.value);
  };

  // フォーム送信時の処理
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedMBTI) {
      setMbtiError(true);
    } else {
      setMbtiError(false);
    }
    if (!diagnosisMethod) {
      setMethodError(true);
    } else {
      setMethodError(false);
    }
    if (selectedMBTI && diagnosisMethod) {
      const response = await fetch(`${API_URL}/api/v1/mbti/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mbti_type: selectedMBTI,
          diagnosis_method: diagnosisMethod,
        }),
      });

      if (!response.ok) {
        // エラーハンドリング
      }

      onUpdate(selectedMBTI); // 親コンポーネントの更新処理を呼び出し
      onClose(); // モーダルを閉じる
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto"
          style={{ borderColor: '#2EA9DF' }}
        >
          <div style={{ textAlign: 'right' }}>
            <button onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {mbtiError && (
            <Alert severity="error">MBTIタイプを選択してください</Alert>
          )}
          {methodError && (
            <Alert severity="error">タイプ診断の方法を選択してください。</Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="mbti-select"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ color: '#2EA9DF' }}
              >
                MBTIタイプ
              </label>
              <select
                id="mbti-select"
                value={selectedMBTI}
                onChange={handleMBTIChange}
                className="block w-full border py-2 px-3 shadow-sm focus:outline-none rounded-md"
                style={{ borderColor: '#2EA9DF', backgroundColor: 'white' }}
              >
                <option value="">--選択してください--</option>
                {MBTI_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <fieldset className="mb-4">
              <legend
                className="text-sm font-medium text-gray-700 mb-1"
                style={{ color: '#2EA9DF' }}
              >
                タイプ診断の方法
              </legend>
              <label className="block mb-4">
                <input
                  type="radio"
                  value="self_assessment"
                  name="diagnosisMethod"
                  onChange={handleDiagnosisMethodChange}
                  className="mr-2"
                />
                診断サイトでの診断を参考にしたり、書籍やWebサイトなどでMBTIに関する情報を集めて、自らの判断で決定した
                <div className="ml-4 mt-2">
                  <Link
                    href="https://www.16personalities.com/ja/%E6%80%A7%E6%A0%BC%E8%A8%BA%E6%96%AD%E3%83%86%E3%82%B9%E3%83%88"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    16personalities
                  </Link>
                  <br />
                  <Link
                    href="https://www.idrlabs.com/jp/cognitive-function/test.php"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    心理機能テスト
                  </Link>
                  <br />
                  <Link
                    href="http://rinnsyou.com/archives/category/0200sinriryouhou/0203yungu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    心理機能について
                  </Link>
                  <br />
                  <Link
                    href="https://www.amazon.co.jp/dp/4905050219"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MBTIの書籍
                  </Link>
                </div>
              </label>
              <label className="block">
                <input
                  type="radio"
                  value="official_assessment"
                  name="diagnosisMethod"
                  onChange={handleDiagnosisMethodChange}
                  className="mr-2"
                />
                <Link
                  href="https://www.mbti.or.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  公式
                </Link>
                のセッションを通じて決定した
              </label>
            </fieldset>
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-4 py-2 font-bold rounded focus:outline-none focus:ring-opacity-50"
                style={{ backgroundColor: '#2EA9DF', color: 'white' }}
              >
                更新する
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MBTIModal;
