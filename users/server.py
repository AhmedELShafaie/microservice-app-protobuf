import grpc
from concurrent import futures
import time
import uuid
import user_pb2
import user_pb2_grpc

class UserService(user_pb2_grpc.UserServiceServicer):
    def __init__(self):
        self.users = {}

    def CreateUser(self, request, context):
        user_id = str(uuid.uuid4())
        user = user_pb2.User(
            id=user_id,
            name=request.name,
            email=request.email
        )
        self.users[user_id] = user
        print(f"User created: {user_id}")
        return user

    def GetUser(self, request, context):
        user = self.users.get(request.id)
        if user:
            return user
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('User not found')
            return user_pb2.User()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    server.add_insecure_port('[::]:50051')
    print("Users Service started on port 50051")
    server.start()
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
