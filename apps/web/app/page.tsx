import JoinNow from "../components/JoinNow";
import CreateRoom from "../components/CreateRoom";
import SignUpButton from "../components/SignUpButton";
import { MessageSquare, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">ChatFlow</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-indigo-600">About</a>
            <SignUpButton text = "Get Started" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
          Connect and Chat <br />
          <span className="text-indigo-600">Without Limits</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Experience seamless communication with our modern chat platform. Connect with anyone, anywhere, anytime.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <SignUpButton text= {"Start Chatting Now !"} />
          <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full hover:bg-indigo-50 transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Choose ChatFlow?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Messaging</h3>
              <p className="text-gray-600">End-to-end encryption ensures your conversations stay private and secure.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-600">Real-time messaging with minimal latency for smooth conversations.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Reach</h3>
              <p className="text-gray-600">Connect with people from around the world without any barriers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-600">Join thousands of satisfied users who love ChatFlow</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
          <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=100&fit=crop&q=80" alt="Company logo" className="h-12" />
          <img src="https://images.unsplash.com/photo-1611162616305-c69b3396c691?w=200&h=100&fit=crop&q=80" alt="Company logo" className="h-12" />
          <img src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=100&fit=crop&q=80" alt="Company logo" className="h-12" />
          <img src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=100&fit=crop&q=80" alt="Company logo" className="h-12" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-8 md:mb-0">
              <MessageSquare className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">ChatFlow</span>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0 text-center md:text-left">
              <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400">Contact Us</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ChatFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
