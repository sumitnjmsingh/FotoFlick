# 📸 FotoFlick

FotoFlick is a full-stack image-sharing web application where users can upload, explore, like, comment on, download, and even lock their images. Designed with a smooth and responsive UI, it brings a modern, community-driven experience for showcasing and interacting with visual memories.

---

## 🎨 Live Preview

🚀 [Live Site (Vercel)](https://foto-flick.vercel.app)

---

## 📐 UI Design Overview

- **Landing Page** – Introduces the platform with CTA buttons (upload, explore)
- **Gallery** – Explore all uploaded images, filter by category or date
- **Image Card** – Like, comment, and preview each image
- **Upload Page** – Authenticated users can upload and categorize images
- **Image Lock** – Image owners can lock their images (blurred view for others)
- **Image Modal** – Displays full-sized preview with lock info, comments, and sharing

---

## ✨ Features

- 🔐 **Clerk Authentication** (Email, Google, GitHub)
- 📤 **Upload** and categorize images
- 🖼️ **Gallery** with filtering and sorting
- ❤️ **Like/Unlike** functionality
- 💬 **Comment** on images
- 🔒 **Lock/Unlock** images by owners (blurred for others)
- 📥 **Download** feature
- 📲 **Mobile-Responsive** UI
- ⚡ **Performance optimized** with SSR/ISR and Tailwind utility classes

---

## 🧰 Tech Stack

| Category      | Tech Used                            |
| ------------- | ------------------------------------ |
| Frontend      | Next.js 14, TypeScript, Tailwind CSS |
| Backend       | API Routes (App Router)              |
| Auth          | Clerk                                |
| Database      | PostgreSQL with Prisma ORM           |
| Image Hosting | Cloudinary                           |
| UI Icons      | Lucide React                         |

---

## ⚙️ Local Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/sumitnjmsingh/fotoflick.git
cd fotoflick
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure .env File

Create a `.env` file in the root directory and add the following environment variables:

```env
# Prisma DB URL (PostgreSQL)
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<dbname>?schema=public

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Clerk
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

```

### 4. Apply Prisma Schema & Start Dev Server

```bash
npx prisma migrate dev --name init
npm run dev
```

Your app should now be running at: [http://localhost:3000](http://localhost:3000)

## 🔒 Lock Feature Logic

- Owners can toggle **lock/unlock** for their uploaded images.
- When locked, the image is shown with a blur effect and a lock icon.
- Only the owner can see the unblurred version and unlock it again.

---

## 👤 Author

**Sumit Singh**  
🎓 B.Tech CSE @ IIT Mandi  
💻 [GitHub](https://github.com/sumitnjmsingh)  
📧 sumitjfsingh1111@gmail.com

---

## ⭐ Feedback

If you like this project, consider giving it a ⭐ on [GitHub](https://github.com/sumitnjmsingh/fotoflick)!
