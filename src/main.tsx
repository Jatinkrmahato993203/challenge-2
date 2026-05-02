import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check for reminders on app load
if ('Notification' in window && Notification.permission === 'granted') {
  try {
    const reminders = JSON.parse(localStorage.getItem('civic-reminders') || '[]');
    const now = new Date();
    const futureReminders = reminders.filter((r: any) => {
      const remindTime = new Date(r.remindAt);
      if (remindTime <= now) {
        new Notification(`📅 Reminder: ${r.title} is coming up!`);
        return false; // Remove from storage after firing
      }
      return true;
    });
    localStorage.setItem('civic-reminders', JSON.stringify(futureReminders));
  } catch(e) {}
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
