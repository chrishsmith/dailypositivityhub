const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to fetch quote', error }),
        };
    }
};
