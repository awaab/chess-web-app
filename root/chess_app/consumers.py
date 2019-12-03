from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync

class LoggedUsersConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        print(self.scope)
        print(self.user,"+++++++++++++")
        #Join group
        async_to_sync(self.channel_layer.group_add)(
            "logged_users",
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "logged_users",
            self.channel_name
        )

    def receive(self, text_data):
        self.user = self.scope["user"]
        print(self.user,"+++++++++++++")
        text_data_json = json.loads(text_data)
        print(text_data_json)
        message = text_data_json['message']
        print("SessionKey:",text_data_json['SessionKey'])#self.scope["session"].session_key)
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            "logged_users",
            {
                'type': 'logged_user_message',
                'message': message
            }
        )

    def logged_user_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))