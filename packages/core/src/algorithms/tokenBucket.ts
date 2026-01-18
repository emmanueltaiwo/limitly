class TokenBucket {
  constructor(
    private capacity: number,
    private refillRate: number,
    private tokens: number,
    private lastRefill: number
  ) {}

  refill(now: number) {
    const elapsed = (now - this.lastRefill) / 1000;
    const refill = elapsed * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + refill);
    this.lastRefill = now;
  }

  tryConsume(amount = 1): boolean {
    if (this.tokens >= amount) {
      this.tokens -= amount;
      return true;
    }
    return false;
  }

  serialize() {
    return {
      tokens: this.tokens,
      lastRefill: this.lastRefill,
    };
  }
}

export default TokenBucket;
