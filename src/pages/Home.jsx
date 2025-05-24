import React, { useState, useEffect } from 'react';
import { loadProfiles } from '../utils/localStorageUtils';
import ProfileCard from '../components/ProfileCard';
import MapComponent from '../components/MapComponent';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    setProfiles(loadProfiles());
  }, []);


  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Profile Explorer
      </h1>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-6 text-black">
        <input
          type="text"
          placeholder="Search by name, location or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Profile Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onSummaryClick={handleSummaryClick}
            />
          ))
        ) : (
          <p className="text-gray-600">No profiles match your search.</p>
        )}
      </div>

      {/* Map for selected profile */}
      {selectedProfile && (
        <div className="mt-10 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-3 text-gray-800">
            Location of {selectedProfile.name}
          </h2>
          <MapComponent
            lat={selectedProfile.lat}
            lng={selectedProfile.lng}
            name={selectedProfile.name}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
