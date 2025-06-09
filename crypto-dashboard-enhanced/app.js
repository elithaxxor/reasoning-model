// Application Data
const cryptoData = {
  "meme_coins": [
    {"symbol": "DOGE", "name": "Dogecoin", "price": 0.1827, "market_cap": 27330701964, "change_24h": -0.39, "volume_24h": 745110011, "sentiment_score": 75},
    {"symbol": "SHIB", "name": "Shiba Inu", "price": 0.00001241, "market_cap": 7310416161, "change_24h": 1.71, "volume_24h": 93287772, "sentiment_score": 68},
    {"symbol": "PEPE", "name": "Pepe", "price": 0.00001151, "market_cap": 4843366751, "change_24h": 0.22, "volume_24h": 650439840, "sentiment_score": 72},
    {"symbol": "WIF", "name": "dogwifhat", "price": 0.8838, "market_cap": 882819959, "change_24h": 2.43, "volume_24h": 251257005, "sentiment_score": 65},
    {"symbol": "FARTCOIN", "name": "Fartcoin", "price": 1.05, "market_cap": 1048338064, "change_24h": 2.31, "volume_24h": 144478702, "sentiment_score": 58}
  ],
  "top_50_crypto": [
    {"rank": 1, "symbol": "BTC", "name": "Bitcoin", "price": 105732.55, "market_cap": 2101571830209, "change_24h": 0.18, "volume_24h": 38749129587},
    {"rank": 2, "symbol": "ETH", "name": "Ethereum", "price": 2497.50, "market_cap": 301505386269, "change_24h": -0.62, "volume_24h": 12524829882},
    {"rank": 3, "symbol": "USDT", "name": "Tether USDt", "price": 1.00, "market_cap": 154868690537, "change_24h": 0.02, "volume_24h": 67929886443},
    {"rank": 4, "symbol": "XRP", "name": "XRP", "price": 2.24, "market_cap": 131868254837, "change_24h": 2.99, "volume_24h": 2849054033},
    {"rank": 5, "symbol": "BNB", "name": "BNB", "price": 651.81, "market_cap": 91831482031, "change_24h": 0.33, "volume_24h": 1576493666},
    {"rank": 6, "symbol": "SOL", "name": "Solana", "price": 151.62, "market_cap": 79569760357, "change_24h": 1.11, "volume_24h": 2210393936},
    {"rank": 7, "symbol": "USDC", "name": "USDC", "price": 1.00, "market_cap": 61028035413, "change_24h": -0.00, "volume_24h": 9554735932},
    {"rank": 8, "symbol": "DOGE", "name": "Dogecoin", "price": 0.1827, "market_cap": 27330701964, "change_24h": -0.39, "volume_24h": 745110011},
    {"rank": 9, "symbol": "TRX", "name": "TRON", "price": 0.2839, "market_cap": 26927256129, "change_24h": -0.43, "volume_24h": 459679511},
    {"rank": 10, "symbol": "ADA", "name": "Cardano", "price": 0.6645, "market_cap": 23486723604, "change_24h": 0.91, "volume_24h": 515367175},
    {"rank": 11, "symbol": "HYPE", "name": "Hyperliquid", "price": 35.55, "market_cap": 11871484859, "change_24h": 1.27, "volume_24h": 150750422},
    {"rank": 12, "symbol": "SUI", "name": "Sui", "price": 3.22, "market_cap": 10922253988, "change_24h": -0.53, "volume_24h": 563766145},
    {"rank": 13, "symbol": "LINK", "name": "Chainlink", "price": 13.72, "market_cap": 9017287343, "change_24h": -0.56, "volume_24h": 194130590},
    {"rank": 14, "symbol": "AVAX", "name": "Avalanche", "price": 20.76, "market_cap": 8755633623, "change_24h": 1.90, "volume_24h": 346818132},
    {"rank": 15, "symbol": "LEO", "name": "UNUS SED LEO", "price": 9.28, "market_cap": 8566851128, "change_24h": 0.21, "volume_24h": 20280563},
    {"rank": 16, "symbol": "XLM", "name": "Stellar", "price": 0.2662, "market_cap": 8303362295, "change_24h": 0.43, "volume_24h": 173201849},
    {"rank": 17, "symbol": "BCH", "name": "Bitcoin Cash", "price": 414.71, "market_cap": 8244959947, "change_24h": 1.44, "volume_24h": 20280563},
    {"rank": 18, "symbol": "TON", "name": "Toncoin", "price": 3.19, "market_cap": 7875729397, "change_24h": 0.43, "volume_24h": 176260720},
    {"rank": 19, "symbol": "SHIB", "name": "Shiba Inu", "price": 0.00001246, "market_cap": 7344364417, "change_24h": -1.07, "volume_24h": 93287772},
    {"rank": 20, "symbol": "HBAR", "name": "Hedera", "price": 0.1702, "market_cap": 7187411287, "change_24h": 1.39, "volume_24h": 98153946},
    {"rank": 21, "symbol": "LTC", "name": "Litecoin", "price": 87.87, "market_cap": 6672998141, "change_24h": -0.72, "volume_24h": 194130590},
    {"rank": 22, "symbol": "DOT", "name": "Polkadot", "price": 4.01, "market_cap": 6357770163, "change_24h": -0.33, "volume_24h": 129677388},
    {"rank": 23, "symbol": "XMR", "name": "Monero", "price": 329.62, "market_cap": 6080386386, "change_24h": -1.15, "volume_24h": 68646893},
    {"rank": 24, "symbol": "USDe", "name": "Ethena USDe", "price": 1.00, "market_cap": 5891925266, "change_24h": -0.00, "volume_24h": 70025015},
    {"rank": 25, "symbol": "BGB", "name": "Bitget Token", "price": 4.66, "market_cap": 5453143123, "change_24h": -0.25, "volume_24h": 1762000},
    {"rank": 26, "symbol": "DAI", "name": "Dai", "price": 1.00, "market_cap": 5365305507, "change_24h": 0.01, "volume_24h": 3826387},
    {"rank": 27, "symbol": "PEPE", "name": "Pepe", "price": 0.00001152, "market_cap": 4847479166, "change_24h": 0.11, "volume_24h": 650439840},
    {"rank": 28, "symbol": "PI", "name": "Pi", "price": 0.6281, "market_cap": 4643306822, "change_24h": -0.99, "volume_24h": 44285702},
    {"rank": 29, "symbol": "UNI", "name": "Uniswap", "price": 6.30, "market_cap": 3959167394, "change_24h": -0.27, "volume_24h": 439013},
    {"rank": 30, "symbol": "AAVE", "name": "Aave", "price": 251.96, "market_cap": 3818791397, "change_24h": -1.57, "volume_24h": 439013},
    {"rank": 31, "symbol": "TAO", "name": "Bittensor", "price": 386.17, "market_cap": 3401135299, "change_24h": 0.58, "volume_24h": 68646893},
    {"rank": 32, "symbol": "OKB", "name": "OKB", "price": 52.64, "market_cap": 3158614307, "change_24h": 0.70, "volume_24h": 1390216},
    {"rank": 33, "symbol": "ICP", "name": "Internet Computer", "price": 5.61, "market_cap": 2995107814, "change_24h": 7.04, "volume_24h": 147273345},
    {"rank": 34, "symbol": "APT", "name": "Aptos", "price": 4.69, "market_cap": 2962756457, "change_24h": -0.61, "volume_24h": 35393063},
    {"rank": 35, "symbol": "CRO", "name": "Cronos", "price": 0.0985, "market_cap": 2944451847, "change_24h": 0.85, "volume_24h": 40241368},
    {"rank": 36, "symbol": "NEAR", "name": "NEAR Protocol", "price": 2.40, "market_cap": 2931774686, "change_24h": -0.04, "volume_24h": 383818},
    {"rank": 37, "symbol": "ONDO", "name": "Ondo", "price": 0.8293, "market_cap": 2619972410, "change_24h": -0.33, "volume_24h": 70025015},
    {"rank": 38, "symbol": "ETC", "name": "Ethereum Classic", "price": 16.82, "market_cap": 2560767250, "change_24h": -1.77, "volume_24h": 160050732},
    {"rank": 39, "symbol": "KAS", "name": "Kaspa", "price": 0.0852, "market_cap": 2239993705, "change_24h": -2.23, "volume_24h": 43305169},
    {"rank": 40, "symbol": "GT", "name": "GateToken", "price": 18.19, "market_cap": 2235146912, "change_24h": -1.02, "volume_24h": 210173786},
    {"rank": 41, "symbol": "POL", "name": "POL (prev. MATIC)", "price": 0.2100, "market_cap": 2192582279, "change_24h": -0.81, "volume_24h": 161409352},
    {"rank": 42, "symbol": "MNT", "name": "Mantle", "price": 0.6495, "market_cap": 2185489873, "change_24h": -0.33, "volume_24h": 3507036},
    {"rank": 43, "symbol": "USD1", "name": "World Liberty Financial USD", "price": 1.00, "market_cap": 2182598164, "change_24h": 0.01, "volume_24h": 189334173},
    {"rank": 44, "symbol": "TRUMP", "name": "OFFICIAL TRUMP", "price": 10.34, "market_cap": 2068973884, "change_24h": -0.08, "volume_24h": 189334173},
    {"rank": 45, "symbol": "VET", "name": "VeChain", "price": 0.0240, "market_cap": 2061873782, "change_24h": 0.25, "volume_24h": 6617544},
    {"rank": 46, "symbol": "RENDER", "name": "Render", "price": 3.85, "market_cap": 1994518194, "change_24h": -0.46, "volume_24h": 61629684},
    {"rank": 47, "symbol": "ENA", "name": "Ethena", "price": 0.3208, "market_cap": 1953145051, "change_24h": 0.79, "volume_24h": 5834115},
    {"rank": 48, "symbol": "FET", "name": "Artificial Superintelligence Alliance", "price": 0.7410, "market_cap": 1774885429, "change_24h": -2.44, "volume_24h": 18373272},
    {"rank": 49, "symbol": "WLD", "name": "Worldcoin", "price": 1.10, "market_cap": 1741559582, "change_24h": -1.60, "volume_24h": 6986266},
    {"rank": 50, "symbol": "FIL", "name": "Filecoin", "price": 2.49, "market_cap": 1680839691, "change_24h": -0.51, "volume_24h": 1762000}
  ]
};

