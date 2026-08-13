export const questions = {
  // ──────────────────────────────────────────────
  // Stage 1: Programming Foundations
  // ──────────────────────────────────────────────
  "prog-1": {
    id: "prog-1",
    stageId: "programming",
    question: "Which of the following is immutable in Python?",
    options: [
      "List",
      "Dictionary",
      "Tuple",
      "Set"
    ],
    correctIndex: 2,
    explanation: "Tuples are immutable in Python — once created, their elements cannot be changed. Lists, dictionaries, and sets are all mutable.",
    tags: ["python", "data-types", "immutability"]
  },
  "prog-2": {
    id: "prog-2",
    stageId: "programming",
    question: "What does the `self` keyword represent in a Python class method?",
    options: [
      "The parent class",
      "The class itself (static context)",
      "The current instance of the class",
      "A global variable"
    ],
    correctIndex: 2,
    explanation: "`self` refers to the current instance of the class, allowing you to access attributes and methods tied to that specific object.",
    tags: ["python", "oop", "classes"]
  },
  "prog-3": {
    id: "prog-3",
    stageId: "programming",
    question: "Which file method reads all lines from a file and returns them as a list?",
    options: [
      "read()",
      "readline()",
      "readlines()",
      "readall()"
    ],
    correctIndex: 2,
    explanation: "`readlines()` reads all remaining lines from a file and returns them as a list of strings, each ending with a newline character.",
    tags: ["python", "file-handling"]
  },
  "prog-4": {
    id: "prog-4",
    stageId: "programming",
    question: "What will `len([1, [2, 3], 4])` return in Python?",
    options: [
      "4",
      "3",
      "5",
      "2"
    ],
    correctIndex: 1,
    explanation: "The list has three top-level elements: 1, [2, 3], and 4. The nested list counts as a single element, so len() returns 3.",
    tags: ["python", "data-types", "lists"]
  },
  "prog-5": {
    id: "prog-5",
    stageId: "programming",
    question: "What is the output of `print(type(1/2))` in Python?",
    options: [
      "<class 'int'>",
      "<class 'float'>",
      "<class 'division'>",
      "<class 'number'>"
    ],
    correctIndex: 1,
    explanation: "In Python 3, the `/` operator always performs float division, so 1/2 evaluates to 0.5, which is a float.",
    tags: ["python", "data-types", "operators"]
  },
  "prog-6": {
    id: "prog-6",
    stageId: "programming",
    question: "Which of the following best describes a Python decorator?",
    options: [
      "A comment that formats code automatically",
      "A function that modifies another function's behavior",
      "A variable naming convention for private members",
      "A special type of loop"
    ],
    correctIndex: 1,
    explanation: "A decorator is a higher-order function that wraps another function, allowing you to add functionality before or after the original function runs.",
    tags: ["python", "functions", "decorators"]
  },
  "prog-7": {
    id: "prog-7",
    stageId: "programming",
    question: "In Git, what command stages all changes for the next commit?",
    options: [
      "git commit",
      "git push",
      "git add .",
      "git stash"
    ],
    correctIndex: 2,
    explanation: "`git add .` stages all modified and new files in the current directory, preparing them for the next commit.",
    tags: ["git", "version-control"]
  },
  "prog-8": {
    id: "prog-8",
    stageId: "programming",
    question: "What is a key difference between `==` and `is` in Python?",
    options: [
      "There is no difference",
      "`==` checks value equality; `is` checks identity (same object in memory)",
      "`is` checks value equality; `==` checks identity",
      "`==` works only with strings"
    ],
    correctIndex: 1,
    explanation: "`==` compares values (calls `__eq__`), while `is` checks whether two variables point to the exact same object in memory.",
    tags: ["python", "operators", "comparison"]
  },
  "prog-9": {
    id: "prog-9",
    stageId: "programming",
    question: "What does the `__init__` method do in a Python class?",
    options: [
      "Destroys the object and frees memory",
      "Returns the string representation of an object",
      "Initializes a newly created instance with attributes",
      "Makes a copy of an existing object"
    ],
    correctIndex: 2,
    explanation: "`__init__` is the constructor method that runs automatically when a new instance of a class is created, allowing you to set initial attribute values.",
    tags: ["python", "oop", "classes"]
  },
  "prog-10": {
    id: "prog-10",
    stageId: "programming",
    question: "Which of the following is the correct way to define a default parameter in Python?",
    options: [
      "def func(x = 5):",
      "def func(x := 5):",
      "def func(x -> 5):",
      "def func(default x):"
    ],
    correctIndex: 0,
    explanation: "Default parameter values are specified using `=` in the function signature. The other options use Python syntax that serves different purposes or is invalid.",
    tags: ["python", "functions", "parameters"]
  },

  // ──────────────────────────────────────────────
  // Stage 2: Mathematics for AI
  // ──────────────────────────────────────────────
  "math-1": {
    id: "math-1",
    stageId: "math",
    question: "What is the dot product of vectors [1, 2, 3] and [4, 5, 6]?",
    options: [
      "32",
      "34",
      "15",
      "21"
    ],
    correctIndex: 0,
    explanation: "The dot product is calculated as (1×4) + (2×5) + (3×6) = 4 + 10 + 18 = 32.",
    tags: ["linear-algebra", "dot-product", "calculation"]
  },
  "math-2": {
    id: "math-2",
    stageId: "math",
    question: "In Bayes' theorem, what does P(A|B) represent?",
    options: [
      "The probability of B given A",
      "The probability of A given B has occurred",
      "The joint probability of A and B",
      "The probability of A or B"
    ],
    correctIndex: 1,
    explanation: "P(A|B) is the conditional probability of event A occurring given that event B has already occurred. This is the posterior probability in Bayes' theorem.",
    tags: ["probability", "bayes-theorem", "conditional-probability"]
  },
  "math-3": {
    id: "math-3",
    stageId: "math",
    question: "What is the derivative of sin(x)?",
    options: [
      "cos(x)",
      "-cos(x)",
      "sin(x)",
      "-sin(x)"
    ],
    correctIndex: 0,
    explanation: "The derivative of sin(x) with respect to x is cos(x). This is a fundamental result in calculus.",
    tags: ["calculus", "derivatives", "trigonometry"]
  },
  "math-4": {
    id: "math-4",
    stageId: "math",
    question: "What does gradient descent aim to minimize?",
    options: [
      "Model accuracy",
      "Training data size",
      "A loss (cost) function",
      "Number of model parameters"
    ],
    correctIndex: 2,
    explanation: "Gradient descent iteratively adjusts model parameters to minimize the loss function, which measures the difference between predictions and actual values.",
    tags: ["optimization", "gradient-descent", "calculus"]
  },
  "math-5": {
    id: "math-5",
    stageId: "math",
    question: "What is the determinant of the 2×2 matrix [[2, 3], [1, 4]]?",
    options: [
      "5",
      "8",
      "11",
      "7"
    ],
    correctIndex: 0,
    explanation: "The determinant of a 2×2 matrix [[a,b],[c,d]] is ad - bc. So (2×4) - (3×1) = 8 - 3 = 5.",
    tags: ["linear-algebra", "matrices", "determinant", "calculation"]
  },
  "math-6": {
    id: "math-6",
    stageId: "math",
    question: "What does the softmax function produce?",
    options: [
      "Values between -1 and 1",
      "Binary outputs of 0 or 1",
      "A probability distribution that sums to 1",
      "Always the same output regardless of input"
    ],
    correctIndex: 2,
    explanation: "Softmax converts a vector of raw scores (logits) into a probability distribution where all values are between 0 and 1 and sum to 1.",
    tags: ["softmax", "probability", "activation"]
  },
  "math-7": {
    id: "math-7",
    stageId: "math",
    question: "What does standard deviation measure?",
    options: [
      "The average of a dataset",
      "The middle value of a dataset",
      "The spread or dispersion of values around the mean",
      "The most frequently occurring value"
    ],
    correctIndex: 2,
    explanation: "Standard deviation quantifies how much individual data points deviate from the mean. A higher standard deviation means data is more spread out.",
    tags: ["statistics", "standard-deviation", "dispersion"]
  },
  "math-8": {
    id: "math-8",
    stageId: "math",
    question: "What is the integral of 2x with respect to x?",
    options: [
      "x²",
      "x² + C",
      "2x² + C",
      "2 + C"
    ],
    correctIndex: 1,
    explanation: "Using the power rule, the integral of 2x is x² + C, where C is the constant of integration representing any constant value.",
    tags: ["calculus", "integration", "power-rule"]
  },
  "math-9": {
    id: "math-9",
    stageId: "math",
    question: "In the context of probability, what is the expected value of rolling a fair 6-sided die?",
    options: [
      "3.0",
      "3.5",
      "4.0",
      "2.5"
    ],
    correctIndex: 1,
    explanation: "The expected value is the sum of each outcome multiplied by its probability: (1+2+3+4+5+6)/6 = 21/6 = 3.5.",
    tags: ["probability", "expected-value", "calculation"]
  },
  "math-10": {
    id: "math-10",
    stageId: "math",
    question: "What is the main purpose of the chain rule in calculus?",
    options: [
      "Multiplying two functions together",
      "Taking the derivative of a product of functions",
      "Differentiating composite (nested) functions",
      "Finding the inverse of a function"
    ],
    correctIndex: 2,
    explanation: "The chain rule allows you to compute the derivative of a composition of functions: if f(g(x)), then the derivative is f'(g(x)) × g'(x). It's essential for backpropagation in neural networks.",
    tags: ["calculus", "chain-rule", "derivatives"]
  },

  // ──────────────────────────────────────────────
  // Stage 3: Data & Scientific Python
  // ──────────────────────────────────────────────
  "data-1": {
    id: "data-1",
    stageId: "data",
    question: "What is the shape of a 1D NumPy array with 10 elements?",
    options: [
      "[10]",
      "(10,)",
      "(10, 1)",
      "(1, 10)"
    ],
    correctIndex: 1,
    explanation: "A 1D NumPy array with 10 elements has shape (10,) — a tuple with one element. NumPy uses tuples to represent shape, even for 1D arrays.",
    tags: ["numpy", "arrays", "shape"]
  },
  "data-2": {
    id: "data-2",
    stageId: "data",
    question: "Which Pandas method fills missing values with a specified value?",
    options: [
      "dropna()",
      "fillna()",
      "replace()",
      "interpolate()"
    ],
    correctIndex: 1,
    explanation: "`fillna()` replaces NaN values with a specified value (or uses a strategy like forward fill). `dropna()` removes rows/columns with missing values instead.",
    tags: ["pandas", "missing-data", "data-cleaning"]
  },
  "data-3": {
    id: "data-3",
    stageId: "data",
    question: "What does `np.reshape(3, -1)` do to an array of 12 elements?",
    options: [
      "Creates a 3×3 array",
      "Creates a 3×4 array",
      "Creates a 4×3 array",
      "Creates a 1×12 array"
    ],
    correctIndex: 1,
    explanation: "The `-1` tells NumPy to infer that dimension automatically. With 12 elements and 3 rows, it calculates 12/3 = 4 columns, giving a 3×4 array.",
    tags: ["numpy", "arrays", "reshape"]
  },
  "data-4": {
    id: "data-4",
    stageId: "data",
    question: "What does `df.groupby('col').mean()` do?",
    options: [
      "Removes duplicates based on 'col'",
      "Sorts the DataFrame by 'col'",
      "Groups rows by unique values in 'col' and computes the mean of numeric columns",
      "Creates a new column called 'mean'"
    ],
    correctIndex: 2,
    explanation: "`groupby()` splits the DataFrame into groups based on a column, and `.mean()` then calculates the average of numeric columns for each group.",
    tags: ["pandas", "groupby", "aggregation"]
  },
  "data-5": {
    id: "data-5",
    stageId: "data",
    question: "What is the purpose of data normalization before training a model?",
    options: [
      "To increase the dataset size",
      "To remove all outliers from the data",
      "To scale features to a similar range for better model performance",
      "To convert categorical data to numbers"
    ],
    correctIndex: 2,
    explanation: "Normalization scales features to a common range (e.g., 0–1 or standard normal), which helps gradient-based algorithms converge faster and prevents features with larger scales from dominating.",
    tags: ["preprocessing", "normalization", "feature-scaling"]
  },
  "data-6": {
    id: "data-6",
    stageId: "data",
    question: "What is the difference between `loc` and `iloc` in Pandas?",
    options: [
      "They are identical",
      "`loc` uses index labels; `iloc` uses integer positions",
      "`loc` is faster than `iloc`",
      "`iloc` works only with string indices"
    ],
    correctIndex: 1,
    explanation: "`loc` is label-based indexing (e.g., `df.loc[0]` selects the row with index label 0), while `iloc` is position-based (e.g., `df.iloc[0]` selects the first row regardless of its label).",
    tags: ["pandas", "indexing", "loc", "iloc"]
  },
  "data-7": {
    id: "data-7",
    stageId: "data",
    question: "What does Matplotlib's `plt.subplot(2, 1, 1)` create?",
    options: [
      "A single plot of size 2×1",
      "A figure with 2 rows, 1 column, and activates the first subplot",
      "A plot with two x-axes",
      "A plot with 2 data series"
    ],
    correctIndex: 1,
    explanation: "`subplot(nrows, ncols, index)` creates a grid of subplots and activates the one at the specified position. (2, 1, 1) means 2 rows, 1 column, first position.",
    tags: ["matplotlib", "visualization", "subplots"]
  },
  "data-8": {
    id: "data-8",
    stageId: "data",
    question: "What is one-hot encoding?",
    options: [
      "Encoding data using binary numbers directly",
      "Converting text to lowercase",
      "Converting categorical variables into binary vectors where only one element is 1",
      "Removing duplicate rows from a dataset"
    ],
    correctIndex: 2,
    explanation: "One-hot encoding represents each category as a binary vector with a single 1 and all other 0s. For example, [red, blue, green] becomes [[1,0,0], [0,1,0], [0,0,1]].",
    tags: ["preprocessing", "encoding", "categorical-data"]
  },
  "data-9": {
    id: "data-9",
    stageId: "data",
    question: "What does the `info()` method in a Pandas DataFrame show?",
    options: [
      "Statistical summary of all columns",
      "The first few rows of data",
      "Column names, non-null counts, and data types",
      "Correlation between all columns"
    ],
    correctIndex: 2,
    explanation: "`DataFrame.info()` displays a concise summary including column names, non-null counts, data types, and memory usage — very useful for data exploration.",
    tags: ["pandas", "data-exploration", "dataframes"]
  },
  "data-10": {
    id: "data-10",
    stageId: "data",
    question: "What is the main advantage of using vectorized operations over Python loops in NumPy?",
    options: [
      "They use less memory",
      "They are written in fewer lines of code",
      "They are significantly faster due to low-level C implementation",
      "They always produce more accurate results"
    ],
    correctIndex: 2,
    explanation: "NumPy's vectorized operations are implemented in optimized C code under the hood, making them orders of magnitude faster than equivalent Python loops.",
    tags: ["numpy", "performance", "vectorization"]
  },

  // ──────────────────────────────────────────────
  // Stage 4: Machine Learning
  // ──────────────────────────────────────────────
  "ml-1": {
    id: "ml-1",
    stageId: "ml",
    question: "Which metric is most suitable for evaluating imbalanced classification?",
    options: [
      "Accuracy",
      "F1 score",
      "Mean squared error",
      "R² score"
    ],
    correctIndex: 1,
    explanation: "F1 score balances precision and recall, making it much better than accuracy for imbalanced datasets where a model can achieve high accuracy by simply predicting the majority class.",
    tags: ["evaluation", "classification", "imbalanced-data"]
  },
  "ml-2": {
    id: "ml-2",
    stageId: "ml",
    question: "What does a model with high bias and low variance indicate?",
    options: [
      "Overfitting",
      "Underfitting",
      "Optimal performance",
      "Data leakage"
    ],
    correctIndex: 1,
    explanation: "High bias means the model is too simple to capture the underlying patterns (underfitting), while low variance means it doesn't vary much across training sets.",
    tags: ["bias-variance", "model-selection", "overfitting"]
  },
  "ml-3": {
    id: "ml-3",
    stageId: "ml",
    question: "What is the main goal of regularization?",
    options: [
      "To increase model complexity",
      "To speed up training",
      "To prevent overfitting by penalizing large weights",
      "To increase the number of features"
    ],
    correctIndex: 2,
    explanation: "Regularization techniques like L1 and L2 add a penalty term to the loss function that discourages large weight values, helping the model generalize better to unseen data.",
    tags: ["regularization", "overfitting", "generalization"]
  },
  "ml-4": {
    id: "ml-4",
    stageId: "ml",
    question: "What is the purpose of a validation set?",
    options: [
      "To train the model on the largest portion of data",
      "To evaluate and tune hyperparameters without overfitting to test data",
      "To store predictions for later use",
      "To augment training data"
    ],
    correctIndex: 1,
    explanation: "A validation set is used to evaluate model performance during training and tune hyperparameters. It provides an unbiased estimate without touching the held-out test set.",
    tags: ["validation", "model-evaluation", "data-splitting"]
  },
  "ml-5": {
    id: "ml-5",
    stageId: "ml",
    question: "Which algorithm is an example of unsupervised learning?",
    options: [
      "Linear regression",
      "K-Means clustering",
      "Random forest",
      "Support vector machines"
    ],
    correctIndex: 1,
    explanation: "K-Means clustering groups data points into k clusters based on similarity without using labeled data. Linear regression, random forests, and SVMs are supervised methods.",
    tags: ["unsupervised-learning", "clustering", "k-means"]
  },
  "ml-6": {
    id: "ml-6",
    stageId: "ml",
    question: "What is a decision tree primarily based on?",
    options: [
      "Matrix factorization",
      "A series of if-else splits on features",
      "Distance calculations between data points",
      "Weighted linear combinations"
    ],
    correctIndex: 1,
    explanation: "Decision trees make predictions by recursively splitting data based on feature values that maximize information gain (or minimize impurity) at each node.",
    tags: ["decision-trees", "algorithms", "classification"]
  },
  "ml-7": {
    id: "ml-7",
    stageId: "ml",
    question: "What does 'ensemble learning' combine?",
    options: [
      "Multiple datasets into one",
      "Multiple features into a single feature",
      "Multiple models to improve overall performance",
      "Multiple loss functions simultaneously"
    ],
    correctIndex: 2,
    explanation: "Ensemble learning combines multiple models (e.g., random forests combine many decision trees) to produce better predictions than any individual model alone.",
    tags: ["ensemble", "random-forest", "boosting"]
  },
  "ml-8": {
    id: "ml-8",
    stageId: "ml",
    question: "What is cross-validation?",
    options: [
      "Training on the entire dataset",
      "Splitting data into a training and test set once",
      "Rotating through multiple train-validation splits to evaluate model performance",
      "Using multiple loss functions during training"
    ],
    correctIndex: 2,
    explanation: "K-fold cross-validation splits data into k subsets, training on k-1 folds and validating on the remaining fold, rotating until each fold has been used for validation.",
    tags: ["cross-validation", "model-evaluation", "validation"]
  },
  "ml-9": {
    id: "ml-9",
    stageId: "ml",
    question: "What is the difference between classification and regression?",
    options: [
      "There is no difference",
      "Classification predicts categories; regression predicts continuous values",
      "Regression is faster than classification",
      "Classification requires more data than regression"
    ],
    correctIndex: 1,
    explanation: "Classification assigns discrete labels (e.g., spam/not spam), while regression predicts continuous numerical values (e.g., house prices).",
    tags: ["classification", "regression", "supervised-learning"]
  },
  "ml-10": {
    id: "ml-10",
    stageId: "ml",
    question: "What is the 'curse of dimensionality'?",
    options: [
      "Models always improve with more features",
      "High-dimensional data becomes sparse, making distance metrics less meaningful",
      "More data always leads to better predictions",
      "Neural networks cannot handle more than 3 dimensions"
    ],
    correctIndex: 1,
    explanation: "In high-dimensional spaces, data points become increasingly sparse and equidistant from each other, making distance-based algorithms less effective and requiring exponentially more data.",
    tags: ["dimensionality", "features", "data-preprocessing"]
  },

  // ──────────────────────────────────────────────
  // Stage 5: Deep Learning
  // ──────────────────────────────────────────────
  "deeplearning-1": {
    id: "deeplearning-1",
    stageId: "deeplearning",
    question: "What is the output range of the sigmoid activation function?",
    options: [
      "-1 to 1",
      "0 to 1",
      "-∞ to +∞",
      "0 to ∞"
    ],
    correctIndex: 1,
    explanation: "The sigmoid function σ(x) = 1/(1+e^(-x)) outputs values strictly between 0 and 1, which makes it useful for binary classification output layers.",
    tags: ["activations", "sigmoid", "neural-networks"]
  },
  "deeplearning-2": {
    id: "deeplearning-2",
    stageId: "deeplearning",
    question: "What technique randomly sets neurons to zero during training?",
    options: [
      "Batch normalization",
      "Dropout",
      "Weight initialization",
      "Learning rate scheduling"
    ],
    correctIndex: 1,
    explanation: "Dropout randomly deactivates a fraction of neurons during each training step, forcing the network to learn redundant representations and preventing co-adaptation.",
    tags: ["regularization", "dropout", "neural-networks"]
  },
  "deeplearning-3": {
    id: "deeplearning-3",
    stageId: "deeplearning",
    question: "What problem does the vanishing gradient problem cause?",
    options: [
      "Model trains too quickly",
      "Weights become too large",
      "Early layers stop learning because gradients become extremely small",
      "The model outputs are always zero"
    ],
    correctIndex: 2,
    explanation: "During backpropagation, gradients can shrink exponentially through deep networks, causing early layers to receive near-zero gradients and stop updating effectively.",
    tags: ["vanishing-gradients", "backpropagation", "deep-networks"]
  },
  "deeplearning-4": {
    id: "deeplearning-4",
    stageId: "deeplearning",
    question: "What is the primary advantage of using ReLU over sigmoid as an activation function?",
    options: [
      "ReLU produces smoother gradients",
      "ReLU avoids the vanishing gradient problem in positive regions and is computationally faster",
      "ReLU always produces better accuracy",
      "ReLU can handle negative inputs better"
    ],
    correctIndex: 1,
    explanation: "ReLU has a constant gradient of 1 for positive inputs (no vanishing gradient) and is computationally simple (just max(0, x)), making training faster and more effective.",
    tags: ["activations", "relu", "neural-networks"]
  },
  "deeplearning-5": {
    id: "deeplearning-5",
    stageId: "deeplearning",
    question: "What is the purpose of batch normalization?",
    options: [
      "To reduce the number of training batches",
      "To normalize inputs to each layer, stabilizing and speeding up training",
      "To increase the batch size automatically",
      "To remove outliers from the batch"
    ],
    correctIndex: 1,
    explanation: "Batch normalization normalizes the inputs to each layer to have zero mean and unit variance, which reduces internal covariate shift and allows higher learning rates.",
    tags: ["batch-normalization", "training", "optimization"]
  },
  "deeplearning-6": {
    id: "deeplearning-6",
    stageId: "deeplearning",
    question: "What does backpropagation compute?",
    options: [
      "The forward pass output of the network",
      "The loss of the model on test data",
      "Gradients of the loss with respect to each weight by applying the chain rule",
      "The optimal learning rate"
    ],
    correctIndex: 2,
    explanation: "Backpropagation efficiently computes gradients of the loss function with respect to every weight in the network using the chain rule, enabling gradient-based optimization.",
    tags: ["backpropagation", "gradients", "training"]
  },
  "deeplearning-7": {
    id: "deeplearning-7",
    stageId: "deeplearning",
    question: "What is an embedding layer in a neural network?",
    options: [
      "A layer that flattens the input to 1D",
      "A layer that learns dense vector representations for discrete inputs like words",
      "A layer that adds random noise to inputs",
      "A layer that normalizes the output"
    ],
    correctIndex: 1,
    explanation: "An embedding layer maps discrete values (such as word indices) to dense, low-dimensional continuous vectors that capture semantic relationships.",
    tags: ["embeddings", "neural-networks", "representations"]
  },
  "deeplearning-8": {
    id: "deeplearning-8",
    stageId: "deeplearning",
    question: "What is the purpose of a learning rate scheduler?",
    options: [
      "To schedule when to load data",
      "To dynamically adjust the learning rate during training",
      "To determine the number of epochs",
      "To set the batch size"
    ],
    correctIndex: 1,
    explanation: "A learning rate scheduler adjusts the learning rate during training (e.g., reducing it over time) to help the model converge faster while avoiding getting stuck in local minima.",
    tags: ["learning-rate", "optimization", "training"]
  },
  "deeplearning-9": {
    id: "deeplearning-9",
    stageId: "deeplearning",
    question: "What is the key difference between stochastic gradient descent (SGD) and mini-batch gradient descent?",
    options: [
      "There is no difference",
      "SGD uses one sample per update; mini-batch uses a small batch of samples",
      "Mini-batch always uses the entire dataset",
      "SGD is only for classification"
    ],
    correctIndex: 1,
    explanation: "SGD updates weights using a single random training example, while mini-batch gradient descent uses a small subset (e.g., 32 or 64 examples), balancing noise and computational efficiency.",
    tags: ["sgd", "optimization", "gradient-descent"]
  },
  "deeplearning-10": {
    id: "deeplearning-10",
    stageId: "deeplearning",
    question: "What does early stopping prevent?",
    options: [
      "Underfitting",
      "Data leakage",
      "Overfitting by halting training when validation performance stops improving",
      "Vanishing gradients"
    ],
    correctIndex: 2,
    explanation: "Early stopping monitors validation performance during training and stops when it no longer improves, preventing the model from memorizing training data (overfitting).",
    tags: ["early-stopping", "regularization", "training"]
  },

  // ──────────────────────────────────────────────
  // Stage 6: Computer Vision
  // ──────────────────────────────────────────────
  "cv-1": {
    id: "cv-1",
    stageId: "cv",
    question: "What does a convolution operation in a CNN produce?",
    options: [
      "A fully connected layer",
      "A feature map",
      "A probability distribution",
      "A weight matrix"
    ],
    correctIndex: 1,
    explanation: "A convolution applies filters/kernels to the input to produce a feature map that highlights specific patterns like edges, textures, or shapes.",
    tags: ["cnn", "convolution", "feature-maps"]
  },
  "cv-2": {
    id: "cv-2",
    stageId: "cv",
    question: "What is transfer learning?",
    options: [
      "Moving data between servers",
      "Training a model from scratch on a new dataset",
      "Using weights from a pre-trained model as a starting point for a new task",
      "Transferring labels from one dataset to another"
    ],
    correctIndex: 2,
    explanation: "Transfer learning reuses a model trained on a large dataset (like ImageNet) and fine-tunes it for a specific task, significantly reducing training time and data requirements.",
    tags: ["transfer-learning", "pre-training", "fine-tuning"]
  },
  "cv-3": {
    id: "cv-3",
    stageId: "cv",
    question: "What is the purpose of pooling layers in a CNN?",
    options: [
      "To increase the image resolution",
      "To reduce spatial dimensions and computation while retaining key features",
      "To add more channels to the feature map",
      "To apply color transformations"
    ],
    correctIndex: 1,
    explanation: "Pooling layers (like max pooling) downsample the spatial dimensions, reducing the number of parameters and computation while helping the network become invariant to small translations.",
    tags: ["cnn", "pooling", "architecture"]
  },
  "cv-4": {
    id: "cv-4",
    stageId: "cv",
    question: "What is data augmentation in computer vision?",
    options: [
      "Adding more classes to the dataset",
      "Creating synthetic training samples by applying transformations like rotation, flipping, and cropping",
      "Removing duplicate images from a dataset",
      "Combining multiple datasets together"
    ],
    correctIndex: 1,
    explanation: "Data augmentation artificially increases the size and diversity of training data by applying random transformations, helping the model generalize better and reduce overfitting.",
    tags: ["data-augmentation", "regularization", "training"]
  },
  "cv-5": {
    id: "cv-5",
    stageId: "cv",
    question: "What does a residual connection (skip connection) in a ResNet do?",
    options: [
      "Removes layers from the network",
      "Adds the input of a block to its output, allowing gradients to flow directly through",
      "Doubles the number of filters",
      "Applies dropout at each layer"
    ],
    correctIndex: 1,
    explanation: "Residual connections bypass one or more layers by adding the input directly to the output, creating a shortcut that helps gradients flow through deep networks and alleviates vanishing gradients.",
    tags: ["resnet", "skip-connections", "deep-networks"]
  },
  "cv-6": {
    id: "cv-6",
    stageId: "cv",
    question: "What is the receptive field in a CNN?",
    options: [
      "The number of filters in the last layer",
      "The size of the input image",
      "The region of the input image that influences a particular neuron's output",
      "The output size of the network"
    ],
    correctIndex: 2,
    explanation: "The receptive field is the area in the input image that a specific neuron 'sees.' As you go deeper in the network, neurons have larger receptive fields due to pooling and strided convolutions.",
    tags: ["cnn", "receptive-field", "architecture"]
  },
  "cv-7": {
    id: "cv-7",
    stageId: "cv",
    question: "What is the main advantage of Vision Transformers (ViT) over traditional CNNs?",
    options: [
      "They require less training data",
      "They can capture long-range dependencies across the entire image via self-attention",
      "They are always faster to train",
      "They do not need any preprocessing"
    ],
    correctIndex: 1,
    explanation: "Vision Transformers apply self-attention across image patches, enabling them to model relationships between distant parts of an image more effectively than the local receptive fields of CNNs.",
    tags: ["vision-transformers", "self-attention", "architecture"]
  },
  "cv-8": {
    id: "cv-8",
    stageId: "cv",
    question: "What is the purpose of the fully connected layer at the end of a classification CNN?",
    options: [
      "To perform convolution operations",
      "To reduce the image size",
      "To combine features and output class scores (logits)",
      "To apply dropout"
    ],
    correctIndex: 2,
    explanation: "The fully connected layer takes the flattened feature maps and maps them to the number of output classes, producing logits that represent the score for each class.",
    tags: ["cnn", "classification", "architecture"]
  },
  "cv-9": {
    id: "cv-9",
    stageId: "cv",
    question: "What is Intersection over Union (IoU) used for?",
    options: [
      "Measuring image quality",
      "Evaluating the overlap between predicted and ground truth bounding boxes",
      "Calculating color similarity",
      "Determining the best learning rate"
    ],
    correctIndex: 1,
    explanation: "IoU measures the overlap between a predicted bounding box and the ground truth box as the ratio of their intersection to their union. It's a standard metric for object detection.",
    tags: ["object-detection", "evaluation", "iou"]
  },
  "cv-10": {
    id: "cv-10",
    stageId: "cv",
    question: "What is a stride of 2 in a convolution?",
    options: [
      "A filter size of 2×2",
      "Moving the filter 2 pixels at a time, which halves the spatial dimensions",
      "Using 2 convolution layers",
      "A padding of 2 pixels"
    ],
    correctIndex: 1,
    explanation: "Stride determines how many pixels the filter moves at each step. A stride of 2 skips every other position, effectively downsampling the output to half the spatial dimensions.",
    tags: ["cnn", "convolution", "stride"]
  },

  // ──────────────────────────────────────────────
  // Stage 7: NLP
  // ──────────────────────────────────────────────
  "nlp-1": {
    id: "nlp-1",
    stageId: "nlp",
    question: "What does TF-IDF measure?",
    options: [
      "The frequency of each word in a document",
      "How similar two documents are",
      "The importance of a term relative to a document within a corpus",
      "The sentiment of a sentence"
    ],
    correctIndex: 2,
    explanation: "TF-IDF (Term Frequency–Inverse Document Frequency) weights a term by how frequently it appears in a document (TF) while down-weighting terms common across the entire corpus (IDF).",
    tags: ["tf-idf", "text-representation", "feature-extraction"]
  },
  "nlp-2": {
    id: "nlp-2",
    stageId: "nlp",
    question: "What problem do vanilla RNNs have with long sequences?",
    options: [
      "They are too fast",
      "They use too much memory",
      "Vanishing and exploding gradients make it hard to learn long-range dependencies",
      "They cannot process text at all"
    ],
    correctIndex: 2,
    explanation: "RNNs process sequences step by step, and gradients must propagate through many time steps. This causes gradients to either vanish (shrink) or explode, making learning long-range dependencies difficult.",
    tags: ["rnn", "vanishing-gradients", "sequence-models"]
  },
  "nlp-3": {
    id: "nlp-3",
    stageId: "nlp",
    question: "What is tokenization in NLP?",
    options: [
      "Encrypting text data",
      "Converting text into numerical tokens that a model can process",
      "Translating text to another language",
      "Removing all punctuation from text"
    ],
    correctIndex: 1,
    explanation: "Tokenization splits text into smaller units (tokens) — words, subwords, or characters — and maps them to numerical IDs that neural networks can process.",
    tags: ["tokenization", "preprocessing", "text-processing"]
  },
  "nlp-4": {
    id: "nlp-4",
    stageId: "nlp",
    question: "What does a word embedding capture that a one-hot encoding does not?",
    options: [
      "The position of the word in the sentence",
      "Semantic and syntactic relationships between words",
      "The length of the word",
      "The part of speech only"
    ],
    correctIndex: 1,
    explanation: "Word embeddings map words to dense vectors where semantically similar words are close together. One-hot encodings are orthogonal and cannot represent similarity.",
    tags: ["embeddings", "word2vec", "representations"]
  },
  "nlp-5": {
    id: "nlp-5",
    stageId: "nlp",
    question: "What is a language model?",
    options: [
      "A tool that translates between languages",
      "A model that predicts the probability of the next word (or sequence of words)",
      "A spell-checker",
      "A grammar correction tool"
    ],
    correctIndex: 1,
    explanation: "A language model estimates the probability distribution over the next token given the preceding context. This is the foundation of text generation systems.",
    tags: ["language-modeling", "nlp", "probability"]
  },
  "nlp-6": {
    id: "nlp-6",
    stageId: "nlp",
    question: "What is the purpose of the LSTM's cell state?",
    options: [
      "To store the model's weights",
      "To provide a way to carry information across many time steps with minimal degradation",
      "To compute the attention scores",
      "To store the vocabulary"
    ],
    correctIndex: 1,
    explanation: "LSTMs use a cell state as a highway to pass information across time steps, with gates controlling what to add or remove. This helps the network learn long-range dependencies.",
    tags: ["lstm", "rnn", "sequence-models"]
  },
  "nlp-7": {
    id: "nlp-7",
    stageId: "nlp",
    question: "What is subword tokenization (e.g., BPE) primarily used for?",
    options: [
      "Translating languages",
      "Breaking words into meaningful subword units to handle rare words and reduce vocabulary size",
      "Encrypting text",
      "Counting word frequencies"
    ],
    correctIndex: 1,
    explanation: "Byte-Pair Encoding (BPE) and similar algorithms split text into subword tokens, allowing models to handle out-of-vocabulary words by combining known subword pieces.",
    tags: ["tokenization", "bpe", "subword"]
  },
  "nlp-8": {
    id: "nlp-8",
    stageId: "nlp",
    question: "What does BLEU measure?",
    options: [
      "The speed of text generation",
      "The quality of machine-translated text by comparing it to reference translations",
      "The size of the vocabulary",
      "The sentiment of a text"
    ],
    correctIndex: 1,
    explanation: "BLEU (Bilingual Evaluation Understudy) measures how similar machine-generated text is to one or more human reference translations using modified n-gram precision.",
    tags: ["evaluation", "bleu", "machine-translation"]
  },
  "nlp-9": {
    id: "nlp-9",
    stageId: "nlp",
    question: "What is named entity recognition (NER)?",
    options: [
      "Generating names for unnamed entities",
      "Identifying and classifying named entities (people, organizations, locations) in text",
      "Recognizing handwriting",
      "Translating entity names between languages"
    ],
    correctIndex: 1,
    explanation: "NER is an NLP task that identifies spans of text referring to entities like persons, organizations, locations, dates, and classifies them into predefined categories.",
    tags: ["ner", "information-extraction", "nlp"]
  },
  "nlp-10": {
    id: "nlp-10",
    stageId: "nlp",
    question: "What is the difference between stemming and lemmatization?",
    options: [
      "There is no difference",
      "Stemming is rule-based and may produce non-real words; lemmatization uses vocabulary and morphology to produce valid words",
      "Lemmatization is faster than stemming",
      "Stemming works only on English text"
    ],
    correctIndex: 1,
    explanation: "Stemming applies crude suffix stripping (e.g., 'running' → 'run'), while lemmatization uses linguistic rules and a dictionary to reduce words to their actual base form (lemma).",
    tags: ["preprocessing", "stemming", "lemmatization"]
  },

  // ──────────────────────────────────────────────
  // Stage 8: Transformers
  // ──────────────────────────────────────────────
  "transformers-1": {
    id: "transformers-1",
    stageId: "transformers",
    question: "In self-attention, what do Q, K, and V stand for?",
    options: [
      "Quantity, Key, Value",
      "Query, Key, Value",
      "Question, Kernel, Vector",
      "Query, Knowledge, Volume"
    ],
    correctIndex: 1,
    explanation: "In attention, the Query (Q), Key (K), and Value (V) are linearly transformed representations. Attention scores are computed by comparing Q with K, then used to weight V.",
    tags: ["self-attention", "transformers", "mechanism"]
  },
  "transformers-2": {
    id: "transformers-2",
    stageId: "transformers",
    question: "What does positional encoding add to transformer inputs?",
    options: [
      "Random noise for regularization",
      "Information about the order/position of tokens in the sequence",
      "Word embeddings from a pre-trained model",
      "Layer normalization parameters"
    ],
    correctIndex: 1,
    explanation: "Since transformers process all tokens simultaneously (unlike RNNs), they have no inherent sense of order. Positional encodings inject information about token positions into the embeddings.",
    tags: ["positional-encoding", "transformers", "architecture"]
  },
  "transformers-3": {
    id: "transformers-3",
    stageId: "transformers",
    question: "What paper introduced the transformer architecture?",
    options: [
      "Deep Residual Learning (2015)",
      "ImageNet Classification with Deep CNNs (2012)",
      "Attention Is All You Need (2017)",
      "Generative Adversarial Networks (2014)"
    ],
    correctIndex: 2,
    explanation: "The landmark 2017 paper 'Attention Is All You Need' by Vaswani et al. introduced the transformer architecture, replacing recurrence with pure self-attention mechanisms.",
    tags: ["transformers", "attention", "paper"]
  },
  "transformers-4": {
    id: "transformers-4",
    stageId: "transformers",
    question: "What is the purpose of multi-head attention?",
    options: [
      "To reduce the number of parameters",
      "To allow the model to attend to information from different representation subspaces in parallel",
      "To make the model smaller",
      "To replace the need for positional encoding"
    ],
    correctIndex: 1,
    explanation: "Multi-head attention runs several attention operations in parallel with different learned projections, allowing the model to capture different types of relationships simultaneously.",
    tags: ["multi-head-attention", "transformers", "mechanism"]
  },
  "transformers-5": {
    id: "transformers-5",
    stageId: "transformers",
    question: "What is the difference between encoder-only and decoder-only transformers?",
    options: [
      "There is no difference",
      "Encoder-only processes the full input bidirectionally; decoder-only generates tokens autoregressively (one at a time)",
      "Encoder-only is for images; decoder-only is for text",
      "Decoder-only is always smaller"
    ],
    correctIndex: 1,
    explanation: "Encoder-only models (like BERT) see all tokens bidirectionally, while decoder-only models (like GPT) generate text token by token using only left context.",
    tags: ["encoder", "decoder", "architecture"]
  },
  "transformers-6": {
    id: "transformers-6",
    stageId: "transformers",
    question: "What is the scaled dot-product attention formula?",
    options: [
      "Attention(Q, K, V) = softmax(QK^T) × V",
      "Attention(Q, K, V) = softmax(QK^T / √d_k) × V",
      "Attention(Q, K, V) = Q × K × V",
      "Attention(Q, K, V) = (Q + K) / V"
    ],
    correctIndex: 1,
    explanation: "The formula computes attention scores by multiplying Q and K^T, scaling by the square root of the key dimension (d_k) to prevent large values, applying softmax, then multiplying by V.",
    tags: ["attention", "formula", "mechanism"]
  },
  "transformers-7": {
    id: "transformers-7",
    stageId: "transformers",
    question: "What is layer normalization in transformers?",
    options: [
      "Normalizing the number of layers",
      "Normalizing the input across features within each sample to stabilize training",
      "Reducing the number of parameters per layer",
      "Adding dropout between layers"
    ],
    correctIndex: 1,
    explanation: "Layer normalization normalizes activations across the feature dimension for each sample independently, stabilizing training by reducing internal covariate shift.",
    tags: ["layer-normalization", "transformers", "training"]
  },
  "transformers-8": {
    id: "transformers-8",
    stageId: "transformers",
    question: "What is the purpose of a causal mask in a decoder?",
    options: [
      "To speed up training",
      "To prevent attending to future tokens during generation, ensuring autoregressive behavior",
      "To mask out padding tokens",
      "To hide the model's attention weights"
    ],
    correctIndex: 1,
    explanation: "A causal (look-ahead) mask prevents positions from attending to subsequent positions, ensuring the decoder can only use previously generated tokens when predicting the next token.",
    tags: ["causal-mask", "decoder", "autoregressive"]
  },
  "transformers-9": {
    id: "transformers-9",
    stageId: "transformers",
    question: "Why is the scaling factor √d_k used in attention?",
    options: [
      "To make the computation faster",
      "To prevent dot products from becoming too large, which would push softmax into regions with tiny gradients",
      "To reduce memory usage",
      "To normalize the output to sum to 1"
    ],
    correctIndex: 1,
    explanation: "When the dimension d_k is large, dot products grow in magnitude, causing softmax to produce extremely peaked distributions with near-zero gradients. Scaling by √d_k counteracts this.",
    tags: ["attention", "scaling", "mechanism"]
  },
  "transformers-10": {
    id: "transformers-10",
    stageId: "transformers",
    question: "What makes transformers more parallelizable than RNNs?",
    options: [
      "They use fewer parameters",
      "They process all tokens in a sequence simultaneously rather than sequentially",
      "They require less memory",
      "They use convolution instead of recurrence"
    ],
    correctIndex: 1,
    explanation: "Unlike RNNs, which process one token at a time in order, transformers attend to all tokens simultaneously through self-attention, enabling massive parallelization on GPUs.",
    tags: ["transformers", "parallelism", "efficiency"]
  },

  // ──────────────────────────────────────────────
  // Stage 9: LLMs
  // ──────────────────────────────────────────────
  "llm-1": {
    id: "llm-1",
    stageId: "llm",
    question: "What does temperature control in LLM inference?",
    options: [
      "The speed of text generation",
      "The length of the generated output",
      "The randomness or creativity of the output by reshaping the probability distribution",
      "The model's memory usage"
    ],
    correctIndex: 2,
    explanation: "Temperature controls the sharpness of the output probability distribution. Lower temperature makes outputs more deterministic; higher temperature increases randomness and creativity.",
    tags: ["inference", "temperature", "generation"]
  },
  "llm-2": {
    id: "llm-2",
    stageId: "llm",
    question: "What is LoRA in the context of LLM fine-tuning?",
    options: [
      "A data augmentation technique",
      "A low-rank approximation method that adds small trainable matrices to frozen model weights",
      "A type of attention mechanism",
      "A method for quantizing models"
    ],
    correctIndex: 1,
    explanation: "LoRA (Low-Rank Adaptation) freezes the original model weights and adds small low-rank matrices that are trained, dramatically reducing the number of parameters to update during fine-tuning.",
    tags: ["fine-tuning", "lora", "parameter-efficient"]
  },
  "llm-3": {
    id: "llm-3",
    stageId: "llm",
    question: "What is the purpose of BPE (Byte-Pair Encoding) tokenization?",
    options: [
      "To compress text files",
      "To split text into subword tokens based on frequency, balancing vocabulary size and coverage",
      "To encrypt text data",
      "To translate text between languages"
    ],
    correctIndex: 1,
    explanation: "BPE iteratively merges the most frequent character pairs to build a vocabulary of subwords, allowing LLMs to represent any text while keeping the vocabulary manageable.",
    tags: ["tokenization", "bpe", "llm"]
  },
  "llm-4": {
    id: "llm-4",
    stageId: "llm",
    question: "What is the difference between pre-training and fine-tuning an LLM?",
    options: [
      "They are the same process",
      "Pre-training teaches general language understanding on large corpora; fine-tuning adapts the model to a specific task",
      "Pre-training is faster than fine-tuning",
      "Fine-tuning always requires more data than pre-training"
    ],
    correctIndex: 1,
    explanation: "Pre-training trains a model from scratch on massive text data to learn language patterns. Fine-tuning then adapts this pre-trained model on a smaller, task-specific dataset.",
    tags: ["pre-training", "fine-tuning", "training"]
  },
  "llm-5": {
    id: "llm-5",
    stageId: "llm",
    question: "What is the 'context window' of an LLM?",
    options: [
      "The size of the model in parameters",
      "The maximum number of tokens the model can process in a single forward pass",
      "The number of layers in the model",
      "The time it takes to generate one token"
    ],
    correctIndex: 1,
    explanation: "The context window defines how many tokens (input + output) the model can handle at once. Anything beyond this limit is invisible to the model.",
    tags: ["context-window", "architecture", "inference"]
  },
  "llm-6": {
    id: "llm-6",
    stageId: "llm",
    question: "What is the purpose of RLHF (Reinforcement Learning from Human Feedback)?",
    options: [
      "To make training faster",
      "To align the model's outputs with human preferences and values",
      "To reduce model size",
      "To increase the vocabulary size"
    ],
    correctIndex: 1,
    explanation: "RLHF trains a reward model on human preference data, then uses reinforcement learning to optimize the LLM's policy so that its outputs better match what humans find helpful and safe.",
    tags: ["rlhf", "alignment", "training"]
  },
  "llm-7": {
    id: "llm-7",
    stageId: "llm",
    question: "What is the difference between greedy decoding and beam search?",
    options: [
      "They are identical",
      "Greedy decoding picks the highest-probability token at each step; beam search keeps multiple candidate sequences",
      "Greedy decoding is always more accurate",
      "Beam search uses only one candidate"
    ],
    correctIndex: 1,
    explanation: "Greedy decoding always selects the most probable next token, while beam search maintains k candidate sequences (beams) at each step, exploring multiple possibilities for better overall output.",
    tags: ["decoding", "inference", "generation"]
  },
  "llm-8": {
    id: "llm-8",
    stageId: "llm",
    question: "What is quantization in the context of LLMs?",
    options: [
      "Measuring the model's accuracy",
      "Reducing model weight precision (e.g., from FP32 to INT8) to decrease memory and compute requirements",
      "Increasing the number of parameters",
      "Tokenizing the training data"
    ],
    correctIndex: 1,
    explanation: "Quantization reduces the numerical precision of model weights, making the model smaller and faster to run with minimal quality loss. INT8 or INT4 quantization are common choices.",
    tags: ["quantization", "optimization", "deployment"]
  },
  "llm-9": {
    id: "llm-9",
    stageId: "llm",
    question: "What is 'in-context learning' in LLMs?",
    options: [
      "The model learning during inference without updating weights, by using examples in the prompt",
      "The model memorizing the training data",
      "Fine-tuning the model at inference time",
      "Using a vector database during inference"
    ],
    correctIndex: 0,
    explanation: "In-context learning allows LLMs to perform new tasks by providing examples and instructions directly in the prompt, without any weight updates or fine-tuning.",
    tags: ["in-context-learning", "prompting", "few-shot"]
  },
  "llm-10": {
    id: "llm-10",
    stageId: "llm",
    question: "What is model distillation?",
    options: [
      "Cleaning the training data",
      "Training a smaller 'student' model to mimic a larger 'teacher' model's behavior",
      "Removing layers from a model",
      "Combining multiple models into one"
    ],
    correctIndex: 1,
    explanation: "Distillation transfers knowledge from a large model to a smaller one by training the student to reproduce the teacher's output distribution, creating a more efficient model.",
    tags: ["distillation", "compression", "optimization"]
  },

  // ──────────────────────────────────────────────
  // Stage 10: Generative AI
  // ──────────────────────────────────────────────
  "genai-1": {
    id: "genai-1",
    stageId: "genai",
    question: "What is the purpose of a vector database?",
    options: [
      "Storing structured SQL data",
      "Storing and efficiently searching high-dimensional vector embeddings",
      "Hosting web applications",
      "Managing user authentication"
    ],
    correctIndex: 1,
    explanation: "Vector databases store embedding vectors and provide efficient similarity search (e.g., cosine similarity) to find semantically similar content, which powers RAG systems.",
    tags: ["vector-database", "embeddings", "rag"]
  },
  "genai-2": {
    id: "genai-2",
    stageId: "genai",
    question: "What does RAG stand for?",
    options: [
      "Random Answer Generation",
      "Retrieval-Augmented Generation",
      "Recursive Adaptive Gradients",
      "Reinforced AI Generation"
    ],
    correctIndex: 1,
    explanation: "Retrieval-Augmented Generation combines information retrieval from external knowledge bases with LLM generation, allowing models to produce answers grounded in real data.",
    tags: ["rag", "retrieval", "generation"]
  },
  "genai-3": {
    id: "genai-3",
    stageId: "genai",
    question: "What is a prompt template?",
    options: [
      "A pre-trained model",
      "A reusable structure with placeholders for variable inputs in LLM prompts",
      "A type of dataset format",
      "An API authentication key"
    ],
    correctIndex: 1,
    explanation: "A prompt template is a reusable text structure that includes placeholders for dynamic inputs, making it easy to construct consistent prompts for different scenarios.",
    tags: ["prompt-engineering", "templates", "prompting"]
  },
  "genai-4": {
    id: "genai-4",
    stageId: "genai",
    question: "What is the main advantage of using function calling with LLMs?",
    options: [
      "It makes the model smaller",
      "It allows the LLM to invoke external tools and APIs in a structured way",
      "It replaces the need for fine-tuning",
      "It increases the context window size"
    ],
    correctIndex: 1,
    explanation: "Function calling lets LLMs generate structured function invocations (with parameters) that applications can execute, connecting the model to external APIs, databases, and tools.",
    tags: ["function-calling", "tools", "api"]
  },
  "genai-5": {
    id: "genai-5",
    stageId: "genai",
    question: "What is the key difference between embeddings and one-hot vectors?",
    options: [
      "There is no difference",
      "Embeddings are dense and capture semantic similarity; one-hot vectors are sparse and orthogonal",
      "One-hot vectors are always smaller",
      "Embeddings are only used for images"
    ],
    correctIndex: 1,
    explanation: "Embeddings map items to dense, low-dimensional vectors where similar items are close together. One-hot vectors are high-dimensional, sparse, and treat all items as equally dissimilar.",
    tags: ["embeddings", "representations", "vector-space"]
  },
  "genai-6": {
    id: "genai-6",
    stageId: "genai",
    question: "What is a hallucination in the context of LLMs?",
    options: [
      "The model running out of memory",
      "The model generating plausible-sounding but factually incorrect or fabricated information",
      "The model refusing to answer a question",
      "The model outputting repetitive text"
    ],
    correctIndex: 1,
    explanation: "Hallucinations occur when LLMs generate text that sounds convincing but contains fabricated facts, incorrect reasoning, or references to non-existent sources.",
    tags: ["hallucination", "reliability", "quality"]
  },
  "genai-7": {
    id: "genai-7",
    stageId: "genai",
    question: "What is the purpose of a system prompt?",
    options: [
      "To initialize the database",
      "To set the model's behavior, role, and constraints for the conversation",
      "To store conversation history",
      "To configure the API key"
    ],
    correctIndex: 1,
    explanation: "A system prompt establishes the AI's persona, behavior guidelines, and boundaries, providing persistent instructions that shape all subsequent responses in a conversation.",
    tags: ["prompting", "system-prompt", "behavior"]
  },
  "genai-8": {
    id: "genai-8",
    stageId: "genai",
    question: "What does 'chunking' mean in a RAG pipeline?",
    options: [
      "Breaking the model into smaller parts",
      "Splitting long documents into smaller, manageable text segments for embedding and retrieval",
      "Deleting irrelevant data",
      "Compressing the output text"
    ],
    correctIndex: 1,
    explanation: "Chunking divides documents into smaller segments (e.g., by paragraph or fixed token count) so that embeddings capture focused semantic content and retrieval is more precise.",
    tags: ["rag", "chunking", "preprocessing"]
  },
  "genai-9": {
    id: "genai-9",
    stageId: "genai",
    question: "What is semantic search vs. keyword search?",
    options: [
      "They are the same thing",
      "Semantic search understands meaning and context; keyword search matches exact words",
      "Semantic search is always faster",
      "Keyword search uses embeddings; semantic search does not"
    ],
    correctIndex: 1,
    explanation: "Semantic search uses embeddings to find content with similar meaning, even if different words are used. Keyword search only matches exact or partial word overlaps.",
    tags: ["semantic-search", "embeddings", "retrieval"]
  },
  "genai-10": {
    id: "genai-10",
    stageId: "genai",
    question: "What is few-shot prompting?",
    options: [
      "Using very short prompts",
      "Providing a few examples in the prompt to guide the model's output format and behavior",
      "Fine-tuning with only 5 data points",
      "Reducing the context window to 5 tokens"
    ],
    correctIndex: 1,
    explanation: "Few-shot prompting includes a small number of input-output examples in the prompt, demonstrating the desired behavior so the model can generalize from those examples.",
    tags: ["prompting", "few-shot", "in-context-learning"]
  },

  // ──────────────────────────────────────────────
  // Stage 11: AI Agents
  // ──────────────────────────────────────────────
  "agents-1": {
    id: "agents-1",
    stageId: "agents",
    question: "What is the ReAct pattern?",
    options: [
      "A type of neural network architecture",
      "A reasoning and acting loop where an LLM thinks, takes actions, and observes results",
      "A method for training robots",
      "A deployment strategy for AI models"
    ],
    correctIndex: 1,
    explanation: "ReAct (Reasoning + Acting) alternates between the LLM reasoning about what to do, taking actions (like calling tools), and observing results to inform the next step.",
    tags: ["react", "agent-pattern", "reasoning"]
  },
  "agents-2": {
    id: "agents-2",
    stageId: "agents",
    question: "What does MCP stand for?",
    options: [
      "Model Compute Protocol",
      "Model Context Protocol",
      "Multi-Core Processing",
      "Machine Communication Pipeline"
    ],
    correctIndex: 1,
    explanation: "Model Context Protocol (MCP) is a standardized protocol that allows AI agents to connect to external tools, data sources, and services through a consistent interface.",
    tags: ["mcp", "protocol", "tools"]
  },
  "agents-3": {
    id: "agents-3",
    stageId: "agents",
    question: "What is an AI agent's tool use?",
    options: [
      "The model's ability to write code",
      "The ability to call external functions, APIs, or services to accomplish tasks",
      "The model's training process",
      "The hardware used to run the model"
    ],
    correctIndex: 1,
    explanation: "Tool use allows an AI agent to invoke external capabilities — like search engines, databases, calculators, or APIs — extending what it can do beyond just generating text.",
    tags: ["tool-use", "agent", "api"]
  },
  "agents-4": {
    id: "agents-4",
    stageId: "agents",
    question: "What is the purpose of a planning step in an AI agent?",
    options: [
      "To save money on API calls",
      "To break down complex tasks into manageable sub-tasks before execution",
      "To select the best model",
      "To clean the input data"
    ],
    correctIndex: 1,
    explanation: "Planning allows an agent to decompose complex goals into a sequence of actionable steps, improving task completion by maintaining a clear strategy.",
    tags: ["planning", "agent", "task-decomposition"]
  },
  "agents-5": {
    id: "agents-5",
    stageId: "agents",
    question: "What is memory in an AI agent system?",
    options: [
      "RAM on the server",
      "A mechanism for agents to store and retrieve information across interactions or steps",
      "The model's parameters",
      "The training dataset"
    ],
    correctIndex: 1,
    explanation: "Agent memory systems allow the agent to retain context, past decisions, and learned information — either short-term (within a session) or long-term (across sessions).",
    tags: ["memory", "agent", "context"]
  },
  "agents-6": {
    id: "agents-6",
    stageId: "agents",
    question: "What is an agent loop?",
    options: [
      "A loop in the code that trains the model",
      "The iterative cycle of observe → think → act → observe that an agent repeats until the task is done",
      "A type of data structure",
      "A security vulnerability"
    ],
    correctIndex: 1,
    explanation: "An agent loop is the core execution cycle where the agent observes the environment, reasons about the next step, takes an action, and observes the result — repeating until the goal is achieved.",
    tags: ["agent-loop", "architecture", "execution"]
  },
  "agents-7": {
    id: "agents-7",
    stageId: "agents",
    question: "What is a multi-agent system?",
    options: [
      "A model with multiple layers",
      "A system where multiple specialized AI agents collaborate to solve complex tasks",
      "Using multiple GPUs for training",
      "Running multiple instances of the same agent"
    ],
    correctIndex: 1,
    explanation: "Multi-agent systems involve several AI agents, each with specialized roles or capabilities, working together — delegating tasks, sharing information, and coordinating to achieve a goal.",
    tags: ["multi-agent", "collaboration", "architecture"]
  },
  "agents-8": {
    id: "agents-8",
    stageId: "agents",
    question: "What is an MCP server?",
    options: [
      "A cloud hosting service",
      "A process that exposes tools, resources, and prompts via the Model Context Protocol",
      "A database for storing model weights",
      "A web server for the agent's user interface"
    ],
    correctIndex: 1,
    explanation: "An MCP server implements the Model Context Protocol, exposing specific tools and resources that AI agents can discover and interact with through standardized requests.",
    tags: ["mcp", "server", "tools"]
  },
  "agents-9": {
    id: "agents-9",
    stageId: "agents",
    question: "What is the difference between a chatbot and an AI agent?",
    options: [
      "There is no difference",
      "A chatbot responds to messages; an agent can reason, plan, and take autonomous actions to achieve goals",
      "Agents cannot use language models",
      "Chatbots are always more capable"
    ],
    correctIndex: 1,
    explanation: "While chatbots primarily generate conversational responses, AI agents can autonomously plan, use tools, access external systems, and take multi-step actions to accomplish complex tasks.",
    tags: ["agents", "chatbot", "autonomy"]
  },
  "agents-10": {
    id: "agents-10",
    stageId: "agents",
    question: "What is reflection in AI agents?",
    options: [
      "The model repeating its own output",
      "An agent evaluating its own reasoning or outputs to identify errors and improve",
      "Adding mirror neurons to a neural network",
      "A type of data augmentation"
    ],
    correctIndex: 1,
    explanation: "Reflection allows an agent to critically evaluate its previous steps or outputs, identify mistakes, and self-correct — improving the quality of its reasoning over time.",
    tags: ["reflection", "self-correction", "agent"]
  },

  // ──────────────────────────────────────────────
  // Stage 12: GenAI Apps
  // ──────────────────────────────────────────────
  "genai-apps-1": {
    id: "genai-apps-1",
    stageId: "genai-apps",
    question: "What protocol enables streaming responses from an LLM to a client?",
    options: [
      "FTP",
      "Server-Sent Events (SSE)",
      "SMTP",
      "WebSocket is the only option"
    ],
    correctIndex: 1,
    explanation: "Server-Sent Events (SSE) allow the server to push data to the client incrementally over a single HTTP connection, enabling real-time streaming of LLM responses.",
    tags: ["streaming", "sse", "real-time"]
  },
  "genai-apps-2": {
    id: "genai-apps-2",
    stageId: "genai-apps",
    question: "What is multimodal AI?",
    options: [
      "AI that runs on multiple servers",
      "AI that processes and understands multiple data types (text, images, audio, video)",
      "AI with multiple output layers",
      "AI that uses multiple programming languages"
    ],
    correctIndex: 1,
    explanation: "Multimodal AI can process and integrate information from different modalities — such as text, images, audio, and video — to provide richer understanding and generation.",
    tags: ["multimodal", "architecture", "capabilities"]
  },
  "genai-apps-3": {
    id: "genai-apps-3",
    stageId: "genai-apps",
    question: "What is the purpose of conversation history in a chat application?",
    options: [
      "To use up the context window faster",
      "To maintain context and continuity so the AI can reference previous messages",
      "To reduce API costs",
      "To increase the model's accuracy permanently"
    ],
    correctIndex: 1,
    explanation: "Conversation history provides the LLM with context about previous exchanges, enabling coherent multi-turn conversations where the model can reference earlier topics and decisions.",
    tags: ["conversation", "context", "chat"]
  },
  "genai-apps-4": {
    id: "genai-apps-4",
    stageId: "genai-apps",
    question: "What is token streaming in a GenAI application?",
    options: [
      "Sending the complete response all at once",
      "Sending generated tokens one at a time as they are produced, for a better user experience",
      "Downloading the model in parts",
      "Compressing tokens for storage"
    ],
    correctIndex: 1,
    explanation: "Token streaming sends each generated token to the client as soon as it's ready, reducing perceived latency and creating a more natural typing-like experience.",
    tags: ["streaming", "user-experience", "performance"]
  },
  "genai-apps-5": {
    id: "genai-apps-5",
    stageId: "genai-apps",
    question: "What is the role of a web framework (like Next.js) in a GenAI app?",
    options: [
      "To train the AI model",
      "To serve the frontend UI and handle API routes for backend communication with the LLM",
      "To replace the need for a database",
      "To compile the model into executable code"
    ],
    correctIndex: 1,
    explanation: "Web frameworks like Next.js provide the infrastructure for both the frontend (chat interface, displays) and backend (API routes that call LLMs, manage data) of GenAI applications.",
    tags: ["web-framework", "architecture", "full-stack"]
  },
  "genai-apps-6": {
    id: "genai-apps-6",
    stageId: "genai-apps",
    question: "What is a chat completion API?",
    options: [
      "A spell-checking API",
      "An API that takes a conversation history and generates the next assistant response",
      "An API that translates chat messages",
      "An API that stores chat logs"
    ],
    correctIndex: 1,
    explanation: "Chat completion APIs accept an array of messages (system, user, assistant roles) and return the model's generated response, forming the core interface for most LLM applications.",
    tags: ["api", "chat-completion", "openai"]
  },
  "genai-apps-7": {
    id: "genai-apps-7",
    stageId: "genai-apps",
    question: "What is structured output from an LLM?",
    options: [
      "Output formatted in Markdown",
      "Output returned in a specific schema (like JSON) that can be reliably parsed by code",
      "Output with proper grammar",
      "Output that is always the same length"
    ],
    correctIndex: 1,
    explanation: "Structured output constrains the LLM to generate responses in a predefined format (e.g., JSON matching a schema), making it easier for applications to process and use the output.",
    tags: ["structured-output", "json", "reliability"]
  },
  "genai-apps-8": {
    id: "genai-apps-8",
    stageId: "genai-apps",
    question: "What does the `stream: true` option do in an LLM API call?",
    options: [
      "Enables the model to process multiple inputs at once",
      "Returns the response incrementally as tokens are generated, rather than waiting for the full response",
      "Saves the response to a stream file",
      "Enables two-way audio streaming"
    ],
    correctIndex: 1,
    explanation: "Setting `stream: true` tells the API to return an iterator of server-sent events containing tokens as they are generated, enabling real-time display in the UI.",
    tags: ["streaming", "api", "real-time"]
  },
  "genai-apps-9": {
    id: "genai-apps-9",
    stageId: "genai-apps",
    question: "What is an image generation API endpoint?",
    options: [
      "An endpoint that retrieves existing images from a database",
      "An endpoint that takes a text prompt and returns a newly generated image using a diffusion model",
      "An endpoint that resizes uploaded images",
      "An endpoint that converts images to text"
    ],
    correctIndex: 1,
    explanation: "Image generation APIs accept text prompts and use models like DALL·E or Stable Diffusion to create new images, enabling GenAI apps to integrate visual content generation.",
    tags: ["image-generation", "api", "diffusion"]
  },
  "genai-apps-10": {
    id: "genai-apps-10",
    stageId: "genai-apps",
    question: "What is an AI SDK?",
    options: [
      "A hardware kit for running AI",
      "A software library that simplifies integrating LLMs into applications with helper functions",
      "A model training platform",
      "A type of neural network"
    ],
    correctIndex: 1,
    explanation: "AI SDKs (like Vercel AI SDK, LangChain) provide abstractions and utilities that simplify common tasks like calling LLMs, managing prompts, handling streaming, and building AI-powered features.",
    tags: ["sdk", "developer-tools", "integration"]
  },

  // ──────────────────────────────────────────────
  // Stage 13: AI Engineering
  // ──────────────────────────────────────────────
  "ai-eng-1": {
    id: "ai-eng-1",
    stageId: "ai-eng",
    question: "What is prompt injection?",
    options: [
      "Adding a prompt to the system message",
      "A malicious input that hijacks or overrides the LLM's intended behavior or instructions",
      "A technique to speed up prompt processing",
      "Injecting prompts into training data"
    ],
    correctIndex: 1,
    explanation: "Prompt injection is an attack where malicious user inputs are crafted to override system instructions, causing the LLM to behave unexpectedly or reveal sensitive information.",
    tags: ["security", "prompt-injection", "vulnerabilities"]
  },
  "ai-eng-2": {
    id: "ai-eng-2",
    stageId: "ai-eng",
    question: "What does LLM-as-a-judge do?",
    options: [
      "Replaces all human evaluators permanently",
      "Uses a powerful LLM to automatically evaluate and score the outputs of another model or system",
      "Judges the quality of training data",
      "Determines the best model architecture"
    ],
    correctIndex: 1,
    explanation: "LLM-as-a-judge leverages a capable LLM to assess outputs against criteria like accuracy, helpfulness, and safety — providing scalable automated evaluation without human review.",
    tags: ["evaluation", "llm-judge", "quality"]
  },
  "ai-eng-3": {
    id: "ai-eng-3",
    stageId: "ai-eng",
    question: "What is observability in AI systems?",
    options: [
      "The ability to see the model's source code",
      "Monitoring, logging, and tracing AI system behavior to understand and debug issues in production",
      "Making the AI model transparent to end users",
      "Documenting the training process"
    ],
    correctIndex: 1,
    explanation: "Observability involves collecting metrics, logs, and traces from AI systems in production to monitor performance, detect anomalies, debug failures, and understand system behavior.",
    tags: ["observability", "monitoring", "logging"]
  },
  "ai-eng-4": {
    id: "ai-eng-4",
    stageId: "ai-eng",
    question: "What is prompt versioning?",
    options: [
      "Changing the model version",
      "Tracking and managing different versions of prompts to compare performance and enable rollback",
      "Numbering prompts in a list",
      "Automatically updating prompts"
    ],
    correctIndex: 1,
    explanation: "Prompt versioning lets teams track changes to prompts over time, compare results between versions, and revert to previous versions if a new prompt performs worse.",
    tags: ["prompt-management", "versioning", "devops"]
  },
  "ai-eng-5": {
    id: "ai-eng-5",
    stageId: "ai-eng",
    question: "What is the purpose of rate limiting in an AI application?",
    options: [
      "To make the model faster",
      "To restrict the number of API requests a user can make in a given time period",
      "To limit the number of training epochs",
      "To reduce the model's memory usage"
    ],
    correctIndex: 1,
    explanation: "Rate limiting protects API endpoints from abuse and overload by capping the number of requests per user or IP address within a defined time window.",
    tags: ["rate-limiting", "api", "security"]
  },
  "ai-eng-6": {
    id: "ai-eng-6",
    stageId: "ai-eng",
    question: "What is a model fallback strategy?",
    options: [
      "Always using the cheapest model",
      "A plan to switch to an alternative model or approach when the primary model fails or is unavailable",
      "Ignoring failed API calls",
      "Retrying the same request indefinitely"
    ],
    correctIndex: 1,
    explanation: "Fallback strategies ensure reliability by switching to backup models, using cached responses, or applying simpler heuristic methods when the primary LLM service is down or errors occur.",
    tags: ["reliability", "fallback", "resilience"]
  },
  "ai-eng-7": {
    id: "ai-eng-7",
    stageId: "ai-eng",
    question: "What is A/B testing in the context of AI applications?",
    options: [
      "Testing two different AI models simultaneously on different user groups to compare performance",
      "Running the same test twice",
      "Testing in development and production environments",
      "Comparing model sizes"
    ],
    correctIndex: 0,
    explanation: "A/B testing splits users into groups to test different versions of a system (different models, prompts, or configurations) and measures which performs better on real user interactions.",
    tags: ["ab-testing", "evaluation", "experimentation"]
  },
  "ai-eng-8": {
    id: "ai-eng-8",
    stageId: "ai-eng",
    question: "What is PII (Personally Identifiable Information) handling in AI apps?",
    options: [
      "Storing all user data without restrictions",
      "Processes to detect, redact, or protect sensitive personal data before it reaches the LLM",
      "Encrypting the model weights",
      "Using PII as training data"
    ],
    correctIndex: 1,
    explanation: "PII handling involves identifying and protecting sensitive data like names, emails, and phone numbers — redacting them before sending to external LLM APIs to protect user privacy.",
    tags: ["privacy", "pii", "security"]
  },
  "ai-eng-9": {
    id: "ai-eng-9",
    stageId: "ai-eng",
    question: "What is an evaluation dataset?",
    options: [
      "The training data used to teach the model",
      "A carefully curated set of test cases used to measure the performance and quality of an AI system",
      "A dataset used for data augmentation",
      "The production database"
    ],
    correctIndex: 1,
    explanation: "An evaluation dataset contains representative examples with known correct answers, used to systematically measure how well an AI system performs across different scenarios and edge cases.",
    tags: ["evaluation", "datasets", "testing"]
  },
  "ai-eng-10": {
    id: "ai-eng-10",
    stageId: "ai-eng",
    question: "What is cost optimization in LLM API usage?",
    options: [
      "Always choosing the most expensive model",
      "Strategies to reduce API costs while maintaining quality (e.g., caching, prompt optimization, model selection)",
      "Reducing the number of users",
      "Using only free-tier APIs"
    ],
    correctIndex: 1,
    explanation: "Cost optimization involves techniques like caching frequent queries, using smaller models for simple tasks, optimizing prompts to reduce token count, and batching requests to minimize API expenses.",
    tags: ["cost-optimization", "efficiency", "api"]
  },

  // ──────────────────────────────────────────────
  // Stage 14: Production AI
  // ──────────────────────────────────────────────
  "production-1": {
    id: "production-1",
    stageId: "production",
    question: "What is a Docker container?",
    options: [
      "A virtual machine with a full operating system",
      "An isolated, lightweight environment that packages an application with its dependencies",
      "A type of database",
      "A CI/CD pipeline tool"
    ],
    correctIndex: 1,
    explanation: "A Docker container packages an application with its libraries and dependencies into a standardized unit that runs consistently across any environment that supports Docker.",
    tags: ["docker", "containers", "deployment"]
  },
  "production-2": {
    id: "production-2",
    stageId: "production",
    question: "What does CI/CD stand for?",
    options: [
      "Code Integration / Code Deployment",
      "Continuous Integration / Continuous Deployment",
      "Central Interface / Central Database",
      "Cloud Infrastructure / Cloud Delivery"
    ],
    correctIndex: 1,
    explanation: "CI/CD automates the software delivery process: Continuous Integration merges code changes frequently with automated testing, and Continuous Deployment automatically releases validated changes.",
    tags: ["ci-cd", "automation", "deployment"]
  },
  "production-3": {
    id: "production-3",
    stageId: "production",
    question: "What is the purpose of a health check endpoint in a deployed AI service?",
    options: [
      "To train the model",
      "To allow load balancers and orchestrators to verify the service is running and responsive",
      "To display metrics on a dashboard",
      "To serve the model's predictions"
    ],
    correctIndex: 1,
    explanation: "Health check endpoints return the service status, enabling orchestration tools like Kubernetes to detect unhealthy instances, restart them, and route traffic away from failing pods.",
    tags: ["health-check", "deployment", "monitoring"]
  },
  "production-4": {
    id: "production-4",
    stageId: "production",
    question: "What is horizontal scaling?",
    options: [
      "Making a single server more powerful",
      "Adding more servers/instances to distribute the workload",
      "Increasing the CPU of existing machines",
      "Upgrading the RAM of one server"
    ],
    correctIndex: 1,
    explanation: "Horizontal scaling (scaling out) adds more machines to distribute traffic, improving reliability and capacity. It's generally preferred over vertical scaling for AI services.",
    tags: ["scaling", "infrastructure", "architecture"]
  },
  "production-5": {
    id: "production-5",
    stageId: "production",
    question: "What is a load balancer?",
    options: [
      "A tool that balances the model's weights",
      "A system that distributes incoming traffic across multiple server instances",
      "A data preprocessing tool",
      "A model optimization technique"
    ],
    correctIndex: 1,
    explanation: "A load balancer distributes incoming requests across multiple backend servers, preventing any single instance from being overwhelmed and improving availability and responsiveness.",
    tags: ["load-balancing", "infrastructure", "scalability"]
  },
  "production-6": {
    id: "production-6",
    stageId: "production",
    question: "What is the purpose of logging in a production AI system?",
    options: [
      "To train the model on new data",
      "To record events, errors, and metrics for debugging, auditing, and monitoring",
      "To encrypt the API responses",
      "To cache frequent queries"
    ],
    correctIndex: 1,
    explanation: "Logging captures detailed records of system events, errors, and performance metrics, making it possible to debug issues, track usage patterns, and maintain compliance.",
    tags: ["logging", "observability", "debugging"]
  },
  "production-7": {
    id: "production-7",
    stageId: "production",
    question: "What is a blue-green deployment?",
    options: [
      "Deploying to two different cloud providers",
      "Maintaining two identical environments, routing traffic to the new version with zero downtime",
      "Deploying twice a day",
      "Using two different programming languages"
    ],
    correctIndex: 1,
    explanation: "Blue-green deployment keeps two production environments: the current 'blue' and the new 'green.' Traffic is switched to green once it's validated, enabling instant rollback if needed.",
    tags: ["deployment", "zero-downtime", "strategy"]
  },
  "production-8": {
    id: "production-8",
    stageId: "production",
    question: "What is model versioning in production?",
    options: [
      "Changing the model's hyperparameters randomly",
      "Tracking and managing different versions of deployed models for comparison and rollback",
      "Upgrading the model's framework",
      "Renaming the model files"
    ],
    correctIndex: 1,
    explanation: "Model versioning tracks each deployed model variant with metadata (performance, training data, configuration), enabling teams to compare versions, run A/B tests, and roll back to previous versions.",
    tags: ["model-versioning", "deployment", "mlops"]
  },
  "production-9": {
    id: "production-9",
    stageId: "production",
    question: "What is a circuit breaker pattern in an AI application?",
    options: [
      "A pattern that breaks the code into small functions",
      "A pattern that stops calling a failing service to prevent cascading failures and allows it to recover",
      "A method to shut down the entire application",
      "A type of neural network architecture"
    ],
    correctIndex: 1,
    explanation: "The circuit breaker pattern monitors for failures in an external service (like an LLM API). When failures exceed a threshold, it 'opens the circuit' and stops requests, preventing cascading failures.",
    tags: ["circuit-breaker", "resilience", "patterns"]
  },
  "production-10": {
    id: "production-10",
    stageId: "production",
    question: "What does a rollback do in production?",
    options: [
      "Deletes the current deployment",
      "Reverts the application to a previous known-good version when issues are detected",
      "Restarts all servers",
      "Removes the database"
    ],
    correctIndex: 1,
    explanation: "A rollback reverts a deployment to its previous working state, quickly recovering from a faulty release without requiring a full fix to be developed and deployed first.",
    tags: ["rollback", "deployment", "recovery"]
  }
};
