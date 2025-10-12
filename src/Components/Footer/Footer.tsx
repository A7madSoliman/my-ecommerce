function Footer() {
  return (
    <footer className="w-full right-0 left-0 bottom-0 absolute bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <span className="text-sm text-gray-700 dark:text-gray-200">
          &copy; {new Date().getFullYear()} My E-commerce. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