// Application State
let currentTab = 'meme-coins';
let charts = {};
let priceAlerts = [];
let updateInterval;

// Utility Functions
function formatPrice(price) {
  if (price >= 1) {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else if (price >= 0.01) {
    return `$${price.toFixed(4)}`;
  } else {
    return `$${price.toFixed(8)}`;
  }
}

function formatMarketCap(marketCap) {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
}

function formatVolume(volume) {
  return formatMarketCap(volume);
}

function formatChange(change) {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

function getSentimentClass(score) {
  if (score >= 70) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

// Tab Management
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Update button states
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update content visibility
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(targetTab).classList.add('active');
      
      currentTab = targetTab;
      
      // Initialize charts for the active tab
      setTimeout(() => {
        if (targetTab === 'meme-coins') {
          initializeMemeCoinsCharts();
        } else {
          initializeTop50Charts();
        }
      }, 100);
    });
  });
}

// Chart Initialization
function initializeMemeCoinsCharts() {
  // Destroy existing charts
  if (charts.memeCoins) charts.memeCoins.destroy();
  if (charts.sentiment) charts.sentiment.destroy();

  // Meme Coins Market Overview Chart
  const memeCtx = document.getElementById('memeCoinsChart').getContext('2d');
  charts.memeCoins = new Chart(memeCtx, {
    type: 'doughnut',
    data: {
      labels: cryptoData.meme_coins.map(coin => coin.symbol),
      datasets: [{
        data: cryptoData.meme_coins.map(coin => coin.market_cap),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const coin = cryptoData.meme_coins[context.dataIndex];
              return `${coin.symbol}: ${formatMarketCap(coin.market_cap)}`;
            }
          }
        }
      }
    }
  });

  // Sentiment Analysis Chart
  const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');
  charts.sentiment = new Chart(sentimentCtx, {
    type: 'bar',
    data: {
      labels: cryptoData.meme_coins.map(coin => coin.symbol),
      datasets: [{
        label: 'Sentiment Score',
        data: cryptoData.meme_coins.map(coin => coin.sentiment_score),
        backgroundColor: cryptoData.meme_coins.map(coin => {
          if (coin.sentiment_score >= 70) return '#1FB8CD';
          if (coin.sentiment_score >= 50) return '#FFC185';
          return '#B4413C';
        }),
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Sentiment Score'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

function initializeTop50Charts() {
  // Destroy existing charts
  if (charts.marketCap) charts.marketCap.destroy();
  if (charts.performance) charts.performance.destroy();

  // Market Cap Distribution Chart
  const top10 = cryptoData.top_50_crypto.slice(0, 10);
  const marketCapCtx = document.getElementById('marketCapChart').getContext('2d');
  charts.marketCap = new Chart(marketCapCtx, {
    type: 'bar',
    data: {
      labels: top10.map(coin => coin.symbol),
      datasets: [{
        label: 'Market Cap',
        data: top10.map(coin => coin.market_cap),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'],
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Market Cap (USD)'
          },
          ticks: {
            callback: function(value) {
              return formatMarketCap(value);
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Market Cap: ${formatMarketCap(context.parsed.y)}`;
            }
          }
        }
      }
    }
  });

  // Price Performance Chart
  const performanceCtx = document.getElementById('performanceChart').getContext('2d');
  const positiveChanges = top10.filter(coin => coin.change_24h > 0);
  const negativeChanges = top10.filter(coin => coin.change_24h <= 0);
  
  charts.performance = new Chart(performanceCtx, {
    type: 'bar',
    data: {
      labels: top10.map(coin => coin.symbol),
      datasets: [{
        label: '24h Change (%)',
        data: top10.map(coin => coin.change_24h),
        backgroundColor: top10.map(coin => coin.change_24h >= 0 ? '#1FB8CD' : '#B4413C'),
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: {
            display: true,
            text: '24h Change (%)'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Table Management
function populateMemeCoinsTable() {
  const tbody = document.getElementById('meme-table-body');
  tbody.innerHTML = '';

  cryptoData.meme_coins.forEach(coin => {
    const row = document.createElement('tr');
    const sentimentClass = getSentimentClass(coin.sentiment_score);
    
    row.innerHTML = `
      <td>
        <div class="coin-info">
          <div>
            <div class="coin-symbol">${coin.symbol}</div>
            <div class="coin-name">${coin.name}</div>
          </div>
        </div>
      </td>
      <td class="price">${formatPrice(coin.price)}</td>
      <td class="change ${coin.change_24h >= 0 ? 'positive' : 'negative'}">${formatChange(coin.change_24h)}</td>
      <td class="market-cap">${formatMarketCap(coin.market_cap)}</td>
      <td class="volume">${formatVolume(coin.volume_24h)}</td>
      <td>
        <div class="sentiment-score">
          <div class="sentiment-bar">
            <div class="sentiment-fill ${sentimentClass}" style="width: ${coin.sentiment_score}%"></div>
          </div>
          <span>${coin.sentiment_score}</span>
        </div>
      </td>
      <td>
        <button class="alert-btn" onclick="openAlertModal('${coin.symbol}', '${coin.name}', ${coin.price})">Alert</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function populateTop50Table() {
  const tbody = document.getElementById('crypto-table-body');
  tbody.innerHTML = '';

  cryptoData.top_50_crypto.forEach(coin => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td class="rank">#${coin.rank}</td>
      <td>
        <div class="coin-info">
          <div>
            <div class="coin-symbol">${coin.symbol}</div>
            <div class="coin-name">${coin.name}</div>
          </div>
        </div>
      </td>
      <td class="price">${formatPrice(coin.price)}</td>
      <td class="change ${coin.change_24h >= 0 ? 'positive' : 'negative'}">${formatChange(coin.change_24h)}</td>
      <td class="market-cap">${formatMarketCap(coin.market_cap)}</td>
      <td class="volume">${formatVolume(coin.volume_24h)}</td>
      <td>
        <button class="alert-btn" onclick="openAlertModal('${coin.symbol}', '${coin.name}', ${coin.price})">Alert</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Search and Sort Functionality
function initializeSearchAndSort() {
  // Meme coins search
  document.getElementById('meme-search').addEventListener('input', (e) => {
    filterTable('meme-table-body', e.target.value, cryptoData.meme_coins);
  });

  // Top 50 search
  document.getElementById('crypto-search').addEventListener('input', (e) => {
    filterTable('crypto-table-body', e.target.value, cryptoData.top_50_crypto);
  });

  // Sort functionality
  document.getElementById('meme-sort').addEventListener('change', (e) => {
    sortData(cryptoData.meme_coins, e.target.value);
    populateMemeCoinsTable();
  });

  document.getElementById('crypto-sort').addEventListener('change', (e) => {
    sortData(cryptoData.top_50_crypto, e.target.value);
    populateTop50Table();
  });
}

function filterTable(tbodyId, searchTerm, data) {
  const tbody = document.getElementById(tbodyId);
  const rows = tbody.querySelectorAll('tr');
  
  rows.forEach(row => {
    const coinSymbol = row.querySelector('.coin-symbol').textContent.toLowerCase();
    const coinName = row.querySelector('.coin-name').textContent.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    if (coinSymbol.includes(searchLower) || coinName.includes(searchLower)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function sortData(data, sortBy) {
  data.sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    if (typeof a[sortBy] === 'string') {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    return b[sortBy] - a[sortBy];
  });
}

// Alert System
function openAlertModal(symbol, name, currentPrice) {
  const modal = document.getElementById('alert-modal');
  const coinInput = document.getElementById('alert-coin');
  
  coinInput.value = `${symbol} (${name})`;
  modal.classList.add('active');
  
  // Store current coin data for alert
  modal.dataset.symbol = symbol;
  modal.dataset.name = name;
  modal.dataset.currentPrice = currentPrice;
}

function closeAlertModal() {
  const modal = document.getElementById('alert-modal');
  modal.classList.remove('active');
  
  // Reset form
  document.getElementById('alert-price').value = '';
  document.getElementById('alert-type').value = 'above';
}

function setAlert() {
  const modal = document.getElementById('alert-modal');
  const symbol = modal.dataset.symbol;
  const name = modal.dataset.name;
  const currentPrice = parseFloat(modal.dataset.currentPrice);
  const targetPrice = parseFloat(document.getElementById('alert-price').value);
  const alertType = document.getElementById('alert-type').value;
  
  if (!targetPrice || targetPrice <= 0) {
    showNotification('Invalid price entered', 'error');
    return;
  }
  
  const alert = {
    id: Date.now(),
    symbol,
    name,
    currentPrice,
    targetPrice,
    alertType,
    created: new Date()
  };
  
  priceAlerts.push(alert);
  showNotification(`Alert set for ${symbol} at ${formatPrice(targetPrice)}`, 'success');
  closeAlertModal();
}

// Notifications
function showNotification(message, type = 'info') {
  const container = document.getElementById('notifications');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  notification.innerHTML = `
    <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
    <div class="notification-message">${message}</div>
  `;
  
  container.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
}

// Real-time Updates
function simulateRealTimeUpdates() {
  updateInterval = setInterval(() => {
    // Simulate price fluctuations
    cryptoData.meme_coins.forEach(coin => {
      const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% random change
      coin.price *= (1 + fluctuation);
      coin.change_24h += fluctuation * 100;
    });
    
    cryptoData.top_50_crypto.forEach(coin => {
      const fluctuation = (Math.random() - 0.5) * 0.01; // ±0.5% random change
      coin.price *= (1 + fluctuation);
      coin.change_24h += fluctuation * 100;
    });
    
    // Update tables
    if (currentTab === 'meme-coins') {
      populateMemeCoinsTable();
    } else {
      populateTop50Table();
    }
    
    // Check alerts
    checkPriceAlerts();
  }, 5000); // Update every 5 seconds
}

function checkPriceAlerts() {
  priceAlerts.forEach((alert, index) => {
    const currentData = currentTab === 'meme-coins' ? 
      cryptoData.meme_coins.find(coin => coin.symbol === alert.symbol) :
      cryptoData.top_50_crypto.find(coin => coin.symbol === alert.symbol);
    
    if (!currentData) return;
    
    const triggered = (alert.alertType === 'above' && currentData.price >= alert.targetPrice) ||
                     (alert.alertType === 'below' && currentData.price <= alert.targetPrice);
    
    if (triggered) {
      showNotification(
        `Alert: ${alert.symbol} is now ${formatPrice(currentData.price)} (target: ${formatPrice(alert.targetPrice)})`,
        'warning'
      );
      priceAlerts.splice(index, 1);
    }
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initializeTabs();
  initializeSearchAndSort();
  
  // Populate initial data
  populateMemeCoinsTable();
  populateTop50Table();
  
  // Initialize charts for default tab
  setTimeout(() => {
    initializeMemeCoinsCharts();
  }, 100);
  
  // Modal event listeners
  document.getElementById('close-modal').addEventListener('click', closeAlertModal);
  document.getElementById('cancel-alert').addEventListener('click', closeAlertModal);
  document.getElementById('set-alert').addEventListener('click', setAlert);
  
  // Close modal when clicking outside
  document.getElementById('alert-modal').addEventListener('click', (e) => {
    if (e.target.id === 'alert-modal') {
      closeAlertModal();
    }
  });
  
  // Start real-time updates
  simulateRealTimeUpdates();
  
  // Show welcome notification
  setTimeout(() => {
    showNotification('Welcome to Crypto Dashboard! Real-time updates are active.', 'success');
  }, 1000);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});