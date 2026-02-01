
…\gateway > npm init -y
…\products > npm init -y

…\gateway > npm install express @grpc/grpc-js @grpc/proto-loader body-parser && npm install -D typescript ts-node @types/node @types/express

…\products > npm install @grpc/grpc-js @grpc/proto-loader && npm install -D typescript ts-node @types/node

…\users > python -m venv venv && .\venv\Scripts\pip install grpcio grpcio-tools

…\orders > python -m venv venv && .\venv\Scripts\pip install grpcio grpcio-tools

…\users > .\venv\Scripts\python -m grpc_tools.protoc -I../../protos --python_out=. --grpc_python_out=. ../../protos/user.proto

…\orders > .\venv\Scripts\python -m grpc_tools.protoc -I../../protos --python_out=. --grpc_python_out=. ../../protos/order.proto

…\products > npm install @grpc/grpc-js @grpc/proto-loader; npm install -D typescript ts-node @types/node

…\gateway > npm install express @grpc/grpc-js @grpc/proto-loader body-parser; npm install -D typescript ts-node @types/node @types/express

…\users > python -m venv venv; .\venv\Scripts\pip install grpcio grpcio-tools

…\orders > python -m venv venv; .\venv\Scripts\pip install grpcio grpcio-tools

run

…\users > .\venv\Scripts\python server.py
…\orders > .\venv\Scripts\python server.py
…\products > npx ts-node src/server.ts
…\gateway > npx ts-node src/server.ts

…\products > rd /s /q node_modules; del package-lock.json; npm install
…\gateway > npm install -D @types/body-parser

…\users > .\venv\Scripts\python -m grpc_tools.protoc -I../../protos --python_out=. --grpc_python_out=. ../../protos/user.proto

…\orders > .\venv\Scripts\python -m grpc_tools.protoc -I../../protos --python_out=. --grpc_python_out=. ../../protos/order.proto

…\products > Remove-Item -Recurse -Force node_modules; Remove-Item -Force package-lock.json; npm install

curl -X POST <http://localhost:3000/users> -H "Content-Type: application/json" -d "{\"name\": \"Alice\", \"email\": \"<alice@example.com>\"}"

curl <http://localhost:3000/products>

…\products > npm install -D ts-node typescript @types/node

cmd /c "curl -X POST <http://localhost:3000/users> -H \"Content-Type: application/json\" -d \"{\\\"name\\\": \\\"Alice\\\", \\\"email\\\": \\\"<alice@example.com>\\\"}\""
