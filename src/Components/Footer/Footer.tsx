function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-sm text-gray-700 dark:text-gray-200">
          &copy; {new Date().getFullYear()} My E-commerce. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
