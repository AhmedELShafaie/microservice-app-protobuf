import express from 'express';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const PROTO_OPTIONS = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};

// Load Protos
const userProtoDef = protoLoader.loadSync(path.join(__dirname, '../../protos/user.proto'), PROTO_OPTIONS);
const productProtoDef = protoLoader.loadSync(path.join(__dirname, '../../protos/product.proto'), PROTO_OPTIONS);
const orderProtoDef = protoLoader.loadSync(path.join(__dirname, '../../protos/order.proto'), PROTO_OPTIONS);

const userProto = grpc.loadPackageDefinition(userProtoDef) as any;
const productProto = grpc.loadPackageDefinition(productProtoDef) as any;
const orderProto = grpc.loadPackageDefinition(orderProtoDef) as any;

// Create Clients
const userClient = new userProto.users.UserService('localhost:50051', grpc.credentials.createInsecure());
const productClient = new productProto.products.ProductService('localhost:50052', grpc.credentials.createInsecure());
const orderClient = new orderProto.orders.OrderService('localhost:50053', grpc.credentials.createInsecure());

// Routes

// Users
app.post('/users', (req, res) => {
    userClient.CreateUser(req.body, (err: any, response: any) => {
        if (err) return res.status(500).json(err);
        res.json(response);
    });
});

app.get('/users/:id', (req, res) => {
    userClient.GetUser({ id: req.params.id }, (err: any, response: any) => {
        if (err) return res.status(err.code === grpc.status.NOT_FOUND ? 404 : 500).json(err);
        res.json(response);
    });
});

// Products
app.get('/products', (req, res) => {
    productClient.ListProducts({}, (err: any, response: any) => {
        if (err) return res.status(500).json(err);
        res.json(response.products); // Return array directly
    });
});

app.get('/products/:id', (req, res) => {
    productClient.GetProduct({ id: req.params.id }, (err: any, response: any) => {
        if (err) return res.status(err.code === grpc.status.NOT_FOUND ? 404 : 500).json(err);
        res.json(response);
    });
});

// Orders
app.post('/orders', (req, res) => {
    orderClient.CreateOrder(req.body, (err: any, response: any) => {
        if (err) return res.status(500).json(err);
        res.json(response);
    });
});

app.get('/orders/:id', (req, res) => {
    orderClient.GetOrder({ id: req.params.id }, (err: any, response: any) => {
        if (err) return res.status(err.code === grpc.status.NOT_FOUND ? 404 : 500).json(err);
        res.json(response);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});
