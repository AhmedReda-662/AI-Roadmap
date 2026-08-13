/**
 * AI Learning Roadmap — Stages 9–15
 * Covers Large Language Models through Specialization.
 */

export const stages9to15 = [
  // ═══════════════════════════════════════════════════════════════════
  // STAGE 9 — Large Language Models
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "llm",
    number: 9,
    title: "Large Language Models",
    description:
      "Understand the architecture, training process, and inference mechanics behind modern large language models like GPT, Claude, and Llama.",
    difficulty: "advanced",
    icon: "💬",
    prerequisites: [],
    topics: [
      // ── LLM Fundamentals ──────────────────────────────────────────
      {
        id: "llm-fundamentals",
        title: "LLM Fundamentals",
        lessons: [
          {
            id: "llm-tokens",
            title: "Tokens & Tokenization",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "Tokens are the basic units of text that a language model processes. Rather than operating on raw characters or whole words, LLMs break text into subword units called tokens using algorithms like Byte-Pair Encoding (BPE). A tokenizer converts a string like \"Hello world\" into a sequence of integer IDs such as [15496, 995].",
              why: "Computers cannot process raw text — they need numerical representations. Tokenization directly affects model cost (you pay per token), context length usage, and the model's ability to handle rare words, code, and multilingual text.",
              how: "BPE starts with individual bytes and iteratively merges the most frequent adjacent pairs. For example, the word \"tokenization\" might be split into ['token', 'iz', 'ation']. Each token maps to an integer ID in the vocabulary: `tokenizer.encode(\"Hello\") → [15496]`. Libraries like `tiktoken` (OpenAI) or `transformers.AutoTokenizer` (Hugging Face) handle this.",
              ai: "Token count determines both the context window utilization and API costs — a sentence with 50 tokens costs 5x more than one with 10 tokens. Understanding tokenization helps you write prompts more efficiently."
            }
          },
          {
            id: "llm-vocabulary",
            title: "Vocabulary",
            prerequisites: ["llm-tokens"],
            duration: "6 min",
            content: {
              what: "A vocabulary is the complete set of tokens a model can recognize, typically ranging from 30,000 to 100,000 entries. Each token in the vocabulary maps to a unique integer ID and a corresponding embedding vector that the model learns during training.",
              why: "The vocabulary size is a fundamental design trade-off: larger vocabularies represent more concepts per token (fewer tokens per text) but require more parameters in the embedding layer. A well-designed vocabulary balances compression with coverage across languages and domains.",
              how: "The vocabulary is built during tokenization training on a large corpus. Common words get their own tokens, while rare words are split into subwords. For example, \"unhappiness\" might become ['un', 'happiness']. The embedding matrix has shape (vocab_size, hidden_dim), so a 50K vocab with 4096-dim embeddings adds ~200M parameters.",
              ai: "Vocabulary design affects multilingual performance significantly — a vocabulary over-representing English text will tokenize Chinese or Arabic inefficiently, wasting context window space and reducing model quality for those languages."
            }
          },
          {
            id: "llm-embeddings",
            title: "Embeddings",
            prerequisites: ["llm-tokens"],
            duration: "10 min",
            content: {
              what: "Embeddings are dense, continuous vector representations of tokens in a high-dimensional space. Each token is mapped to a vector of floating-point numbers (e.g., 4096 dimensions) where similar tokens end up geometrically close after training.",
              why: "Raw token IDs carry no semantic meaning — the number 42 is not inherently 'close' to 43. Embeddings encode meaning so that words like 'king' and 'queen' have similar vectors, enabling the model to capture relationships, analogies, and context-dependent meaning.",
              how: "The model maintains an embedding matrix W_embed of shape (vocab_size, d_model). For an input token with ID 50257, the embedding is simply the 50257th row of W_embed. During training, these vectors are updated via backpropagation to capture semantic relationships. Positional encodings are added to provide sequence order information.",
              ai: "Embeddings are also exposed as APIs (e.g., OpenAI's embedding endpoint) and used directly for semantic search, clustering, and classification tasks independent of language models."
            }
          },
          {
            id: "llm-context-window",
            title: "Context Window",
            prerequisites: ["llm-embeddings"],
            duration: "8 min",
            content: {
              what: "The context window is the maximum number of tokens a model can process in a single forward pass. It includes both the input prompt and the generated output. Modern models range from 4K (early GPT-3) to 1M+ tokens (Gemini 1.5).",
              why: "The context window is a hard constraint on how much information the model can 'see' at once. Everything outside the window is invisible to the model, which is why long-document analysis, multi-turn conversations, and RAG systems must carefully manage context.",
              how: "The context window size is determined by the model's architecture, particularly the self-attention mechanism which has O(n²) complexity in sequence length n. Techniques like FlashAttention, sliding window attention, and sparse attention reduce this cost. Position encodings like RoPE and ALiBi determine how position information scales to longer sequences.",
              ai: "Context window size is a key differentiator between models. When building AI applications, you must chunk documents, manage conversation history, and budget prompt tokens to stay within the limit."
            }
          },
          {
            id: "llm-parameters",
            title: "Model Parameters",
            prerequisites: ["llm-context-window"],
            duration: "10 min",
            content: {
              what: "Parameters are the learned weights and biases of a neural network, stored as multi-dimensional tensors. A model's size is measured by its parameter count — GPT-3 has 175B parameters, Llama 2 70B has 70B, and GPT-4 is estimated at over 1T parameters across experts.",
              why: "Parameters encode all the knowledge the model learned during training. More parameters generally enable more complex pattern recognition and world knowledge, but also increase compute cost, memory requirements, and latency. Understanding parameter count helps you choose the right model for your hardware budget.",
              how: "In a Transformer, the main parameter groups are: attention projection matrices (Q, K, V, O), feed-forward network weights (two matrices per layer), layer normalization parameters, and embedding tables. For a model with L layers, hidden dimension d, and vocab V, approximate parameter count is L × 12d² + V × d.",
              ai: "The parameter-to-performance relationship follows scaling laws — doubling parameters with proportionally more data and compute predictably improves loss, which drove the 'bigger is better' paradigm in LLM development."
            }
          }
        ]
      },
      // ── Training ──────────────────────────────────────────────────
      {
        id: "llm-training",
        title: "Training",
        lessons: [
          {
            id: "llm-pretraining",
            title: "Pretraining",
            prerequisites: ["llm-parameters"],
            duration: "12 min",
            content: {
              what: "Pretraining is the initial, unsupervised phase where a language model learns to predict the next token over massive text corpora. The model sees trillions of tokens from books, websites, code, and other sources, gradually learning grammar, facts, reasoning patterns, and world knowledge.",
              why: "Pretraining is where the model acquires its general capabilities. Without it, the model would be randomly initialized weights producing garbage output. This phase is extremely expensive (millions of dollars in compute) but produces the foundation that all downstream capabilities build upon.",
              how: "The training loop feeds sequences of tokens through the Transformer, computes cross-entropy loss between predicted and actual next tokens, and updates weights via backpropagation. Training runs on thousands of GPUs for weeks or months using mixed-precision arithmetic (FP16/BF16), gradient checkpointing, and distributed data parallelism.",
              ai: "Pretrained models are the starting point for nearly all LLM applications. You either use them directly (zero-shot) or fine-tune them for specific tasks, making pretraining the most important phase in the LLM lifecycle."
            }
          },
          {
            id: "llm-next-token-prediction",
            title: "Next-Token Prediction",
            prerequisites: ["llm-pretraining"],
            duration: "10 min",
            content: {
              what: "Next-token prediction (NTP) is the training objective where the model learns to predict the probability distribution over the next token given all preceding tokens. Formally, the model learns P(x_t | x_1, x_2, ..., x_{t-1}) for every position t in the training sequence.",
              why: "NTP is deceptively simple yet remarkably powerful. By optimizing this single objective over enough data, models implicitly learn syntax, semantics, facts, reasoning, code generation, translation, and more. The objective is also naturally parallelizable during training since each position's loss can be computed independently.",
              how: "For each training sequence, the model computes logits for every position using causal masking (each position can only attend to previous positions). The loss at position t is the negative log-likelihood of the correct token: L_t = -log P(x_t | x_{<t}). The total loss is averaged over all positions. A softmax over logits produces the probability distribution.",
              ai: "Next-token prediction is the foundation of autoregressive language models. At inference time, the model generates text by repeatedly sampling the next token from this distribution, appending it to the context, and repeating."
            }
          },
          {
            id: "llm-cross-entropy",
            title: "Cross-Entropy Loss",
            prerequisites: ["llm-next-token-prediction"],
            duration: "8 min",
            content: {
              what: "Cross-entropy loss measures the difference between the model's predicted probability distribution and the true distribution (the actual next token). Mathematically, for a target token w and predicted distribution P, the loss is H(P_true, P_model) = -log P_model(w).",
              why: "Cross-entropy is the standard loss function for classification problems and is mathematically equivalent to minimizing the KL divergence between the model's predictions and the true distribution. It penalizes confident wrong predictions heavily, pushing the model to assign high probability to correct tokens.",
              how: "The model outputs raw logits z of shape (vocab_size), applies softmax to get probabilities p_i = exp(z_i) / Σ exp(z_j), then computes the loss as -log(p_target). In practice, `nn.CrossEntropyLoss` combines log-softmax and NLL loss for numerical stability. The gradient flows back through the softmax to update logits.",
              ai: "Perplexity, defined as exp(cross-entropy loss), is the primary metric for evaluating language models. A perplexity of 10 means the model is on average uncertain among 10 possible next tokens — lower perplexity indicates better predictions."
            }
          },
          {
            id: "llm-backpropagation",
            title: "Backpropagation & Optimization",
            prerequisites: ["llm-cross-entropy"],
            duration: "12 min",
            content: {
              what: "Backpropagation is the algorithm for computing gradients of the loss function with respect to every parameter in the network using the chain rule. Combined with an optimizer like AdamW, these gradients are used to update weights to reduce the loss over training iterations.",
              why: "Without backpropagation, there would be no way to attribute the loss to individual parameters across millions of layers and billions of weights. It is the engine that makes deep learning possible, enabling automatic differentiation through arbitrarily complex computation graphs.",
              how: "During the forward pass, activations are cached at each layer. During backprop, gradients flow backward from the loss through each operation. The AdamW optimizer combines adaptive learning rates (Adam) with weight decay: m_t = β₁m_{t-1} + (1-β₁)g_t, v_t = β₂v_{t-1} + (1-β₂)g_t², θ_t = θ_{t-1} - lr × (m̂_t / (√v̂_t + ε) + λθ_{t-1}).",
              ai: "Training large models requires distributed backpropagation across GPUs using techniques like ZeRO (Zero Redundancy Optimizer), FSDP (Fully Sharded Data Parallel), and pipeline parallelism to fit the computation in memory."
            }
          }
        ]
      },
      // ── Inference ─────────────────────────────────────────────────
      {
        id: "llm-inference",
        title: "Inference",
        lessons: [
          {
            id: "llm-temperature",
            title: "Temperature",
            prerequisites: ["llm-backpropagation"],
            duration: "8 min",
            content: {
              what: "Temperature is a hyperparameter that controls the randomness of token sampling by scaling the logits before the softmax. A temperature of 1.0 uses the raw model distribution, values below 1.0 make output more deterministic, and values above 1.0 increase randomness.",
              why: "Without temperature control, LLMs tend to produce repetitive, generic text (low temperature) or incoherent gibberish (high temperature). Temperature lets you tune the creativity-versus-consistency trade-off for different applications — factual QA needs low temperature while creative writing benefits from higher values.",
              how: "The logits are divided by the temperature before softmax: p_i = exp(z_i / T) / Σ exp(z_j / T). When T → 0, the distribution becomes a one-hot vector selecting the most probable token (greedy). When T → ∞, all tokens become equally likely. Typical values range from 0.0 to 2.0, with 0.7 being a common default.",
              ai: "Temperature is one of the most important parameters in production AI applications. Code generation typically uses T=0.2 for precision, while brainstorming might use T=0.9 for variety."
            }
          },
          {
            id: "llm-top-k",
            title: "Top-K Sampling",
            prerequisites: ["llm-temperature"],
            duration: "7 min",
            content: {
              what: "Top-K sampling restricts token selection to the K most probable tokens after applying temperature. Tokens outside the top K are assigned zero probability and redistributed among the top K. For example, top_k=50 means only the 50 most likely tokens are considered.",
              why: "Even with temperature scaling, the long tail of unlikely tokens can occasionally be sampled, producing nonsensical output. Top-K filtering prevents this by truncating the distribution, ensuring the model only picks from plausible continuations while still maintaining diversity.",
              how: "After computing temperature-scaled probabilities, tokens are sorted by probability. Only the top K tokens retain their probabilities, and the rest are masked. The final distribution is renormalized to sum to 1. In code: `probs = softmax(logits / T); top_k_probs = mask_bottom_k(probs, K); top_k_probs /= top_k_probs.sum()`.",
              ai: "Top-K is often combined with temperature and Top-P for robust sampling. A common production configuration is temperature=0.7, top_k=40, top_p=0.9 to balance coherence with diversity."
            }
          },
          {
            id: "llm-top-p",
            title: "Top-P (Nucleus) Sampling",
            prerequisites: ["llm-top-k"],
            duration: "8 min",
            content: {
              what: "Top-P (nucleus) sampling dynamically selects the smallest set of tokens whose cumulative probability exceeds a threshold p. Unlike Top-K which uses a fixed number of tokens, Top-P adapts to the model's confidence — selecting fewer tokens when the model is certain and more when uncertain.",
              why: "Fixed-K sampling is problematic because the number of plausible continuations varies by context. In predictable situations (e.g., \"The capital of France is\"), only 1-2 tokens are reasonable, while creative contexts may have dozens. Top-P automatically adjusts the candidate pool size.",
              how: "Tokens are sorted by probability, and a running sum accumulates from most probable downward. Tokens are included until the cumulative probability reaches p, then excluded. The remaining probabilities are renormalized. For p=0.9, if the top 3 tokens sum to 92%, only those 3 are sampled. OpenAI's API exposes this as the `top_p` parameter.",
              ai: "Top-P is generally preferred over Top-K in modern applications because it's more adaptive. Many production systems set top_p=0.9 or top_p=0.95 as a safety net alongside temperature."
            }
          },
          {
            id: "llm-greedy-decoding",
            title: "Greedy & Beam Search Decoding",
            prerequisites: ["llm-temperature"],
            duration: "8 min",
            content: {
              what: "Greedy decoding always selects the single highest-probability token at each step (equivalent to temperature=0). Beam search maintains B parallel sequences (beams), at each step expanding each beam with the top candidates and keeping only the B most probable complete sequences.",
              why: "Greedy decoding is fast but often produces repetitive, dull text because it never explores alternatives. Beam search improves quality for translation and summarization by considering multiple hypotheses, but it's too expensive for long-form generation and still tends toward safe, generic output.",
              how: "Greedy: `next_token = argmax(softmax(logits))`. Beam search: maintain a priority queue of B sequences, at each step expand each by all possible next tokens, score each by sum of log-probabilities, keep only the top B. Beam width B=4-10 is typical. Length normalization divides total score by sequence length to avoid penalizing longer outputs.",
              ai: "For chat and creative applications, sampling (temperature + top-p) has largely replaced beam search. Beam search remains useful for structured tasks like translation where there's a single 'correct' output."
            }
          },
          {
            id: "llm-sampling-strategies",
            title: "Advanced Sampling Strategies",
            prerequisites: ["llm-top-p"],
            duration: "8 min",
            content: {
              what: "Advanced sampling strategies include repetition penalty (reducing probability of recently used tokens), frequency penalty (penalizing tokens by how often they appear), presence penalty (penalizing any token that has appeared), min-p (filtering tokens below a fraction of the top token's probability), and typical sampling.",
              why: "Basic sampling parameters often produce repetitive or degenerate text. Repetition penalties combat the model's tendency to loop, frequency/presence penalties encourage topic diversity, and min-p provides an adaptive threshold similar to top-p but grounded in absolute probability rather than cumulative distribution.",
              how: "Repetition penalty multiplies the logits of already-generated tokens by a penalty factor > 1. Frequency penalty subtracts `freq_penalty × count(token)` from logits. Min-p filters tokens where `p(token) < min_p × p(top_token)`. Typical sampling selects tokens whose information content is close to the expected information, avoiding both boring and surprising tokens.",
              ai: "Fine-tuning sampling parameters is often the first step in improving AI application quality. A well-configured sampling strategy can dramatically improve output coherence without any model changes."
            }
          }
        ]
      },
      // ── Fine-tuning ──────────────────────────────────────────────
      {
        id: "llm-fine-tuning",
        title: "Fine-tuning",
        lessons: [
          {
            id: "llm-fine-tuning-concept",
            title: "Fine-tuning Concepts",
            prerequisites: ["llm-backpropagation"],
            duration: "10 min",
            content: {
              what: "Fine-tuning is the process of further training a pretrained model on a smaller, task-specific dataset to adapt it to particular use cases. Unlike pretraining which learns general language understanding, fine-tuning refines the model's behavior for specific tasks, formats, or domains.",
              why: "Pretrained models are generalists — they can do many things but excel at none. Fine-tuning adapts the model to follow specific instruction styles, generate domain-specific content, adopt particular personas, or output structured formats. It's far more efficient than training from scratch.",
              how: "Fine-tuning uses the same next-token prediction objective but on curated datasets of input-output pairs. The learning rate is much lower than pretraining (1e-5 to 5e-5 vs. 1e-4), training runs for fewer epochs (1-5), and techniques like LoRA reduce the number of trainable parameters. The dataset format is typically: {\"instruction\": \"...\", \"input\": \"...\", \"output\": \"...\"}.",
              ai: "Fine-tuning is essential when prompt engineering alone isn't sufficient — for example, when you need consistent output formatting, domain expertise in medical/legal text, or a specific conversational style."
            }
          },
          {
            id: "llm-instruction-tuning",
            title: "Instruction Tuning",
            prerequisites: ["llm-fine-tuning-concept"],
            duration: "8 min",
            content: {
              what: "Instruction tuning is a specific form of fine-tuning where the model is trained on pairs of instructions and desired responses. The model learns to follow natural language instructions and produce appropriate outputs, bridging the gap between next-token prediction and helpful assistant behavior.",
              why: "Without instruction tuning, pretrained models continue text rather than answering questions. If you type \"What is 2+2?\", a raw pretrained model might continue with \"What is 3+3? What is 4+4?\" instead of answering \"4\". Instruction tuning aligns the model to respond helpfully to user intent.",
              how: "The training data consists of instruction-response pairs formatted with special tokens: `<|user|>{instruction}<|assistant|>{response}`. The loss is computed only on the response tokens, not the instruction tokens. Datasets like Alpaca (52K instructions), FLAN, and OpenAssistant provide instruction-tuning data.",
              ai: "Every commercial chat model (ChatGPT, Claude, Gemini) is instruction-tuned. This step is what transforms a text predictor into an assistant, making it the most critical alignment step in the LLM pipeline."
            }
          },
          {
            id: "llm-lora",
            title: "LoRA (Low-Rank Adaptation)",
            prerequisites: ["llm-instruction-tuning"],
            duration: "10 min",
            content: {
              what: "LoRA is a parameter-efficient fine-tuning method that freezes the original model weights and injects trainable low-rank decomposition matrices into each Transformer layer. Instead of updating all parameters, LoRA adds matrices A (d × r) and B (r × d) where r << d, reducing trainable parameters by 10,000x.",
              why: "Full fine-tuning of a 70B parameter model requires hundreds of GB of GPU memory for optimizer states. LoRA reduces this to a few GB by training only the low-rank matrices (~0.1% of original parameters), making fine-tuning accessible on consumer GPUs while often achieving 90-95% of full fine-tuning performance.",
              how: "For a weight matrix W of shape (d, d), LoRA computes: h = Wx + BAx, where A is (r, d) and B is (d, r) initialized so BA ≈ 0 at start. During training, only A and B are updated. The rank r (typically 4-64) controls the capacity. At inference, the LoRA weights can be merged: W' = W + BA, adding zero inference overhead.",
              ai: "LoRA has become the standard method for fine-tuning LLMs. Libraries like Hugging Face PEFT and Axolotl make it straightforward to apply LoRA to any Transformer model."
            }
          },
          {
            id: "llm-peft",
            title: "PEFT Methods",
            prerequisites: ["llm-lora"],
            duration: "8 min",
            content: {
              what: "Parameter-Efficient Fine-Tuning (PEFT) is a family of techniques that adapt large models by training only a small subset of parameters. Beyond LoRA, methods include QLoRA (quantized LoRA), prefix tuning, prompt tuning, adapter layers, and (IA)³.",
              why: "As models grow to hundreds of billions of parameters, full fine-tuning becomes impractical for most teams. PEFT methods democratize model customization by reducing hardware requirements from high-end data center GPUs to a single consumer GPU, while maintaining competitive performance.",
              how: "QLoRA loads the base model in 4-bit quantization and applies LoRA on top, reducing a 70B model's memory from ~140GB to ~24GB. Prefix tuning prepends learnable vectors to the key and value matrices. Prompt tuning adds soft tokens to the input embedding. Adapter layers insert small feed-forward modules between existing layers. Each method trades off between parameter efficiency and expressiveness.",
              ai: "PEFT is critical for production AI where you need to customize models for specific domains without the cost of full fine-tuning. QLoRA in particular has made fine-tuning 70B+ models feasible on a single A100 GPU."
            }
          }
        ]
      },
      // ── Hugging Face ─────────────────────────────────────────────
      {
        id: "llm-huggingface",
        title: "Hugging Face",
        lessons: [
          {
            id: "llm-transformers",
            title: "Transformers Library",
            prerequisites: ["llm-parameters"],
            duration: "10 min",
            content: {
              what: "The Hugging Face Transformers library provides thousands of pre-built, pretrained models for NLP, vision, audio, and multimodal tasks. It offers a unified API for loading, training, and deploying models from major research labs with just a few lines of code.",
              why: "Building models from scratch requires immense expertise and compute. Transformers gives instant access to state-of-the-art models like Llama, Mistral, and Phi with standardized interfaces, enabling rapid prototyping and deployment without reimplementing architectures.",
              how: "Loading a model is as simple as `from transformers import AutoModelForCausalLM; model = AutoModelForCausalLM.from_pretrained(\"meta-llama/Llama-3.1-8B\")`. The library handles weight loading, tokenizer pairing, device placement, and generation. It supports PyTorch, TensorFlow, and JAX backends.",
              ai: "Transformers is the de facto standard for working with LLMs in Python. Most AI research papers release their models on Hugging Face, making it the GitHub of machine learning."
            }
          },
          {
            id: "llm-hf-datasets",
            title: "HF Datasets",
            prerequisites: ["llm-transformers"],
            duration: "8 min",
            content: {
              what: "The Hugging Face Datasets library provides efficient access to thousands of datasets for training and evaluating ML models. It supports streaming, caching, automatic splitting, and memory-mapped storage, handling datasets that are too large to fit in RAM.",
              why: "Finding, loading, and preprocessing datasets is a major bottleneck in ML workflows. Datasets standardizes this process with a consistent API, automatic download/caching, and integration with the broader Hugging Face ecosystem for seamless training pipelines.",
              how: "Load any dataset with `load_dataset(\"dataset_name\")`. The library uses Apache Arrow for zero-copy access, supports lazy streaming with `streaming=True`, and provides map/filter operations: `dataset.map(lambda x: tokenizer(x[\"text\"]))`. Dataset cards document schema, license, and intended use.",
              ai: "Datasets is essential for fine-tuning, evaluation, and benchmarking. It provides access to instruction-tuning datasets (OpenAssistant, Dolly), evaluation benchmarks (MMLU, HumanEval), and domain-specific corpora."
            }
          },
          {
            id: "llm-hf-tokenizers",
            title: "HF Tokenizers",
            prerequisites: ["llm-transformers"],
            duration: "8 min",
            content: {
              what: "The Hugging Face Tokenizers library is a high-performance tokenization toolkit written in Rust with Python bindings. It implements BPE, WordPiece, Unigram, and SentencePiece algorithms, processing text orders of magnitude faster than pure Python implementations.",
              why: "Tokenization speed matters during both training (processing millions of examples) and inference (real-time API responses). The Rust implementation processes text at >1M tokens/second, and the library supports custom vocabulary training for domain-specific tokenizers.",
              how: "Use `AutoTokenizer.from_pretrained(\"model-name\")` to load a model's tokenizer. For custom tokenizers: `tokenizer = Tokenizer(BPE(unk_token=\"[UNK]\")); tokenizer.train(files, trainer)` to train on your corpus. The pipeline handles normalization, pre-tokenization, the main encoding, and post-processing (adding special tokens).",
              ai: "Custom tokenizers are important for domain-specific applications. Medical, legal, or code-heavy applications benefit from tokenizers trained on domain text, reducing token counts by 20-40%."
            }
          },
          {
            id: "llm-model-hub",
            title: "Model Hub",
            prerequisites: ["llm-transformers"],
            duration: "6 min",
            content: {
              what: "The Hugging Face Model Hub is a central repository hosting over 1 million models, providing version control, model cards, evaluation metrics, and one-line deployment. Models are organized by task, language, and architecture with automated quality checks.",
              why: "The Model Hub eliminates the need to train or source models independently. It provides access to fine-tuned models for virtually every NLP task, community-contributed adapters, and quantized versions optimized for specific hardware, accelerating development from weeks to minutes.",
              how: "Search models at huggingface.co/models or via the API: `Api().list_models(filter=\"text-generation\")`. Download with `from_pretrained()`. Upload your own with `model.push_to_hub(\"my-model\")`. Model cards document training data, evaluation results, biases, and usage instructions. Spaces provides free hosting for demos.",
              ai: "The Model Hub is where the AI community shares and discovers models. For production use, it provides quantized variants (GPTQ, AWQ, GGUF) that run efficiently on consumer hardware."
            }
          }
        ]
      }
    ],
    checkpoint: {
      id: "checkpoint-llm",
      title: "Large Language Models Checkpoint",
      passingScore: 80,
      questionIds: []
    },
    projectIds: ["text-generation-application","fine-tune-small-language-model","llm-playground"]
  },
  // ═══════════════════════════════════════════════════════════════════
  // STAGE 10 — Generative AI
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "genai",
    number: 10,
    title: "Generative AI",
    description:
      "Master the tools and techniques for building with generative AI, including LLM APIs, prompt engineering, embeddings, vector databases, and RAG pipelines.",
    difficulty: "advanced",
    icon: "✨",
    prerequisites: ["llm"],
    topics: [
      {
        id: "genai-llm-apis",
        title: "LLM APIs",
        lessons: [
          {
            id: "genai-openai",
            title: "OpenAI API",
            prerequisites: [],
            duration: "12 min",
            content: {
              what: "The OpenAI API provides HTTP access to GPT-4o, GPT-4o-mini, and other models for text generation, embeddings, image generation (DALL-E), and audio processing. It uses a chat-based interface where messages are sent as arrays of role-content pairs.",
              why: "OpenAI's API is the most widely adopted LLM API and sets the standard interface pattern that others follow. Understanding it provides a foundation for working with any LLM provider, and its documentation, tooling, and ecosystem are the most mature in the industry.",
              how: "Send a POST request to `https://api.openai.com/v1/chat/completions` with model, messages array, and parameters like temperature and max_tokens. In Python: `client = OpenAI(); response = client.chat.completions.create(model=\"gpt-4o\", messages=[{\"role\": \"user\", \"content\": \"Hello\"}])`. Responses include the generated text, token usage, and safety filters.",
              ai: "OpenAI's API powers thousands of production applications. Its function calling, structured outputs (JSON mode), and streaming capabilities make it the go-to choice for rapid prototyping and production deployment."
            }
          },
          {
            id: "genai-gemini",
            title: "Google Gemini",
            prerequisites: ["genai-openai"],
            duration: "8 min",
            content: {
              what: "Google Gemini is a multimodal AI model family (Flash, Pro, Ultra) accessible through the Google AI API and Vertex AI. Gemini natively handles text, images, audio, and video in a single model, with context windows up to 1 million tokens.",
              why: "Gemini offers unique advantages: the largest context window in the industry (1M tokens), native multimodal understanding, tight integration with Google Cloud services, and competitive pricing. For applications requiring long-document analysis or video understanding, Gemini is often the best choice.",
              how: "Use the `google-genai` SDK: `from google import genai; client = genai.Client(); response = client.models.generate_content(model=\"gemini-2.0-flash\", contents=\"Hello\")`. Gemini supports the same chat format as OpenAI but adds native image/audio input, grounding with Google Search, and code execution capabilities.",
              ai: "Gemini's massive context window enables use cases impossible with other models — entire codebases, long videos, or hours of audio can be processed in a single request without chunking."
            }
          },
          {
            id: "genai-claude",
            title: "Anthropic Claude",
            prerequisites: ["genai-openai"],
            duration: "8 min",
            content: {
              what: "Anthropic's Claude is a family of language models (Haiku, Sonnet, Opus) designed with a focus on safety, helpfulness, and honesty. Claude excels at nuanced reasoning, long-form analysis, coding, and following complex multi-step instructions with high fidelity.",
              why: "Claude consistently leads in safety benchmarks while maintaining competitive or superior capability on complex tasks. Its strong performance on instruction following, code generation, and analysis makes it a preferred choice for enterprise applications where reliability and safety are paramount.",
              how: "Use the Anthropic SDK: `from anthropic import Anthropic; client = Anthropic(); message = client.messages.create(model=\"claude-sonnet-4-20250514\", max_tokens=1024, messages=[{\"role\": \"user\", \"content\": \"Hello\"}])`. Claude supports extended thinking, tool use, and can process documents and images directly in the messages API.",
              ai: "Claude's extended thinking mode enables deep reasoning on complex problems. Its strong alignment and refusal behaviors make it particularly suitable for high-stakes applications in healthcare, finance, and legal domains."
            }
          },
          {
            id: "genai-open-source-models",
            title: "Open-Source Models",
            prerequisites: ["genai-openai"],
            duration: "10 min",
            content: {
              what: "Open-source LLMs like Meta's Llama 3, Mistral, Qwen, DeepSeek, and Google's Gemma are freely available models that can be self-hosted or accessed through APIs. They range from 1B to 405B parameters with commercial-friendly licenses.",
              why: "Open-source models eliminate vendor lock-in, reduce costs at scale (no per-token API fees), enable fine-tuning without restrictions, and allow deployment on-premise for data privacy. They're essential for applications requiring data sovereignty, custom behavior, or processing sensitive information.",
              how: "Host locally with frameworks like Ollama (`ollama run llama3.1`), vLLM (`vllm serve meta-llama/Llama-3.1-70B`), or llama.cpp. Access via APIs from Together AI, Fireworks, or Groq. Performance varies widely — Llama 3.1 405B approaches GPT-4 level, while smaller models like Mistral 7B are efficient for simpler tasks.",
              ai: "Open-source models are increasingly competitive with proprietary ones. Many production deployments use them as draft models for speculative decoding, as fine-tuned specialists in multi-model pipelines, or as the primary model when cost and privacy are constraints."
            }
          }
        ]
      },
      {
        id: "genai-prompt-engineering",
        title: "Prompt Engineering",
        lessons: [
          {
            id: "genai-system-prompts",
            title: "System Prompts",
            prerequisites: ["genai-openai"],
            duration: "8 min",
            content: {
              what: "System prompts are special messages that set the model's behavior, role, and constraints before the user conversation begins. They define the persona, response style, output format, and boundaries for the model's behavior throughout the conversation.",
              why: "Without a system prompt, models use their default behavior which may not match your application's needs. System prompts are the primary mechanism for customizing model behavior without fine-tuning — they're your instructions to the model about how it should act in your specific context.",
              how: "System prompts are sent as a message with role \"system\" (OpenAI) or in the system instruction parameter (Claude). Effective system prompts include: role definition (\"You are a medical assistant\"), output format (\"Respond in JSON\"), constraints (\"Never make up facts\"), and examples. They're placed before user messages in the API call.",
              ai: "System prompts are the most important tool for controlling LLM behavior in production. Well-crafted system prompts reduce hallucination, ensure consistent formatting, and establish safety boundaries."
            }
          },
          {
            id: "genai-few-shot",
            title: "Few-Shot Prompting",
            prerequisites: ["genai-system-prompts"],
            duration: "8 min",
            content: {
              what: "Few-shot prompting provides the model with examples of desired input-output pairs within the prompt before asking it to process a new input. Zero-shot gives no examples, one-shot provides one, and few-shot typically provides 2-5 demonstrations of the expected behavior.",
              why: "LLMs learn in-context from examples without any weight updates. Few-shot examples show the model exactly what format, tone, and reasoning style you expect, dramatically improving performance on tasks where the system prompt alone is ambiguous or insufficient.",
              how: "Structure the prompt with labeled examples: `Classify the sentiment.\n\nText: I love this product → Positive\nText: Terrible quality → Negative\nText: It's okay I guess → ???`. The model infers the task from the pattern. For complex tasks, chain-of-thought examples showing reasoning steps are especially effective.",
              ai: "Few-shot prompting is the most cost-effective way to improve model performance. It's used in production for classification, extraction, formatting, and any task where consistent output structure is required."
            }
          },
          {
            id: "genai-structured-output",
            title: "Structured Output",
            prerequisites: ["genai-few-shot"],
            duration: "10 min",
            content: {
              what: "Structured output techniques ensure LLM responses conform to a specific format — typically JSON, XML, or YAML — enabling reliable parsing and downstream processing. This is achieved through prompt instructions, JSON mode, or schema enforcement (tool calling / response_format parameter).",
              why: "Raw LLM output is unstructured text that's difficult to parse programmatically. Structured output is essential for any application that needs to extract specific fields, populate databases, trigger workflows, or integrate with APIs that expect defined data formats.",
              how: "Simple approach: include 'Respond in JSON format' in the prompt. Reliable approach: use `response_format={\"type\": \"json_schema\", \"schema\": {...}}` in the OpenAI API or Claude's tool use to enforce a schema. The model is constrained to produce valid JSON matching the schema, eliminating parsing failures.",
              ai: "Structured output is critical for production AI systems. Every function calling, agent, and data extraction pipeline relies on getting machine-parseable output from LLMs."
            }
          },
          {
            id: "genai-prompt-chaining",
            title: "Prompt Chaining",
            prerequisites: ["genai-structured-output"],
            duration: "8 min",
            content: {
              what: "Prompt chaining is a technique that decomposes complex tasks into a sequence of simpler prompts, where the output of one prompt becomes the input to the next. Each step in the chain handles a focused subtask, producing more reliable results than a single complex prompt.",
              why: "LLMs perform poorly when asked to do too many things at once — accuracy degrades, instructions get ignored, and output quality becomes unpredictable. Chaining breaks complex workflows into manageable steps, each with clear instructions and verifiable outputs.",
              how: "A research chain might be: Step 1 (extract topic) → Step 2 (generate search queries) → Step 3 (summarize results) → Step 4 (write analysis). Each step has its own prompt template and output parser. Frameworks like LangChain, LlamaIndex, and the Anthropic Claude SDK provide built-in chaining primitives.",
              ai: "Most production AI systems use prompt chains internally. A customer support bot might chain: classify intent → retrieve relevant docs → draft response → check compliance → format output."
            }
          },
          {
            id: "genai-tool-use-prompting",
            title: "Tool Calling",
            prerequisites: ["genai-prompt-chaining"],
            duration: "10 min",
            content: {
              what: "Tool calling (function calling) allows LLMs to request the execution of external functions by outputting structured calls with parameters. The model decides when to call a tool, which tool to use, and what arguments to pass based on the user's request and available tool definitions.",
              why: "LLMs are limited to generating text — they cannot access databases, call APIs, perform calculations, or interact with external systems. Tool calling bridges this gap by letting the model generate structured function calls that the application code executes, combining LLM reasoning with real-world actions.",
              how: "Define tools in the API request with name, description, and JSON schema for parameters. The model outputs a tool call object when it determines a tool is needed. Your code executes the function, then feeds the result back as a tool result message. The model incorporates the result into its response. Example: model outputs `{name: \"get_weather\", args: {city: \"Paris\"}}`.",
              ai: "Tool calling is the foundation of AI agents and the key mechanism for making LLMs useful in real applications. Every AI assistant, coding copilot, and automated workflow relies on tool calling to take action."
            }
          }
        ]
      },
      {
        id: "genai-embeddings",
        title: "Embeddings",
        lessons: [
          {
            id: "genai-text-embeddings",
            title: "Text Embeddings",
            prerequisites: ["genai-openai"],
            duration: "10 min",
            content: {
              what: "Text embeddings are dense vector representations that capture the semantic meaning of text in a continuous vector space. Models like OpenAI's text-embedding-3-large or open-source models like BGE convert text snippets into fixed-length vectors (e.g., 3072 dimensions) where semantically similar text produces similar vectors.",
              why: "Embeddings enable semantic search — finding text that means the same thing even if it uses different words. Unlike keyword search, embeddings understand that \"automobile\" and \"car\" are similar, enabling powerful retrieval systems, recommendation engines, and clustering applications.",
              how: "Call an embedding API: `response = client.embeddings.create(model=\"text-embedding-3-large\", input=\"Machine learning is fascinating\")`. The response contains a vector of floats. To compare two texts, compute their cosine similarity: `similarity = dot(a, b) / (norm(a) * norm(b))`. Values near 1.0 indicate high similarity.",
              ai: "Embeddings are the backbone of RAG systems, semantic search, and recommendation systems. They bridge unstructured text and mathematical operations, making it possible to search, cluster, and compare text by meaning."
            }
          },
          {
            id: "genai-vector-representations",
            title: "Vector Representations",
            prerequisites: ["genai-text-embeddings"],
            duration: "8 min",
            content: {
              what: "Vector representations place text (or other data) in a high-dimensional geometric space where distance corresponds to semantic similarity. In this space, related concepts cluster together — synonyms are close, antonyms are far, and analogies maintain consistent geometric relationships (e.g., king - man + woman ≈ queen).",
              why: "The vector space structure enables mathematical operations on meaning. You can find nearest neighbors (similar items), compute centroids (average meaning), perform analogy reasoning, and detect outliers. This structure is what makes vector search and retrieval possible.",
              how: "Embedding models are trained to map similar texts close together using contrastive learning — pulling positive pairs closer and pushing negatives apart. The resulting space has emergent properties like linear analogies. Dimensionality (768 to 3072) determines the space's capacity. Higher dimensions capture more nuance but increase storage and compute costs.",
              ai: "Understanding vector representations is essential for designing effective retrieval systems. The choice of embedding model, dimensionality, and distance metric directly impacts downstream AI application quality."
            }
          },
          {
            id: "genai-similarity",
            title: "Similarity Metrics",
            prerequisites: ["genai-vector-representations"],
            duration: "8 min",
            content: {
              what: "Similarity metrics quantify how close two vectors are in the embedding space. The most common are cosine similarity (angle between vectors), dot product (magnitude-aware similarity), and Euclidean distance (straight-line distance). Each has different properties and use cases.",
              why: "Different similarity metrics are appropriate for different scenarios. Cosine similarity is preferred for text search because it's invariant to vector magnitude. Dot product is faster and works well when vectors are normalized. Euclidean distance is intuitive but less common for high-dimensional embeddings.",
              how: "Cosine similarity: `sim = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))`, range [-1, 1]. Dot product: `sim = np.dot(a, b)` — faster but sensitive to magnitude. L2 distance: `dist = np.linalg.norm(a - b)`. Most vector databases support all three. For normalized vectors, cosine and dot product are equivalent.",
              ai: "Choosing the right similarity metric affects retrieval quality. Most embedding models are trained for cosine similarity, so using dot product on non-normalized vectors can produce unexpected results. Always match the metric to what the model was trained with."
            }
          }
        ]
      },
      {
        id: "genai-vector-databases",
        title: "Vector Databases",
        lessons: [
          {
            id: "genai-pinecone",
            title: "Pinecone",
            prerequisites: ["genai-similarity"],
            duration: "8 min",
            content: {
              what: "Pinecone is a fully managed cloud vector database optimized for high-performance similarity search at scale. It handles indexing, storage, and querying of vector embeddings with sub-100ms latency, supporting billions of vectors with automatic scaling and built-in metadata filtering.",
              why: "Storing vectors in a regular database and computing similarity naively doesn't scale — searching 1 million 1536-dimensional vectors requires comparing against every single one. Pinecone uses approximate nearest neighbor (ANN) algorithms like HNSW to return similar results in milliseconds regardless of dataset size.",
              how: "Create an index: `index = pinecone.Index(\"my-index\")`. Upsert vectors with metadata: `index.upsert(vectors=[(id, vector, {\"source\": \"doc1\"})])`. Query with filters: `results = index.query(vector=query_embedding, top_k=10, filter={\"source\": \"doc1\"})`. Pinecone handles indexing, replication, and scaling automatically.",
              ai: "Pinecone is ideal for production RAG systems where you need reliable, low-latency vector search without managing infrastructure. Its managed nature eliminates operational complexity."
            }
          },
          {
            id: "genai-qdrant",
            title: "Qdrant",
            prerequisites: ["genai-similarity"],
            duration: "8 min",
            content: {
              what: "Qdrant is an open-source vector database written in Rust, offering both self-hosted and cloud deployment options. It provides high-performance vector search with rich filtering, payload storage, and advanced features like multi-vector search and sparse vectors.",
              why: "Qdrant offers a compelling alternative to managed services by providing enterprise features (RBAC, backups, horizontal scaling) in an open-source package. Its Rust implementation delivers excellent performance, and self-hosting gives you full control over data privacy and costs.",
              how: "Deploy with Docker: `docker run -p 6333:6333 qdrant/qdrant`. Create a collection, insert vectors with payloads, and search: `client.search(collection_name=\"docs\", query_vector=[0.1, 0.2], limit=10, query_filter={...})`. Qdrant supports filtering by payload fields, multiple named vectors, and quantization for memory efficiency.",
              ai: "Qdrant is popular in AI engineering for its balance of features, performance, and cost. Its support for sparse vectors makes it suitable for hybrid search combining keyword and semantic matching."
            }
          },
          {
            id: "genai-chroma",
            title: "Chroma",
            prerequisites: ["genai-similarity"],
            duration: "6 min",
            content: {
              what: "Chroma is a lightweight, open-source vector database designed for simplicity and rapid development. It runs embedded in your Python application (like SQLite for vectors), requires no separate server, and provides a minimal API for storing, querying, and managing embeddings.",
              why: "During development and prototyping, spinning up a full vector database is overkill. Chroma lets you add vector search to any Python application with minimal setup, making it ideal for experimentation, small-scale applications, and learning vector search concepts.",
              how: "Install with `pip install chromadb`. Create a collection and add documents: `collection = chroma_client.create_collection(\"docs\"); collection.add(documents=[\"text\"], metadatas=[{\"source\": \"web\"}])`. Chroma automatically generates embeddings using a default model or accepts pre-computed vectors. Query: `collection.query(query_texts=[\"search term\"], n_results=5)`.",
              ai: "Chroma is perfect for prototyping RAG applications. Many developers start with Chroma for local development and migrate to Qdrant or Pinecone for production scale."
            }
          }
        ]
      },
      {
        id: "genai-rag",
        title: "Retrieval-Augmented Generation (RAG)",
        lessons: [
          {
            id: "genai-rag-documents",
            title: "Document Processing",
            prerequisites: ["genai-chroma"],
            duration: "8 min",
            content: {
              what: "Document processing is the first step in a RAG pipeline — extracting and normalizing text from various source formats (PDFs, HTML, Word documents, emails, databases) into clean, structured text that can be chunked and embedded for retrieval.",
              why: "Raw documents are messy: PDFs have complex layouts, HTML has navigation and ads mixed with content, and Word docs have formatting metadata. Poor document processing leads to irrelevant content in your retrieval index, which directly degrades RAG output quality.",
              how: "Use libraries like LlamaIndex's `SimpleDirectoryReader`, Unstructured, or Apache Tika to parse documents. For PDFs, PyMuPDF or pdfplumber extract text while preserving structure. After extraction, clean the text by removing headers, footers, and boilerplate. Libraries like `langchain.document_loaders` provide standardized interfaces for 100+ formats.",
              ai: "The quality of your RAG system is bounded by the quality of your document processing. Investing in clean, well-structured document extraction yields outsized improvements in retrieval accuracy."
            }
          },
          {
            id: "genai-rag-chunking",
            title: "Chunking Strategies",
            prerequisites: ["genai-rag-documents"],
            duration: "10 min",
            content: {
              what: "Chunking is the process of splitting documents into smaller segments (chunks) that will be individually embedded and stored. Chunk size typically ranges from 200-1000 tokens, and the strategy used (fixed-size, semantic, recursive, or document-aware) significantly affects retrieval quality.",
              why: "Embedding a 50-page document as a single vector loses too much detail — the embedding averages all the concepts into a generic representation. Chunking creates focused segments that can be precisely matched to queries. But chunks that are too small lose context, and chunks that are too large dilute relevance.",
              how: "Fixed-size chunking splits at every N tokens with optional overlap: `RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)`. Semantic chunking splits at topic boundaries using embedding similarity. Document-aware chunking respects natural boundaries (paragraphs, sections, headings). Overlap between chunks ensures no information is lost at boundaries.",
              ai: "Chunking strategy is one of the highest-leverage tuning parameters in RAG. A well-chunked document set can improve retrieval recall by 30-50% compared to naive fixed-size chunking."
            }
          },
          {
            id: "genai-rag-embeddings",
            title: "RAG Embeddings",
            prerequisites: ["genai-rag-chunking"],
            duration: "6 min",
            content: {
              what: "In a RAG pipeline, both the document chunks and user queries are converted to embedding vectors using the same embedding model. This ensures that chunks and queries exist in the same vector space, enabling meaningful similarity comparisons during retrieval.",
              why: "Consistent embedding is critical — if you embed documents with one model and queries with another, the vectors won't be comparable and retrieval will fail. The choice of embedding model also affects quality: larger models capture more nuance but cost more and are slower.",
              how: "Select an embedding model (e.g., text-embedding-3-large, BGE-large, or Cohere embed-v3). Embed all chunks during indexing: `embeddings = client.embeddings.create(model=\"text-embedding-3-large\", inputs=chunks)`. Store vectors with their source text and metadata. At query time, embed the user's question with the same model.",
              ai: "Many RAG failures trace back to embedding mismatches or poor embedding model choices. Matching your embedding model to your domain and query patterns is essential for high-quality retrieval."
            }
          },
          {
            id: "genai-rag-vector-db",
            title: "RAG Vector Storage",
            prerequisites: ["genai-rag-embeddings"],
            duration: "6 min",
            content: {
              what: "Vector storage in RAG involves indexing embedded chunks in a vector database with their original text and metadata. The database provides efficient similarity search, metadata filtering, and scalable storage that enables fast retrieval of relevant chunks at query time.",
              why: "Storing vectors in-memory or flat arrays only works for small datasets. Vector databases provide the indexing structures (HNSW, IVF) needed for sub-linear search time, along with persistence, filtering, replication, and scaling features required for production systems.",
              how: "When building a RAG pipeline, you upsert each chunk as a vector with metadata (source document, chunk index, section title). The vector database builds an HNSW index automatically. At query time, similarity search returns the top-k most relevant chunks in milliseconds, even across millions of vectors.",
              ai: "The vector database is the memory of your RAG system. Its configuration (index type, dimensionality, HNSW parameters) directly affects retrieval speed, accuracy, and cost."
            }
          },
          {
            id: "genai-rag-retrieval",
            title: "Retrieval Strategies",
            prerequisites: ["genai-rag-vector-db"],
            duration: "10 min",
            content: {
              what: "Retrieval is the process of finding the most relevant chunks for a user's query from the vector database. Beyond basic similarity search, strategies include hybrid search (combining keyword and semantic), re-ranking (using a cross-encoder to score relevance), and query transformation (rewriting ambiguous queries).",
              why: "Basic vector similarity often misses relevant results — the user's phrasing may not match the document's vocabulary, or the most relevant chunk may not be the most semantically similar. Multi-stage retrieval significantly improves recall and precision by combining different signal types.",
              how: "Hybrid search combines BM25 keyword matching with vector search: `results = hybrid_search(query, alpha=0.7)` where alpha weights semantic vs. keyword scores. Re-ranking uses a cross-encoder model to re-score the top-k results: `reranker.score(query, chunk)`. Query expansion generates multiple query variants to improve recall.",
              ai: "Production RAG systems almost always use multi-stage retrieval. A common pipeline: semantic search (top-50) → keyword filtering → re-ranking (top-10) → LLM generation."
            }
          },
          {
            id: "genai-rag-llm",
            title: "RAG Prompt Construction",
            prerequisites: ["genai-rag-retrieval"],
            duration: "8 min",
            content: {
              what: "RAG prompt construction assembles retrieved chunks into a context block that is combined with the user's query to form the complete prompt sent to the LLM. This involves formatting chunks, managing context window limits, and crafting instructions that guide the LLM to use the provided context effectively.",
              why: "How you present retrieved context to the LLM dramatically affects output quality. Poorly formatted context leads to hallucination, ignored information, or confused responses. Well-constructed RAG prompts ensure the LLM grounds its answers in the provided documents.",
              how: "A typical RAG prompt template: `You are a helpful assistant. Answer the question based on the following context:\n\nContext:\n{chunk_1}\n{chunk_2}\n...\n\nQuestion: {query}\n\nAnswer:`. Include source attribution, handle cases where context doesn't contain the answer, and limit total context to stay within the model's window.",
              ai: "Prompt construction is where many RAG systems fail in production. The prompt must balance including enough context for accurate answers while staying within token limits and guiding the model to cite sources."
            }
          },
          {
            id: "genai-rag-answer",
            title: "Answer Generation & Quality",
            prerequisites: ["genai-rag-llm"],
            duration: "8 min",
            content: {
              what: "Answer generation is the final step of RAG where the LLM produces a response grounded in the retrieved context. Quality assurance involves evaluating faithfulness (does the answer come from the context?), relevance (does it address the question?), and completeness (does it cover all aspects?).",
              why: "Even with perfect retrieval, the LLM can still hallucinate, misinterpret context, or give incomplete answers. Systematic quality evaluation catches these issues and provides metrics for iterative improvement of the entire RAG pipeline.",
              how: "Generate answers with confidence indicators and source citations. Evaluate with RAGAS metrics: faithfulness (LLM judges if answer is supported by context), answer relevance (does the answer address the query?), and context precision (are the retrieved chunks actually relevant?). Use these metrics to identify whether failures are in retrieval or generation.",
              ai: "RAG quality evaluation is essential for production systems. Automated evaluation enables continuous monitoring and improvement, catching degradation before users notice."
            }
          }
        ]
      }
    ],
    checkpoint: {
      id: "checkpoint-genai",
      title: "Generative AI Checkpoint",
      passingScore: 80,
      questionIds: []
    },
    projectIds: ["pdf-chatbot","documentation-chatbot","personal-knowledge-base"]
  },
  // ═══════════════════════════════════════════════════════════════════
  // STAGE 11 — AI Agents
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "agents",
    number: 11,
    title: "AI Agents",
    description:
      "Learn how to build autonomous AI agents that can plan, reason, use tools, and take actions to accomplish complex multi-step tasks.",
    difficulty: "advanced",
    icon: "🤖",
    prerequisites: ["genai"],
    topics: [
      {
        id: "agent-fundamentals",
        title: "Agent Fundamentals",
        lessons: [
          {
            id: "agent-tools",
            title: "Tools & Tool Definitions",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "Tools are external functions or APIs that an AI agent can invoke to interact with the world beyond text generation. Each tool is defined with a name, description, and parameter schema that the LLM uses to decide when and how to call it.",
              why: "Language models can only generate text — they cannot search the web, execute code, query databases, or control software. Tools extend the agent's capabilities, transforming it from a text generator into an action-taking system that can affect real-world outcomes.",
              how: "Define tools as JSON schemas: `{name: \"search_web\", description: \"Search the internet\", parameters: {query: {type: \"string\", description: \"Search query\"}}}`. Pass these definitions in the API request. The LLM receives the tool descriptions and generates structured function calls when it determines a tool would help accomplish the task.",
              ai: "Tools are the bridge between LLM reasoning and real-world action. Every AI agent system — from coding assistants to autonomous research agents — is built on the tool calling paradigm."
            }
          },
          {
            id: "agent-tool-calling",
            title: "Tool Calling Mechanics",
            prerequisites: ["agent-tools"],
            duration: "10 min",
            content: {
              what: "Tool calling is the mechanism by which an LLM generates a structured request to execute an external function. The process involves the model deciding a tool is needed, selecting the appropriate tool, generating valid arguments, and then processing the tool's return value to continue reasoning.",
              why: "Without understanding tool calling mechanics, agents fail silently — generating invalid arguments, calling wrong tools, or getting stuck after receiving results. Proper error handling, argument validation, and result integration are essential for reliable agent behavior.",
              how: "The LLM outputs a tool_use block: `{type: \"tool_use\", id: \"call_1\", name: \"get_weather\", input: {city: \"Paris\", unit: \"celsius\"}}`. Your code validates the arguments, executes the function, and returns: `{type: \"tool_result\", tool_use_id: \"call_1\", content: \"22°C, sunny\"}`. The model then incorporates this result into its reasoning.",
              ai: "Robust tool calling requires careful implementation: validate arguments before execution, handle timeouts and errors gracefully, set maximum iteration limits to prevent infinite loops, and log all tool calls for debugging."
            }
          },
          {
            id: "agent-planning",
            title: "Planning",
            prerequisites: ["agent-tool-calling"],
            duration: "10 min",
            content: {
              what: "Planning is the agent's ability to decompose a complex task into a sequence of manageable steps before or during execution. A plan might involve researching information, making decisions, executing actions, and evaluating results in a structured order.",
              why: "Complex tasks like \"research competitors and create a market analysis report\" require multiple information gathering steps, analysis, and synthesis. Without planning, agents either attempt everything at once (overwhelming the context) or take random actions without a coherent strategy.",
              how: "Planning can be explicit (the LLM generates a step-by-step plan as text before executing) or implicit (the model decides the next action based on current state). Explicit planning: \"Step 1: Search for competitor X. Step 2: Search for competitor Y. Step 3: Compare pricing. Step 4: Generate report.\" Re-planning adapts when initial plans encounter obstacles.",
              ai: "Planning is what separates simple chatbots from capable agents. The ability to break down tasks, track progress, and adapt plans is essential for autonomous AI systems."
            }
          },
          {
            id: "agent-memory",
            title: "Memory",
            prerequisites: ["agent-tool-calling"],
            duration: "10 min",
            content: {
              what: "Agent memory encompasses the mechanisms for storing and retrieving information across interactions and within a task. This includes short-term memory (conversation context), working memory (current task state), and long-term memory (persistent knowledge across sessions).",
              why: "Without memory, agents forget previous interactions, lose track of task progress, and cannot build on prior knowledge. Long-term memory enables personalization and learning from experience, while working memory lets agents track multi-step progress without re-reading everything.",
              how: "Short-term memory is the conversation history in the context window. Working memory uses structured state (JSON objects, databases) to track task progress. Long-term memory uses vector databases to store and retrieve past interactions, or knowledge graphs for structured facts. Implement with: `memory.store(key, value)` and `memory.retrieve(query)`.",
              ai: "Memory is critical for building agents that feel coherent and helpful over time. Production agents use hierarchical memory: recent context in the prompt, relevant past interactions from vector search, and persistent facts in a database."
            }
          },
          {
            id: "agent-reasoning",
            title: "Reasoning",
            prerequisites: ["agent-planning", "agent-memory"],
            duration: "10 min",
            content: {
              what: "Reasoning in agents refers to the LLM's ability to analyze information, draw conclusions, make decisions, and determine next steps based on available context, tools, and goals. This includes logical deduction, causal reasoning, and evaluation of multiple options.",
              why: "Agents must reason to decide which tools to use, how to interpret results, when a task is complete, and how to recover from failures. Without strong reasoning, agents make poor decisions, repeat failed actions, or pursue irrelevant paths.",
              how: "Reasoning is primarily driven by the LLM's chain-of-thought capabilities: the model explains its thinking step-by-step before taking action. Structured reasoning prompts force explicit analysis: \"Given what I've found, what should I do next? What are the alternatives? What could go wrong?\" Extended thinking modes (like Claude's) allocate additional computation to reasoning.",
              ai: "Reasoning quality is the primary determinant of agent performance. Models with stronger reasoning (Claude Opus, GPT-4o) produce more reliable agents, while reasoning failures are the most common cause of agent errors."
            }
          },
          {
            id: "agent-observation-action",
            title: "Observation-Action Loops",
            prerequisites: ["agent-reasoning"],
            duration: "10 min",
            content: {
              what: "The observation-action loop is the core execution cycle of an AI agent: the agent observes the current state, reasons about what to do, takes an action (often calling a tool), observes the result, and repeats until the task is complete or a stopping condition is met.",
              why: "This loop is the fundamental architecture of autonomous agents. Unlike single-turn Q&A, agents interact with their environment through multiple cycles, each time incorporating new information to make better decisions. The loop enables iterative refinement, error recovery, and progressive task completion.",
              how: "The loop: 1) Observe: gather current state (conversation, tool results, task progress). 2) Think: LLM reasons about the situation and decides the next action. 3) Act: execute the chosen tool or generate a response. 4) Repeat until done. Safety mechanisms include max iteration limits, timeout checks, and human-in-the-loop approval for high-stakes actions.",
              ai: "The observation-action loop with appropriate guardrails is how production AI agents operate. Each major framework (LangChain, CrewAI, Claude Agent SDK) implements this loop with varying levels of autonomy and safety."
            }
          }
        ]
      },
      {
        id: "agent-architectures",
        title: "Agent Architectures",
        lessons: [
          {
            id: "agent-react",
            title: "ReAct Pattern",
            prerequisites: ["agent-observation-action"],
            duration: "10 min",
            content: {
              what: "ReAct (Reasoning + Acting) is an agent pattern where the LLM alternates between generating reasoning traces (Thought) and taking actions (Action), then observing results (Observation). This interleaved thinking-doing pattern produces transparent, debuggable agent behavior.",
              why: "Pure reasoning without action is limited to text generation, while pure action without reasoning leads to random, ineffective behavior. ReAct combines both: the model explains why it's taking each action, enabling debugging, course correction, and more effective task completion.",
              how: "The prompt format: `Thought: I need to find the current stock price of Apple.\nAction: search_web(\"AAPL stock price\")\nObservation: AAPL is trading at $198.50\nThought: Now I have the price. The user asked...`. This loop continues until the agent produces a final answer without an action. Frameworks automate this pattern.",
              ai: "ReAct is the most widely used agent pattern and the foundation for most agent frameworks. Its transparency makes it particularly valuable for production systems where understanding agent decisions is critical."
            }
          },
          {
            id: "agent-tool-using",
            title: "Tool-Using Agents",
            prerequisites: ["agent-react"],
            duration: "8 min",
            content: {
              what: "Tool-using agents are systems that combine an LLM with a set of predefined tools, using the model's reasoning to determine which tools to call, in what order, and with what parameters. They extend the ReAct pattern with sophisticated tool selection and orchestration logic.",
              why: "Most real-world agent applications are fundamentally tool-using agents — coding assistants that write and execute code, research agents that search and analyze, data agents that query databases and generate reports. Mastering tool-using agents is essential for building practical AI applications.",
              how: "A tool-using agent maintains a tool registry, describes available tools in the system prompt, and processes tool calls in a loop. Key considerations: tool selection accuracy, parameter validation, parallel vs. sequential execution, result caching, and graceful degradation when tools fail.",
              ai: "Tool-using agents are the most practical agent architecture for production systems. They're simpler to build, debug, and control than more autonomous architectures while delivering most of the value."
            }
          },
          {
            id: "agent-multi-step",
            title: "Multi-Step Agents",
            prerequisites: ["agent-tool-using"],
            duration: "8 min",
            content: {
              what: "Multi-step agents handle tasks requiring sequences of dependent operations where each step's output feeds into the next. They maintain task state, track dependencies between steps, and can handle branching logic based on intermediate results.",
              why: "Many valuable tasks are inherently multi-step: \"Analyze our sales data, identify trends, generate a report, and email it to the team.\" Single-step agents can't handle these because they require planning, state management, and conditional execution across multiple tool calls.",
              how: "Multi-step agents use a task graph or state machine to track progress. Implementation patterns include: sequential chains (step N depends on step N-1), parallel branches (independent steps run simultaneously), conditional paths (different steps based on intermediate results), and error recovery (retry or alternative steps on failure).",
              ai: "Multi-step agents power complex workflows in AI engineering: automated code review, data pipeline construction, research synthesis, and end-to-end business process automation."
            }
          },
          {
            id: "agent-multi-agent",
            title: "Multi-Agent Systems",
            prerequisites: ["agent-multi-step"],
            duration: "10 min",
            content: {
              what: "Multi-agent systems coordinate multiple specialized AI agents to collaborate on complex tasks. Each agent has a defined role, expertise, and tools. They communicate through message passing, share context through shared memory, and can delegate subtasks to more specialized agents.",
              why: "Single agents face context window limits and become unreliable as task complexity increases. Multi-agent systems decompose complexity by giving each agent a focused scope. A coding agent handles implementation, a reviewer agent checks quality, and a planner agent coordinates — each excelling at its specialty.",
              how: "Common patterns: supervisor (one agent delegates to workers), peer-to-peer (agents negotiate), and hierarchical (managers delegate to sub-managers). Implement with frameworks like CrewAI, AutoGen, or custom orchestration. Communication uses structured messages with shared state: `agent_a.send(task=\"review code\", context=code_diff)`.",
              ai: "Multi-agent systems are the frontier of AI agent research. Microsoft's AutoGen, Google's A2A protocol, and multi-agent coding systems demonstrate that specialized agents collaborating outperform single generalist agents on complex tasks."
            }
          }
        ]
      },
      {
        id: "agent-mcp",
        title: "Model Context Protocol (MCP)",
        lessons: [
          {
            id: "agent-mcp-concepts",
            title: "MCP Concepts",
            prerequisites: ["agent-tool-calling"],
            duration: "8 min",
            content: {
              what: "The Model Context Protocol (MCP) is an open standard that defines how AI applications connect to external data sources and tools. It provides a universal interface — like USB for AI — that lets any MCP-compatible client (like Claude Desktop or Cursor) connect to any MCP server providing tools, data, or prompts.",
              why: "Before MCP, every AI application needed custom integrations for each tool and data source. MCP standardizes this: build one server, and it works everywhere. This dramatically reduces the cost of providing AI access to tools and data, and prevents vendor lock-in.",
              how: "MCP uses a client-server architecture over JSON-RPC. A host application (e.g., Claude Desktop) runs MCP clients that connect to MCP servers. Servers expose capabilities (tools, resources, prompts) that the client can discover and invoke. The protocol handles capability negotiation, authentication, and message routing.",
              ai: "MCP is rapidly becoming the standard for connecting AI models to external tools. Adopting MCP ensures your tools and data are accessible to any AI application that supports the protocol."
            }
          },
          {
            id: "agent-mcp-tools",
            title: "MCP Tools",
            prerequisites: ["agent-mcp-concepts"],
            duration: "8 min",
            content: {
              what: "MCP tools are server-defined functions that an AI client can invoke. Each tool has a name, description, and input schema defined in JSON Schema format. Tools are the MCP equivalent of function calling — they let the AI perform actions like querying databases, calling APIs, or manipulating files.",
              why: "MCP tools provide a standardized way to expose functionality to AI models. Unlike raw function calling which is provider-specific, MCP tools work across different AI clients. This means you can build a tool once and it works with Claude, GPT, Gemini, and any other MCP-compatible client.",
              how: "Define tools in your MCP server with name, description, and Zod/JSON Schema parameters. The client discovers tools via `tools/list` and invokes them via `tools/call`. Return content in standardized format (text, image, or resource references). Example: a server exposes `search_docs` tool that searches a documentation database and returns matching articles.",
              ai: "MCP tools are the primary mechanism for extending AI capabilities. Popular MCP servers provide tools for file systems, databases, APIs, browser control, and development tools."
            }
          },
          {
            id: "agent-mcp-resources",
            title: "MCP Resources",
            prerequisites: ["agent-mcp-concepts"],
            duration: "6 min",
            content: {
              what: "MCP resources are data sources that an AI client can read from, similar to read-only tools. Resources expose files, database records, API responses, or any structured data using URIs. Unlike tools (which perform actions), resources provide context and information to the model.",
              why: "AI models perform better with relevant context. Resources provide a standardized way to feed data into the model's context without requiring the model to explicitly request it. This enables applications like \"here are the relevant database records\" or \"this is the file you're working on\".",
              how: "Define resources with URIs: a file server might expose `file:///{path}` resources, a database server might expose `db:///{table}/{id}`. Clients subscribe to resources via `resources/subscribe` and read them via `resources/read`. Resources support dynamic URIs and template variables for flexible data access patterns.",
              ai: "MCP resources are essential for RAG-like patterns within the MCP ecosystem. They enable AI applications to access databases, files, and APIs as context without custom integration code."
            }
          },
          {
            id: "agent-mcp-prompts",
            title: "MCP Prompts",
            prerequisites: ["agent-mcp-concepts"],
            duration: "6 min",
            content: {
              what: "MCP prompts are reusable, parameterized prompt templates that MCP servers expose to clients. They allow servers to define domain-specific prompt patterns that encapsulate expert knowledge about how to interact with the server's tools and resources effectively.",
              why: "Users often don't know the best way to use a server's tools. MCP prompts capture domain expertise — a database server might provide a \"natural language query\" prompt that knows how to translate questions into SQL, while a file server might provide a \"code review\" prompt.",
              how: "Define prompts with a name, description, and arguments. Clients discover prompts via `prompts/list` and retrieve them via `prompts/get`. When retrieved, the server returns a structured message (or set of messages) that can include text, resource references, and embedded context. Prompts can include embedded resource references for automatic context loading.",
              ai: "MCP prompts make servers self-documenting and easier to use. They're particularly valuable for complex tools where knowing how to formulate the right request requires domain knowledge."
            }
          },
          {
            id: "agent-mcp-clients-servers",
            title: "MCP Clients & Servers",
            prerequisites: ["agent-mcp-tools", "agent-mcp-resources", "agent-mcp-prompts"],
            duration: "10 min",
            content: {
              what: "MCP architecture consists of servers (providers of tools, resources, and prompts) and clients (AI applications that consume them). Servers are lightweight programs that expose capabilities via the MCP protocol. Clients discover, connect to, and invoke server capabilities through a standardized interface.",
              why: "The client-server separation enables an ecosystem where tool providers and AI application developers can work independently. You can build an MCP server for your company's internal tools, and any MCP-compatible AI application can immediately use them without custom integration.",
              how: "Build servers with the MCP SDK: `new Server({name: \"my-server\", version: \"1.0\"}, {capabilities: {tools: {}, resources: {}}})`. Transport options: stdio (for local processes), SSE (for HTTP servers), or streamable HTTP. Clients manage connections, handle authentication, and multiplex multiple server connections. Claude Desktop, VS Code, and Cursor are popular MCP hosts.",
              ai: "MCP is creating a standardized ecosystem for AI tool integration. Organizations building MCP servers ensure their tools are accessible to all MCP-compatible AI applications, future-proofing their integrations."
            }
          }
        ]
      }
    ],
    checkpoint: {
      id: "checkpoint-agents",
      title: "AI Agents Checkpoint",
      passingScore: 80,
      questionIds: []
    },
    projectIds: ["research-agent","web-research-assistant","coding-assistant","multi-tool-ai-agent"]
  },
  // ═══════════════════════════════════════════════════════════════════
  // STAGE 12 — Generative AI Applications
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "genai-apps",
    number: 12,
    title: "Generative AI Applications",
    description:
      "Build real-world generative AI applications with streaming responses, chat interfaces, multimodal capabilities, and production-ready features.",
    difficulty: "advanced",
    icon: "🚀",
    prerequisites: ["genai"],
    topics: [
      {
        id: "genai-app-features",
        title: "Application Features",
        lessons: [
          {
            id: "genai-app-streaming",
            title: "Streaming Responses",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "Streaming responses deliver LLM output token-by-token to the user in real-time using Server-Sent Events (SSE) or WebSocket connections, rather than waiting for the complete response. This provides immediate feedback and dramatically improves perceived performance.",
              why: "LLM responses can take seconds to generate fully. Without streaming, users see a blank screen followed by a large text block — a poor experience. Streaming shows text appearing word-by-word, creating an engaging experience and reducing perceived latency from seconds to milliseconds.",
              how: "OpenAI streaming: `stream = client.chat.completions.create(stream=True, ...); for chunk in stream: print(chunk.choices[0].delta.content, end=\"\")`. On the server, use SSE: set `Content-Type: text/event-stream` and send `data: {chunk}\n\n` for each token. Frontend uses `EventSource` or `fetch` with a `ReadableStream` to consume the stream.",
              ai: "Streaming is a non-negotiable feature for production AI applications. Users expect immediate response feedback, and streaming also reduces time-to-first-token which is a key UX metric."
            }
          },
          {
            id: "genai-app-chat",
            title: "Chat Interfaces",
            prerequisites: ["genai-app-streaming"],
            duration: "10 min",
            content: {
              what: "Chat interfaces provide the conversational UI for interacting with LLMs, supporting message history display, user input, streaming response rendering, and conversation management. They range from simple message lists to sophisticated interfaces with markdown rendering, code highlighting, and rich content.",
              why: "The chat interface is the primary interaction layer between users and AI. Its design directly determines user satisfaction, adoption, and effectiveness. A well-designed chat UI handles long conversations, tool call visualization, error states, and response formatting gracefully.",
              how: "Key components: message list (scrollable, auto-scrolling), input area (with send button and keyboard shortcuts), message bubbles (with role indicators), response streaming (with cursor animation), markdown rendering (with syntax highlighting for code blocks), and action buttons (copy, regenerate, edit). Libraries like Vercel AI SDK provide pre-built React components.",
              ai: "Most AI applications are chat-based, making chat UI development a core skill. The best chat interfaces handle edge cases like tool calls, multi-modal responses, and streaming interruptions gracefully."
            }
          },
          {
            id: "genai-app-history",
            title: "Conversation History",
            prerequisites: ["genai-app-chat"],
            duration: "8 min",
            content: {
              what: "Conversation history management involves storing, retrieving, and formatting the sequence of user and assistant messages that form a conversation. This includes persistent storage, context window management (truncating old messages), and loading previous conversations.",
              why: "Users expect AI assistants to remember what they've said earlier in a conversation. Without history management, each message would be processed independently, losing all context. Proper history also enables conversation resumption across sessions and personalization over time.",
              how: "Store messages in a database with conversation_id, role, content, and timestamp fields. For each new request, load recent messages that fit within the model's context window. Common strategies: sliding window (keep last N messages), token budget (keep messages until token limit), or summarization (compress old messages into summaries). Format as message array for the API.",
              ai: "Conversation history is one of the most important features in production AI apps. Efficient storage and retrieval of message history directly impacts both cost (token usage) and quality (context availability)."
            }
          },
          {
            id: "genai-app-structured",
            title: "Structured Outputs in Apps",
            prerequisites: ["genai-app-history"],
            duration: "8 min",
            content: {
              what: "Implementing structured outputs in applications means defining schemas for LLM responses and using API features (JSON mode, tool calling, response_format) to ensure the model produces parseable, validated data rather than freeform text.",
              why: "Applications need predictable data structures to function — a search app needs structured search results, a form-filling app needs specific field values, and a data extraction app needs consistent schemas. Structured outputs eliminate fragile regex parsing and make applications reliable.",
              how: "Define a Zod or JSON schema for the expected output. OpenAI: `response_format={type: \"json_schema\", json_schema: {name: \"output\", schema: schema}}`. Claude: use tool_use with a single tool matching the desired schema. Always validate the parsed output against the schema on the receiving end, and handle malformed responses gracefully with retries or fallbacks.",
              ai: "Structured outputs are essential for integrating LLMs into application workflows. They bridge the gap between unstructured language and the structured data that applications require."
            }
          },
          {
            id: "genai-app-tool-calling",
            title: "Tool Calling in Applications",
            prerequisites: ["genai-app-structured"],
            duration: "10 min",
            content: {
              what: "Tool calling in applications involves defining available tools, processing the model's tool call requests, executing the corresponding functions, and feeding results back — all within the application's request-response cycle. This creates interactive systems where AI reasoning drives real actions.",
              why: "Static prompt-response interactions are limited. Tool calling enables dynamic applications where the AI can search databases, call external APIs, update records, send emails, and perform any programmable action — transforming passive AI into active AI assistants.",
              how: "Implementation: 1) Define tools with JSON schemas. 2) Send to API with the conversation. 3) Check response for tool_use content blocks. 4) Parse tool name and arguments. 5) Execute the function. 6) Append tool_result to messages. 7) Re-call the API with updated messages. 8) Repeat until the model produces a text response. Set max iterations to prevent infinite loops.",
              ai: "Tool calling is the primary mechanism for building AI applications that take action. Master this pattern and you can build assistants, copilots, and autonomous agents for virtually any domain."
            }
          },
          {
            id: "genai-app-file-uploads",
            title: "File Uploads & Processing",
            prerequisites: ["genai-app-tool-calling"],
            duration: "8 min",
            content: {
              what: "File upload handling in AI applications enables users to provide documents, images, audio, and other files for analysis. This involves upload infrastructure, format detection, content extraction, and routing to appropriate processing pipelines (text extraction for docs, vision models for images, etc.).",
              why: "Many AI use cases require analyzing user-provided content — summarizing a PDF, extracting data from a spreadsheet, describing an image, or transcribing audio. Without file upload support, users must manually copy-paste content, losing formatting and context.",
              how: "Common patterns: 1) Accept uploads via HTTP multipart form or drag-and-drop. 2) Detect file type (MIME type or extension). 3) Extract content: text extraction (pdfplumber, mammoth for .docx), image analysis (send to vision model), audio transcription (Whisper API). 4) Process content through appropriate AI pipeline. 5) Return results. Store files securely with access controls.",
              ai: "Multimodal file handling is increasingly important as AI models gain vision and audio capabilities. Applications that accept diverse file types and extract insights provide significantly more value than text-only systems."
            }
          }
        ]
      },
      {
        id: "genai-app-multimodal",
        title: "Multimodal AI",
        lessons: [
          {
            id: "genai-app-image-gen",
            title: "Image Generation",
            prerequisites: ["genai-app-streaming"],
            duration: "10 min",
            content: {
              what: "Image generation uses AI models to create images from text descriptions (text-to-image). Models like DALL-E 3, Stable Diffusion, and Midjourney convert natural language prompts into original images, enabling visual content creation without design skills.",
              why: "Visual content is essential for marketing, design, education, and creative applications. Image generation dramatically reduces the cost and time of creating custom visuals, enabling applications that generate product mockups, illustrations, presentations, and art on demand.",
              how: "OpenAI DALL-E: `client.images.generate(model=\"dall-e-3\", prompt=\"A sunset over mountains\", size=\"1024x1024\")`. Key techniques: prompt engineering (detailed, specific descriptions), negative prompts (what to exclude), style control (photorealistic, illustration, anime), and variations (generating multiple options). Latent diffusion models work by denoising random noise guided by text conditioning.",
              ai: "Image generation is transforming creative industries and is increasingly integrated into AI applications — from generating diagrams in response to data queries to creating marketing materials from brief descriptions."
            }
          },
          {
            id: "genai-app-speech-to-text",
            title: "Speech-to-Text (STT)",
            prerequisites: ["genai-app-streaming"],
            duration: "8 min",
            content: {
              what: "Speech-to-text (STT) or automatic speech recognition (ASR) converts spoken audio into written text. Models like OpenAI's Whisper can transcribe audio in 100+ languages with near-human accuracy, handling accents, background noise, and technical terminology.",
              why: "Voice is the most natural human interface, but AI systems traditionally only accept text. STT bridges this gap, enabling voice-driven AI assistants, meeting transcription, accessibility features, and applications where typing is impractical (driving, cooking, hands-free operation).",
              how: "OpenAI Whisper: `client.audio.transcriptions.create(model=\"whisper-1\", file=audio_file)`. Returns text with optional timestamps. For real-time applications, use streaming STT APIs. Key considerations: audio quality (sample rate, noise), language detection, punctuation and formatting, and speaker diarization (who said what).",
              ai: "STT is a critical component of voice AI systems. Combined with LLMs and text-to-speech, it enables full voice-based AI assistants like phone support bots and accessibility tools."
            }
          },
          {
            id: "genai-app-text-to-speech",
            title: "Text-to-Speech (TTS)",
            prerequisites: ["genai-app-speech-to-text"],
            duration: "8 min",
            content: {
              what: "Text-to-speech (TTS) converts written text into natural-sounding spoken audio. Modern neural TTS models like OpenAI's TTS and ElevenLabs produce highly natural, expressive speech with controllable speed, pitch, and emotional tone.",
              why: "Not all users can or want to read text output. TTS enables voice responses for AI assistants, accessibility for visually impaired users, language learning applications, audiobook generation, and hands-free information consumption during activities like driving.",
              how: "OpenAI TTS: `client.audio.speech.create(model=\"tts-1\", voice=\"alloy\", input=\"Hello, welcome to our service.\")`. Output is an audio file (MP3, WAV, etc.). Key parameters: voice selection (multiple voices with different characteristics), speed control, and output format. SSML (Speech Synthesis Markup Language) provides fine-grained control over pronunciation, pauses, and emphasis.",
              ai: "TTS completes the voice interaction loop with STT and LLMs. Production voice AI systems use streaming TTS to start speaking before the full response is generated, reducing perceived latency."
            }
          }
        ]
      }
    ],
    checkpoint: {
      id: "checkpoint-genai-apps",
      title: "Generative AI Applications Checkpoint",
      passingScore: 80,
      questionIds: []
    },
    projectIds: ["ai-assistant","ai-interview-coach","ai-tutor","ai-document-analyzer","ai-coding-assistant"]
  },
  // ═══════════════════════════════════════════════════════════════════
  // STAGE 13 — AI Engineering
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "ai-eng",
    number: 13,
    title: "AI Engineering",
    description:
      "Master the professional practices for building reliable AI systems: backend architecture, infrastructure, databases, evaluation, observability, and security.",
    difficulty: "advanced",
    icon: "⚙️",
    prerequisites: ["genai-apps"],
    topics: [
      {
        id: "aieng-backend",
        title: "Backend Engineering",
        lessons: [
          {
            id: "aieng-api-design",
            title: "API Design",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "API design for AI applications involves creating clean, consistent, and well-documented HTTP endpoints that expose AI capabilities. This includes RESTful conventions, request/response schemas, error handling, versioning, and OpenAPI documentation.",
              why: "A well-designed API is the contract between your AI capabilities and the applications that consume it. Poor API design leads to integration difficulties, inconsistent error handling, and developer frustration. Good design enables rapid adoption and reliable integration.",
              how: "Follow REST conventions: use nouns for resources, HTTP methods for actions, and consistent status codes. Design request/response schemas with JSON Schema or OpenAPI. Include pagination for list endpoints, proper error responses with error codes and messages, and versioning (e.g., `/api/v1/chat`). Use FastAPI, Express, or similar frameworks for automatic validation and documentation.",
              ai: "AI APIs often have unique considerations: streaming endpoints, long-running operations, and variable response times. Design endpoints that handle these gracefully with appropriate timeouts, status polling, and streaming protocols."
            }
          },
          {
            id: "aieng-auth",
            title: "Authentication & Authorization",
            prerequisites: ["aieng-api-design"],
            duration: "8 min",
            content: {
              what: "Authentication verifies user identity (who they are) while authorization determines what they can access (what they're allowed to do). For AI applications, this includes API key management, JWT tokens, OAuth flows, role-based access control (RBAC), and usage quotas per user.",
              why: "AI applications handle potentially sensitive data and expensive compute. Without proper auth, anyone could abuse your API, access private data, or run up enormous costs. Authentication and authorization are non-negotiable for any production system.",
              how: "Use API keys for service-to-service auth: `Authorization: Bearer sk-...`. For user-facing apps, implement JWT tokens with short expiry and refresh tokens. RBAC assigns roles (admin, user, viewer) with permission sets. Rate limit per API key. Store keys hashed, never in code. Use environment variables for secrets. Libraries like NextAuth, Passport, or Clerk simplify implementation.",
              ai: "AI-specific auth considerations: tool calling requires permission scoping (which tools can this user invoke?), and RAG systems need data access controls (which documents can this user query?)."
            }
          },
          {
            id: "aieng-rate-limiting",
            title: "Rate Limiting",
            prerequisites: ["aieng-api-design"],
            duration: "6 min",
            content: {
              what: "Rate limiting controls how many requests a user or API key can make within a given time window. Common strategies include fixed windows (N requests per minute), sliding windows, and token buckets. Limits can be per-user, per-endpoint, or global.",
              why: "Without rate limiting, a single user or bot can overwhelm your system, consuming all available resources and degrading service for everyone. Rate limiting also controls costs (LLM API calls are expensive) and prevents abuse patterns like scraping or brute-force attacks.",
              how: "Implement with middleware: `@rate_limit(max_requests=60, window_seconds=60)`. Use Redis for distributed rate limiting: increment a counter per user per window, reject when limit exceeded. Return `429 Too Many Requests` with `Retry-After` header. Different limits for different tiers (free: 10 req/min, pro: 100 req/min). Token bucket algorithm allows bursts while maintaining average rate.",
              ai: "AI applications need tiered rate limits because LLM calls vary enormously in cost — a simple classification might cost $0.001 while a complex agent loop could cost $0.50. Consider token-based limiting alongside request-based limiting."
            }
          },
          {
            id: "aieng-background-jobs",
            title: "Background Jobs",
            prerequisites: ["aieng-api-design"],
            duration: "8 min",
            content: {
              what: "Background jobs are tasks that run asynchronously outside the request-response cycle. For AI applications, this includes long-running inference, batch processing, document indexing, fine-tuning jobs, and scheduled tasks like model evaluation and cleanup.",
              why: "Many AI operations are too slow for synchronous HTTP requests — fine-tuning takes hours, large document processing takes minutes. Background jobs let you acknowledge the request immediately, process asynchronously, and notify the user when complete, providing a responsive user experience.",
              how: "Use job queues like Bull/BullMQ (Redis-backed), Celery (Python), or cloud services (AWS SQS, Google Cloud Tasks). Define job types with handlers: `queue.process('embed-doc', async (job) => { await embedDocument(job.data) })`. Track job status in database. Implement retries with exponential backoff. Notify via webhooks or polling endpoints.",
              ai: "Background job infrastructure is essential for production AI systems. Document embedding, RAG index updates, model fine-tuning, and evaluation pipelines all run as background jobs in well-architected systems."
            }
          }
        ]
      },
      {
        id: "aieng-infra",
        title: "AI Infrastructure",
        lessons: [
          {
            id: "aieng-model-apis",
            title: "Model API Integration",
            prerequisites: ["aieng-api-design"],
            duration: "8 min",
            content: {
              what: "Model API integration involves building a reliable abstraction layer over LLM provider APIs (OpenAI, Anthropic, Google, open-source). This layer handles retries, timeouts, error translation, response normalization, and provider-specific quirks behind a unified interface.",
              why: "Directly coupling your application to a single LLM provider creates vendor lock-in and fragility. If OpenAI goes down, your entire application fails. An abstraction layer enables provider switching, fallback routing, and consistent error handling regardless of which model is called.",
              how: "Create a unified interface: `class ModelClient: def complete(self, messages, model, **kwargs) → Response`. Implement provider-specific adapters. Handle retries with exponential backoff: `retry(attempts=3, backoff=2, on=[429, 500, 503])`. Normalize responses to common format. Log all calls with latency, tokens, and cost. Use the Vercel AI SDK's `provider` abstraction as a reference pattern.",
              ai: "A robust model API layer is the foundation of AI engineering. It enables A/B testing between models, graceful degradation during outages, and cost optimization by routing to the cheapest capable model."
            }
          },
          {
            id: "aieng-model-routing",
            title: "Model Routing",
            prerequisites: ["aieng-model-apis"],
            duration: "8 min",
            content: {
              what: "Model routing is the practice of directing different requests to different LLM models based on task complexity, cost constraints, latency requirements, or content type. Simple queries go to fast/cheap models while complex reasoning tasks go to powerful/expensive models.",
              why: "Using GPT-4 for every request is wasteful — a simple classification doesn't need the same model as a complex analysis. Model routing can reduce costs by 70-80% while maintaining quality by matching model capability to task difficulty.",
              how: "Implement a router: 1) Complexity classifier (small model or heuristics determines task difficulty). 2) Model registry (maps difficulty levels to models). 3) Fallback chain (try primary model, fall back to alternatives). Example: classification → GPT-4o-mini, analysis → GPT-4o, complex reasoning → Claude Opus. Monitor quality per route to tune routing decisions.",
              ai: "Model routing is a key technique for cost optimization in production AI. The most effective implementations use a small model to classify request complexity before routing to the appropriate (and cost-effective) model."
            }
          },
          {
            id: "aieng-caching",
            title: "AI Caching",
            prerequisites: ["aieng-model-apis"],
            duration: "8 min",
            content: {
              what: "AI caching stores the results of LLM calls to avoid redundant computation. This includes exact-match caching (same input → same output), semantic caching (similar inputs → cached output), and prompt caching (provider-level caching of prompt prefixes).",
              why: "LLM API calls cost money and take time. If 30% of your requests are similar or identical, caching those results saves significant cost and improves latency from seconds to milliseconds. Caching is one of the highest-ROI optimizations in AI engineering.",
              how: "Exact-match: hash the prompt + parameters, store result in Redis with TTL: `cache.set(hash_key, result, ttl=3600)`. Semantic caching: embed the query, find nearest cached embedding, reuse if similarity > threshold. Prompt caching: use OpenAI's or Anthropic's prompt caching to cache system prompts and repeated context (up to 90% cost reduction). Cache invalidation: TTL-based, content-based, or manual.",
              ai: "Caching is essential for production AI economics. A well-implemented caching layer can reduce LLM API costs by 30-60% for applications with repetitive query patterns like FAQ bots or documentation search."
            }
          },
          {
            id: "aieng-queues",
            title: "Message Queues",
            prerequisites: ["aieng-background-jobs"],
            duration: "6 min",
            content: {
              what: "Message queues (Redis, RabbitMQ, SQS, Kafka) decouple request ingestion from processing, enabling reliable asynchronous workflows. For AI applications, queues manage LLM call backlogs, coordinate multi-step pipelines, and buffer traffic spikes.",
              why: "AI workloads are bursty — traffic spikes can overwhelm synchronous processing. Queues absorb these spikes by buffering requests and processing them at a sustainable rate. They also provide reliability: if a worker crashes mid-processing, the message is requeued rather than lost.",
              how: "Choose based on scale: Redis/BullMQ for moderate scale, SQS for AWS-native, Kafka for high-throughput event streaming. Key patterns: dead letter queues (for failed messages), priority queues (urgent requests first), rate limiting (token bucket per queue), and monitoring (queue depth, processing time, error rate). Implement with `queue.add('process-query', {query, userId}, {priority: 1})`.",
              ai: "Message queues are the backbone of reliable AI infrastructure. They ensure every request is processed exactly once, provide natural backpressure, and enable horizontal scaling by adding more workers."
            }
          }
        ]
      },
      {
        id: "aieng-databases",
        title: "Databases for AI",
        lessons: [
          {
            id: "aieng-postgresql",
            title: "PostgreSQL",
            prerequisites: ["aieng-api-design"],
            duration: "8 min",
            content: {
              what: "PostgreSQL is the primary relational database for AI applications, storing structured data like users, conversations, messages, API keys, and metadata. Its JSONB type, full-text search, and pgvector extension make it a versatile choice that can handle both relational data and vector search.",
              why: "AI applications need persistent storage for everything except vector embeddings: user accounts, conversation histories, document metadata, job statuses, and configuration. PostgreSQL's reliability, ACID compliance, and rich feature set make it the standard choice for production AI backends.",
              how: "Use an ORM like Prisma (Node.js), SQLAlchemy (Python), or Drizzle for type-safe queries. Store conversations as: `conversations (id, user_id, title, created_at)` and `messages (id, conversation_id, role, content, tokens_used, created_at)`. Use JSONB for flexible metadata: `metadata JSONB DEFAULT '{}'`. Add indexes on frequently queried columns.",
              ai: "PostgreSQL with pgvector can serve as both your relational database and vector store for small-to-medium scale, reducing infrastructure complexity. For larger scale, use PostgreSQL for relational data and a dedicated vector database for embeddings."
            }
          },
          {
            id: "aieng-vector-db-prod",
            title: "Vector Databases in Production",
            prerequisites: ["aieng-postgresql"],
            duration: "8 min",
            content: {
              what: "Production vector database deployment involves choosing between managed (Pinecone, Weaviate Cloud) and self-hosted (Qdrant, Milvus) options, configuring indexes for your workload, managing index updates, and monitoring query performance and costs.",
              why: "Development choices (like using Chroma locally) don't scale to production. Production vector databases must handle millions of vectors, sub-100ms query latency, high availability, and ongoing index updates as documents change. The deployment choice significantly affects cost, performance, and operational burden.",
              how: "For managed services: configure index dimensions, metric type (cosine), and pod size based on your dataset. For self-hosted: deploy with Kubernetes, configure replication, and monitor memory/CPU. Key patterns: batch upsert for bulk indexing, real-time upsert for incremental updates, and index rotation for large updates. Monitor query latency p50/p95/p99 and adjust HNSW parameters (ef_search, m).",
              ai: "Vector database costs can grow quickly at scale. Optimize by: using quantization (reduces memory 4x), filtering with metadata before vector search (reduces search space), and using tiered storage (hot vectors in memory, cold vectors on disk)."
            }
          }
        ]
      },
      {
        id: "aieng-evaluation",
        title: "Evaluation",
        lessons: [
          {
            id: "aieng-accuracy",
            title: "Accuracy Metrics",
            prerequisites: ["aieng-api-design"],
            duration: "8 min",
            content: {
              what: "Accuracy metrics for AI systems measure how well the model's outputs match expected results. For classification: accuracy, precision, recall, F1. For generation: exact match, BLEU, ROUGE. For RAG: answer correctness, context relevance, and faithfulness scores.",
              why: "Without measurement, you cannot improve. Accuracy metrics provide objective, quantifiable feedback on model performance, enabling data-driven decisions about model selection, prompt engineering, and system design. They also enable regression testing when changes are made.",
              how: "Build evaluation datasets with input-output pairs. Run model on inputs, compare outputs to expected. For classification: `from sklearn.metrics import classification_report; print(classification_report(y_true, y_pred))`. For generation: use LLM-as-a-judge to score output quality. Track metrics over time in dashboards. Set thresholds: accuracy > 90% to deploy.",
              ai: "AI evaluation is fundamentally different from traditional software testing because outputs are non-deterministic. Use statistical evaluation (multiple runs, confidence intervals) rather than single-pass testing."
            }
          },
          {
            id: "aieng-relevance",
            title: "Relevance Evaluation",
            prerequisites: ["aieng-accuracy"],
            duration: "8 min",
            content: {
              what: "Relevance evaluation measures whether the AI system's response actually addresses the user's query. This includes answer relevance (does the response answer the question?), context relevance (is the retrieved context useful?), and informational completeness (are all aspects covered?).",
              why: "A technically accurate response that doesn't answer the question is useless. Relevance evaluation catches cases where the model is hallucinating correctly-sounding but irrelevant information, where retrieval is returning unrelated documents, or where the response is incomplete.",
              how: "Use LLM-as-judge: ask a separate LLM to rate relevance on a 1-5 scale with criteria. Implement reference-free evaluation: `judge_llm.evaluate(query, response, criteria=\"Does this answer the question?\")`. Build test sets with known relevant/irrelevant queries. Use cosine similarity between query and response embeddings as a proxy metric for large-scale evaluation.",
              ai: "Relevance evaluation is critical for RAG systems where the quality of retrieval directly impacts response relevance. Automate relevance evaluation as part of your CI/CD pipeline to catch regressions."
            }
          },
          {
            id: "aieng-hallucination",
            title: "Hallucination Detection",
            prerequisites: ["aieng-accuracy"],
            duration: "10 min",
            content: {
              what: "Hallucination detection identifies cases where the LLM generates information that is factually incorrect, unsupported by provided context, or fabricated entirely. Detection methods include self-consistency checking, source attribution verification, and external knowledge validation.",
              why: "Hallucination is the most dangerous failure mode in AI applications — confident, well-written, entirely wrong information can lead to bad decisions, legal liability, and user harm. Detecting and mitigating hallucinations is essential for trustworthy AI systems.",
              how: "Self-consistency: generate multiple responses and check agreement. Source attribution: verify that cited sources exist and support the claims. Factual grounding: compare claims against a knowledge base. Confidence calibration: detect when the model is uncertain. Use tools like Guardrails AI or NeMo Guardrails to automatically detect and flag potential hallucinations.",
              ai: "Hallucination detection is an active research area with practical applications. For high-stakes domains (medical, legal, financial), implement multi-layered detection and require human review for unverified claims."
            }
          },
          {
            id: "aieng-retrieval-eval",
            title: "Retrieval Evaluation",
            prerequisites: ["aieng-relevance"],
            duration: "8 min",
            content: {
              what: "Retrieval evaluation measures the quality of the document retrieval step in RAG pipelines, independent of the generation step. Metrics include precision@k (fraction of retrieved docs that are relevant), recall@k (fraction of relevant docs that were retrieved), and MRR (mean reciprocal rank).",
              why: "RAG quality is bounded by retrieval quality. If the retrieval step doesn't find the right documents, the LLM cannot generate a good answer regardless of its capability. Evaluating retrieval separately helps identify whether quality issues stem from retrieval or generation.",
              how: "Build a retrieval test set: queries with known relevant document IDs. Compute: `precision@k = relevant_in_top_k / k`, `recall@k = relevant_in_top_k / total_relevant`. MRR = average of 1/rank of first relevant result. Test different chunking strategies, embedding models, and retrieval parameters. Use RAGAS framework for automated retrieval evaluation.",
              ai: "Retrieval evaluation should be run automatically on every index update. A/B testing different retrieval configurations with these metrics is the fastest way to improve RAG quality."
            }
          },
          {
            id: "aieng-llm-judge",
            title: "LLM-as-a-Judge",
            prerequisites: ["aieng-hallucination"],
            duration: "10 min",
            content: {
              what: "LLM-as-a-Judge uses a strong LLM to evaluate the outputs of other LLMs or AI systems. The judge model assesses quality across multiple dimensions (relevance, accuracy, coherence, safety) based on rubrics you define, providing scalable automated evaluation.",
              why: "Human evaluation is expensive, slow, and inconsistent. LLM-as-a-Judge provides near-human evaluation quality at machine speed and cost, enabling continuous evaluation of AI systems at scale. It's the standard approach for evaluating open-ended generation tasks where exact matching isn't applicable.",
              how: "Define evaluation rubrics: `criteria = {\"accuracy\": \"Is the information factually correct?\", \"relevance\": \"Does it address the query?\", \"completeness\": \"Are all aspects covered?\"}`. Send to judge model: `judge.complete(messages=[{\"role\": \"user\", \"content\": f\"Rate this response:\\nQuery: {q}\\nResponse: {r}\\nCriteria: {criteria}\"}])`. Parse structured scores. Use a stronger model than the one being evaluated. Include reference answers when available.",
              ai: "LLM-as-a-Judge is now the standard for evaluating conversational AI, RAG systems, and content generation. Use it to build continuous evaluation pipelines that catch quality regressions automatically."
            }
          },
          {
            id: "aieng-auto-eval",
            title: "Automated Evaluation Pipelines",
            prerequisites: ["aieng-llm-judge"],
            duration: "8 min",
            content: {
              what: "Automated evaluation pipelines integrate evaluation into your development workflow, running quality checks on every code change, model update, or prompt modification. They include test dataset management, metric computation, result reporting, and regression detection.",
              why: "Manual evaluation doesn't scale and can't catch regressions in real-time. Automated pipelines ensure quality is continuously monitored, issues are caught before deployment, and improvements are validated with data rather than intuition.",
              how: "Build with: 1) Test dataset (curated queries with expected outputs or quality criteria). 2) Evaluation runner (executes model on test set, computes metrics). 3) Judge integration (LLM-as-a-judge for open-ended tasks). 4) Reporting (dashboards with metric trends). 5) CI/CD integration (block deployment if metrics drop below threshold). Frameworks: DeepEval, Promptfoo, LangSmith, Braintrust.",
              ai: "Automated evaluation is what separates professional AI engineering from hobby projects. Invest in evaluation infrastructure early — it pays for itself by preventing quality regressions and enabling confident iteration."
            }
          }
        ]
      },
      {
        id: "aieng-observability",
        title: "Observability",
        lessons: [
          {
            id: "aieng-logging",
            title: "Logging",
            prerequisites: ["aieng-api-design"],
            duration: "8 min",
            content: {
              what: "Logging in AI applications captures structured events about every request, LLM call, tool invocation, and error. AI-specific logs include input/output pairs, token counts, latency, model used, cost, and user feedback signals.",
              why: "AI systems are non-deterministic — the same input can produce different outputs. Without comprehensive logging, debugging production issues is nearly impossible. Logs provide the audit trail needed to understand what happened, why, and how to fix it.",
              how: "Use structured logging with fields: `logger.info(\"llm_call\", extra={\"model\": \"gpt-4o\", \"tokens_in\": 150, \"tokens_out\": 300, \"latency_ms\": 1200, \"cost_usd\": 0.008, \"user_id\": \"u_123\", \"conversation_id\": \"c_456\"})`. Redact PII. Use log aggregation (Datadog, CloudWatch, Loki). Set up alerts for error rate spikes, latency anomalies, and cost threshold breaches.",
              ai: "AI logging must capture the full context of each interaction — including the exact prompt sent and response received — for debugging and quality improvement, while being careful about data privacy."
            }
          },
          {
            id: "aieng-tracing",
            title: "Tracing",
            prerequisites: ["aieng-logging"],
            duration: "8 min",
            content: {
              what: "Tracing tracks a single request across all components of an AI system — from API entry through retrieval, LLM calls, tool invocations, and response generation. Distributed traces show the full execution path with timing, dependencies, and intermediate results.",
              why: "Complex AI systems have multiple sequential and parallel operations. When a request is slow or fails, you need to know exactly which component caused the issue. Tracing provides end-to-end visibility that logging alone cannot.",
              how: "Use OpenTelemetry for vendor-neutral tracing: `with tracer.start_as_current_span(\"rag_pipeline\") as span: span.set_attribute(\"query\", query); retrieved = retrieve(query); span.add_event(\"retrieved_docs\", {\"count\": len(retrieved)}); response = generate(query, retrieved)`. Visualize in Jaeger, Zipkin, or commercial platforms (LangSmith, Arize Phoenix, Langfuse).",
              ai: "AI tracing is essential for understanding RAG pipeline behavior — seeing exactly which documents were retrieved, how long each step took, and where bottlenecks occur enables targeted optimization."
            }
          },
          {
            id: "aieng-token-usage",
            title: "Token Usage Tracking",
            prerequisites: ["aieng-tracing"],
            duration: "6 min",
            content: {
              what: "Token usage tracking monitors the number of input and output tokens consumed per request, per user, and per feature. This data drives cost allocation, budget management, usage analytics, and optimization decisions.",
              why: "Token usage directly correlates with cost. Without tracking, you can't identify which features are most expensive, which users consume the most resources, or where optimization efforts should focus. Token tracking enables data-driven cost management.",
              how: "Log token counts from API responses: `usage = response.usage; log(model=model, prompt_tokens=usage.prompt_tokens, completion_tokens=usage.completion_tokens)`. Aggregate by user, feature, and time period. Set up dashboards showing cost trends. Implement budget alerts: notify when user approaches spending limit. Compare tokens across models to optimize routing.",
              ai: "Token tracking data reveals optimization opportunities: if 40% of your tokens go to system prompts, prompt compression can save significant cost. If certain features use disproportionate tokens, consider caching or model downgrading."
            }
          },
          {
            id: "aieng-latency",
            title: "Latency Monitoring",
            prerequisites: ["aieng-token-usage"],
            duration: "6 min",
            content: {
              what: "Latency monitoring tracks the time taken for each stage of AI processing: API response time, retrieval time, LLM generation time, tool execution time, and total end-to-end latency. Monitoring includes p50, p95, and p99 percentiles, not just averages.",
              why: "Users expect fast responses. LLM latency is inherently higher than traditional APIs (1-30 seconds vs. <100ms). Understanding where latency comes from enables targeted optimization — reducing retrieval time, streaming responses, or implementing caching where it matters most.",
              how: "Measure each stage: `start = time.time(); docs = retrieve(query); retrieval_time = time.time() - start; start = time.time(); response = llm.complete(...); generation_time = time.time() - start`. Report to monitoring dashboard. Set alerts: p95 latency > 5s triggers investigation. Track latency trends over time to catch degradation.",
              ai: "Latency monitoring should differentiate between time-to-first-token (TTFT, user perception) and total generation time (completion). Streaming reduces perceived latency by delivering TTFT of <1s even when total generation takes 5+ seconds."
            }
          },
          {
            id: "aieng-cost",
            title: "Cost Monitoring",
            prerequisites: ["aieng-latency"],
            duration: "8 min",
            content: {
              what: "Cost monitoring tracks the financial cost of AI operations across all dimensions: per-request, per-user, per-feature, per-model, and total. It combines token costs, infrastructure costs, and storage costs into a unified cost model.",
              why: "AI costs can escalate quickly and unpredictably — a single expensive model call can cost dollars, and scaling can multiply costs linearly. Without cost monitoring, budgets are exceeded without warning, and optimization priorities are unclear.",
              how: "Build a cost model: `cost = input_tokens × input_price + output_tokens × output_price`. Track per-request and aggregate. Set budget alerts at 50%, 80%, and 100% of monthly budget. Analyze cost by feature to identify optimization targets. Implement cost-based rate limiting (e.g., $10/month per user). Use cost dashboards to visualize trends and forecasts. Review weekly.",
              ai: "Cost monitoring is a core AI engineering practice. The most successful AI products have clear unit economics — know your cost per query and ensure it's sustainable at your pricing model."
            }
          }
        ]
      },
      {
        id: "aieng-security",
        title: "Security",
        lessons: [
          {
            id: "aieng-prompt-injection",
            title: "Prompt Injection",
            prerequisites: ["aieng-api-design"],
            duration: "10 min",
            content: {
              what: "Prompt injection is an attack where malicious input is crafted to override the model's system instructions and manipulate its behavior. Attackers may try to extract system prompts, bypass safety filters, or make the model perform unauthorized actions.",
              why: "Prompt injection is the most common attack vector against AI applications. Unlike traditional security vulnerabilities, it exploits the fundamental nature of how LLMs process text — the model cannot reliably distinguish between instructions and data. Mitigation is essential for any application that processes user input.",
              how: "Defense strategies: 1) Input sanitization (detect known injection patterns). 2) Separation of instructions and data (never concatenate user input into system prompts). 3) Output validation (check responses for unexpected content). 4) Use structured tool calling instead of freeform text. 5) Implement guardrails with libraries like NeMo Guardrails. 6) Regular red-team testing.",
              ai: "Prompt injection is an unsolved problem in AI security. The best current approach is defense in depth: multiple layers of protection, human review for sensitive actions, and monitoring for anomalous behavior."
            }
          },
          {
            id: "aieng-data-leakage",
            title: "Data Leakage Prevention",
            prerequisites: ["aieng-prompt-injection"],
            duration: "8 min",
            content: {
              what: "Data leakage prevention ensures that sensitive information (personal data, trade secrets, API keys, internal documents) is not exposed through AI system outputs, logs, or retrieval systems. This includes PII detection, access controls, and output filtering.",
              why: "AI systems can inadvertently leak sensitive data by including it in responses, logging it in plaintext, or making it available through retrieval to unauthorized users. Data leakage can cause regulatory violations (GDPR, HIPAA), competitive harm, and loss of user trust.",
              how: "Implement PII detection on inputs and outputs (use regex + NER models). Apply access controls at the retrieval level (filter documents by user permissions). Redact sensitive data from logs. Use output classifiers to detect and block PII in responses. Audit retrieval results before including in prompts. Implement data retention policies and right-to-deletion.",
              ai: "Data leakage prevention in AI requires thinking about data flow holistically — from input to retrieval to generation to logging. Every stage needs appropriate protections."
            }
          },
          {
            id: "aieng-tool-abuse",
            title: "Tool Abuse Prevention",
            prerequisites: ["aieng-prompt-injection"],
            duration: "8 min",
            content: {
              what: "Tool abuse prevention protects against unauthorized or dangerous use of tools exposed to AI agents. This includes permission scoping, action confirmation for high-risk operations, audit logging, and rate limiting per tool and per user.",
              why: "AI agents with tool access can delete databases, send emails, make payments, or modify systems. Without proper safeguards, a prompt injection attack or agent error could cause catastrophic damage. Tool abuse prevention is essential for agent safety.",
              how: "1) Scope permissions: each user/role can only invoke specific tools. 2) Confirmation required for destructive actions (\"Are you sure you want to delete?\"). 3) Dry-run mode for testing. 4) Rate limiting per tool. 5) Audit log of all tool invocations with user, arguments, and results. 6) Sandbox execution environments. 7) Tool output validation (prevent injection through tool results).",
              ai: "Tool abuse prevention is a critical safety practice for any system with AI agents. The principle of least privilege should guide tool access — agents should only have access to the tools they need, with human approval for high-impact actions."
            }
          },
          {
            id: "aieng-input-validation",
            title: "Input Validation",
            prerequisites: ["aieng-data-leakage", "aieng-tool-abuse"],
            duration: "6 min",
            content: {
              what: "Input validation in AI systems checks and sanitizes all user inputs before they reach the LLM. This includes length limits, format validation, content filtering, injection detection, and type checking to prevent both security attacks and unexpected behavior.",
              why: "LLMs process arbitrary text, making them vulnerable to crafted inputs that cause unexpected behavior. Validation catches malicious inputs, oversized requests that waste resources, and malformed data that causes errors. It's the first line of defense in your security pipeline.",
              how: "Validate at multiple layers: API layer (schema validation, length limits), application layer (content filtering, PII detection), and model layer (injection detection, output validation). Use libraries: Pydantic for schema validation, regex for pattern matching, moderation APIs for content filtering. Reject with clear error messages: `400 Invalid input: message exceeds 10,000 character limit`.",
              ai: "Input validation should be the default for every AI application. A simple validation layer catching oversized inputs, known injection patterns, and inappropriate content prevents the majority of security incidents."
            }
          }
        ]
      }
    ],
    checkpoint: {
      id: "checkpoint-ai-eng",
      title: "AI Engineering Checkpoint",
      passingScore: 80,
      questionIds: []
    },
    projectIds: ["ai-api-with-authentication","model-router-service","ai-evaluation-pipeline"]
  },
  // ═══════════════════════════════════════════════════════════════════
  // STAGE 14 — Production AI
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "production",
    number: 14,
    title: "Production AI",
    description:
      "Deploy and operate AI systems in production with Docker, cloud infrastructure, CI/CD, monitoring, scaling, and cost optimization.",
    difficulty: "advanced",
    icon: "🏭",
    prerequisites: ["ai-eng"],
    topics: [
      {
        id: "prod-infrastructure",
        title: "Infrastructure",
        lessons: [
          {
            id: "prod-docker",
            title: "Docker & Containers",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "Docker packages AI applications into containers that bundle code, dependencies, and configuration into a single deployable unit. Containers ensure consistent behavior across development, staging, and production environments, eliminating 'it works on my machine' issues.",
              why: "AI applications have complex dependencies (Python versions, CUDA libraries, model weights, system libraries). Docker encapsulates all of this, enabling reproducible deployments. It's the foundation of modern infrastructure and required for most cloud deployment strategies.",
              how: "Create a Dockerfile: `FROM python:3.11-slim; COPY requirements.txt .; RUN pip install -r requirements.txt; COPY . .; CMD [\"uvicorn\", \"main:app\"]`. Build: `docker build -t my-ai-app .`. Run: `docker run -p 8000:8000 -e API_KEY=... my-ai-app`. Use multi-stage builds to reduce image size, .dockerignore to exclude unnecessary files, and Docker Compose for multi-service development.",
              ai: "AI applications benefit from Docker because model files and ML libraries create large, fragile dependency chains. Containerization ensures consistent model serving environments across development and production."
            }
          },
          {
            id: "prod-deployment",
            title: "Deployment Strategies",
            prerequisites: ["prod-docker"],
            duration: "10 min",
            content: {
              what: "Deployment strategies define how new versions of AI applications are released to production. Common approaches include blue-green deployment (swap between identical environments), rolling updates (gradually replace instances), and canary deployment (route a small percentage of traffic to the new version).",
              why: "AI systems are complex and failures can be subtle (degraded quality rather than crashes). Deployment strategies minimize risk by enabling gradual rollouts, instant rollback, and A/B testing of model changes. A bad prompt change or model update can affect all users if deployed aggressively.",
              how: "Canary: deploy new version to 5% of traffic, monitor metrics for 15 minutes, gradually increase. Blue-green: maintain two identical environments, deploy to inactive, switch traffic. Rolling: replace instances one at a time. Use Kubernetes, AWS ECS, or cloud services for orchestration. Implement health checks: `/health` endpoint that verifies model loading and basic inference capability.",
              ai: "AI-specific deployment consideration: model file downloads can be slow (GBs for large models). Pre-bake models into container images or use model registries (S3, GCS) with startup caching to avoid cold-start delays."
            }
          },
          {
            id: "prod-cloud",
            title: "Cloud Basics",
            prerequisites: ["prod-deployment"],
            duration: "10 min",
            content: {
              what: "Cloud platforms (AWS, Google Cloud, Azure) provide the infrastructure for running AI applications at scale: compute instances (including GPUs), managed databases, object storage, load balancers, CDN, and serverless functions.",
              why: "Most AI teams don't operate their own data centers. Cloud platforms provide the GPU access, scalability, and managed services needed to run AI applications without managing physical hardware. Understanding cloud fundamentals is essential for production AI deployment.",
              how: "Key services: Compute (EC2/GCE for VMs, ECS/GKE for containers), Storage (S3/GCS for model files and data), Database (RDS/Cloud SQL for PostgreSQL), Networking (VPC, load balancers, CDN). Start with managed services to reduce operational burden. Use infrastructure-as-code (Terraform, Pulumi) for reproducible deployments. Set up billing alerts.",
              ai: "GPU cloud costs are the largest expense for AI infrastructure. Understand spot/preemptible instances (70% savings), reserved instances (30-50% savings), and right-sizing to optimize costs."
            }
          },
          {
            id: "prod-cicd",
            title: "CI/CD for AI",
            prerequisites: ["prod-deployment"],
            duration: "8 min",
            content: {
              what: "CI/CD (Continuous Integration/Continuous Deployment) for AI automates testing, evaluation, and deployment of AI applications. This includes running evaluation suites on every code change, building container images, deploying to staging, and promoting to production after quality gates pass.",
              why: "AI systems need CI/CD more than traditional software because changes (prompt updates, model swaps, dependency updates) can silently degrade quality. Automated evaluation pipelines catch regressions before they reach users, enabling confident, frequent updates.",
              how: "CI pipeline: lint → unit test → evaluation suite → build container. CD pipeline: push to staging → run integration tests → run evaluation → manual approval → canary deploy → monitor → full rollout. Use GitHub Actions, GitLab CI, or similar. Evaluation gates: accuracy > threshold, latency < threshold, no safety regressions. Store evaluation results for trend analysis.",
              ai: "AI CI/CD must include evaluation pipelines that test model quality, not just code correctness. A prompt change that passes all code tests but degrades accuracy by 5% should block deployment."
            }
          }
        ]
      },
      {
        id: "prod-operations",
        title: "Operations",
        lessons: [
          {
            id: "prod-monitoring",
            title: "Production Monitoring",
            prerequisites: ["prod-deployment"],
            duration: "10 min",
            content: {
              what: "Production monitoring for AI systems tracks application health, performance metrics, error rates, and business metrics in real-time. This includes infrastructure metrics (CPU, memory, GPU utilization), application metrics (request rate, latency, error rate), and AI-specific metrics (quality scores, hallucination rate, user satisfaction).",
              why: "AI systems fail differently than traditional software — they don't crash, they silently degrade. A model update might produce slightly worse answers, a retrieval index might become stale, or costs might creep up. Monitoring catches these subtle issues before users complain.",
              how: "Use monitoring stacks: Prometheus (metrics collection) + Grafana (dashboards), or Datadog/New Relic for managed solutions. Key dashboards: system health (latency, throughput, errors), cost (tokens, API costs, cost per query), quality (evaluation scores over time), and usage (active users, feature adoption). Set alerts: error rate > 1%, p95 latency > 5s, cost spike > 50%.",
              ai: "AI monitoring should include quality metrics alongside traditional operational metrics. Track automated evaluation scores over time to detect model quality degradation that wouldn't show up as errors."
            }
          },
          {
            id: "prod-scaling",
            title: "Scaling AI Systems",
            prerequisites: ["prod-monitoring"],
            duration: "10 min",
            content: {
              what: "Scaling AI systems involves handling increased load by adding resources horizontally (more instances), vertically (bigger instances), or through architectural changes (caching, queuing, CDN). AI scaling has unique challenges due to GPU costs, model loading times, and LLM rate limits.",
              why: "AI applications face scaling challenges traditional web apps don't: LLM API rate limits cap throughput, GPU instances are expensive, and model loading takes minutes. Without proper scaling strategy, traffic spikes cause errors, slow responses, or budget overruns.",
              how: "Horizontal scaling: add more application instances behind a load balancer. Vertical scaling: use larger instances for more concurrent requests. LLM scaling: use multiple API keys across providers, implement request queuing with backpressure, cache aggressively. GPU scaling: use model serving frameworks (vLLM, TGI) with built-in batching. Scale RAG independently: separate vector database scaling from application scaling.",
              ai: "The most cost-effective AI scaling strategy is often caching + model routing rather than raw infrastructure scaling. Cache 30% of requests and route 60% to cheaper models before scaling hardware."
            }
          },
          {
            id: "prod-caching",
            title: "Production Caching",
            prerequisites: ["prod-scaling"],
            duration: "8 min",
            content: {
              what: "Production caching for AI applications involves multiple cache layers: CDN caching for static assets, application caching for API responses, semantic caching for similar queries, and provider-level prompt caching. Each layer reduces latency and cost differently.",
              why: "LLM API calls are expensive and slow. A well-designed caching strategy can eliminate 30-60% of LLM calls while maintaining response quality. Caching is often the single most impactful optimization for AI application cost and performance.",
              how: "Multi-layer caching: 1) Response cache (exact match, Redis, TTL-based). 2) Semantic cache (embedding similarity > 0.95, reuse cached response). 3) Prompt cache (provider-native caching of system prompts and context). 4) Retrieval cache (cache vector search results for popular queries). Invalidate strategically: content changes trigger cache invalidation, time-based expiry for freshness-sensitive data.",
              ai: "Production caching requires careful cache invalidation strategy. Stale cached responses in AI applications can spread misinformation. Balance cache hit rate against freshness requirements per use case."
            }
          },
          {
            id: "prod-cost-optimization",
            title: "Cost Optimization",
            prerequisites: ["prod-caching"],
            duration: "10 min",
            content: {
              what: "Cost optimization for AI applications reduces expenses while maintaining quality through techniques like model routing, prompt compression, caching, token budgeting, infrastructure right-sizing, and using spot instances for non-urgent workloads.",
              why: "AI costs scale linearly with usage and can dominate budgets. A chat application serving 100K daily users might spend $10K-50K/month on LLM APIs alone. Cost optimization techniques can reduce this by 50-80% while maintaining user experience quality.",
              how: "Strategies: 1) Model routing (cheap models for simple tasks). 2) Prompt optimization (reduce token count by 20-40%). 3) Caching (eliminate redundant calls). 4) Batch processing for non-urgent tasks. 5) Spot instances for training and batch jobs. 6) Reserved capacity for predictable workloads. 7) Monitor and alert on cost anomalies. 8) Implement per-user cost limits.",
              ai: "Cost optimization is an ongoing practice, not a one-time project. Build cost monitoring from day one, review weekly, and systematically address the highest-cost items first."
            }
          }
        ]
      }
    ],
    checkpoint: {
      id: "checkpoint-production",
      title: "Production AI Checkpoint",
      passingScore: 80,
      questionIds: []
    },
    projectIds: ["dockerized-ai-app","production-rag-system"]
  },
  // ═══════════════════════════════════════════════════════════════════
  // STAGE 15 — Specialization
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "specialization",
    number: 15,
    title: "Specialization",
    description:
      "Choose your specialization path and dive deeper into advanced topics in generative AI, computer vision, NLP, machine learning, or research.",
    difficulty: "advanced",
    icon: "🎯",
    prerequisites: [],
    topics: [
      // ── Advanced Generative AI ───────────────────────────────────
      {
        id: "spec-genai",
        title: "Advanced Generative AI",
        lessons: [
          {
            id: "spec-advanced-rag",
            title: "Advanced RAG Techniques",
            prerequisites: [],
            duration: "12 min",
            content: {
              what: "Advanced RAG techniques go beyond basic chunk-and-retrieve to include Graph RAG (building knowledge graphs from documents), agentic RAG (using agents to dynamically plan retrieval), self-RAG (model decides when to retrieve), and multimodal RAG (indexing images, tables, and code alongside text).",
              why: "Basic RAG fails on complex queries requiring multi-hop reasoning, cross-document synthesis, or structured data access. Advanced techniques address these limitations by adding reasoning layers, structural knowledge representation, and adaptive retrieval strategies.",
              how: "Graph RAG: extract entities and relationships from documents, build a knowledge graph, query with graph traversal + vector search. Agentic RAG: agent decomposes the query, retrieves for each sub-question, and synthesizes. Self-RAG: model generates retrieval tokens when it needs information, avoiding unnecessary retrieval. Use frameworks like LlamaIndex's advanced retrieval modules.",
              ai: "Advanced RAG is where the field is heading. Graph RAG for enterprise knowledge bases, agentic RAG for research applications, and multimodal RAG for document-heavy industries are the highest-impact applications."
            }
          },
          {
            id: "spec-fine-tuning",
            title: "Advanced Fine-tuning",
            prerequisites: [],
            duration: "12 min",
            content: {
              what: "Advanced fine-tuning covers domain-specific adaptation, RLHF (Reinforcement Learning from Human Feedback), DPO (Direct Preference Optimization), constitutional AI, and multi-task fine-tuning. These techniques go beyond basic instruction tuning to align model behavior with specific values and capabilities.",
              why: "Basic fine-tuning adapts capability, but advanced techniques align behavior — ensuring the model not only can do something but does it in the right way. RLHF/DPO teaches the model human preferences, constitutional AI instills safety principles, and multi-task tuning enables complex skill combinations.",
              how: "RLHF: train a reward model on human preference data, then use PPO to optimize the LLM against that reward. DPO: skip the reward model and optimize preferences directly — simpler and more stable. Multi-task: combine multiple fine-tuning datasets with task-specific instructions. Evaluate with both automated metrics and human preference comparison.",
              ai: "DPO has largely replaced RLHF in practice due to simplicity. Advanced fine-tuning is increasingly accessible — techniques that required research teams two years ago are now achievable by individual developers."
            }
          },
          {
            id: "spec-multimodal-models",
            title: "Multimodal Models",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "Multimodal models process and generate across modalities — text, images, audio, video, and code — in a unified architecture. Models like GPT-4o, Gemini, and Claude understand images natively, while diffusion models and audio LLMs generate across modalities.",
              why: "The real world is multimodal — documents contain text and images, conversations include speech and visuals, and many tasks require cross-modal understanding. Multimodal models enable richer, more natural AI interactions and unlock use cases impossible with text-only systems.",
              how: "Vision-language models: encode images with a vision encoder (ViT), project into the LLM's embedding space, and process jointly with text tokens. Image generation: diffusion models (Stable Diffusion, DALL-E) denoise random noise guided by text conditioning. Audio: Whisper for speech-to-text, neural TTS for text-to-speech, and emerging audio language models.",
              ai: "Multimodal AI is the fastest-growing area. Vision-capable LLMs are transforming document understanding, medical imaging analysis, and visual reasoning. Expect multimodal to become the default within 2 years."
            }
          },
          {
            id: "spec-agents-advanced",
            title: "Advanced Agent Systems",
            prerequisites: [],
            duration: "12 min",
            content: {
              what: "Advanced agent systems include persistent agents (long-running with memory), collaborative agent teams, agent-to-agent communication protocols, formal verification of agent behavior, and agent operating systems that manage tool access and resource allocation.",
              why: "Production agents need reliability, safety, and coordination that basic agent patterns don't provide. Advanced systems address: how agents persist across sessions, how multiple agents collaborate without conflicts, and how to ensure agents behave within defined boundaries.",
              how: "Persistent agents: combine short-term (conversation), episodic (past interactions), and semantic (knowledge) memory stores. Collaborative systems: implement message passing protocols (like A2A), shared state management, and conflict resolution. Safety: formalize agent capabilities with capability maps, implement capability-based security, and use monitoring to detect anomalous behavior patterns.",
              ai: "Agent systems are evolving rapidly from single-task assistants to multi-agent organizations. Understanding advanced patterns positions you at the forefront of AI application architecture."
            }
          },
          {
            id: "spec-ai-systems",
            title: "AI System Design",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "AI system design covers end-to-end architecture patterns for production AI applications: microservices for AI, event-driven architectures, CQRS for AI workloads, feature stores for AI features, and A/B testing frameworks for model comparison.",
              why: "Building individual AI features is different from building reliable AI systems. System design addresses the cross-cutting concerns: how components communicate, how failures cascade, how to test and deploy safely, and how to evolve the system as models and requirements change.",
              how: "Architecture patterns: API gateway → AI service → model router → provider adapter. Event-driven: user request → queue → worker → model → response. CQRS: separate read (cached responses) from write (generation). Feature store: centralized feature computation and serving. A/B testing: route traffic to different models/prompts and compare metrics.",
              ai: "AI system design is what separates proof-of-concepts from production systems. Mastering these patterns enables you to build AI applications that scale, evolve, and maintain quality over time."
            }
          }
        ]
      },
      // ── Computer Vision ──────────────────────────────────────────
      {
        id: "spec-cv",
        title: "Computer Vision",
        lessons: [
          {
            id: "spec-advanced-yolo",
            title: "Advanced Object Detection",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "Advanced object detection builds on YOLO (You Only Look Once) and similar architectures to achieve real-time detection of multiple object classes with high accuracy. Modern detectors (YOLOv8, YOLO-NAS, RT-DETR) balance speed and accuracy for production deployment.",
              why: "Object detection is fundamental to many AI applications: autonomous driving, surveillance, manufacturing quality control, and robotics. Understanding advanced detection architectures enables building systems that detect objects accurately in real-time under challenging conditions.",
              how: "YOLO architectures process images through a backbone (feature extraction), neck (feature aggregation), and head (prediction). Key techniques: anchor-free detection, non-maximum suppression, data augmentation (Mosaic, MixUp), and model optimization (TensorRT, ONNX). Train with: `yolo detect train data=dataset.yaml model=yolov8n.pt epochs=100`. Export: `yolo export model=best.pt format=engine`.",
              ai: "Real-time object detection enables edge AI applications — security cameras, manufacturing inspection, and autonomous systems that need to make instant decisions based on visual input."
            }
          },
          {
            id: "spec-segmentation",
            title: "Image Segmentation",
            prerequisites: ["spec-advanced-yolo"],
            duration: "10 min",
            content: {
              what: "Image segmentation classifies every pixel in an image into categories, creating precise masks for each object. Types include semantic segmentation (all pixels of a class share a label), instance segmentation (each object gets a unique mask), and panoptic segmentation (combining both).",
              why: "Detection gives bounding boxes, but segmentation gives pixel-perfect boundaries. This is essential for medical imaging (tumor boundary delineation), autonomous driving (road vs. sidewalk vs. vehicle), augmented reality (precise object boundaries), and image editing.",
              how: "Modern architectures: Mask R-CNN (instance), U-Net (medical), SAM (Segment Anything Model — zero-shot segmentation). SAM accepts points, boxes, or text prompts to segment any object: `sam.segment(image, points=[[x, y]])`. For semantic segmentation: `model = UNet(num_classes=19); mask = model.predict(image)`.",
              ai: "SAM (Segment Anything) has made segmentation accessible for any domain. Combined with LLMs, visual agents can now segment and understand arbitrary objects from natural language descriptions."
            }
          },
          {
            id: "spec-pose",
            title: "Pose Estimation",
            prerequisites: ["spec-advanced-yolo"],
            duration: "8 min",
            content: {
              what: "Pose estimation detects human body keypoints (joints) from images or video, enabling analysis of body posture, movement, and actions. Modern pose estimators (MediaPipe, MMPose, ViTPose) provide real-time, multi-person pose tracking with high accuracy.",
              why: "Pose estimation enables applications in sports analysis (technique improvement), healthcare (rehabilitation monitoring), fitness (exercise form correction), animation (motion capture), and human-computer interaction (gesture control).",
              how: "Bottom-up approaches detect all keypoints then group by person. Top-down approaches first detect people then estimate pose per person. MediaPipe provides real-time pose: `mp_pose = mp.solutions.pose; pose = mp_pose.Pose(); results = pose.process(image)`. Output: 33 body keypoints with x, y, z coordinates and visibility scores.",
              ai: "Pose estimation combined with LLMs enables activity understanding — describing what people are doing, detecting falls in elderly care, or analyzing athletic performance from video."
            }
          },
          {
            id: "spec-3d-vision",
            title: "3D Vision & Point Clouds",
            prerequisites: ["spec-segmentation", "spec-pose"],
            duration: "10 min",
            content: {
              what: "3D vision extends image understanding to three-dimensional space, working with depth data, point clouds (from LiDAR or stereo cameras), 3D meshes, and NeRF (Neural Radiance Fields) representations. Applications include autonomous driving, AR/VR, robotics, and 3D reconstruction.",
              why: "The real world is 3D — images project 3D scenes onto 2D planes, losing depth information. 3D vision recovers this spatial understanding, enabling robots to navigate, self-driving cars to understand road geometry, and AR applications to place virtual objects realistically.",
              how: "Point cloud processing: PointNet, PointNet++ process unordered point sets. 3D detection: VoxelNet, PointPillars for LiDAR data. Depth estimation: MiDaS, DPT predict depth from single images. NeRF: train neural networks to represent 3D scenes from 2D images: `nerf = NeRF(); nerf.train(images, poses); novel_view = nerf.render(new_pose)`.",
              ai: "3D vision is critical for robotics and autonomous systems. Foundation models for 3D (like SAM3D, UniSim) are emerging, extending the foundation model paradigm to spatial understanding."
            }
          }
        ]
      },
      // ── Advanced NLP ─────────────────────────────────────────────
      {
        id: "spec-nlp",
        title: "Advanced NLP",
        lessons: [
          {
            id: "spec-advanced-transformers",
            title: "Advanced Transformer Architectures",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "Advanced Transformer architectures include Mixture-of-Experts (MoE) for efficient scaling, State Space Models (Mamba) for linear-time sequence processing, mixture of depths for adaptive computation, and sparse attention patterns for long sequences.",
              why: "Standard Transformers have O(n²) complexity limiting context length and scaling efficiency. Advanced architectures address these limitations — MoE enables scaling to trillions of parameters while keeping inference cost manageable, and SSMs offer linear scaling for long sequences.",
              how: "MoE: route each token to a subset of expert FFN layers: `top_k_gates = softmax(gating_network(x))[:, :k]; output = sum(gate_i * expert_i(x))`. Mamba: uses selective state spaces for linear-time sequence modeling without attention. Flash Attention: IO-aware attention algorithm that reduces memory from O(n²) to O(n). Ring Attention: distributes long sequences across devices.",
              ai: "MoE is the architecture behind many state-of-the-art models (Mixtral, Grok-1, DeepSeek). Understanding these architectures helps predict model capabilities and choose the right model for your use case."
            }
          },
          {
            id: "spec-nlp-finetuning",
            title: "Advanced NLP Fine-tuning",
            prerequisites: ["spec-advanced-transformers"],
            duration: "10 min",
            content: {
              what: "Advanced NLP fine-tuning covers domain adaptation for specialized text (medical, legal, scientific), structured extraction fine-tuning, summarization optimization, and evaluation with domain-specific benchmarks.",
              why: "Generic LLMs underperform on domain-specific text that uses specialized vocabulary, conventions, and reasoning patterns. Fine-tuning on domain data can improve performance by 20-40% over prompted baselines, making the difference between a demo and a production system.",
              how: "Domain adaptation: collect domain text, create instruction pairs with domain experts, fine-tune with LoRA. Structured extraction: train on labeled examples of entity/relation extraction. Use domain-specific evaluation: PubMedQA for medical, LegalBench for legal, CodeContests for programming. Monitor for catastrophic forgetting — evaluate on both domain and general tasks.",
              ai: "Domain-specific fine-tuning is one of the highest-ROI applications of LLM technology. Healthcare, legal, and financial sectors are investing heavily in fine-tuned models that understand their specific terminology and requirements."
            }
          },
          {
            id: "spec-nlp-retrieval",
            title: "Advanced Text Retrieval",
            prerequisites: ["spec-advanced-transformers"],
            duration: "10 min",
            content: {
              what: "Advanced text retrieval covers dense retrieval with ColBERT (late interaction), learned sparse retrieval (SPLADE), cross-encoder re-ranking, multi-vector retrieval, and retrieval-augmented generation with complex query types.",
              why: "Basic dense retrieval (single vector per document) loses fine-grained information. Advanced retrieval techniques capture term-level matching alongside semantic understanding, dramatically improving recall and precision for complex queries.",
              how: "ColBERT: encode documents and queries as token-level vectors, use MaxSim for late interaction matching. SPLADE: learn sparse representations that combine BM25-style matching with semantic understanding. Cross-encoder re-ranking: `reranker.encode(query, document) → relevance_score`. Multi-stage: sparse retrieval (top-1000) → dense retrieval (top-100) → cross-encoder reranking (top-10).",
              ai: "Advanced retrieval techniques can improve RAG quality by 15-30% over basic dense retrieval. The investment in retrieval optimization typically yields better returns than upgrading the LLM."
            }
          },
          {
            id: "spec-multilingual",
            title: "Multilingual NLP",
            prerequisites: ["spec-advanced-transformers"],
            duration: "8 min",
            content: {
              what: "Multilingual NLP enables AI systems to understand and generate text in 100+ languages, handling cross-lingual transfer, translation, language detection, and culturally appropriate responses. Models like mBERT, XLM-R, and NLLB provide multilingual capabilities.",
              why: "Over 6 billion people don't speak English. Building AI that serves a global audience requires multilingual capabilities that go beyond translation to understand cultural context, idioms, and language-specific nuances.",
              how: "Multilingual models: mT5, NLLB for translation; XLM-R for cross-lingual understanding. Cross-lingual transfer: fine-tune on English data, the model generalizes to other languages. Language detection: fastText lid.176.bin. For production: route by language to specialized models, handle code-switching (mixed languages), and evaluate with language-specific benchmarks.",
              ai: "Multilingual AI is essential for global applications. Even English-primary LLMs benefit from multilingual capabilities to handle proper nouns, code-switching, and international content."
            }
          }
        ]
      },
      // ── Machine Learning ─────────────────────────────────────────
      {
        id: "spec-ml",
        title: "Machine Learning",
        lessons: [
          {
            id: "spec-advanced-ml",
            title: "Advanced ML Concepts",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "Advanced machine learning covers ensemble methods (gradient boosting, random forests), Bayesian optimization for hyperparameter tuning, AutoML for automated model selection, and the comparison between traditional ML and deep learning for different problem types.",
              why: "Not every problem needs a neural network. For structured/tabular data, gradient boosting (XGBoost, LightGBM) often outperforms deep learning while being faster to train, more interpretable, and requiring less data. Understanding when to use which approach is a key ML engineering skill.",
              how: "XGBoost: `model = xgb.XGBClassifier(n_estimators=1000, learning_rate=0.01); model.fit(X_train, y_train, eval_set=[(X_val, y_val)], early_stopping_rounds=50)`. Hyperparameter tuning with Optuna: `study = optuna.create_study(); study.optimize(objective, n_trials=100)`. AutoML: AutoGluon, H2O for automated model selection and ensembling.",
              ai: "Traditional ML remains highly relevant — fraud detection, recommendation features, and tabular data analysis often use gradient boosting models. The best ML engineers know when to use XGBoost vs. GPT-4."
            }
          },
          {
            id: "spec-feature-engineering",
            title: "Feature Engineering",
            prerequisites: ["spec-advanced-ml"],
            duration: "8 min",
            content: {
              what: "Feature engineering transforms raw data into informative representations that improve model performance. This includes numerical scaling, categorical encoding, temporal feature extraction, text vectorization, and interaction features.",
              why: "Feature quality often determines model performance more than model choice. Well-engineered features can improve model accuracy by 10-30%, reduce training time, and make models more interpretable. It's the highest-leverage activity in traditional ML.",
              how: "Numerical: standardization (z-score), log transforms for skewed distributions. Categorical: one-hot encoding, target encoding, embedding for high-cardinality. Temporal: day-of-week, hour, seasonality, lag features. Text: TF-IDF, embeddings. Feature selection: mutual information, SHAP values. Use scikit-learn Pipeline for reproducible feature engineering.",
              ai: "Feature engineering for AI applications often means creating features from LLM outputs — extracting structured data from unstructured text, computing embeddings for similarity features, or using LLM-generated classifications as inputs to traditional ML models."
            }
          },
          {
            id: "spec-recommendation",
            title: "Recommendation Systems",
            prerequisites: ["spec-feature-engineering"],
            duration: "10 min",
            content: {
              what: "Recommendation systems predict user preferences and suggest relevant items. Approaches include collaborative filtering (user-item interactions), content-based filtering (item features), and hybrid methods. Modern systems use deep learning (two-tower models, transformers) for large-scale recommendations.",
              why: "Recommendations drive engagement and revenue for most digital platforms — 35% of Amazon sales and 75% of Netflix viewing comes from recommendations. Understanding recommendation systems is essential for building personalized AI applications.",
              how: "Collaborative filtering: matrix factorization finds latent factors: `user_embedding, item_embedding = SVD(interaction_matrix)`. Deep learning: two-tower model encodes users and items separately, retrieval via ANN. Hybrid: combine collaborative and content signals. Modern: sequence models (Transformers) for session-based recommendations. Evaluate: NDCG@k, MRR, hit rate.",
              ai: "LLMs are increasingly used in recommendation systems — for understanding item descriptions, generating explanations for recommendations, and enabling conversational recommendation interfaces."
            }
          },
          {
            id: "spec-time-series",
            title: "Time Series Analysis",
            prerequisites: ["spec-advanced-ml"],
            duration: "10 min",
            content: {
              what: "Time series analysis models sequential data with temporal dependencies — stock prices, sensor readings, user activity, server metrics. Methods range from classical (ARIMA, exponential smoothing) to deep learning (LSTMs, Transformers, N-BEATS) to foundation models (Chronos, TimesFM).",
              why: "Time series data is ubiquitous in business and operations. Forecasting demand, predicting anomalies, and understanding temporal patterns are critical for operations, finance, and infrastructure management. LLMs are now being applied to time series as well.",
              how: "Classical: ARIMA for linear patterns, Prophet for business time series with holidays. Deep learning: N-BEATS for pure data-driven forecasting, PatchTST using Transformers on time series. Foundation models: Chronos and TimesFM zero-shot forecast from pretraining. Features: rolling statistics, seasonal decomposition, lag features. Evaluate: MAE, RMSE, MAPE.",
              ai: "Time series foundation models (Chronos, TimesFM) are emerging as powerful zero-shot forecasters. Combined with LLMs, they enable natural language time series analysis: 'Will our API traffic spike next Tuesday?'"
            }
          }
        ]
      },
      // ── Research ─────────────────────────────────────────────────
      {
        id: "spec-research",
        title: "AI Research",
        lessons: [
          {
            id: "spec-reading-papers",
            title: "Reading AI Papers",
            prerequisites: [],
            duration: "10 min",
            content: {
              what: "Reading AI research papers effectively involves understanding paper structure (abstract, introduction, method, experiments), evaluating claims critically, identifying key contributions, and connecting papers to practical applications.",
              why: "AI advances rapidly through research papers. Being able to read and understand papers enables you to stay current, evaluate new techniques critically, and identify opportunities for applying cutting-edge research to your work.",
              how: "Reading strategy: 1) Read abstract and conclusion first. 2) Look at figures and tables — they tell the story. 3) Read introduction for motivation and context. 4) Skim methods for key ideas. 5) Evaluate experiments: are comparisons fair? Is the benchmark appropriate? Resources: arXiv, Papers With Code, Semantic Scholar, AI paper newsletters (The Batch, TLDR AI).",
              ai: "The ability to read and evaluate AI papers is a career-long skill. Start with survey papers for overview of a field, then dive into specific papers that interest you. Most impactful papers become clear in retrospect."
            }
          },
          {
            id: "spec-reproducing-papers",
            title: "Reproducing Research",
            prerequisites: ["spec-reading-papers"],
            duration: "10 min",
            content: {
              what: "Reproducing research papers means reimplementing and validating published results. This involves understanding the method deeply, implementing from the paper description, reproducing experiments, and comparing results to the original paper.",
              why: "Reproducing papers builds deep understanding that reading alone cannot provide. It reveals implementation details not in the paper, tests your understanding of the method, and contributes to research integrity. Reproducibility is a major challenge in AI research.",
              how: "Start with papers that provide code (check Papers With Code). Read the code alongside the paper. Implement core components from scratch before using the provided implementation. Create the evaluation setup and compare results. If results differ, investigate: data preprocessing, hyperparameters, random seeds, or implementation differences.",
              ai: "Reproducing key papers (Attention Is All You Need, ResNet, BERT) builds foundational understanding. Many breakthroughs are more subtle than they appear — the implementation details often matter more than the high-level idea."
            }
          },
          {
            id: "spec-experiment-design",
            title: "Experiment Design",
            prerequisites: ["spec-reading-papers"],
            duration: "8 min",
            content: {
              what: "Experiment design for AI research involves formulating hypotheses, choosing evaluation metrics, designing controlled experiments, managing variables, and interpreting results statistically. Good experiment design separates signal from noise in model evaluation.",
              why: "Poor experiment design leads to unreliable conclusions — cherry-picked results, unfair comparisons, and irreproducible findings. Rigorous experiment design is essential for making valid claims about model improvements and for building trust in your results.",
              how: "Key principles: 1) Single variable testing (change one thing at a time). 2) Statistical significance (run multiple seeds, report confidence intervals). 3) Fair baselines (same data, same compute budget). 4) Ablation studies (remove components to understand their contribution). 5) Proper train/val/test splits. Use tools: Weights & Biases, MLflow for experiment tracking.",
              ai: "Experiment design is what separates rigorous AI engineering from random experimentation. The best researchers spend more time designing experiments than running them."
            }
          },
          {
            id: "spec-model-arch",
            title: "Model Architecture Research",
            prerequisites: ["spec-reproducing-papers", "spec-experiment-design"],
            duration: "12 min",
            content: {
              what: "Model architecture research involves designing new neural network architectures, identifying architectural innovations that improve performance, and understanding the design space of modern AI models — from attention mechanisms to routing strategies to training objectives.",
              why: "Architecture research drives fundamental AI progress. Understanding how to think about architecture design — what to change, what to keep, and how to evaluate innovations — enables you to contribute to advancing the field rather than just applying existing methods.",
              how: "Key areas: attention variants (linear attention, sparse attention), normalization strategies (RMSNorm, pre-norm vs. post-norm), activation functions (SwiGLU), positional encodings (RoPE, ALiBi), and scaling strategies (width vs. depth, MoE). Start by deeply understanding existing architectures, then identify limitations through experimentation. Validate improvements with rigorous ablation studies.",
              ai: "Architecture research is increasingly specialized. Focus areas with high impact: efficient inference architectures, long-context architectures, multimodal architectures, and architectures for specialized domains (code, math, reasoning)."
            }
          }
        ]
      }
    ],
    // Stage 15 is browse-only: no checkpoint, no projects
    checkpoint: null,
    projectIds: []
  }
];

