const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Endpoint to fetch TOMA price from Gate.io
app.get('/api/', async (req, res) => {
    try {
        // Fetch data from Gate.io API
        const response = await axios.get('https://www.gate.io/apiw/v2/pre_market/currencies/USUAL');

        // Extract relevant data
        const tomaData = response.data.data;
        const latestDealPrice = parseFloat(tomaData.latest_deal_price);
        const highestBuyPrice = parseFloat(tomaData.highest_buy_price);

        // Send data as a response
        res.json({
            currency: tomaData.currency,
            full_name: tomaData.full_name,
            latest_deal_price: latestDealPrice,
            highest_buy_price: highestBuyPrice
            
        });
    } catch (error) {
        console.error('Error fetching data from Gate.io:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
