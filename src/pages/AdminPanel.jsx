import React, { useState, useEffect } from 'react';
import { loadProfiles, saveProfiles } from '../utils/localStorageUtils';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    photo: '',
    description: '',
    address: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    setProfiles(loadProfiles());
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddOrUpdate = () => {
    let updatedProfiles;
    if (formData.id) {
      updatedProfiles = profiles.map((p) =>
        p.id === formData.id ? formData : p
      );
    } else {
      updatedProfiles = [...profiles, { ...formData, id: Date.now() }];
    }

    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);

    setFormData({
      id: null,
      name: '',
      photo: '',
      description: '',
      address: '',
      lat: '',
      lng: '',
    });
  };

  const handleEdit = (profile) => {
    setFormData(profile);
  };

  const handleDelete = (id) => {
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    saveProfiles(updated);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Admin Panel
      </h1>

      {/* Form */}
      <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {formData.id ? 'Edit Profile' : 'Add New Profile'}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddOrUpdate();
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-1 font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Photo URL */}
          <div className="flex flex-col">
            <label
              htmlFor="photo"
              className="mb-1 font-medium text-gray-700"
            >
              Photo URL
            </label>
            <input
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              type="url"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col sm:col-span-2">
            <label
              htmlFor="description"
              className="mb-1 font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Brief description about the profile"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="mb-1 font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Latitude */}
          <div className="flex flex-col">
            <label
              htmlFor="lat"
              className="mb-1 font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              id="lat"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              type="number"
              step="any"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Longitude */}
          <div className="flex flex-col">
            <label
              htmlFor="lng"
              className="mb-1 font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              id="lng"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
              type="number"
              step="any"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit button spanning full width */}
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {formData.id ? 'Update Profile' : 'Add Profile'}
            </button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Existing Profiles
        </h2>

        {profiles.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No profiles found. Add some above!
          </p>
        ) : (
          <ul className="space-y-4">
            {profiles.map((profile) => (
              <li
                key={profile.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                      N/A
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {profile.name}
                    </p>
                    <p className="text-gray-600">{profile.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{profile.address}</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 flex space-x-4">
                  <button
                    onClick={() => handleEdit(profile)}
                    className="text-yellow-600 hover:underline font-medium"
                    aria-label={`Edit ${profile.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(profile.id)}
                    className="text-red-600 hover:underline font-medium"
                    aria-label={`Delete ${profile.name}`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
