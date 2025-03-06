import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-indigo-600 to-indigo-500 text-white font-poppins py-12 text-center relative overflow-hidden shadow-md">
      {/* Decorative Background */}
      <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-[120%] h-[50px] bg-gradient-to-r from-purple-200 via-indigo-400 to-indigo-200 clip-path-polygon z-1"></div>

      {/* Footer Content */}
      <div className="relative z-2">
        {/* Links Section */}
        <div className="mb-8">
          <ul className="flex flex-wrap justify-center gap-5 text-base font-medium">
            <li>
              <a
                href="#"
                className="text-indigo-100 hover:text-yellow-400 transform hover:translate-y-[-2px] transition-all"
              >
                Adoption Platform
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-100 hover:text-yellow-400 transform hover:translate-y-[-2px] transition-all"
              >
                Sitemap
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-100 hover:text-yellow-400 transform hover:translate-y-[-2px] transition-all"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-100 hover:text-yellow-400 transform hover:translate-y-[-2px] transition-all"
              >
                Notice at Collection
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-100 hover:text-yellow-400 transform hover:translate-y-[-2px] transition-all"
              >
                Privacy Policy (Updated)
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-100 hover:text-yellow-400 transform hover:translate-y-[-2px] transition-all"
              >
                About Our Ads
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-100 hover:text-yellow-400 transform hover:translate-y-[-2px] transition-all"
              >
                Your Privacy Choices
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons Section */}
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="text-indigo-100 text-3xl hover:text-yellow-400 transform hover:scale-110 transition-all"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="text-indigo-100 text-3xl hover:text-yellow-400 transform hover:scale-110 transition-all"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-indigo-100 text-3xl hover:text-yellow-400 transform hover:scale-110 transition-all"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="tel:+941234567"
            aria-label="Call Us"
            className="text-white text-base flex items-center gap-2 hover:text-yellow-400 transform hover:translate-y-[-2px] transition-all"
          >
            <FontAwesomeIcon icon={faPhone} /> +94 123 4567
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-sm text-gray-400">
        <p className="m-0 tracking-wide">
          © 2024 Fetch Me Home. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
