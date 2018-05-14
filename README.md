# AI User Experience (AIUX by RentHero)
This README.md file outlines best practices for building a custom chatbot UI/UX. Many of these conventions are inspired by Facebook Messenger's chatbot platform, including syntax and design principles. This is particularly useful for cross-platform integration.

## Types of Messages
Please use these 3 types of messages. See more at: https://developers.facebook.com/docs/messenger-platform/send-messages#message_types
1. RESPONSE - Message is in response to a received message.
2. UPDATE - Message is being sent proactively and is not in response to a received message.
3. MESSAGE_TAG - Message is non-promotional and is being sent outside the 24-hour standard messaging window with a message tag. The message must match the allowed use case for the tag.

## Basic Message Syntax
```
curl -X POST -H "Content-Type: application/json" -d '{
  "recipient":{
    "id":"<PSID>"
  },
  "message":{
    "text":"hello, world!"
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
```
