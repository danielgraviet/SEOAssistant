import Link from 'next/link';
import React from 'react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">User Settings</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter a new password"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6 flex gap-4">
            <button className="btn btn-primary flex-1">Save Changes</button>
            <Link href="../" passHref>
              <button className="btn btn-error flex-1 w-full">Return</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
