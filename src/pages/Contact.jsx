import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Contact Us
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Have questions, feedback, or need assistance? We’d love to hear from
        you!
      </p>

      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-start space-x-4">
          <Mail className="w-6 h-6 text-amber-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Email
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              support@recipebook.com
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              info@recipebook.com
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-4">
          <Phone className="w-6 h-6 text-amber-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Phone
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              +1 (555) 123-4567
            </p>
            <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM EST</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start space-x-4">
          <MapPin className="w-6 h-6 text-amber-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Address
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              123 Cooking Street
              <br />
              Food City, FC 12345
              <br />
              United States
            </p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start space-x-4">
          <Clock className="w-6 h-6 text-amber-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Business Hours
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monday - Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 10:00 AM - 4:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="pt-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Connect with us
          </h3>
          <div className="flex space-x-4">
            <li className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-500 hover:text-amber-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-amber-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-amber-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
