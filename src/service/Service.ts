import fs from "fs/promises";
import path from "path";
import { Item, Repository } from "../types/types.js";

const DATA_FILE = path.join(__dirname, "data.json");

export class Service implements Repository<Item> {
  private async load(): Promise<Item[]> {
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private async save(data: Item[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }

  async getAll(): Promise<Item[]> {
    return this.load();
  }

  async getById(id: string): Promise<Item | null> {
    const data = await this.load();
    return data.find((i) => i.id === id) || null;
  }

  async create(data: Partial<Item>): Promise<Item> {
    const all = await this.load();
    const newItem: Item = {
      id: Date.now().toString(),
      name: data.name || "Untitled",
      description: data.description || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    all.push(newItem);
    await this.save(all);
    return newItem;
  }

  async update(id: string, data: Partial<Item>): Promise<Item | null> {
    const all = await this.load();
    const index = all.findIndex((i) => i.id === id);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await this.save(all);
    return all[index];
  }

  async delete(id: string): Promise<boolean> {
    const all = await this.load();
    const filtered = all.filter((i) => i.id !== id);
    if (filtered.length === all.length) return false;
    await this.save(filtered);
    return true;
  }
}
