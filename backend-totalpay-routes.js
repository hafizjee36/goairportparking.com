/**
 * TotalPay Payment Gateway Integration
 * Backend API endpoint for handling TotalPay payment initiation
 * 
 * Setup: Add this to your Express backend (e.g., routes/payment.js)
 */

const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Environment variables for TotalPay
const TOTALPAY_HOST_URL = process.env.TOTALPAY_HOST_URL || "https://checkout.totalpay.global/api/v1/session";
const TOTALPAY_MERCHANT_KEY = process.env.TOTALPAY_MERCHANT_KEY || "53cade14-3a58-11f1-ba33-b653c8710e3e";
const TOTALPAY_PASSWORD = process.env.TOTALPAY_PASSWORD || "32be31fec28007b9990ac1eaa90a37db";

// Test credentials (disable in production)
const TOTALPAY_TEST_MODE = process.env.TOTALPAY_TEST_MODE !== 'false';

/**
 * POST /api/payment/totalpay/initiate
 * Initiate a TotalPay payment session
 */
router.post('/totalpay/initiate', async (req, res) => {
  try {
    const { order, customer, billing_address, success_url, cancel_url } = req.body;

    if (!order || !customer || !billing_address) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment data',
      });
    }

    // Validate required order fields
    if (!order.number || !order.amount || !order.currency || !order.description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order details',
      });
    }

    // Build hash: number + amount + currency + description + password (uppercase)
    const hashInput = [
      order.number,
      order.amount,
      order.currency,
      order.description,
      TOTALPAY_PASSWORD,
    ]
      .join('')
      .toUpperCase();

    // Hash: MD5 then SHA1
    const md5Hash = crypto.createHash('md5').update(hashInput).digest('hex');
    const sha1Hash = crypto.createHash('sha1').update(md5Hash).digest('hex');

    // Build TotalPay payload
    const payload = {
      operation: 'purchase',
      merchant_key: TOTALPAY_MERCHANT_KEY,
      order: {
        number: order.number,
        amount: parseFloat(order.amount).toFixed(2),
        currency: order.currency.toUpperCase(),
        description: order.description,
      },
      customer: {
        name: customer.name || 'Guest',
        email: customer.email || 'noreply@example.com',
      },
      billing_address: {
        country: billing_address.country || 'AE',
        state: billing_address.state || 'Dubai',
        city: billing_address.city || 'Dubai',
        address: billing_address.address || 'Dubai',
        zip: billing_address.zip || '0000',
        phone: billing_address.phone || '0000000000',
      },
      hash: sha1Hash,
      success_url: success_url || `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/totalpay-success`,
      cancel_url: cancel_url || `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/totalpay-cancel`,
      language: 'en', // Optional language setting
    };

    console.log('🔄 Initiating TotalPay payment:', {
      order_number: order.number,
      amount: order.amount,
      currency: order.currency,
    });

    // Make request to TotalPay API
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(TOTALPAY_HOST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${TOTALPAY_MERCHANT_KEY}:${TOTALPAY_PASSWORD}`).toString('base64')}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ TotalPay API error:', {
        status: response.status,
        body: data,
      });

      return res.status(response.status).json({
        success: false,
        message: data.message || 'TotalPay request failed',
        error: data,
      });
    }

    if (!data.redirect_url) {
      console.error('❌ No redirect URL in TotalPay response:', data);
      return res.status(400).json({
        success: false,
        message: 'Invalid TotalPay response - missing redirect URL',
      });
    }

    console.log('✅ TotalPay session created successfully');

    return res.status(200).json({
      success: true,
      redirect_url: data.redirect_url,
      session_id: data.id || data.session_id,
      message: 'TotalPay session created successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ TotalPay initiation error:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

/**
 * POST /api/payment/totalpay/callback
 * Handle TotalPay payment callback (for server-side verification)
 */
router.post('/totalpay/callback', async (req, res) => {
  try {
    const { session_id, order_id, status } = req.body;

    console.log('🔔 TotalPay callback received:', { session_id, order_id, status });

    // Verify callback signature if needed (implement based on TotalPay docs)
    // This is a basic handler - enhance with actual signature verification

    // For now, just acknowledge receipt
    return res.status(200).json({
      success: true,
      message: 'Callback processed',
      session_id,
    });
  } catch (error) {
    console.error('❌ TotalPay callback error:', error);

    return res.status(500).json({
      success: false,
      message: 'Callback processing failed',
    });
  }
});

/**
 * GET /api/payment/totalpay/status/:orderId
 * Get TotalPay payment status
 */
router.get('/totalpay/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Implement actual status check with TotalPay API
    // This is a placeholder - enhance based on your backend payment tracking

    return res.status(200).json({
      success: true,
      orderId,
      status: 'pending',
      message: 'Use callback mechanism to track payment status',
    });
  } catch (error) {
    console.error('❌ TotalPay status check error:', error);

    return res.status(500).json({
      success: false,
      message: 'Status check failed',
    });
  }
});

module.exports = router;

/**
 * USAGE in main Express server:
 * 
 * const totalPayRoutes = require('./routes/totalpay');
 * app.use('/api/payment', totalPayRoutes);
 * 
 * ENVIRONMENT VARIABLES needed:
 * - TOTALPAY_HOST_URL (optional, has default)
 * - TOTALPAY_MERCHANT_KEY (required)
 * - TOTALPAY_PASSWORD (required)
 * - TOTALPAY_TEST_MODE (optional, defaults to true)
 * - FRONTEND_URL (for redirect URLs)
 */
