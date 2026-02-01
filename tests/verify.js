const http = require('http');

async function request(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    console.log(`${method} ${path}: Status ${res.statusCode}`);
                    console.log('Response:', body);
                    resolve(JSON.parse(body));
                } catch (e) {
                    console.error('Failed to parse response:', body);
                    resolve(body);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with request ${method} ${path}: ${e.message}`);
            reject(e);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function main() {
    try {
        console.log('--- Testing Users ---');
        await request('/users', 'POST', { name: 'Alice', email: 'alice@example.com' });
        // Assuming ID comes back, we could Query it, but let's just create first.

        console.log('\n--- Testing Products ---');
        await request('/products');

        console.log('\n--- Testing Orders ---');
        await request('/orders', 'POST', {
            user_id: 'test-user',
            items: [{ product_id: '1', quantity: 2 }]
        });

    } catch (error) {
        console.error('Test failed', error);
    }
}

main();
