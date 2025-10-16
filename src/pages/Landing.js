import React from 'react';

function Landing() {
  return (
    <div className="bg-black  w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 pt-16 pb-10">
        {/* Animated Icon */}
        <div className="mb-4 text-9xl">
          🔗
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold  text-orange transform transition-transform duration-300 hover:scale-105 mb-6 tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-orange to-gray-200 hover:from-gray-400 hover:to-orange transition-all duration-500">Save, Organize, Search Links</h1>
        <p className="text-lg md:text-2xl text-gray-500 mb-10 max-w-2xl text-center">A minimal, elegant way to manage your favorite links. Keep your digital world organized — one link at a time</p>
        <div className="flex gap-6 mb-8">
          <a href="/login" className="px-8 py-3 rounded-full bg-orange text-gray-900 font-semibold shadow hover:bg-gray-200 transition duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-gray-300">Login</a>
          <a href="/login" className="px-8 py-3 rounded-full bg-gray-800 text-white font-semibold shadow hover:bg-orange transition duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-gray-300">Register</a>
        </div>
        {/* Animated GIF for interaction */}
        {/* <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" alt="Link Management Demo" className="rounded-xl shadow-lg w-full max-w-md mt-4" /> */}
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-orange mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange to-gray-200 hover:from-gray-400 hover:to-orange transition-all duration-500">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gradient-to-r from-[#ffa94d] to-[#AAAAAA] transform transition-transform duration-300 hover:scale-105 rounded-2xl shadow p-8 flex flex-col items-center border border-oranged text-center hover:from-gray-400 hover:to-orange transition-all duration-500">
            <div className="text-5xl" >🔗</div>
            <h3 className="text-xl text-gray-900 font-semibold mb-2">Add & Organize</h3>
            <p className="text-gray-700">Easily save links with titles, descriptions, and tags. Organize them for quick access.</p>
          </div>
          <div className="bg-gradient-to-r from-[#ffa94d] to-[#AAAAAA] transform transition-transform duration-300 hover:scale-105 rounded-2xl shadow p-8 flex flex-col items-center border border-oranged text-center hover:from-gray-400 hover:to-orange transition-all duration-500">
            <div className="text-5xl" >🔍</div>
            <h3 className="text-xl text-gray-900 font-semibold mb-2">Powerful Search</h3>
            <p className="text-gray-700">Find any link instantly by title, description, or tag. Smart search for productivity.</p>
          </div>
          <div className="bg-gradient-to-r from-[#ffa94d] to-[#AAAAAA] transform transition-transform duration-300 hover:scale-105 rounded-2xl shadow p-8 flex flex-col items-center border border-oranged text-center hover:from-gray-400 hover:to-orange transition-all duration-500">
            <div className="text-5xl" >🛡️</div>
            <h3 className="text-xl text-gray-900 font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-700">Your links are protected with modern authentication and privacy standards.</p>
          </div>
        </div>
      </section>

      {/* Visual Representation Section */}
<section className="max-w-5xl mx-auto px-4 py-16 ">
  <h2 className="text-4xl font-bold text-orange mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange to-gray-200">
    How It Works
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center transform transition-transform duration-300 hover:scale-105
                  bg-gradient-to-r from-[#ffa94d] to-[#AAAAAA] 
                  rounded-3xl p-8 m-6 shadow-lg">
    <img
      src="/img/342shots_so.png"
      alt="Link Management Demo"
      className="rounded-xl  w-full max-w-md mx-auto"
    />
    <ul className="space-y-6 text-lg text-gray-800">
      <li><span className="font-bold text-gray-900">1.</span> Register or log in to your account.</li>
      <li><span className="font-bold text-gray-900">2.</span> Add links with details and tags.</li>
      <li><span className="font-bold text-gray-900">3.</span> Search, edit, and manage your collection from a beautiful dashboard.</li>
      <li><span className="font-bold text-gray-900">4.</span> Enjoy secure, fast access to your favorite resources.</li>
    </ul>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange to-gray-200 mb-10 text-center">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gradient-to-r  from-[#ffa94d] to-[#AAAAAA] transform transition-transform duration-300 hover:scale-105 hover:from-gray-400 hover:to-orange transition-all duration-500 rounded-2xl shadow p-8 flex flex-col items-center text-center border border-oranged">
            <div className="text-7xl">👨🏻</div>            
            <p className="text-gray-700 italic mb-2">“LinkSaver is the best way to keep my resources organized. The UI is stunning!”</p>
            <span className="text-gray-900 font-semibold">— Abhay Sharma</span>
          </div>
          <div className="bg-gradient-to-r from-[#ffa94d] to-[#AAAAAA] transform transition-transform duration-300 hover:scale-105 hover:from-gray-400 hover:to-orange transition-all duration-500 rounded-2xl shadow p-8 flex flex-col items-center text-center border border-oranged">
            <div className="text-7xl">👩🏻</div>            
            <p className="text-gray-700 italic mb-2">“I love the search feature. I find my links instantly!”</p>
            <span className="text-gray-900 font-semibold">— Khushi</span>
          </div>
          <div className="bg-gradient-to-r from-[#ffa94d] to-[#AAAAAA] transform transition-transform duration-300 hover:scale-105 hover:from-gray-400 hover:to-orange transition-all duration-500 rounded-2xl shadow p-8 flex flex-col items-center text-center border border-oranged">
            <div className="text-7xl">👨🏻</div>            
            <p className="text-gray-700 italic mb-2">“Secure, fast, and beautiful. Highly recommended!”</p>
            <span className="text-gray-900 font-semibold">— Arin Dhiman</span>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-900 py-16 px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-100 mb-6">Ready to get started?</h2>
        <p className="text-lg text-gray-400 mb-8">Sign up now and experience the easiest way to save and manage your links.</p>
        <a href="/login" className="px-10 py-4 rounded-full text-black bg-gradient-to-r from-[#ffa94d] to-[#fff] transform transition-transform duration-300 hover:scale-105 hover:from-[#fff] hover:to-orange transition-all duration-500 font-semibold shadow  hover:scale-105 focus:ring-2 focus:ring-gray-300 text-xl">Create Account</a>
      </section>
    </div>
  );
}

export default Landing;
