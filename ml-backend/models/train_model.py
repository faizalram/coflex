"""
Example ML Model Training Script
Train interest rate optimization model using pandas
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
from datetime import datetime

class InterestRateOptimizer:
    """
    ML Model for predicting optimal interest rates and churn risk
    """
    
    def __init__(self):
        self.rate_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.churn_model = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.label_encoders = {}
        
    def prepare_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Feature engineering for ML model
        """
        features = df.copy()
        
        # Encode categorical variables
        if 'segment' in features.columns:
            if 'segment' not in self.label_encoders:
                self.label_encoders['segment'] = LabelEncoder()
                features['segment_encoded'] = self.label_encoders['segment'].fit_transform(features['segment'])
            else:
                features['segment_encoded'] = self.label_encoders['segment'].transform(features['segment'])
        
        if 'sensitivity' in features.columns:
            if 'sensitivity' not in self.label_encoders:
                self.label_encoders['sensitivity'] = LabelEncoder()
                features['sensitivity_encoded'] = self.label_encoders['sensitivity'].fit_transform(features['sensitivity'])
            else:
                features['sensitivity_encoded'] = self.label_encoders['sensitivity'].transform(features['sensitivity'])
        
        # Create derived features
        features['balance_log'] = np.log1p(features['currentBalance'])
        features['rate_balance_interaction'] = features['currentRate'] * features['balance_log']
        
        return features
    
    def train(self, data_path: str):
        """
        Train the model using customer data
        """
        print("Loading training data...")
        df = pd.read_csv(data_path)
        
        print(f"Loaded {len(df)} customer records")
        print(f"Columns: {df.columns.tolist()}")
        
        # Prepare features
        features_df = self.prepare_features(df)
        
        # Select feature columns for training
        feature_cols = [
            'currentBalance', 'currentRate', 'segment_encoded', 
            'sensitivity_encoded', 'balance_log', 'rate_balance_interaction'
        ]
        
        X = features_df[feature_cols]
        
        # Train rate prediction model
        print("\nTraining interest rate model...")
        y_rate = df['recommendedRate']
        X_train, X_test, y_train, y_test = train_test_split(X, y_rate, test_size=0.2, random_state=42)
        
        self.rate_model.fit(X_train, y_train)
        rate_score = self.rate_model.score(X_test, y_test)
        print(f"Rate model R² score: {rate_score:.4f}")
        
        # Train churn risk model
        print("\nTraining churn risk model...")
        y_churn = (df['churnRisk'] > 30).astype(int)  # Binary classification: high risk or not
        X_train, X_test, y_train, y_test = train_test_split(X, y_churn, test_size=0.2, random_state=42)
        
        self.churn_model.fit(X_train, y_train)
        churn_score = self.churn_model.score(X_test, y_test)
        print(f"Churn model accuracy: {churn_score:.4f}")
        
        # Feature importance
        print("\nFeature Importance (Rate Model):")
        for feat, imp in zip(feature_cols, self.rate_model.feature_importances_):
            print(f"  {feat}: {imp:.4f}")
        
        return {
            'rate_r2': rate_score,
            'churn_accuracy': churn_score
        }
    
    def predict(self, customer_data: dict) -> dict:
        """
        Predict optimal rate and churn risk for a customer
        """
        # Convert to DataFrame
        df = pd.DataFrame([customer_data])
        
        # Prepare features
        features_df = self.prepare_features(df)
        
        feature_cols = [
            'currentBalance', 'currentRate', 'segment_encoded', 
            'sensitivity_encoded', 'balance_log', 'rate_balance_interaction'
        ]
        
        X = features_df[feature_cols]
        
        # Predict
        recommended_rate = self.rate_model.predict(X)[0]
        churn_probability = self.churn_model.predict_proba(X)[0][1]
        
        # Calculate confidence (based on model certainty)
        confidence = 100 - (churn_probability * 50)  # Simple heuristic
        
        # Calculate projected savings
        current_rate = customer_data['currentRate']
        current_balance = customer_data['currentBalance']
        projected_savings = current_balance * (current_rate - recommended_rate) / 100
        
        return {
            'recommendedRate': float(recommended_rate),
            'churnRisk': float(churn_probability * 100),
            'confidenceScore': float(confidence),
            'projectedSavings': float(projected_savings)
        }
    
    def save(self, path: str):
        """Save trained model"""
        joblib.dump({
            'rate_model': self.rate_model,
            'churn_model': self.churn_model,
            'label_encoders': self.label_encoders
        }, path)
        print(f"\nModel saved to {path}")
    
    @classmethod
    def load(cls, path: str):
        """Load trained model"""
        data = joblib.load(path)
        model = cls()
        model.rate_model = data['rate_model']
        model.churn_model = data['churn_model']
        model.label_encoders = data['label_encoders']
        return model


if __name__ == "__main__":
    # Example usage
    print("=" * 60)
    print("Interest Rate Optimizer - Model Training")
    print("=" * 60)
    
    # Initialize model
    optimizer = InterestRateOptimizer()
    
    # Train on exported data
    data_path = "../../exports/wholesale_customers.csv"
    
    try:
        metrics = optimizer.train(data_path)
        
        # Save model
        optimizer.save("rate_optimizer_v1.pkl")
        
        # Test prediction
        print("\n" + "=" * 60)
        print("Testing prediction on sample customer...")
        print("=" * 60)
        
        test_customer = {
            'currentBalance': 5_750_000_000_000,
            'currentRate': 4.5,
            'segment': 'Corporate',
            'sensitivity': 'Low'
        }
        
        prediction = optimizer.predict(test_customer)
        print(f"\nInput:")
        print(f"  Balance: Rp {test_customer['currentBalance']:,.0f}")
        print(f"  Current Rate: {test_customer['currentRate']}%")
        print(f"  Segment: {test_customer['segment']}")
        
        print(f"\nPrediction:")
        print(f"  Recommended Rate: {prediction['recommendedRate']:.2f}%")
        print(f"  Churn Risk: {prediction['churnRisk']:.1f}%")
        print(f"  Confidence: {prediction['confidenceScore']:.1f}%")
        print(f"  Projected Savings: Rp {prediction['projectedSavings']:,.0f}")
        
    except FileNotFoundError:
        print(f"\nError: Data file not found at {data_path}")
        print("Please run the export script first:")
        print("  npx tsx scripts/export-data-to-csv.ts")
