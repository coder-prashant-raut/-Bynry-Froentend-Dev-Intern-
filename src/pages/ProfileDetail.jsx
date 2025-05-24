import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadProfiles } from '../utils/localStorageUtils';
import MapComponent from '../components/MapComponent';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full relative"
        onClick={e => e.stopPropagation()} // prevent modal closing on clicking inside
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

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = loadProfiles().find((p) => p.id === Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!profile) {
    return (
      <div className="p-10 text-center text-red-500">
        Profile not found.
        <br />
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        ← Back
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row gap-6">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
          <p className="text-gray-600 mt-2">{profile.description}</p>
          <p className="text-gray-600 mt-2"><strong>Address:</strong> {profile.address}</p>
          <p className="text-gray-600 mt-2"><strong>Interests:</strong> Web Development, UI Design, Tech</p>
          <p className="text-gray-600 mt-2"><strong>Contact:</strong> example@email.com</p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Summary
          </button>
        </div>
      </div>

      {/* Modal with map and address */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">{profile.name}</h2>
        <p className="mb-4"><strong>Address:</strong> {profile.address}</p>
        <div className="w-full h-64 rounded-md overflow-hidden shadow-md">
          <MapComponent lat={profile.lat} lng={profile.lng} name={profile.name} />
        </div>
      </Modal>
    </div>
  );
};

export default ProfileDetail;
