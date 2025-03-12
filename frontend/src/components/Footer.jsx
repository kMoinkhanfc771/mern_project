const Footer = () => {
    return (
      <footer className="bg-white py-12 px-8 md:px-24">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Logo Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-6">Funiro.</h2>
            <p className="text-gray-500 leading-relaxed">
              400 University Drive Suite 200 Coral Gables, <br /> FL 33134 USA
            </p>
          </div>
  
          {/* Links Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-medium mb-4">Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-gray-700">Home</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700">Shop</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700">About</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700">Contact</a></li>
            </ul>
          </div>
  
          {/* Help Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-medium mb-4">Help</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-gray-700">Payment Options</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700">Returns</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700">Privacy Policies</a></li>
            </ul>
          </div>
  
          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Newsletter</h3>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="p-2 border border-gray-400 w-48"
              />
              <button className="font-medium hover:text-gray-700">SUBSCRIBE</button>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="text-gray-500 text-center">
          <p>2023 Funiro. All rights reserved</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  