import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <p className="mb-2">Phone: <a href="tel:+9711051397" className="text-purple-400 hover:underline">+91 97110 51397</a></p>
            <h3 className="text-lg font-semibold">Mailing Address</h3>
            <p>rescuenet.org@gmail.com</p>
            <p>GHAZIABAD, 201003</p>
            <h3 className="text-lg font-semibold mt-4">Headquarters</h3>
            <p>DELHI NCR</p>
            <p>GHAZIABAD, 201003</p>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Support Our Work</h2>
            {/* <p className="mb-4">
              <strong>Donate Today:</strong> We are an IRS Approved 501c3 organization, meaning your donations are 100% tax deductible.
            </p> */}
            <a
              href="#donate"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded font-semibold"
            >
              Donate Now
            </a>
          </div>

          {/* Working Hours */}
          <div>
            <h2 className="text-xl font-bold mb-4">Working Hours</h2>
            <p>Monday – Friday: 09:00 am – 09:00 pm</p>
            <p>Saturday – Sunday: Closed</p>
            <h2 className="text-xl font-bold mt-6">Contact Us</h2>
            <p>Newsletter</p>
            <p>Stay up to date with our latest news, bulletins, and more.</p>
            <form className="mt-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full mb-2 p-2 rounded bg-gray-700 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full mb-2 p-2 rounded bg-gray-700 text-white focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-2 p-2 rounded bg-gray-700 text-white focus:outline-none"
              />
              <button
                type="button"
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded font-semibold"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm mt-2">
              By continuing, you accept the <a href="#privacy-policy" className="text-purple-400 hover:underline">privacy policy</a>.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-sm mb-2">
            Website & Data Usage Policy – <a href="#privacy-policy" className="text-purple-400 hover:underline">Privacy Policy</a> – Newsletter Policy/Opt-in Policy
          </p>
          <p className="text-sm">
            © 2024 RESCUENET - GHAZIABAD,U.P INDIA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
