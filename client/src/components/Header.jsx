const Header = ({ isOpen, setIsOpen }) => {
  let userName = "User";

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm md:left-64">
      <div className="w-full px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen && setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <h1 className="text-base sm:text-lg font-semibold text-gray-800 truncate ml-1">
            Welcome back, {userName}!
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-blue-200 shadow"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
