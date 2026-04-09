import React, { useState, useEffect } from 'react';

// Utility function to convert currency
export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/AED');
    const data = await response.json();
    const rates = data.rates;
    console.log(`${fromCurrency} rate: ${rates[fromCurrency]}`);

    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;

    if (toCurrency === 'AED') {
      return amount * (1 / rates[fromCurrency]);
    } else if (fromCurrency === 'AED') {
      return amount * rates[toCurrency];
    } else {
      const amountInAED = amount * (1 / rates[fromCurrency]);
      return amountInAED * rates[toCurrency];
    }
  } catch (error) {
    console.error('Error converting currency:', error);
    return 0;
  }
};

// Optional: Cached version to reduce API calls
let cachedRates = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const convertCurrencyCached = async (amount, fromCurrency, toCurrency) => {
  try {
    const now = Date.now();
    
    // Use cached rates if available and not expired
    if (!cachedRates || (now - cacheTimestamp) > CACHE_DURATION) {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/AED');
      const data = await response.json();
      cachedRates = data.rates;
      cacheTimestamp = now;
    }

    const rates = cachedRates;
    
    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;

    if (toCurrency === 'AED') {
      return amount * (1 / rates[fromCurrency]);
    } else if (fromCurrency === 'AED') {
      return amount * rates[toCurrency];
    } else {
      const amountInAED = amount * (1 / rates[fromCurrency]);
      return amountInAED * rates[toCurrency];
    }
  } catch (error) {
    console.error('Error converting currency:', error);
    return 0;
  }
};

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('GBP');
  const [toCurrency, setToCurrency] = useState('AED');
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Fetch exchange rates on component mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/AED');
        const data = await response.json();
        console.log('Currency data loaded:', data);
        setRates(data.rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rates:', error);
        setLoading(false);
      }
    };

    fetchRates();
    // Refresh every hour (optional)
    const interval = setInterval(fetchRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Recalculate conversion when inputs change
  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      const calculate = async () => {
        const result = await convertCurrencyCached(amount, fromCurrency, toCurrency);
        setConvertedAmount(result);
      };
      calculate();
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  // Direct calculation for immediate updates
  const calculateDirect = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;
    
    if (toCurrency === 'AED') {
      return amount * (1 / rates[fromCurrency]);
    } else if (fromCurrency === 'AED') {
      return amount * rates[toCurrency];
    } else {
      const amountInAED = amount * (1 / rates[fromCurrency]);
      return amountInAED * rates[toCurrency];
    }
  };

  // Format currency display
  const formatCurrency = (value, currencyCode) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(value);
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      
      <div className="input-group">
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} 
          min="0"
          step="0.01"
          placeholder="Enter amount"
        />
        
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="GBP">British Pound (GBP)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="AED">UAE Dirham (AED)</option>
        </select>
        
        <span>to</span>
        
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="AED">UAE Dirham (AED)</option>
          <option value="GBP">British Pound (GBP)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="USD">US Dollar (USD)</option>
        </select>
      </div>
      
      {loading ? (
        <p>Loading exchange rates...</p>
      ) : (
        <div className="result">
          <h3>
            {formatCurrency(amount, fromCurrency)} = 
            {formatCurrency(calculateDirect(), toCurrency)}
          </h3>
          <p className="rate-info">
            1 {fromCurrency} = {(1 / rates[fromCurrency] || 0).toFixed(4)} AED
          </p>
          <small>Rates from {Object.keys(rates).length} currencies available</small>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;