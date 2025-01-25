import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Access your dashboard</p>

        <form>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
