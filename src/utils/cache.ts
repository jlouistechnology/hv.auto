const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class Cache {
  private storage: Map<string, CacheItem<any>>;

  constructor() {
    this.storage = new Map();
  }

  get<T>(key: string): T | null {
    const item = this.storage.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > CACHE_DURATION) {
      this.storage.delete(key);
      return null;
    }

    return item.data;
  }

  set<T>(key: string, data: T): void {
    this.storage.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.storage.clear();
  }
}

export const cache = new Cache();