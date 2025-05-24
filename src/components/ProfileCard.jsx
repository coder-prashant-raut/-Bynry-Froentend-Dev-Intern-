import { Link } from 'react-router-dom';

 const  ProfileCard = ({ profile, onSummaryClick }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center gap-3 w-full sm:w-72 hover:shadow-lg transition-shadow">
      <Link to={`/profile/${profile.id}`}>
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
        />
      </Link>
      <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
      <p className="text-sm text-gray-600 text-center">{profile.description}</p>
      <button
        onClick={() => onSummaryClick(profile)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-700 transition"
      >
        Summary
      </button>
    </div>
  );
};

export default ProfileCard