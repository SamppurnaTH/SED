import React, { useState, useEffect } from 'react';
import { ViewState } from '../../App';
import { userService, Notification } from '../../services/userService';
import { Bell, Check, Trash2, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface NotificationsPageProps {
  onNavigate: (view: ViewState) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await userService.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await userService.markNotificationAsRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleMarkAllRead = async () => {
    // Optimistic update
    const unreadIds = notifications.filter(n => !n.read).map(n => n._id);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    // API calls in background
    try {
      await Promise.all(unreadIds.map(id => userService.markNotificationAsRead(id)));
    } catch (error) {
      console.error('Error marking all as read:', error);
      // Revert if needed, but keeping simple for now
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await userService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
              <Bell className="text-brand-600" /> Notifications
              {unreadCount > 0 && (
                <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full font-bold align-middle">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-slate-500 mt-1">Stay updated with your courses, assignments, and system alerts.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
              <Check size={16} className="mr-2" /> Mark all read
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'unread' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Unread
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-xl p-5 border shadow-sm transition-all hover:shadow-md flex gap-4 ${notification.read ? 'border-slate-200' : 'border-brand-200 bg-brand-50/20'
                  }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.type === 'success' ? 'bg-green-100 text-green-600' :
                  notification.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                    notification.type === 'error' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                  }`}>
                  <Bell size={20} />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-slate-900 ${!notification.read ? 'text-brand-700' : ''}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{new Date(notification.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-600 text-sm mt-1 mb-3 leading-relaxed">{notification.message}</p>

                  <div className="flex gap-3">
                    {!notification.read && (
                      <button
                        onClick={(e) => handleMarkAsRead(notification._id, e)}
                        className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={(e) => handleDelete(notification._id, e)}
                      className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
              <div className="inline-flex p-4 bg-slate-50 rounded-full text-slate-300 mb-4">
                <Bell size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No notifications found</h3>
              <p className="text-slate-500">You're all caught up!</p>
              {filter !== 'all' && (
                <Button variant="ghost" onClick={() => setFilter('all')} className="mt-2 text-brand-600">
                  View all notifications
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
