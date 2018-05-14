# AI User Experience (AIUX by RentHero)
This README.md file outlines best practices for building a custom chatbot UI/UX. Many of these conventions are inspired by Facebook Messenger's chatbot platform, including syntax and design principles. This is particularly useful for cross-platform integration.

## Types of Messages
Please use these 3 types of messages. See more at: https://developers.facebook.com/docs/messenger-platform/send-messages#message_types
1. `RESPONSE` - Message is in response to a received message.
2. `UPDATE` - Message is being sent proactively and is not in response to a received message.
3. `MESSAGE_TAG` - Message is non-promotional and is being sent outside the 24-hour standard messaging window with a message tag. The message must match the allowed use case for the tag.

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

## Messages with Attachments
You may attach 4 types of files in a chat message: `audio`, `image`, `video` and `file`. See more at: https://developers.facebook.com/docs/messenger-platform/send-messages/saving-assets
```
curl -X POST -H "Content-Type: application/json" -d '{
"recipient":{
  "id":"1254459154682919"
},
"message":{
  "attachment":{
    "type":"image",
    "payload":{
      "url":"http://www.messenger-rocks.com/image.jpg",
      "is_reusable":true
    }
  }
}
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
```

## Messages with Quick Replies
You may have quick reply buttons for a message, which is useful for guiding convo flow. There can be up to 11 quick reply options, and may be of 4 types: `text`, `location`, `phone` or `email`. See more at: https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies
```
curl -X POST -H "Content-Type: application/json" -d '{
  "recipient":{
    "id":"<PSID>"
  },
  "message":{
    "text": "Here is a quick reply!",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Search",
        "payload":"<POSTBACK_PAYLOAD>",
        "image_url":"http://example.com/img/red.png"
      },
      {
        "content_type":"location"
      }
    ]
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
```

## Sender Options/Indicators
Sender options/indicators are used to signal to the user that something is happening with the bot, such as `typing`. There are currently 3 indicators: `typing_on`, `typing_off` and `seen`. See more at: https://developers.facebook.com/docs/messenger-platform/send-messages/sender-actions
```
curl -X POST -H "Content-Type: application/json" -d '{
"recipient":{
  "id":"<PSID>"
},
"sender_action":"typing_on"
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
```

## Message Tags
Used when you are sending out a message that is considered an update or tag. Each tag indicates the purpose of the unsolicitated message, and must comply to standards. See more at: https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags
```
curl -X POST -H "Content-Type: application/json" -d '{
"recipient": {
  "id": "<PSID>"
},
"message":{
  ...
},
"messaging_type": "MESSAGE_TAG",
"tag": "SHIPPING_UPDATE"
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"  
```

## Handover Protocols
Use handovers when you want to hand over control of the convo from one bot to another bot, or to a human. We do not go into depth on handovers yet. For more info, see: https://developers.facebook.com/docs/messenger-platform/handover-protocol

## Message Templates
Think of these almost as rich media. They are often interactive webviews (at least FB Messenger's solution to webviews without HTML). See more at: https://developers.facebook.com/docs/messenger-platform/send-messages/templates

![alt text](https://scontent.fykz1-1.fna.fbcdn.net/v/t39.2365-6/21201919_1215144078631552_6152307842817720320_n.png?_nc_cat=0&oh=e20277a7863b6d9c80c4965070c1c9be&oe=5B96BE6A "Example 1")
![alt text](https://scontent.fykz1-1.fna.fbcdn.net/v/t39.2365-6/22880422_1740199342956641_1916832982102966272_n.png?_nc_cat=0&oh=6a580f8bf3adad4460955a5353c5853e&oe=5B8E0C3C "Example 2")
![alt text](https://scontent.fykz1-1.fna.fbcdn.net/v/t39.2365-6/23666967_188506161716866_2869776016224550912_n.png?_nc_cat=0&oh=621453ea0f342604812b7d0fd084770f&oe=5B80D0E5 "Example 3")
