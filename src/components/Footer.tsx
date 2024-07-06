import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { checkUser } from '@/lib/checkUser';

const Footer = async () => {
  const user = await checkUser();
  console.log(user);
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto text-center">
        <p className="text-sm lg:text-base mb-4">&copy; 2024 Eagles Ring. All rights reserved.</p>
        <p className="text-xs lg:text-sm mb-2">Contact us: contact@eaglesring.com</p>
        <p className="text-xs lg:text-sm flex justify-center items-center">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FaTwitter className="text-gray-400 hover:text-white" />
            <span className="sr-only">Twitter</span> {/* Accessibility: Screen reader only */}
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FaFacebook className="text-gray-400 hover:text-white" />
            <span className="sr-only">Facebook</span> {/* Accessibility: Screen reader only */}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FaInstagram className="text-gray-400 hover:text-white" />
            <span className="sr-only">Instagram</span> {/* Accessibility: Screen reader only */}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
