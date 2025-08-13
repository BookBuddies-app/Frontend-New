import { type User, type InsertUser, type Event, type InsertEvent, type Registration, type InsertRegistration } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  getUpcomingEvents(): Promise<Event[]>;
  
  // Registrations
  getEventRegistrations(eventId: string): Promise<Registration[]>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrationCount(eventId: string): Promise<number>;
  isUserRegistered(eventId: string, email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private events: Map<string, Event>;
  private registrations: Map<string, Registration>;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.registrations = new Map();
    
    // Add some sample events
    this.seedEvents();
  }

  private seedEvents() {
    const sampleEvents: Event[] = [
      {
        id: "1",
        bookTitle: "بوف کور",
        author: "صادق هدایت",
        description: "داستان تلخ و تأثیرگذار هدایت که تصویری از وضعیت روشنفکر ایرانی در برابر جامعه ارائه می‌دهد. این اثر کوتاه اما عمیق، یکی از شاهکارهای ادبیات معاصر فارسی محسوب می‌شود.",
        category: "رمان کلاسیک",
        date: new Date("2024-03-05T16:00:00"),
        time: "ساعت ۱۶:۰۰ تا ۱۸:۰۰",
        capacity: 12,
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        createdAt: new Date(),
      },
      {
        id: "2",
        bookTitle: "هوای تازه",
        author: "احمد شاملو",
        description: "مجموعه شعرهای زیبا و متفاوت شاملو که نگاهی نو به شعر فارسی ارائه می‌دهد. این اثر نمونه‌ای از شعر نو و مدرن فارسی است که با زبان ساده اما عمیق، احساسات انسانی را به تصویر می‌کشد.",
        category: "شعر معاصر",
        date: new Date("2024-03-12T17:00:00"),
        time: "ساعت ۱۷:۰۰ تا ۱۹:۰۰",
        capacity: 10,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        createdAt: new Date(),
      },
      {
        id: "3",
        bookTitle: "سووشون",
        author: "سیمین دانشور",
        description: "رمان برجسته‌ای از ادبیات معاصر فارسی که نگاهی عمیق به جامعه ایران دارد. این اثر با نگاه زنانه و حساس، تصویری از تغییرات اجتماعی و فرهنگی ایران در دوره‌ای حساس ارائه می‌دهد.",
        category: "داستان کوتاه",
        date: new Date("2024-03-20T16:30:00"),
        time: "ساعت ۱۶:۳۰ تا ۱۸:۳۰",
        capacity: 15,
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        createdAt: new Date(),
      }
    ];
    
    sampleEvents.forEach(event => this.events.set(event.id, event));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { 
      ...insertEvent,
      imageUrl: insertEvent.imageUrl || null,
      id, 
      createdAt: new Date() 
    };
    this.events.set(id, event);
    return event;
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values())
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getEventRegistrations(eventId: string): Promise<Registration[]> {
    return Array.from(this.registrations.values())
      .filter(reg => reg.eventId === eventId);
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const registration: Registration = { 
      ...insertRegistration,
      notes: insertRegistration.notes || null,
      id, 
      createdAt: new Date() 
    };
    this.registrations.set(id, registration);
    return registration;
  }

  async getRegistrationCount(eventId: string): Promise<number> {
    return Array.from(this.registrations.values())
      .filter(reg => reg.eventId === eventId).length;
  }

  async isUserRegistered(eventId: string, email: string): Promise<boolean> {
    return Array.from(this.registrations.values())
      .some(reg => reg.eventId === eventId && reg.email === email);
  }
}

export const storage = new MemStorage();
