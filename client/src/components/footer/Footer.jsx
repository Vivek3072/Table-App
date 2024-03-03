export default function Footer() {
  return (
    <div>
      <footer className="bg-primaryGreen bg-opacity-20 rounded-lg shadow">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://tables app.in/"
              className="flex items-center mx-20 mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              Tables App
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <span className="block text-md text-gray-500 sm:text-center">
            © 2023
            <a
              href="https://github.com/Vivek3072"
              className="hover:underline text-primaryGreen font-bold"
            >
              Vivek Srivastava
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
