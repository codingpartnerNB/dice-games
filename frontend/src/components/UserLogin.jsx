import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCity, FaMapMarker, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    state: '',
    city: '',
    role: 'user'
  });

  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log(res);
      localStorage.setItem('token', res.data.token);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.email, formData.password);
    const {email, password} = formData;
    if (!email || !password) {
      console.error("Email and Password are required!");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 transition-all duration-300 hover:shadow-2xl">
      <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-700 mb-4">Diice Raja</h1>
        <h2 className="text-xl font-bold text-white mb-8 text-center">
          {isLogin ? 'User Login' : 'User Sign Up'}
        </h2>

        <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative group">
              <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-white/80" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg outline-none focus:ring-2 ring-white/50 transition-all duration-300 placeholder:text-white/80 text-white"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="relative group">
            <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-white/80" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg outline-none focus:ring-2 ring-white/50 transition-all duration-300 placeholder:text-white/80 text-white"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="relative group">
                <FaPhone className="absolute top-1/2 left-3 -translate-y-1/2 text-white/80" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg outline-none focus:ring-2 ring-white/50 transition-all duration-300 placeholder:text-white/80 text-white"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <FaMapMarker className="absolute top-1/2 left-3 -translate-y-1/2 text-white/80" />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg outline-none focus:ring-2 ring-white/50 transition-all duration-300 placeholder:text-white/80 text-white"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="relative group">
                  <FaCity className="absolute top-1/2 left-3 -translate-y-1/2 text-white/80" />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg outline-none focus:ring-2 ring-white/50 transition-all duration-300 placeholder:text-white/80 text-white"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="relative group">
            <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-white/80" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg outline-none focus:ring-2 ring-white/50 transition-all duration-300 placeholder:text-white/80 text-white"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* Eye Icon for Show/Hide Password */}
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white/80 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-white/80 text-center mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-white font-semibold hover:underline transition-all duration-300 cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;