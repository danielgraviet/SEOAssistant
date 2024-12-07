import Link from "next/link";
import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>
          <p>Welcome to your profile! Upgrade to unlock premium features.</p>
          <div className="form-control mt-4">
            <button className="btn btn-primary w-full">Upgrade to Premium</button>
            <Link href="../" passHref>
          <button className="btn btn-secondary w-full mt-4">RETURN</button>
        </Link>
          </div>
        </div>
      </div>
      <div className="mt-6">
        
      </div>
    </div>
  );
};

export default Profile;
