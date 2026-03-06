import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0b] border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">GYMVERSE</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              The modern way to stay fit. Intelligent workout and diet tracking to help you reach your goals.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/workouts" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Workouts</Link></li>
              <li><Link to="/diet" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Nutrition</Link></li>
              <li><Link to="/exercises" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Exercise Library</Link></li>
              <li><Link to="/plans" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>support@gymverse.com</li>
              <li>+91 8148893144</li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} GYMVERSE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
