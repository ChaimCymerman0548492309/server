import { Request, Response } from "express";
import { JsonRepository } from "./repository";
import { Item } from "./types";

export class ItemController {
  private repo: JsonRepository;

  constructor(repo: JsonRepository) {
    this.repo = repo;
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const items = await this.repo.getAll();
      res.json(items);
    } catch {
      res.status(500).json({ error: "Failed to load items" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const item = await this.repo.getById(req.params.id);
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.json(item);
    } catch {
      res.status(500).json({ error: "Failed to load item" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newItem = await this.repo.create(req.body as Partial<Item>);
      res.status(201).json(newItem);
    } catch {
      res.status(500).json({ error: "Failed to create item" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updated = await this.repo.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Item not found" });
      res.json(updated);
    } catch {
      res.status(500).json({ error: "Failed to update item" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const ok = await this.repo.delete(req.params.id);
      if (!ok) return res.status(404).json({ error: "Item not found" });
      res.json({ status: "ok" });
    } catch {
      res.status(500).json({ error: "Failed to delete item" });
    }
  };
}
