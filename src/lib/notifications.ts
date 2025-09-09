export async function sendBulkyNotification(title: string, body: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });

    if (!res.ok) {
      console.error('Failed to send notification');
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
