import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all events
  app.get("/api/events", async (_req, res) => {
    try {
      const events = await storage.getAllEvents();
      const eventsWithCounts = await Promise.all(
        events.map(async (event) => {
          const registrationCount = await storage.getRegistrationCount(event.id);
          return { ...event, registrationCount };
        })
      );
      res.json(eventsWithCounts);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت رویدادها" });
    }
  });

  // Get upcoming events
  app.get("/api/events/upcoming", async (_req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      const eventsWithCounts = await Promise.all(
        events.map(async (event) => {
          const registrationCount = await storage.getRegistrationCount(event.id);
          return { ...event, registrationCount };
        })
      );
      res.json(eventsWithCounts);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت رویدادهای آینده" });
    }
  });

  // Get single event
  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "رویداد پیدا نشد" });
      }
      
      const registrationCount = await storage.getRegistrationCount(event.id);
      res.json({ ...event, registrationCount });
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت رویداد" });
    }
  });

  // Register for event
  app.post("/api/events/:id/register", async (req, res) => {
    try {
      const eventId = req.params.id;
      
      // Basic authentication check - require userId for registration
      // In a real app this would use proper session/JWT authentication
      if (!req.body.userId) {
        return res.status(401).json({ 
          message: "لطفاً ابتدا ثبت‌نام و ورود کنید، سپس می‌توانید در رویداد شرکت کنید." 
        });
      }
      
      // Check if event exists
      const event = await storage.getEvent(eventId);
      if (!event) {
        return res.status(404).json({ message: "رویداد پیدا نشد" });
      }

      // Validate request body
      const validatedData = insertRegistrationSchema.parse({
        ...req.body,
        eventId,
      });

      // Check if user is already registered
      const isRegistered = await storage.isUserRegistered(eventId, validatedData.email);
      if (isRegistered) {
        return res.status(400).json({ message: "شما قبلاً در این رویداد ثبت نام کرده‌اید" });
      }

      // Check capacity
      const currentRegistrations = await storage.getRegistrationCount(eventId);
      if (currentRegistrations >= event.capacity) {
        return res.status(400).json({ message: "ظرفیت رویداد تکمیل است" });
      }

      // Create registration
      const registration = await storage.createRegistration(validatedData);
      res.status(201).json({ message: "ثبت نام با موفقیت انجام شد", registration });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          message: "اطلاعات وارد شده نامعتبر است", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "خطا در ثبت نام" });
    }
  });

  // Get event registrations (for admin purposes)
  app.get("/api/events/:id/registrations", async (req, res) => {
    try {
      const registrations = await storage.getEventRegistrations(req.params.id);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت ثبت نام‌ها" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
