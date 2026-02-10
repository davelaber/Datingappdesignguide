import { createBrowserRouter } from 'react-router';
import Root from './Root';
import { SwipeTab } from './components/SwipeTab';
import { ExploreTab } from './components/ExploreTab';
import { MessagesTab } from './components/MessagesTab';
import { OnboardingScreen } from './components/OnboardingScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MessagesPage } from './components/MessagesPage';
import { ChatDetail } from './components/ChatDetail';
import { AccountSettings } from './components/AccountSettings';
import { SubscriptionPage } from './components/SubscriptionPage';
import { ProfileEdit } from './components/ProfileEdit';
import { PreferencesPage } from './components/PreferencesPage';
import { PaymentPage } from './components/PaymentPage';
import { SupportPage } from './components/SupportPage';
import { InvitePage } from './components/InvitePage';
import { RatePage } from './components/RatePage';
import { RulesPage } from './components/RulesPage';
import { ComingSoon } from './components/ComingSoon';

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    Component: OnboardingFlow,
  },
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: SwipeTab },
      { path: 'swipe', Component: SwipeTab },
      { path: 'explore', Component: ExploreTab },
      { path: 'messages', Component: MessagesPage },
      { path: 'chat/:id', Component: ChatDetail },
      { path: 'settings', Component: AccountSettings },
      { path: 'subscription', Component: SubscriptionPage },
      { path: 'profile/edit', Component: ProfileEdit },
      { path: 'preferences', Component: PreferencesPage },
      { path: 'payment', Component: PaymentPage },
      { path: 'rules', Component: RulesPage },
      { path: 'support', Component: SupportPage },
      { path: 'invite', Component: InvitePage },
      { path: 'rate', Component: RatePage },
      { path: '*', Component: ComingSoon },
    ],
  },
]);