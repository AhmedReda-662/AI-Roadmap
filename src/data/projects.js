export const projects = {
  // ═══════════════════════════════════════════════════════════
  // Stage 1: Programming Foundations
  // ═══════════════════════════════════════════════════════════
  "python-data-processing-cli": {
    id: "python-data-processing-cli",
    stageId: "programming",
    title: "Python Data Processing CLI",
    difficulty: 2,
    skills: ["Python", "File I/O", "CLI"],
    description:
      "Build a command-line tool that reads CSV or JSON files, cleans the data (remove duplicates, fix formatting), and outputs a summary report with statistics like row counts, column types, and basic aggregations.",
    requirements: [
      "Accept file path and optional flags (e.g. --format, --output) via argparse",
      "Support both CSV and JSON input formats",
      "Remove duplicate rows and handle missing values gracefully",
      "Print a summary report including column names, data types, and basic statistics",
      "Write cleaned output to a new file when --output is specified",
    ],
    hint: "Start by using the `csv` and `json` modules to read files, then build up your processing pipeline step by step.",
  },

  "web-scraper": {
    id: "web-scraper",
    stageId: "programming",
    title: "Web Scraper",
    difficulty: 2,
    skills: ["Python", "Requests", "BeautifulSoup"],
    description:
      "Create a web scraper that extracts structured data from a public website such as a news site or job board. The tool should handle pagination, save results to CSV, and respect basic rate limiting.",
    requirements: [
      "Fetch HTML pages using the Requests library with proper headers",
      "Parse and extract specific data elements using BeautifulSoup selectors",
      "Handle multiple pages through pagination (next page links or numbered pages)",
      "Save extracted data to a well-formatted CSV file",
      "Implement a delay between requests to avoid overwhelming the server",
    ],
    hint: "Use your browser's developer tools to inspect the HTML structure and identify the CSS selectors for the data you want to extract.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 2: Mathematics for AI
  // ═══════════════════════════════════════════════════════════
  "vector-calculator": {
    id: "vector-calculator",
    stageId: "math",
    title: "Vector Calculator",
    difficulty: 2,
    skills: ["Python", "NumPy", "Visualization"],
    description:
      "Build an interactive vector calculator that performs common vector operations including addition, subtraction, dot product, cross product, and magnitude. Visualize vectors in 2D and 3D using Matplotlib.",
    requirements: [
      "Implement vector addition, subtraction, dot product, and cross product using NumPy",
      "Calculate magnitude, unit vectors, and angle between vectors",
      "Visualize vectors as arrows in 2D and 3D using Matplotlib",
      "Accept user input interactively or accept command-line arguments",
      "Display computation results alongside the vector visualization",
    ],
    hint: "NumPy arrays make vector math effortless — focus on wrapping each operation in a clear function, then build the visualization on top.",
  },

  "matrix-calculator": {
    id: "matrix-calculator",
    stageId: "math",
    title: "Matrix Calculator",
    difficulty: 2,
    skills: ["Python", "NumPy"],
    description:
      "Create a matrix calculator that supports fundamental linear algebra operations such as matrix multiplication, transposition, determinant calculation, and finding inverses. Include input validation for compatible dimensions.",
    requirements: [
      "Support matrix creation from user input, file, or random generation",
      "Implement multiplication, transpose, determinant, and inverse operations",
      "Validate matrix dimensions before operations and show clear error messages",
      "Display results in a readable formatted matrix layout",
      "Include an option to save results to a text file",
    ],
    hint: "Leverage NumPy's built-in `linalg` module for complex operations, but implement the logic yourself for learning exercises.",
  },

  "probability-simulator": {
    id: "probability-simulator",
    stageId: "math",
    title: "Probability Simulator",
    difficulty: 3,
    skills: ["Python", "Statistics"],
    description:
      "Build a probability simulator that demonstrates key concepts through Monte Carlo simulations. Simulate coin flips, dice rolls, card draws, and the Central Limit Theorem, then visualize the results with histograms.",
    requirements: [
      "Simulate at least 3 different probability scenarios (coin, dice, cards)",
      "Run Monte Carlo simulations with configurable number of trials",
      "Compare simulated results against theoretical expected values",
      "Generate histograms showing distribution convergence as trials increase",
      "Calculate and display mean, variance, and standard deviation of results",
    ],
    hint: "Start with simple simulations using random module, then layer on statistical analysis and visualization to tell the story of your results.",
  },

  "gradient-descent-visualizer": {
    id: "gradient-descent-visualizer",
    stageId: "math",
    title: "Gradient Descent Visualizer",
    difficulty: 3,
    skills: ["Python", "Matplotlib", "Calculus"],
    description:
      "Visualize the gradient descent optimization algorithm on simple 2D and 3D functions. Show how different learning rates and starting points affect convergence toward the minimum.",
    requirements: [
      "Implement gradient descent from scratch using numpy (no ML libraries)",
      "Visualize the optimization path on a 2D contour plot for a simple function",
      "Extend to 3D surface plots showing descent on a function like Rosenbrock",
      "Allow user to adjust learning rate and number of iterations",
      "Animate or step through the descent to show convergence over time",
    ],
    hint: "Compute the derivative of your test function analytically or numerically, then use a simple update rule: x_new = x - learning_rate * gradient.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 3: Data & Scientific Python
  // ═══════════════════════════════════════════════════════════
  "titanic-dataset-analysis": {
    id: "titanic-dataset-analysis",
    stageId: "data",
    title: "Titanic Dataset Analysis",
    difficulty: 2,
    skills: ["Pandas", "Matplotlib", "Data Analysis"],
    description:
      "Analyze the classic Titanic dataset to explore survival patterns. Perform data cleaning, compute survival rates by various demographics, and create informative visualizations to tell the story of who survived.",
    requirements: [
      "Load and inspect the dataset for missing values and data types",
      "Clean the data by handling missing ages, dropping irrelevant columns, and encoding categoricals",
      "Compute survival rates grouped by gender, class, and age group",
      "Create at least 4 visualizations: bar chart, histogram, pie chart, and correlation heatmap",
      "Write a summary of the top 3 insights discovered from the analysis",
    ],
    hint: "Use `pandas.crosstab()` to quickly compute survival rates by category, and `seaborn.countplot()` for clean categorical visualizations.",
  },

  "netflix-dataset-analysis": {
    id: "netflix-dataset-analysis",
    stageId: "data",
    title: "Netflix Dataset Analysis",
    difficulty: 3,
    skills: ["Pandas", "Seaborn", "Visualization"],
    description:
      "Explore a Netflix titles dataset to uncover trends in content production, genre popularity, and regional distribution over time. Build a comprehensive visual report with multiple chart types.",
    requirements: [
      "Parse and clean multi-valued fields like cast, director, and listed_in genres",
      "Analyze content release trends by year and month",
      "Explore genre popularity and co-occurrence patterns",
      "Create a geographic distribution of content using country data",
      "Build a multi-panel dashboard combining at least 5 different chart types",
    ],
    hint: "Use `str.split()` and `explode()` to flatten multi-valued columns so you can count individual genres and countries.",
  },

  "sales-analytics-dashboard": {
    id: "sales-analytics-dashboard",
    stageId: "data",
    title: "Sales Analytics Dashboard",
    difficulty: 3,
    skills: ["Pandas", "Matplotlib", "Dashboard"],
    description:
      "Create a comprehensive sales analytics dashboard from a dataset of transactions. Compute KPIs like total revenue, average order value, and growth rates, then present them in a multi-panel Matplotlib dashboard.",
    requirements: [
      "Compute key metrics: total revenue, average order value, monthly growth rate",
      "Perform time-series analysis showing revenue and order trends over time",
      "Identify top products and customer segments by revenue",
      "Build a 2x2 or 3x3 panel dashboard with complementary visualizations",
      "Add annotations and titles so the dashboard is self-explanatory",
    ],
    hint: "Use `pandas.Grouper` with a time frequency like 'M' for monthly aggregation, and `matplotlib.gridspec` for flexible dashboard layouts.",
  },

  "data-cleaning-pipeline": {
    id: "data-cleaning-pipeline",
    stageId: "data",
    title: "Data Cleaning Pipeline",
    difficulty: 3,
    skills: ["Pandas", "Data Preprocessing"],
    description:
      "Build a reusable data cleaning pipeline that takes a raw, messy CSV dataset and transforms it into analysis-ready data. Handle missing values, duplicates, type conversions, and outliers systematically.",
    requirements: [
      "Detect and report all data quality issues on input (missing values, duplicates, wrong types)",
      "Implement configurable strategies for handling missing data (drop, mean, median, mode, forward fill)",
      "Detect and optionally remove statistical outliers using IQR or Z-score methods",
      "Validate cleaned data against a schema (expected columns, types, value ranges)",
      "Log all transformations applied so the pipeline is auditable and reproducible",
    ],
    hint: "Structure your pipeline as a series of independent step functions that can be chained together, making it easy to add, remove, or reorder steps.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 4: Machine Learning
  // ═══════════════════════════════════════════════════════════
  "house-price-prediction": {
    id: "house-price-prediction",
    stageId: "ml",
    title: "House Price Prediction",
    difficulty: 2,
    skills: ["Scikit-learn", "Regression", "Pandas"],
    description:
      "Build a regression model to predict house prices based on features like square footage, number of bedrooms, location, and age. Compare multiple regression algorithms and evaluate their performance.",
    requirements: [
      "Load and explore the dataset to understand feature distributions and correlations",
      "Perform feature engineering: encode categoricals, scale numerics, create new features",
      "Train at least 3 regression models (Linear, Ridge, Random Forest) and compare",
      "Evaluate using RMSE, MAE, and R² score with train/test split and cross-validation",
      "Visualize feature importance and actual vs predicted price scatter plot",
    ],
    hint: "Use `sklearn.pipeline.Pipeline` to chain preprocessing and model training together so your workflow is clean and reproducible.",
  },

  "spam-classifier": {
    id: "spam-classifier",
    stageId: "ml",
    title: "Spam Classifier",
    difficulty: 3,
    skills: ["Scikit-learn", "Classification", "NLP"],
    description:
      "Build a text classification model that distinguishes spam from ham (legitimate) messages. Use TF-IDF features and compare Naive Bayes, Logistic Regression, and SVM classifiers on a real SMS dataset.",
    requirements: [
      "Load and explore a text classification dataset (e.g., SMS Spam Collection)",
      "Preprocess text: lowercase, remove punctuation, optional stopword removal",
      "Convert text to TF-IDF features using `TfidfVectorizer`",
      "Train and evaluate at least 3 classifiers with precision, recall, F1, and confusion matrix",
      "Test the classifier on custom input sentences to verify real-world usability",
    ],
    hint: "TF-IDF naturally handles most text preprocessing needs — focus on comparing classifiers rather than over-engineering feature engineering.",
  },

  "customer-churn-prediction": {
    id: "customer-churn-prediction",
    stageId: "ml",
    title: "Customer Churn Prediction",
    difficulty: 3,
    skills: ["Scikit-learn", "Classification", "EDA"],
    description:
      "Predict whether a customer will churn based on usage patterns, demographics, and account information. Perform thorough exploratory analysis, handle class imbalance, and build a well-calibrated classifier.",
    requirements: [
      "Perform EDA to identify key factors correlated with churn",
      "Handle class imbalance using techniques like SMOTE or class weights",
      "Engineer features from raw data (e.g., usage ratios, tenure buckets)",
      "Train a classifier and tune hyperparameters using GridSearchCV",
      "Evaluate with AUC-ROC, precision-recall curve, and provide actionable business insights",
    ],
    hint: "Imbalanced datasets need more than accuracy — focus on precision, recall, and AUC-ROC to get a meaningful picture of model performance.",
  },

  "customer-segmentation": {
    id: "customer-segmentation",
    stageId: "ml",
    title: "Customer Segmentation",
    difficulty: 3,
    skills: ["Scikit-learn", "Clustering", "K-Means"],
    description:
      "Segment customers into distinct groups based on purchasing behavior using unsupervised learning. Apply K-Means clustering, determine optimal cluster count, and profile each segment with distinct characteristics.",
    requirements: [
      "Load and normalize customer purchase data for clustering",
      "Apply the elbow method and silhouette score to find the optimal number of clusters",
      "Run K-Means clustering and assign customers to segments",
      "Profile each segment with average values of key features",
      "Visualize clusters in 2D using PCA or t-SNE dimensionality reduction",
    ],
    hint: "Always standardize your features before clustering, since K-Means is sensitive to feature scales — use `StandardScaler` for this.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 5: Deep Learning
  // ═══════════════════════════════════════════════════════════
  "mnist-digit-classifier": {
    id: "mnist-digit-classifier",
    stageId: "deeplearning",
    title: "MNIST Digit Classifier",
    difficulty: 2,
    skills: ["PyTorch", "Neural Networks"],
    description:
      "Build your first neural network to classify handwritten digits from the MNIST dataset. Implement a fully connected feedforward network in PyTorch, train it, and evaluate its accuracy on the test set.",
    requirements: [
      "Load MNIST using torchvision.datasets and create DataLoader objects",
      "Define a feedforward neural network with at least 2 hidden layers",
      "Implement a training loop with cross-entropy loss and an optimizer (Adam or SGD)",
      "Track and plot training and validation loss over epochs",
      "Achieve at least 95% test accuracy and display a confusion matrix",
    ],
    hint: "Start simple with 2 hidden layers of 128 neurons each — this architecture alone can achieve strong results on MNIST.",
  },

  "fashion-mnist-classifier": {
    id: "fashion-mnist-classifier",
    stageId: "deeplearning",
    title: "Fashion-MNIST Classifier",
    difficulty: 3,
    skills: ["PyTorch", "CNN"],
    description:
      "Build a convolutional neural network to classify fashion items from the Fashion-MNIST dataset. Progress from a simple CNN to a deeper architecture and compare how architectural choices affect accuracy.",
    requirements: [
      "Load Fashion-MNIST and apply appropriate data normalization and augmentation",
      "Build a baseline CNN with conv layers, pooling, and fully connected output",
      "Implement a deeper CNN variant (e.g., ResNet-style skip connections or more layers)",
      "Compare both models on accuracy, training time, and parameter count",
      "Visualize learned filters and predictions on misclassified samples",
    ],
    hint: "Start with a simple architecture of 2-3 conv blocks, then add depth only if you have a clear reason to — over-complicating hurts more than it helps.",
  },

  "cats-vs-dogs-classifier": {
    id: "cats-vs-dogs-classifier",
    stageId: "deeplearning",
    title: "Cats vs Dogs Classifier",
    difficulty: 3,
    skills: ["PyTorch", "CNN", "Transfer Learning"],
    description:
      "Build an image classifier that distinguishes cats from dogs. Start with a custom CNN, then apply transfer learning using a pretrained ResNet model and compare the results.",
    requirements: [
      "Prepare the dataset with proper train/validation/test splits and data augmentation",
      "Train a custom CNN from scratch as a baseline model",
      "Apply transfer learning using a pretrained ResNet18 with frozen then unfrozen layers",
      "Compare both approaches on accuracy, training speed, and data efficiency",
      "Build a simple inference function that takes an image path and returns a prediction with confidence",
    ],
    hint: "Transfer learning with a pretrained model often outperforms a custom CNN even with much less data — fine-tune the last few layers for best results.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 6: Computer Vision
  // ═══════════════════════════════════════════════════════════
  "image-classifier": {
    id: "image-classifier",
    stageId: "cv",
    title: "Image Classifier",
    difficulty: 3,
    skills: ["PyTorch", "CNN", "Transfer Learning"],
    description:
      "Build an image classifier using transfer learning on a custom dataset. Fine-tune a pretrained model (ResNet, EfficientNet) and deploy it as a simple web interface for uploading and classifying images.",
    requirements: [
      "Prepare a custom image dataset organized in class folders with proper train/val splits",
      "Use transfer learning with a pretrained model, freezing and unfreezing strategic layers",
      "Implement data augmentation pipeline for training robustness",
      "Achieve strong validation accuracy with proper evaluation metrics and confusion matrix",
      "Create a simple inference API or script that accepts an image and returns predicted class with confidence",
    ],
    hint: "Freeze all backbone layers first and train only the classifier head, then gradually unfreeze deeper layers for fine-tuning.",
  },

  "face-detection-app": {
    id: "face-detection-app",
    stageId: "cv",
    title: "Face Detection App",
    difficulty: 3,
    skills: ["OpenCV", "Face Detection"],
    description:
      "Build a face detection application that can identify and locate faces in images and webcam feeds. Compare Haar Cascade and DNN-based approaches, and add face landmark detection.",
    requirements: [
      "Detect faces in static images using OpenCV's Haar Cascade classifier",
      "Implement DNN-based face detection for improved accuracy on varied conditions",
      "Draw bounding boxes and labels around detected faces in real-time webcam feed",
      "Add basic face landmark detection for eyes, nose, and mouth positions",
      "Benchmark and compare detection speed and accuracy between approaches",
    ],
    hint: "OpenCV's `cv2.dnn` module with a Caffe or TensorFlow face detection model gives significantly better results than Haar Cascades for real-world images.",
  },

  "object-detector": {
    id: "object-detector",
    stageId: "cv",
    title: "Object Detector",
    difficulty: 4,
    skills: ["YOLO", "Object Detection"],
    description:
      "Implement a real-time object detection system using YOLO (You Only Look Once). Load a pretrained YOLO model, detect objects in images and video, and evaluate detection performance on a custom test set.",
    requirements: [
      "Load and run a pretrained YOLOv8 model using the Ultralytics library",
      "Detect and annotate objects in static images with bounding boxes and class labels",
      "Process video files frame-by-frame with consistent detection and annotation",
      "Implement non-maximum suppression to filter duplicate detections",
      "Evaluate detection quality on a test set using mAP and per-class accuracy metrics",
    ],
    hint: "The Ultralytics YOLOv8 library makes inference trivial — focus your effort on the evaluation pipeline and understanding the detection metrics.",
  },

  "realtime-webcam-detection": {
    id: "realtime-webcam-detection",
    stageId: "cv",
    title: "Real-time Webcam Detection",
    difficulty: 4,
    skills: ["OpenCV", "YOLO", "Real-time"],
    description:
      "Build a real-time object detection application using your webcam. Optimize the YOLO pipeline for low latency, add FPS measurement, and create a polished UI with detection overlays and controls.",
    requirements: [
      "Capture webcam frames using OpenCV and process them with YOLO in real-time",
      "Achieve at least 15 FPS processing speed with consistent detection quality",
      "Display FPS counter, detection count, and confidence scores on the video feed",
      "Add toggle controls for specific object classes and confidence threshold adjustment",
      "Save detected frames or clips to disk with annotated bounding boxes",
    ],
    hint: "Process frames asynchronously or skip every Nth frame to maintain smooth real-time performance — accuracy at high FPS matters more than perfect detection.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 7: NLP
  // ═══════════════════════════════════════════════════════════
  "sentiment-classifier": {
    id: "sentiment-classifier",
    stageId: "nlp",
    title: "Sentiment Classifier",
    difficulty: 3,
    skills: ["Scikit-learn", "NLP", "Text Classification"],
    description:
      "Build a sentiment analysis classifier that determines whether text expresses positive, negative, or neutral sentiment. Use classic ML techniques and compare different feature extraction approaches.",
    requirements: [
      "Load a sentiment dataset (e.g., movie reviews, product reviews) and explore class distribution",
      "Implement text preprocessing: tokenization, lowercasing, stopword removal, lemmatization",
      "Compare BoW vs TF-IDF features for sentiment classification",
      "Train and evaluate Logistic Regression, Naive Bayes, and SVM classifiers",
      "Build a prediction function that accepts raw text and outputs sentiment with confidence score",
    ],
    hint: "TF-IDF with n-grams (1,2) often captures sentiment better than bag-of-words since it preserves word order context.",
  },

  "text-classifier": {
    id: "text-classifier",
    stageId: "nlp",
    title: "Text Classifier",
    difficulty: 3,
    skills: ["Scikit-learn", "TF-IDF", "NLP"],
    description:
      "Build a general-purpose text classifier that categorizes documents into predefined topics. Compare multiple classification algorithms and feature extraction methods, then create an easy-to-use prediction interface.",
    requirements: [
      "Load a multi-class text dataset (e.g., news categories, product categories)",
      "Preprocess text data and extract features using TF-IDF with various n-gram ranges",
      "Train and compare at least 3 classifiers with cross-validation",
      "Analyze misclassified examples to identify common failure patterns",
      "Build a simple CLI interface for classifying new text input on the fly",
    ],
    hint: "Use `Pipeline` to chain vectorizer and classifier so you can easily swap components and avoid data leakage during cross-validation.",
  },

  "text-summarizer": {
    id: "text-summarizer",
    stageId: "nlp",
    title: "Text Summarizer",
    difficulty: 4,
    skills: ["Python", "NLP", "Summarization"],
    description:
      "Build a text summarization system that can generate both extractive and abstractive summaries. Compare rule-based extractive methods against transformer-based approaches and evaluate summary quality.",
    requirements: [
      "Implement extractive summarization using TF-IDF sentence scoring and ranking",
      "Use a pretrained Hugging Face model (e.g., BART or T5) for abstractive summarization",
      "Compare both approaches on the same documents measuring ROUGE scores",
      "Handle input documents of varying lengths, truncating or chunking as needed",
      "Create a simple interface that takes text input and returns both summary types side by side",
    ],
    hint: "Extractive summarization is great for learning — rank sentences by their TF-IDF relevance to the full document, then select the top-k.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 8: Transformers
  // ═══════════════════════════════════════════════════════════
  "attention-visualizer": {
    id: "attention-visualizer",
    stageId: "transformers",
    title: "Attention Visualizer",
    difficulty: 4,
    skills: ["Python", "Transformers", "Visualization"],
    description:
      "Build an interactive tool that visualizes self-attention weights from transformer models. Load a pretrained BERT or GPT model, extract attention matrices, and create heatmap visualizations showing which tokens attend to which.",
    requirements: [
      "Load a pretrained transformer model and tokenizer from Hugging Face",
      "Extract attention weight tensors from all layers and heads",
      "Create interactive heatmap visualizations showing attention patterns per head",
      "Allow users to input custom text and see attention patterns update in real time",
      "Compare attention patterns across different layers to show hierarchical processing",
    ],
    hint: "Use Hugging Face's `model.output_attentions=True` flag to get attention weights directly, then visualize with seaborn heatmaps or plotly.",
  },

  "text-generation-app": {
    id: "text-generation-app",
    stageId: "transformers",
    title: "Text Generation App",
    difficulty: 4,
    skills: ["Hugging Face", "Transformers"],
    description:
      "Create a text generation application using transformer language models. Implement different decoding strategies (greedy, beam search, top-k, nucleus sampling) and build a Streamlit interface for interactive generation.",
    requirements: [
      "Load a pretrained text generation model (e.g., GPT-2, GPT-Neo) from Hugging Face",
      "Implement at least 3 decoding strategies: greedy, beam search, and top-k sampling",
      "Build a Streamlit UI with controls for temperature, top-k, max length, and seed",
      "Display generated text with timing and token count statistics",
      "Allow saving generated outputs to a file for later review",
    ],
    hint: "Hugging Face's `GenerationConfig` object makes it easy to switch between decoding strategies — experiment with temperature settings to see how creativity changes.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 9: LLMs
  // ═══════════════════════════════════════════════════════════
  "text-generation-application": {
    id: "text-generation-application",
    stageId: "llm",
    title: "Text Generation Application",
    difficulty: 3,
    skills: ["Hugging Face", "Transformers"],
    description:
      "Build a complete text generation application that loads a small open-source LLM locally and provides a terminal or web interface for interactive conversations with the model.",
    requirements: [
      "Load a small open-source model (e.g., Phi-2, TinyLlama, Mistral-7B with quantization)",
      "Implement a chat interface with message history and context window management",
      "Support streaming output so text appears token-by-token in real time",
      "Add configuration options for temperature, top-p, and max tokens",
      "Measure and display response time and tokens-per-second metrics",
    ],
    hint: "Use `BitsAndBytesConfig` for 4-bit quantization to run models on consumer GPUs with limited VRAM.",
  },

  "fine-tune-small-language-model": {
    id: "fine-tune-small-language-model",
    stageId: "llm",
    title: "Fine-tune a Small Language Model",
    difficulty: 4,
    skills: ["Hugging Face", "PEFT", "LoRA"],
    description:
      "Fine-tune a small language model using parameter-efficient techniques. Apply LoRA adapters to a base model, train on a custom instruction dataset, and evaluate the quality of fine-tuned responses.",
    requirements: [
      "Prepare an instruction-following dataset in the proper format (input-output pairs)",
      "Apply LoRA configuration using PEFT library with appropriate rank and target modules",
      "Fine-tune the model using Hugging Face Trainer with proper training arguments",
      "Save and load the LoRA adapter separately from the base model",
      "Compare base model vs fine-tuned model outputs on a test set of prompts",
    ],
    hint: "LoRA rank of 8-16 with target modules ['q_proj', 'v_proj'] works well for most small models — start small and increase only if needed.",
  },

  "llm-playground": {
    id: "llm-playground",
    stageId: "llm",
    title: "LLM Playground",
    difficulty: 4,
    skills: ["Hugging Face", "Streamlit", "Transformers"],
    description:
      "Build an interactive LLM playground where users can load different models, adjust generation parameters in real time, and compare outputs side by side. A sandbox for experimenting with language model behavior.",
    requirements: [
      "Build a Streamlit interface with model selector and parameter sliders",
      "Support loading multiple small models and switching between them",
      "Provide side-by-side comparison mode showing same prompt with different models or parameters",
      "Implement conversation history with context window visualization",
      "Add a prompt template library with examples for different use cases",
    ],
    hint: "Use `@st.cache_resource` in Streamlit to cache loaded models and avoid reloading on every interaction.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 10: Generative AI
  // ═══════════════════════════════════════════════════════════
  "pdf-chatbot": {
    id: "pdf-chatbot",
    stageId: "genai",
    title: "PDF Chatbot",
    difficulty: 3,
    skills: ["LangChain", "OpenAI", "Vector DB"],
    description:
      "Build a chatbot that can answer questions about the content of PDF documents. Load PDFs, chunk them into segments, embed and store them in a vector database, then use retrieval-augmented generation to answer user queries.",
    requirements: [
      "Extract text from PDF files using PyPDF2 or pdfplumber with proper handling of multi-page content",
      "Chunk documents into overlapping segments with configurable chunk size and overlap",
      "Embed chunks and store them in a vector database (ChromaDB or FAISS)",
      "Implement retrieval pipeline that finds the most relevant chunks for a query",
      "Build a chat interface that shows answers with source document references",
    ],
    hint: "Chunk size of 500-1000 tokens with 100-200 token overlap is a good starting point — too small loses context, too large dilutes relevance.",
  },

  "documentation-chatbot": {
    id: "documentation-chatbot",
    stageId: "genai",
    title: "Documentation Chatbot",
    difficulty: 3,
    skills: ["RAG", "Embeddings", "Vector DB"],
    description:
      "Create a chatbot that answers questions about software documentation. Ingest a documentation website or markdown files, build a searchable knowledge base, and provide accurate answers with links to source pages.",
    requirements: [
      "Crawl or load documentation content from markdown files or a docs website",
      "Parse and clean HTML/markdown content, preserving code blocks and section structure",
      "Build a vector store with metadata (source URL, section title) for each chunk",
      "Implement RAG pipeline with relevance scoring and source attribution",
      "Deploy as a simple web interface with a question input and answer display",
    ],
    hint: "Preserve metadata like source URLs and section headings in your vector store so you can link answers back to the original documentation.",
  },

  "personal-knowledge-base": {
    id: "personal-knowledge-base",
    stageId: "genai",
    title: "Personal Knowledge Base",
    difficulty: 4,
    skills: ["RAG", "Vector DB", "OpenAI"],
    description:
      "Build a personal knowledge management system that lets you ingest notes, articles, and documents of various formats, then query them conversationally using an LLM-powered retrieval system.",
    requirements: [
      "Support multiple input formats: Markdown, PDF, plain text, and HTML",
      "Implement intelligent chunking with semantic awareness (split at section boundaries)",
      "Build a vector database with full-text search fallback for hybrid retrieval",
      "Create a conversational interface with memory of previous queries in the session",
      "Allow users to add, search, and browse their knowledge base through a web UI",
    ],
    hint: "Hybrid search combining vector similarity with keyword matching often outperforms pure semantic search for technical content.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 11: AI Agents
  // ═══════════════════════════════════════════════════════════
  "research-agent": {
    id: "research-agent",
    stageId: "agents",
    title: "Research Agent",
    difficulty: 4,
    skills: ["Agents", "Tool Calling", "LLM"],
    description:
      "Build an AI research agent that can break down a complex question into sub-questions, search for information using tools, and synthesize findings into a comprehensive answer with citations.",
    requirements: [
      "Implement an agent loop that reasons about when and how to use available tools",
      "Create tools for web search, reading web pages, and running calculations",
      "Design a planning step that decomposes complex questions into sub-questions",
      "Implement a synthesis step that combines findings into a coherent answer with sources",
      "Build a CLI or web interface showing the agent's reasoning process and tool usage",
    ],
    hint: "Give your agent a clear system prompt defining its role, available tools, and output format — structured prompts lead to more reliable tool use.",
  },

  "web-research-assistant": {
    id: "web-research-assistant",
    stageId: "agents",
    title: "Web Research Assistant",
    difficulty: 4,
    skills: ["Agents", "Web Scraping", "LLM"],
    description:
      "Create an AI assistant that autonomously browses the web to research topics, extracting and summarizing information from multiple sources. The agent should navigate pages, handle errors, and produce a structured research report.",
    requirements: [
      "Build an agent that can navigate to URLs, extract content, and follow relevant links",
      "Implement content extraction that handles different website layouts and structures",
      "Create a summarization pipeline that condenses page content into key findings",
      "Track sources visited and build a citation list for the final report",
      "Generate a structured markdown report with sections, findings, and references",
    ],
    hint: "Use a breadth-first search strategy for the agent — explore the top results from each search before diving deeper into any single source.",
  },

  "coding-assistant": {
    id: "coding-assistant",
    stageId: "agents",
    title: "Coding Assistant",
    difficulty: 4,
    skills: ["Agents", "Code Generation", "LLM"],
    description:
      "Build an AI coding assistant that can understand programming tasks, generate code solutions, execute them in a sandbox, and iterate based on errors. Supports multiple programming languages and provides explanations.",
    requirements: [
      "Implement an agent that parses coding tasks and plans a solution approach",
      "Generate code in Python (and optionally other languages) based on the task description",
      "Execute generated code in a sandboxed subprocess with timeout and output capture",
      "Parse errors from execution and iterate to fix issues automatically",
      "Provide explanations alongside generated code showing the reasoning process",
    ],
    hint: "Sandbox code execution with `subprocess.run()` and a timeout is essential for safety — never execute LLM-generated code without safeguards.",
  },

  "multi-tool-ai-agent": {
    id: "multi-tool-ai-agent",
    stageId: "agents",
    title: "Multi-tool AI Agent",
    difficulty: 5,
    skills: ["Agents", "MCP", "Multi-tool"],
    description:
      "Build a sophisticated AI agent that can orchestrate multiple tools to accomplish complex tasks. Implement tool discovery, dynamic tool selection, error recovery, and support the Model Context Protocol for extensibility.",
    requirements: [
      "Design a tool registry system where tools are self-describing with JSON schemas",
      "Implement an agent loop that reasons about which tools to call and in what order",
      "Support parallel tool execution where tasks are independent",
      "Add error recovery so the agent can handle tool failures and retry with alternatives",
      "Implement MCP protocol support for connecting external tool servers dynamically",
    ],
    hint: "Build your tool system incrementally — start with 3 simple tools, ensure the agent can select and use them reliably, then add complexity.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 12: GenAI Apps
  // ═══════════════════════════════════════════════════════════
  "ai-assistant": {
    id: "ai-assistant",
    stageId: "genai-apps",
    title: "AI Assistant",
    difficulty: 4,
    skills: ["Streaming", "Chat UI", "LLM API"],
    description:
      "Build a polished AI assistant web application with real-time streaming responses, conversation history, and a clean chat interface. Connect to an LLM API and deliver a smooth, responsive user experience.",
    requirements: [
      "Build a responsive chat UI with message bubbles, typing indicators, and auto-scroll",
      "Implement streaming API calls so responses appear token-by-token in real time",
      "Maintain conversation history with context window management",
      "Add conversation persistence using local storage or a database",
      "Include settings for system prompt, temperature, and model selection",
    ],
    hint: "Use Server-Sent Events (SSE) for streaming responses — it's simpler than WebSockets and works well for unidirectional LLM output streams.",
  },

  "ai-interview-coach": {
    id: "ai-interview-coach",
    stageId: "genai-apps",
    title: "AI Interview Coach",
    difficulty: 4,
    skills: ["Prompt Engineering", "LLM API", "UI"],
    description:
      "Create an AI-powered interview coach that asks technical and behavioral questions, evaluates responses, provides feedback, and tracks improvement over multiple practice sessions.",
    requirements: [
      "Build a question bank organized by category (technical, behavioral, system design)",
      "Implement an adaptive difficulty system that adjusts based on performance",
      "Evaluate responses using structured rubrics and provide specific feedback",
      "Track scores and progress across sessions with a dashboard view",
      "Include a practice mode with timer and a review mode for past sessions",
    ],
    hint: "Use structured prompts with explicit evaluation criteria — telling the AI exactly what makes a good answer leads to much more useful feedback.",
  },

  "ai-tutor": {
    id: "ai-tutor",
    stageId: "genai-apps",
    title: "AI Tutor",
    difficulty: 4,
    skills: ["LLM API", "Education", "UI"],
    description:
      "Build an AI tutoring application that helps students learn a subject through Socratic questioning, adaptive explanations, and progress tracking. The tutor should adjust its teaching style to the learner's level.",
    requirements: [
      "Implement a teaching mode that guides students through concepts step by step",
      "Use Socratic questioning to help students discover answers rather than just providing them",
      "Adapt explanation complexity based on student's demonstrated understanding",
      "Track which topics the student has covered and their confidence levels",
      "Generate practice problems appropriate to the student's current level",
    ],
    hint: "The key prompt engineering technique is telling the AI to never give the answer directly but instead ask guiding questions — adjust the strictness per topic.",
  },

  "ai-document-analyzer": {
    id: "ai-document-analyzer",
    stageId: "genai-apps",
    title: "AI Document Analyzer",
    difficulty: 4,
    skills: ["LLM API", "File Processing", "Analysis"],
    description:
      "Build an application that analyzes documents (PDFs, Word files, text) using AI to extract key information, generate summaries, identify entities, and answer questions about the content.",
    requirements: [
      "Support uploading and parsing of PDF, DOCX, and plain text files",
      "Generate document summaries at different levels of detail (brief, detailed, executive)",
      "Extract key entities, topics, and action items from the document",
      "Enable conversational Q&A about the document's content",
      "Export analysis results as a structured report in markdown or JSON format",
    ],
    hint: "Process large documents by splitting into sections, analyzing each independently, then synthesizing a global summary across all sections.",
  },

  "ai-coding-assistant": {
    id: "ai-coding-assistant",
    stageId: "genai-apps",
    title: "AI Coding Assistant",
    difficulty: 5,
    skills: ["LLM API", "Code Analysis", "IDE Integration"],
    description:
      "Build a full-featured AI coding assistant that provides code completion, refactoring suggestions, bug detection, and explanation of code snippets. Integrate with a code editor or provide a standalone code interface.",
    requirements: [
      "Build a code editor interface with syntax highlighting and real-time AI assistance",
      "Implement code completion that suggests next lines based on context",
      "Add code analysis features: bug detection, complexity analysis, and security warnings",
      "Create a refactoring tool that suggests and applies code improvements",
      "Support multiple programming languages with appropriate syntax and conventions",
    ],
    hint: "Send the surrounding code context (not just the current line) to the LLM — at least 10-20 lines above and below the cursor for meaningful completions.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 13: AI Engineering
  // ═══════════════════════════════════════════════════════════
  "ai-api-with-authentication": {
    id: "ai-api-with-authentication",
    stageId: "ai-eng",
    title: "AI API with Authentication",
    difficulty: 4,
    skills: ["FastAPI", "Auth", "Rate Limiting"],
    description:
      "Build a production-ready AI API service with proper authentication, rate limiting, and request validation. Serve an ML model or LLM-powered feature behind a well-designed REST API with API key management.",
    requirements: [
      "Create RESTful endpoints using FastAPI with proper request/response schemas",
      "Implement API key authentication with key generation and validation",
      "Add rate limiting per API key with configurable limits (e.g., 100 requests/hour)",
      "Include comprehensive request validation and meaningful error responses",
      "Write API documentation with OpenAPI/Swagger and a simple usage guide",
    ],
    hint: "FastAPI's dependency injection system makes it easy to add auth and rate limiting as reusable middleware components.",
  },

  "model-router-service": {
    id: "model-router-service",
    stageId: "ai-eng",
    title: "Model Router Service",
    difficulty: 5,
    skills: ["API Gateway", "Load Balancing", "LLM"],
    description:
      "Build an intelligent routing service that directs AI requests to different models based on task type, complexity, and load. Implement fallback strategies, load balancing across model replicas, and performance monitoring.",
    requirements: [
      "Design a routing layer that classifies incoming requests and selects the best model",
      "Implement load balancing across multiple model replicas with health checks",
      "Add automatic fallback to alternative models when the primary model is unavailable",
      "Track request latency, throughput, and error rates per model endpoint",
      "Build a dashboard showing real-time routing decisions and model performance metrics",
    ],
    hint: "Start with simple rule-based routing (task type maps to model), then add complexity like latency-based or cost-based routing as you validate the system.",
  },

  "ai-evaluation-pipeline": {
    id: "ai-evaluation-pipeline",
    stageId: "ai-eng",
    title: "AI Evaluation Pipeline",
    difficulty: 5,
    skills: ["Evaluation", "Testing", "Metrics"],
    description:
      "Build a systematic evaluation pipeline for AI models and LLM applications. Automate quality assessment with test suites, custom metrics, human-eval proxies, and regression detection across model versions.",
    requirements: [
      "Create a test suite framework with input/output pairs for consistent model evaluation",
      "Implement automated metrics: accuracy, latency, token usage, and cost per request",
      "Build LLM-as-judge evaluation using a stronger model to rate response quality",
      "Detect regressions by comparing current results against a baseline model version",
      "Generate evaluation reports with pass/fail status and detailed metric breakdowns",
    ],
    hint: "Use a lightweight model as the judge for LLM-as-judge evaluations — it's faster and cheaper while still catching major quality issues.",
  },

  // ═══════════════════════════════════════════════════════════
  // Stage 14: Production AI
  // ═══════════════════════════════════════════════════════════
  "dockerized-ai-app": {
    id: "dockerized-ai-app",
    stageId: "production",
    title: "Dockerized AI App",
    difficulty: 4,
    skills: ["Docker", "Deployment", "CI/CD"],
    description:
      "Package an AI application into Docker containers with a production-ready setup. Implement multi-stage builds, health checks, environment configuration, and a basic CI/CD pipeline for automated deployment.",
    requirements: [
      "Create an optimized multi-stage Dockerfile for the AI application",
      "Set up docker-compose with separate services for the API, model server, and database",
      "Implement health checks and graceful shutdown handling in the application",
      "Configure environment-based settings for development, staging, and production",
      "Build a CI/CD pipeline (GitHub Actions) that builds, tests, and deploys the container",
    ],
    hint: "Multi-stage Docker builds are essential for AI apps — use a build stage for installing dependencies and a slim runtime stage to minimize image size.",
  },

  "production-rag-system": {
    id: "production-rag-system",
    stageId: "production",
    title: "Production RAG System",
    difficulty: 5,
    skills: ["Docker", "Scaling", "Monitoring", "RAG"],
    description:
      "Build a production-grade RAG system with proper infrastructure. Implement document ingestion pipeline, scalable vector storage, monitoring, caching, and deployment orchestration for a reliable retrieval-augmented generation service.",
    requirements: [
      "Build an automated document ingestion pipeline with incremental updates",
      "Deploy a scalable vector database with replication and backup strategies",
      "Implement request caching to avoid redundant LLM calls for similar queries",
      "Add monitoring for retrieval quality, response latency, and system resource usage",
      "Create an operations runbook with deployment, scaling, and incident response procedures",
    ],
    hint: "Caching at the embedding level (cache similar queries to reuse retrieved chunks) provides the biggest cost and latency savings in production RAG.",
  },
};
