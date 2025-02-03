import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';


export default function Footer() {
  return (
    <footer className="bg-color_three p-6 text-color_four">
      <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
        <ul className="flex space-x-4">
          <SocialIcon url='https://x.com' bgColor="#A8D5BA" fgColor="#333333" />
          <SocialIcon url='https://facebook.com' bgColor="#A8D5BA" fgColor="#333333" />
          <SocialIcon url='https://instagram.com/' bgColor="#A8D5BA" fgColor="#333333" />
        </ul>
        <div className="flex space-x-6">
          <Link href='/contact' className="text-sm font-medium text-color_four hover:text-[#D1C4E9]">Contact us</Link>
          <Link href='/information' className="text-sm font-medium text-color_four hover:text-[#D1C4E9]">About us</Link>
        </div>
      </div>
    </footer>
  );
}