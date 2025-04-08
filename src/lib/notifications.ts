import webPush from 'web-push';

// Configure web-push with VAPID keys
export const configurePushNotifications = () => {
  if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    console.warn('Push notifications require VAPID keys to be set in environment variables');
    return;
  }

  webPush.setVapidDetails(
    'mailto:' + (process.env.CONTACT_EMAIL || 'example@domain.com'),
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
};

// Send a web push notification to a specific subscription
export const sendPushNotification = async (
  subscription: webPush.PushSubscription,
  payload: {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    image?: string;
    tag?: string;
    data?: any;
    actions?: Array<{ action: string; title: string; icon?: string }>;
  }
) => {
  try {
    const result = await webPush.sendNotification(
      subscription,
      JSON.stringify({
        notification: {
          ...payload,
        },
      })
    );
    return { success: true, result };
  } catch (error) {
    console.error('Error sending push notification:', error);
    return { success: false, error };
  }
};

// Generate VAPID keys for push notifications (use this once to set up)
export const generateVapidKeys = () => {
  const vapidKeys = webPush.generateVAPIDKeys();
  console.log('VAPID Keys generated:');
  console.log('Public Key:', vapidKeys.publicKey);
  console.log('Private Key:', vapidKeys.privateKey);
  return vapidKeys;
}; 