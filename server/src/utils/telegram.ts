export async function sendTelegramMessage(body): Promise<void> {
    const telegramChannel = process.env.TELEGRAM_CHANNEL || '';
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || '';
  
    const now = new Date();
    const formattedDate = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
  
    const message = `New Order:\nTime: ${formattedDate}\nPrice: aaa`;
  
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChannel}&text=${encodeURIComponent(
      message
    )}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send message to Telegram:', error);
    }
  }
  