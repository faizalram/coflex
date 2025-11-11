# ML Backend for Interest Rate Optimizer

Python-based machine learning backend using pandas, scikit-learn, and FastAPI.

## Setup

### 1. Install Python Dependencies

```bash
cd ml-backend
pip install -r requirements.txt
```

### 2. Export Training Data from Frontend

From the project root:

```bash
# Install tsx if you haven't
npm install -g tsx

# Export mock data to CSV
npx tsx scripts/export-data-to-csv.ts
```

This creates `exports/wholesale_customers.csv` and `exports/retail_segments.csv`.

### 3. Train Your ML Model

```bash
cd ml-backend
python models/train_model.py
```

This will:
- Load the exported CSV data into pandas DataFrame
- Train RandomForest model for interest rate prediction
- Train GradientBoosting model for churn risk prediction
- Save the trained model as `rate_optimizer_v1.pkl`
- Display model performance metrics

### 4. Start the API Server

```bash
# Development mode with auto-reload
uvicorn app:app --reload --port 8000

# Or run directly
python app.py
```

API will be available at `http://localhost:8000`

### 5. Configure Frontend to Use API

Update your `.env` file:

```env
VITE_APP_MODE=api
VITE_API_BASE_URL=http://localhost:8000
```

## API Endpoints

### GET /
Health check and API info

### GET /wholesale-customers?segment={segment}
Get all wholesale customers with ML predictions

### POST /analyze-customer/{customer_id}
Analyze a specific customer and get AI recommendations

**Request Body:**
```json
{
  "customerId": "WH001",
  "currentBalance": 5750000000000,
  "currentRate": 4.5,
  "segment": "Corporate",
  "historicalData": {}
}
```

**Response:**
```json
{
  "id": "WH001",
  "recommendedRate": 3.8,
  "churnRisk": 12.5,
  "confidenceScore": 94.2,
  "projectedSavings": 40250000000,
  "factors": [...]
}
```

### GET /kpi-metrics?role={TBW|RDPS}
Get aggregated KPI metrics

### POST /simulate-scenario
Run what-if scenario simulations

## Working with Pandas

### Loading Data

```python
import pandas as pd

# Load customer data
df = pd.read_csv("../exports/wholesale_customers.csv")

# Explore data
print(df.head())
print(df.describe())
print(df.info())
```

### Feature Engineering

```python
# Create new features
df['balance_log'] = np.log1p(df['currentBalance'])
df['rate_spread'] = df['currentRate'] - df['recommendedRate']
df['savings_ratio'] = df['projectedSavings'] / df['currentBalance']

# Encode categorical variables
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['segment_encoded'] = le.fit_transform(df['segment'])
```

### Training Models

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Prepare features and target
X = df[['currentBalance', 'currentRate', 'segment_encoded']]
y = df['recommendedRate']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
score = model.score(X_test, y_test)
print(f"R² Score: {score}")
```

## Model Architecture

The example implementation includes:

1. **Interest Rate Prediction Model**
   - Algorithm: Random Forest Regressor
   - Features: Balance, current rate, segment, sensitivity
   - Target: Optimal recommended rate

2. **Churn Risk Prediction Model**
   - Algorithm: Gradient Boosting Classifier
   - Features: Same as rate model
   - Target: High churn risk (binary)

3. **Feature Engineering**
   - Log-transformed balance
   - Rate-balance interaction terms
   - Encoded categorical variables

## Customization

### Using Your Own Data

Replace the CSV files in `exports/` with your actual customer data. Ensure columns match:

**wholesale_customers.csv:**
- id, name, segment, currentBalance, currentRate, recommendedRate
- sensitivity, churnRisk, confidenceScore, projectedSavings, lastUpdated

### Using Different ML Algorithms

Edit `models/train_model.py` to use your preferred algorithms:

```python
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.neural_network import MLPRegressor
from xgboost import XGBRegressor

# Use XGBoost instead
self.rate_model = XGBRegressor(n_estimators=100)
```

### Adding More Features

Extend the feature engineering in `prepare_features()`:

```python
def prepare_features(self, df: pd.DataFrame) -> pd.DataFrame:
    features = df.copy()
    
    # Add your custom features
    features['customer_age_days'] = (datetime.now() - pd.to_datetime(df['lastUpdated'])).dt.days
    features['balance_tier'] = pd.cut(df['currentBalance'], bins=5, labels=False)
    
    return features
```

## Production Deployment

### Using Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables

```bash
export API_PORT=8000
export MODEL_PATH=models/rate_optimizer_v1.pkl
export DATA_PATH=data/
```

## Testing

```bash
# Test API endpoints
curl http://localhost:8000/

# Test customer analysis
curl -X POST http://localhost:8000/analyze-customer/WH001 \
  -H "Content-Type: application/json" \
  -d '{"customerId":"WH001","currentBalance":5750000000000,"currentRate":4.5,"segment":"Corporate"}'
```

## Next Steps

1. **Collect Real Data**: Replace mock data with actual customer history
2. **Feature Engineering**: Add more relevant features (transaction history, market data, etc.)
3. **Model Tuning**: Optimize hyperparameters using GridSearchCV
4. **Model Validation**: Implement cross-validation and backtesting
5. **Monitoring**: Add model performance tracking and drift detection
6. **A/B Testing**: Test model recommendations against business rules

## Support

For questions about the ML backend, refer to the main project README or contact the development team.
