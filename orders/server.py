import grpc
from concurrent import futures
import time
import uuid
import order_pb2
import order_pb2_grpc

class OrderService(order_pb2_grpc.OrderServiceServicer):
    def __init__(self):
        self.orders = {}

    def CreateOrder(self, request, context):
        order_id = str(uuid.uuid4())
        # Calculate total (mock logic as we don't have product prices here easily without calling ProductService)
        # For demo, let's assume each item is $10.0
        total = 0.0
        for item in request.items:
             total += item.quantity * 10.0

        order = order_pb2.Order(
            id=order_id,
            user_id=request.user_id,
            items=request.items,
            total=total
        )
        self.orders[order_id] = order
        print(f"Order created: {order_id} for user {request.user_id}")
        return order

    def GetOrder(self, request, context):
        order = self.orders.get(request.id)
        if order:
            return order
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Order not found')
            return order_pb2.Order()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    order_pb2_grpc.add_OrderServiceServicer_to_server(OrderService(), server)
    server.add_insecure_port('[::]:50053')
    print("Orders Service started on port 50053")
    server.start()
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
