from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
import pandas as pd

class UnifiedModel(BaseEstimator, ClassifierMixin):
    def __init__(self):
        self.regressor = MultiOutputRegressor(RandomForestRegressor(random_state=42))
        self.classifier = RandomForestClassifier(random_state=42)

    def fit(self, X, y):
        self.regressor.fit(X, y[['attention', 'meditation']])
        self.classifier.fit(X, y['classification'])
        return self

    def predict(self, X):
        regression_preds = self.regressor.predict(X)
        classification_preds = self.classifier.predict(X)
        return pd.DataFrame(
            data={
                "attention": regression_preds[:, 0],
                "meditation": regression_preds[:, 1],
                "classification": classification_preds,
            }
        )
