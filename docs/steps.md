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

## 6. Cleanup

```powershell
# Run the stop script
powershell -ExecutionPolicy Bypass -File stop_services.ps1
```
