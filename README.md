# microservice-app-protobuf

This is a microservice app created to illustrate Protocol buffer usage

# Project Commands Log

Here is the summary of commands executed to create and run the microservices application.

## 1. Project Initialization

```powershell
mkdir microservices-app
mkdir microservices-app\protos
mkdir microservices-app\gateway
mkdir microservices-app\users
mkdir microservices-app\products
mkdir microservices-app\orders
```

## 2. Dependencies

### Node.js Services (Gateway & Products)

```powershell
cd microservices-app\gateway
npm init -y
npm install express @grpc/grpc-js @grpc/proto-loader body-parser
npm install -D typescript ts-node @types/node @types/express @types/body-parser

cd ..\products
npm init -y
npm install @grpc/grpc-js @grpc/proto-loader
npm install -D typescript ts-node @types/node
```

### Python Services (Users & Orders)

```powershell
cd ..\users
python -m venv venv
.\venv\Scripts\pip install grpcio grpcio-tools typing-extensions protobuf

cd ..\orders
python -m venv venv
.\venv\Scripts\pip install grpcio grpcio-tools typing-extensions protobuf
```

```bash
cd ~/microservices-app/users 
python -m venv venv
pip3 install -r ./requirements.txt
python3 server.py

cd ~/microservices-app/orders
python -m venv venv
pip3 install -r ./requirements.txt
python3 server.py
```

## 3. Protobuf Generation

### Python Services

```powershell
cd ..\users
.\venv\Scripts\python -m grpc_tools.protoc -I../../protos --python_out=. --grpc_python_out=. ../../protos/user.proto

cd ..\orders
.\venv\Scripts\python -m grpc_tools.protoc -I../../protos --python_out=. --grpc_python_out=. ../../protos/order.proto
```

*Note: Node.js services load protos dynamically at runtime using `@grpc/proto-loader`, so no generation step is needed for them.*

## 4. Running the Application

### Start Services (in separate terminals)

```powershell
# Users Service
cd microservices-app\users
.\venv\Scripts\python server.py

# Orders Service
cd microservices-app\orders
.\venv\Scripts\python server.py

# Products Service
cd microservices-app\products
npx ts-node src/server.ts

# Gateway
cd microservices-app\gateway
npx ts-node src/server.ts
```

## 5. Verification

```powershell
# Install verification script dependencies (if any) or just run with node
node verify.js
```

## 6. Verification using cURL

### For Order Service

To create an Order using Order Service

```bash
curl -X POST "http://localhost:3000/orders" \
-H "Content-Type: application/json" \
-d "{\"user_id\": \"d4344acd-8365-4d19-8170-12b5b3e47685\" ,\"items\": [{ \"product_id\" : \"100\" , \"quantity\": 2},{\"product_id\" : \"200\" , \"quantity\": 2}]}"
```

To Query an Order with OrderID

```bash
curl -X GET  "http://localhost:3000/orders/72629a52-7a78-4b7d-934f-4c673f472c3e" \
-H "Content-Type: application:json"
```

### For Users Service

To create a user using the User microservice

```bash
curl -X POST http://localhost:3000/users -H "Content-Type:application/json" -d "{\"name\":\"Ahmed\", \"email\": \"ahmed@example.com\"}"
```

Query user

```bash
curl -sSL -X GET http://localhost:3000/users/8a70563c-d53f-42b4-9a8d-1debe0b3fc66 -H "Content-Type: application/json" | jq
```

## 7. Build Docker images for each microservice

### Build Gateway image

```bash
cd /home/ubuntu/microservice-app-protobuf 
docker image  build -t ahmedfathy/microservice-app-protobuf-gateway:${VERSION} -f dockerfiles/Dockerfile.gateway .
```

### Build Products image

```bash
cd /home/ubuntu/microservice-app-protobuf
docker build -t ahmedfathy/microservice-app-protobuf-products:${VERSION}$ -f  dockerfiles/Dockerfile.products .
```

### Build Orders image

```bash
cd /home/ubuntu/microservice-app-protobuf
docker image  build -t ahmedfathy/microservice-app-protobuf-order:${VERSION}$ -f dockerfiles/Dockerfile.orders .
```

### Build Users image

```bash
cd /home/ubuntu/microservice-app-protobuf
docker image  build -t ahmedfathy/microservice-app-protobuf-users:${VERSION}$ -f dockerfiles/Dockerfile.users .
```

## 8. Cleanup

```powershell
# Run the stop script
powershell -ExecutionPolicy Bypass -File stop_services.ps1
```
