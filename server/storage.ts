import { type User, type InsertUser, type Event, type InsertEvent, type Registration, type InsertRegistration, type Cafe, type InsertCafe, type Club, type InsertClub, type ClubMember } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cafes
  getAllCafes(): Promise<Cafe[]>;
  getCafe(id: string): Promise<Cafe | undefined>;
  createCafe(cafe: InsertCafe): Promise<Cafe>;
  getCafesByDistrict(district: number): Promise<Cafe[]>;
  searchCafes(query: string): Promise<Cafe[]>;
  
  // Clubs
  getAllClubs(): Promise<Club[]>;
  getClub(id: string): Promise<Club | undefined>;
  createClub(club: InsertClub): Promise<Club>;
  getClubsByCafe(cafeId: string): Promise<Club[]>;
  getUserClubs(userId: string): Promise<Club[]>;
  
  // Club Members
  joinClub(clubId: string, userId: string): Promise<ClubMember>;
  leaveClub(clubId: string, userId: string): Promise<void>;
  getClubMembers(clubId: string): Promise<ClubMember[]>;
  isUserInClub(clubId: string, userId: string): Promise<boolean>;
  
  // Events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  getUpcomingEvents(): Promise<Event[]>;
  getEventsByClub(clubId: string): Promise<Event[]>;
  getEventsByCafe(cafeId: string): Promise<Event[]>;
  getEventsByDate(date: string): Promise<Event[]>;
  searchEvents(query: string, category?: string): Promise<Event[]>;
  
  // Registrations
  getEventRegistrations(eventId: string): Promise<Registration[]>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrationCount(eventId: string): Promise<number>;
  isUserRegistered(eventId: string, email: string): Promise<boolean>;
  getUserRegistrations(userId: string): Promise<Registration[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cafes: Map<string, Cafe>;
  private clubs: Map<string, Club>;
  private events: Map<string, Event>;
  private registrations: Map<string, Registration>;
  private clubMembers: Map<string, ClubMember>;

  constructor() {
    this.users = new Map();
    this.cafes = new Map();
    this.clubs = new Map();
    this.events = new Map();
    this.registrations = new Map();
    this.clubMembers = new Map();
    
    this.seedData();
  }

  private seedData() {
    this.seedCafes();
    this.seedClubs();
    this.seedEvents();
  }

  private seedCafes() {
    const cafes: Cafe[] = [
      {
        id: "cafe-1",
        name: "کافه کتاب",
        district: 3,
        address: "خیابان ولیعصر، بالاتر از چهارراه ولیعصر",
        phone: "۰۲۱-۸۸۷۷۶۶۵۵",
        description: "کافه‌ای دنج و گرم برای عاشقان کتاب و ادبیات فارسی",
        imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        ownerId: null,
        createdAt: new Date(),
      },
      {
        id: "cafe-2", 
        name: "کتابخانه کافه",
        district: 6,
        address: "خیابان انقلاب، نزدیک دانشگاه تهران",
        phone: "۰۲۱-۶۶۲۲۱۱۳۳",
        description: "فضایی آرام برای مطالعه و گفتگوهای ادبی",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        ownerId: null,
        createdAt: new Date(),
      },
      {
        id: "cafe-3",
        name: "آلوان کافه",
        district: 1,
        address: "میدان تجریش، کوچه دوم",
        phone: "۰۲۱-۲۲۱۱۴۴۷۷",
        description: "کافه‌ای مدرن با فضای باز برای برگزاری رویدادهای فرهنگی",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        ownerId: null,
        createdAt: new Date(),
      },
      {
        id: "cafe-4",
        name: "ادب کافه",
        district: 2,
        address: "خیابان شریعتی، نزدیک پارک ملت",
        phone: "۰۲۱-۲۲۶۶۸۸۹۹",
        description: "محیطی الهام‌بخش برای بحث و تبادل نظر درباره ادبیات",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        ownerId: null,
        createdAt: new Date(),
      }
    ];
    
    cafes.forEach(cafe => this.cafes.set(cafe.id, cafe));
  }

  private seedClubs() {
    const clubs: Club[] = [
      {
        id: "club-1",
        name: "باشگاه کتاب کلاسیک",
        description: "بررسی و تحلیل آثار کلاسیک ادبیات فارسی",
        cafeId: "cafe-1",
        ownerId: "owner-1",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "club-2",
        name: "شعر معاصر",
        description: "گفتگو درباره شعر و شاعران معاصر فارسی",
        cafeId: "cafe-2",
        ownerId: "owner-2",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        isActive: true,
        createdAt: new Date(),
      }
    ];
    
    clubs.forEach(club => this.clubs.set(club.id, club));
  }

  private seedEvents() {
    // Events for Shahrivar 1404 (September 2025) and later
    const sampleEvents: Event[] = [
      {
        id: "1",
        bookTitle: "بوف کور",
        author: "صادق هدایت",
        description: "داستان تلخ و تأثیرگذار هدایت که تصویری از وضعیت روشنفکر ایرانی در برابر جامعه ارائه می‌دهد. این اثر کوتاه اما عمیق، یکی از شاهکارهای ادبیات معاصر فارسی محسوب می‌شود.",
        category: "رمان کلاسیک",
        date: new Date("2025-09-15T16:00:00"),
        time: "ساعت ۱۶:۰۰ تا ۱۸:۰۰",
        capacity: 12,
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        clubId: "club-1",
        cafeId: "cafe-1",
        createdAt: new Date(),
      },
      {
        id: "2",
        bookTitle: "هوای تازه",
        author: "احمد شاملو",
        description: "مجموعه شعرهای زیبا و متفاوت شاملو که نگاهی نو به شعر فارسی ارائه می‌دهد. این اثر نمونه‌ای از شعر نو و مدرن فارسی است که با زبان ساده اما عمیق، احساسات انسانی را به تصویر می‌کشد.",
        category: "شعر معاصر",
        date: new Date("2025-09-22T17:00:00"),
        time: "ساعت ۱۷:۰۰ تا ۱۹:۰۰",
        capacity: 10,
        imageUrl: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        clubId: "club-2",
        cafeId: "cafe-2",
        createdAt: new Date(),
      },
      {
        id: "3",
        bookTitle: "سووشون",
        author: "سیمین دانشور",
        description: "رمان برجسته‌ای از ادبیات معاصر فارسی که نگاهی عمیق به جامعه ایران دارد. این اثر با نگاه زنانه و حساس، تصویری از تغییرات اجتماعی و فرهنگی ایران در دوره‌ای حساس ارائه می‌دهد.",
        category: "رمان معاصر",
        date: new Date("2025-09-29T16:30:00"),
        time: "ساعت ۱۶:۳۰ تا ۱۸:۳۰",
        capacity: 15,
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        clubId: "club-1",
        cafeId: "cafe-1",
        createdAt: new Date(),
      },
      {
        id: "4",
        bookTitle: "گلستان سعدی",
        author: "سعدی شیرازی",
        description: "شاهکار ادبی سعدی که حکمت‌ها و اندرزهای ارزشمندی در خود جای داده است. این اثر کلاسیک همچنان برای خوانندگان امروز الهام‌بخش است.",
        category: "ادبیات کلاسیک",
        date: new Date("2025-10-06T15:00:00"),
        time: "ساعت ۱۵:۰۰ تا ۱۷:۰۰",
        capacity: 20,
        imageUrl: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        clubId: "club-1",
        cafeId: "cafe-3",
        createdAt: new Date(),
      },
      {
        id: "5",
        bookTitle: "دیوان حافظ",
        author: "حافظ شیرازی",
        description: "مجموعه غزلیات بی‌نظیر حافظ که گنجینه‌ای از عشق، عرفان و زیبایی است. در این جلسه به بررسی زیباترین غزل‌های حافظ خواهیم پرداخت.",
        category: "شعر کلاسیک",
        date: new Date("2025-10-13T18:00:00"),
        time: "ساعت ۱۸:۰۰ تا ۲۰:۰۰",
        capacity: 18,
        imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        clubId: "club-2",
        cafeId: "cafe-2",
        createdAt: new Date(),
      },
      {
        id: "6",
        bookTitle: "کلیله و دمنه",
        author: "نصرالله منشی",
        description: "مجموعه داستان‌های آموزنده که با زبان ساده و شیرین، درس‌های زندگی را به ما می‌آموزد. این اثر کهن همچنان برای نسل‌های جدید جذاب است.",
        category: "ادبیات کودک و نوجوان",
        date: new Date("2025-10-20T16:00:00"),
        time: "ساعت ۱۶:۰۰ تا ۱۸:۰۰",
        capacity: 16,
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        clubId: "club-1",
        cafeId: "cafe-4",
        createdAt: new Date(),
      },
      {
        id: "7",
        bookTitle: "رستم و سهراب",
        author: "فردوسی",
        description: "یکی از زیباترین و غم‌انگیزترین داستان‌های شاهنامه که روابط پدر و فرزند را به شکلی فوق‌العاده زیبا به تصویر می‌کشد.",
        category: "حماسه",
        date: new Date("2025-10-27T17:30:00"),
        time: "ساعت ۱۷:۳۰ تا ۱۹:۳۰",
        capacity: 14,
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        clubId: "club-1",
        cafeId: "cafe-1",
        createdAt: new Date(),
      },
      {
        id: "8",
        bookTitle: "مثنوی معنوی",
        author: "مولانا جلال‌الدین",
        description: "شاهکار عرفانی مولانا که بحری از معرفت و عشق الهی است. در این جلسه به بررسی برخی از زیباترین داستان‌های مثنوی خواهیم پرداخت.",
        category: "ادبیات عرفانی",
        date: new Date("2025-11-03T16:00:00"),
        time: "ساعت ۱۶:۰۰ تا ۱۸:۰۰",
        capacity: 12,
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        clubId: "club-2",
        cafeId: "cafe-3",
        createdAt: new Date(),
      }
    ];
    
    sampleEvents.forEach(event => this.events.set(event.id, event));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "user",
      phone: insertUser.phone || null,
      avatar: insertUser.avatar || null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Cafe methods
  async getAllCafes(): Promise<Cafe[]> {
    return Array.from(this.cafes.values());
  }

  async getCafe(id: string): Promise<Cafe | undefined> {
    return this.cafes.get(id);
  }

  async createCafe(insertCafe: InsertCafe): Promise<Cafe> {
    const id = randomUUID();
    const cafe: Cafe = { 
      ...insertCafe,
      imageUrl: insertCafe.imageUrl || null,
      ownerId: insertCafe.ownerId || null,
      phone: insertCafe.phone || null,
      description: insertCafe.description || null,
      id,
      createdAt: new Date()
    };
    this.cafes.set(id, cafe);
    return cafe;
  }

  async getCafesByDistrict(district: number): Promise<Cafe[]> {
    return Array.from(this.cafes.values()).filter(cafe => cafe.district === district);
  }

  async searchCafes(query: string): Promise<Cafe[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.cafes.values()).filter(cafe => 
      cafe.name.toLowerCase().includes(lowercaseQuery) ||
      cafe.address.toLowerCase().includes(lowercaseQuery) ||
      (cafe.description && cafe.description.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Club methods
  async getAllClubs(): Promise<Club[]> {
    return Array.from(this.clubs.values());
  }

  async getClub(id: string): Promise<Club | undefined> {
    return this.clubs.get(id);
  }

  async createClub(insertClub: InsertClub): Promise<Club> {
    const id = randomUUID();
    const club: Club = { 
      ...insertClub,
      imageUrl: insertClub.imageUrl || null,
      isActive: insertClub.isActive ?? true,
      id,
      createdAt: new Date()
    };
    this.clubs.set(id, club);
    return club;
  }

  async getClubsByCafe(cafeId: string): Promise<Club[]> {
    return Array.from(this.clubs.values()).filter(club => club.cafeId === cafeId);
  }

  async getUserClubs(userId: string): Promise<Club[]> {
    const userMemberships = Array.from(this.clubMembers.values())
      .filter(member => member.userId === userId);
    
    return userMemberships.map(membership => this.clubs.get(membership.clubId))
      .filter((club): club is Club => club !== undefined);
  }

  // Club member methods
  async joinClub(clubId: string, userId: string): Promise<ClubMember> {
    const id = randomUUID();
    const member: ClubMember = { 
      id,
      clubId,
      userId,
      joinedAt: new Date()
    };
    this.clubMembers.set(id, member);
    return member;
  }

  async leaveClub(clubId: string, userId: string): Promise<void> {
    const memberEntry = Array.from(this.clubMembers.entries())
      .find(([_, member]) => member.clubId === clubId && member.userId === userId);
    
    if (memberEntry) {
      this.clubMembers.delete(memberEntry[0]);
    }
  }

  async getClubMembers(clubId: string): Promise<ClubMember[]> {
    return Array.from(this.clubMembers.values())
      .filter(member => member.clubId === clubId);
  }

  async isUserInClub(clubId: string, userId: string): Promise<boolean> {
    return Array.from(this.clubMembers.values())
      .some(member => member.clubId === clubId && member.userId === userId);
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
      userId: insertRegistration.userId || null,
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

  async getUserRegistrations(userId: string): Promise<Registration[]> {
    return Array.from(this.registrations.values())
      .filter(reg => reg.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  // Additional event methods
  async getEventsByClub(clubId: string): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter(event => event.clubId === clubId)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async getEventsByCafe(cafeId: string): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter(event => event.cafeId === cafeId)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async getEventsByDate(date: string): Promise<Event[]> {
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);
    
    return Array.from(this.events.values())
      .filter(event => event.date >= startOfDay && event.date < endOfDay);
  }

  async searchEvents(query: string, category?: string): Promise<Event[]> {
    const lowercaseQuery = query.toLowerCase();
    
    return Array.from(this.events.values()).filter(event => {
      const matchesQuery = 
        event.bookTitle.toLowerCase().includes(lowercaseQuery) ||
        event.author.toLowerCase().includes(lowercaseQuery) ||
        event.description.toLowerCase().includes(lowercaseQuery);
      
      const matchesCategory = !category || event.category === category;
      
      return matchesQuery && matchesCategory;
    });
  }
}

export const storage = new MemStorage();
