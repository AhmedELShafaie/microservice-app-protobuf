import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const PROTO_PATH = path.join(__dirname, '../../protos/product.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const productProto = grpc.loadPackageDefinition(packageDefinition) as any;

const products = [
    { id: '1', name: 'Laptop', price: 999.99 },
    { id: '2', name: 'Smartphone', price: 499.99 },
    { id: '3', name: 'Headphones', price: 199.99 }
];

function getProduct(call: any, callback: any) {
    const product = products.find(p => p.id === call.request.id);
    if (product) {
        callback(null, product);
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Product not found'
        });
    }
}

function listProducts(call: any, callback: any) {
    callback(null, { products: products });
}

function main() {
    const server = new grpc.Server();
    server.addService(productProto.products.ProductService.service, {
        GetProduct: getProduct,
        ListProducts: listProducts
    });
    server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
        console.log('Products Service started on port 50052');
        server.start();
    });
}

main();
