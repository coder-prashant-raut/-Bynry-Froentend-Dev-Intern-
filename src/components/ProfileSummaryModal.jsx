import React from 'react';
import MapComponent from './MapComponent';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const ProfileSummaryModal = ({ profile, isOpen, onClose }) => {
  if (!profile) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
  <div className="p-4 sm:p-6">
    <div className="flex items-center space-x-4 mb-4">
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-16 h-16 rounded-full object-cover border shadow"
      />
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
        <p className="text-sm text-gray-500">{profile.email || 'example@email.com'}</p>
      </div>
    </div>

    <div className="space-y-3 text-gray-700">
      <div>
        <h4 className="text-sm font-medium text-gray-500">Description</h4>
        <p className="text-base font-normal">{profile.description}</p>
      </div>

      <div className="border-t border-gray-200 pt-3">
        <h4 className="text-sm font-medium text-gray-500">Address</h4>
        <p className="text-base font-normal">{profile.address}</p>
      </div>

      <div className="border-t border-gray-200 pt-3">
        <h4 className="text-sm font-medium text-gray-500">Contact</h4>
        <p className="text-base font-normal">{profile.phone || 'Not available'}</p>
      </div>

      {profile.interests && profile.interests.length > 0 && (
        <div className="border-t border-gray-200 pt-3">
          <h4 className="text-sm font-medium text-gray-500">Interests</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {profile.interests.map((interest, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="mt-6 w-full h-64 rounded-md overflow-hidden shadow border border-gray-200">
      <MapComponent lat={profile.lat} lng={profile.lng} name={profile.name} />

    </div>
  </div>
</Modal>

  );
};

export default ProfileSummaryModal;
