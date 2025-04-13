import { sendTelegramMessage } from "../../../../utils/telegram";

export default {
  
    async afterCreate(event) {
      const { result, params } = event;

      const isPublish =
      result.publishedAt && new Date(result.createdAt).getTime() !== new Date(result.publishedAt).getTime();
  
        const body = {
        event: isPublish ? 'post-createAndPublish' : 'post-create',
        body: result,
        };
    
      try {
        await sendTelegramMessage(body)
      } catch (err) {
        console.error('Webhook failed:', err);
      }
    },
  };