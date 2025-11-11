"""
FastAPI ML Backend for Interest Rate Optimization
Integrates with pandas-based ML models
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
from datetime import datetime
import os

# Import your ML model (to be implemented)
# from models.rate_optimizer import RateOptimizer

app = FastAPI(title="Interest Rate Optimizer API")

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class CustomerAnalysisRequest(BaseModel):
    customerId: str
    currentBalance: float
    currentRate: float
    segment: str
    historicalData: Optional[dict] = None

class CustomerAnalysisResponse(BaseModel):
    id: str
    recommendedRate: float
    churnRisk: float
    confidenceScore: float
    projectedSavings: float
    factors: List[dict]

class WholesaleCustomer(BaseModel):
    id: str
    name: str
    segment: str
    currentBalance: float
    currentRate: float
    recommendedRate: float
    sensitivity: str
    churnRisk: float
    confidenceScore: float
    projectedSavings: float
    lastUpdated: str

# Load your trained model (example)
# model = RateOptimizer.load('models/rate_optimizer_v1.pkl')

@app.get("/")
def read_root():
    return {
        "message": "Interest Rate Optimizer ML API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/wholesale-customers")
def get_wholesale_customers(segment: Optional[str] = None):
    """
    Get wholesale customers with ML predictions
    Load from your database or use pandas to read CSV
    """
    try:
        # Example: Load from CSV exported from frontend
        df = pd.read_csv("data/wholesale_customers.csv")
        
        if segment:
            df = df[df['segment'] == segment]
        
        # Convert to dict for JSON response
        customers = df.to_dict('records')
        return customers
    
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Customer data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-customer/{customer_id}")
def analyze_customer(customer_id: str, request: CustomerAnalysisRequest):
    """
    Analyze a customer and predict optimal interest rate
    This is where your ML model runs
    """
    try:
        # Prepare features for ML model
        features = pd.DataFrame([{
            'current_balance': request.currentBalance,
            'current_rate': request.currentRate,
            'segment': request.segment,
            # Add more features from historicalData
        }])
        
        # Example: Run your ML model
        # predictions = model.predict(features)
        # recommended_rate = predictions['rate'][0]
        # churn_risk = predictions['churn_risk'][0]
        # confidence = predictions['confidence'][0]
        
        # Mock response for now (replace with actual model predictions)
        recommended_rate = request.currentRate * 0.85  # Example: 15% reduction
        churn_risk = 25.0
        confidence = 88.0
        projected_savings = request.currentBalance * (request.currentRate - recommended_rate) / 100
        
        return CustomerAnalysisResponse(
            id=customer_id,
            recommendedRate=round(recommended_rate, 2),
            churnRisk=round(churn_risk, 1),
            confidenceScore=round(confidence, 1),
            projectedSavings=round(projected_savings, 2),
            factors=[
                {"name": "Balance Tier", "impact": "High", "value": "Large"},
                {"name": "Segment Risk", "impact": "Medium", "value": request.segment},
                {"name": "Market Conditions", "impact": "Low", "value": "Stable"}
            ]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/kpi-metrics")
def get_kpi_metrics(role: str):
    """
    Calculate KPI metrics from your data
    """
    try:
        df = pd.read_csv("data/wholesale_customers.csv")
        
        metrics = {
            "totalDPK": float(df['currentBalance'].sum()),
            "averageRate": float(df['currentRate'].mean()),
            "projectedSavings": float(df['projectedSavings'].sum()),
            "customerCount": len(df),
            "highRiskCount": len(df[df['churnRisk'] > 35])
        }
        
        return metrics
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/simulate-scenario")
def simulate_scenario(params: dict):
    """
    Run what-if scenario simulation
    """
    try:
        # Use your ML model to simulate different scenarios
        # This could involve re-running predictions with adjusted parameters
        
        return {
            "scenarioId": "sim_001",
            "results": {
                "projectedSavings": 1000000000,
                "affectedCustomers": 15,
                "riskLevel": "Medium"
            }
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
