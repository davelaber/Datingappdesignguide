import { Outlet, useLocation } from 'react-router';
import { BottomNavigation } from './components/BottomNavigation';

export default function Root() {
  const location = useLocation();
  
  // Hide bottom nav on certain pages
  const hideBottomNav = location.pathname.startsWith('/chat/') || 
                        location.pathname === '/subscription' || 
                        location.pathname === '/profile/edit' ||
                        location.pathname === '/preferences' ||
                        location.pathname === '/payment' ||
                        location.pathname === '/rules' ||
                        location.pathname === '/support' ||
                        location.pathname === '/invite' ||
                        location.pathname === '/rate' ||
                        location.pathname === '/settings';

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] flex justify-center">
      {/* Mobile Container */}
      <div className="w-full max-w-[430px] min-h-screen bg-[var(--navy-deep)] relative">
        <Outlet />
        {!hideBottomNav && <BottomNavigation />}
      </div>
    </div>
  );
}