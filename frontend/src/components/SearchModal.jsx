import React from 'react';

const SearchModal = ({ isOpen, searchQuery, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-3/4 h-3/4 overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">{`「${searchQuery}」の検索結果`}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {/* 検索結果の内容をここに表示 */}
          <p>ここに検索結果を表示します。</p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;




