# Notatki: Node.js, Express.js, Prisma i MongoDB

## Spis treści

1. [Importowanie bazy danych w phpMyAdmin](#importowanie-bazy-danych-w-phpmyadmin)
2. [Instalacja i komendy](#instalacja-i-komendy)
3. [Express.js - Framework webowy](#expressjs---framework-webowy)
4. [Middleware - Jak działają](#middleware---jak-działają)
5. [Prisma - ORM dla baz danych](#prisma---orm-dla-baz-danych)
6. [MongoDB - Baza NoSQL](#mongodb---baza-nosql)

---

## Importowanie bazy danych w phpMyAdmin

### Co to jest phpMyAdmin?

phpMyAdmin to webowe narzędzie do zarządzania bazami danych MySQL/MariaDB. Dostępne zazwyczaj pod adresem `http://localhost/phpmyadmin` lub `http://localhost:8080`.

### Importowanie bazy danych

1. **Zaloguj się** do phpMyAdmin (domyślnie: user `root`, hasło puste lub ustawione podczas instalacji)

2. **Utwórz nową bazę danych:**
   - Kliknij "Nowa" (New) w lewym panelu
   - Wpisz nazwę bazy danych
   - Wybierz kodowanie `utf8mb4_general_ci` (obsługuje emoji i polskie znaki)
   - Kliknij "Utwórz" (Create)

3. **Importuj plik SQL:**
   - Wybierz utworzoną bazę danych z lewego panelu
   - Kliknij zakładkę "Import" u góry
   - Kliknij "Wybierz plik" i wybierz plik `.sql`
   - Kliknij "Wykonaj" (Go) na dole strony

### Eksportowanie bazy danych

1. Wybierz bazę danych z lewego panelu
2. Kliknij zakładkę "Eksport" (Export)
3. Wybierz format "SQL"
4. Kliknij "Wykonaj" (Go) - plik zostanie pobrany

### Connection string dla MySQL/MariaDB

Format URL do połączenia z bazą:

```
mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
```

**Przykłady:**

```env
# Lokalna baza danych (XAMPP/MAMP)
DATABASE_URL="mysql://root@localhost:3306/mojadb"

# Z hasłem
DATABASE_URL="mysql://root:mojehaslo@localhost:3306/mojadb"

# MariaDB (ten sam format)
DATABASE_URL="mysql://root:haslo@localhost:3306/mojadb"
```

---

## Instalacja i komendy

### Inicjalizacja projektu

```bash
# Utworzenie nowego projektu Node.js
npm init -y
```

### Express.js

**Bez TypeScript:**

```bash
npm install express
```

**Z TypeScript:**

```bash
npm install express
npm install -D typescript ts-node @types/node @types/express
npx tsc --init
```

### Prisma (z MySQL/MariaDB)

**Bez TypeScript:**

```bash
npm install prisma @prisma/client
npx prisma init
```

**Z TypeScript:**

```bash
npm install prisma @prisma/client
npm install -D typescript ts-node @types/node
npx tsc --init
npx prisma init
```

### MongoDB

**Bez TypeScript:**

```bash
npm install mongodb
```

**Z TypeScript:**

```bash
npm install mongodb
npm install -D typescript ts-node @types/node
npx tsc --init
```

### Dodatkowe przydatne paczki

```bash
# Zmienne środowiskowe z pliku .env
npm install dotenv

# Automatyczny restart serwera podczas developmentu
npm install -D nodemon

# Parsowanie formularzy (już w Express, ale warto wiedzieć)
# express.json() i express.urlencoded() są wbudowane
```

### Wszystko razem (TypeScript + Express + Prisma + MongoDB)

```bash
npm init -y
npm install express prisma @prisma/client mongodb dotenv
npm install -D typescript ts-node @types/node @types/express nodemon
npx tsc --init
npx prisma init
```

### Wszystko razem (JavaScript bez TypeScript)

```bash
npm init -y
npm install express prisma @prisma/client mongodb dotenv
npm install -D nodemon
npx prisma init
```

### Komendy Prisma

```bash
# Inicjalizacja Prisma (tworzy folder prisma/ i plik .env)
npx prisma init

# Tworzenie migracji (po zmianie schema.prisma)
npx prisma migrate dev --name nazwa_migracji

# Zastosowanie migracji (produkcja)
npx prisma migrate deploy

# Reset bazy danych (usuwa wszystkie dane!)
npx prisma migrate reset

# Generowanie klienta (po zmianie schema.prisma)
npx prisma generate

# Otwarcie GUI do przeglądania bazy
npx prisma studio

# Synchronizacja schematu z istniejącą bazą (bez migracji)
npx prisma db push
```

### Skrypty w package.json

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "start:ts": "ts-node index.ts",
    "dev:ts": "nodemon --exec ts-node index.ts"
  }
}
```

---

## Express.js - Framework webowy

Express.js to minimalistyczny framework webowy dla Node.js. Upraszcza tworzenie serwerów HTTP i API.

### Podstawowa konfiguracja (JavaScript)

```javascript
const express = require('express')

const app = express()

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
```

### Podstawowa konfiguracja (TypeScript)

```typescript
import express, { Express } from 'express'

const app: Express = express()

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
```

### Routing - Obsługa ścieżek

```javascript
const express = require('express')
const path = require('path')

const app = express()

// GET - pobieranie danych
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// POST - wysyłanie danych
app.post('/kontakt', (req, res) => {
  const { name, email, message } = req.body
  console.log('Otrzymano:', name, email, message)
  res.redirect('/')
})

// Parametry w URL
app.get('/user/:id', (req, res) => {
  const id = req.params.id
  res.json({ userId: id })
})

// Query parameters (?name=Jan&age=25)
app.get('/search', (req, res) => {
  const { name, age } = req.query
  res.json({ name, age })
})
```

### Tworzenie routera (modularność)

```javascript
// routes/users.js
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'Lista użytkowników' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `Użytkownik ${req.params.id}` })
})

router.post('/', (req, res) => {
  const { name, email } = req.body
  res.status(201).json({ message: 'Użytkownik utworzony', name, email })
})

module.exports = router
```

```javascript
// index.js
const express = require('express')
const usersRouter = require('./routes/users')

const app = express()

app.use(express.json())
app.use('/users', usersRouter)  // Wszystkie ścieżki /users/*

app.listen(3000)
```

---

## Middleware - Jak działają

### Co to jest Middleware?

Middleware to funkcje, które mają dostęp do:

- Obiektu żądania (`req`)
- Obiektu odpowiedzi (`res`)
- Funkcji `next()` - przekazuje kontrolę do następnego middleware'a

**Przepływ middleware:**

```
Request → Middleware 1 → Middleware 2 → ... → Route Handler → Response
```

### Wbudowane Middleware Express.js

#### 1. `express.json()` - Parsowanie JSON

```javascript
app.use(express.json())
```

**Co robi:** Parsuje ciało żądania (body) w formacie JSON i udostępnia je jako `req.body`.

**Kiedy używać:** Gdy API przyjmuje dane w formacie JSON (np. REST API).

**Przykład:**

```javascript
// Klient wysyła:
// POST /user
// Content-Type: application/json
// Body: {"name": "Jan", "email": "jan@example.com"}

app.post('/user', (req, res) => {
  console.log(req.body.name)   // "Jan"
  console.log(req.body.email)  // "jan@example.com"
})
```

#### 2. `express.urlencoded()` - Parsowanie formularzy HTML

```javascript
app.use(express.urlencoded({ extended: true }))
```

**Co robi:** Parsuje dane z formularzy HTML (format `application/x-www-form-urlencoded`).

**Opcja `extended`:**

- `true` - używa biblioteki `qs`, pozwala na zagnieżdżone obiekty
- `false` - używa `querystring`, tylko proste pary klucz-wartość

**Przykład:**

```javascript
// Formularz HTML wysyła:
// POST /kontakt
// Content-Type: application/x-www-form-urlencoded
// Body: name=Jan&email=jan@example.com

app.post('/kontakt', (req, res) => {
  const { name, email } = req.body
  console.log(name)   // "Jan"
  console.log(email)  // "jan@example.com"
})
```

#### 3. `express.static()` - Serwowanie plików statycznych

```javascript
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
```

**Co robi:** Serwuje pliki statyczne (HTML, CSS, obrazy, JavaScript) z określonego folderu.

**Przykład:** Jeśli masz folder `public/` z plikami:

- `public/style.css` → dostępny pod `http://localhost:3000/style.css`
- `public/images/logo.png` → dostępny pod `http://localhost:3000/images/logo.png`

### Tworzenie własnych Middleware

#### Struktura middleware (JavaScript)

```javascript
const myMiddleware = (req, res, next) => {
  // Logika middleware
  console.log('Middleware wykonany!')
  console.log(`${req.method} ${req.url}`)
  
  next() // WAŻNE: Przekazuje kontrolę dalej
}

app.use(myMiddleware)
```

#### Struktura middleware (TypeScript)

```typescript
import { Request, Response, NextFunction } from 'express'

const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware wykonany!')
  next()
}

app.use(myMiddleware)
```

#### Przykład: Middleware logujący

```javascript
const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${req.method} ${req.url}`)
  next()
}

app.use(loggerMiddleware)
```

#### Przykład: Middleware autoryzacyjny

```javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Brak tokenu autoryzacji' })
  }

  // Weryfikacja tokenu...
  if (token !== 'secret-token') {
    return res.status(403).json({ message: 'Nieprawidłowy token' })
  }

  next() // Token poprawny, kontynuuj
}

// Użycie tylko dla wybranych ścieżek
app.use('/api', authMiddleware)
```

#### Middleware obsługi błędów (4 parametry!)

```javascript
// Error middleware - MUSI mieć 4 parametry (err jest pierwszy!)
const errorMiddleware = (err, req, res, next) => {
  console.error('Błąd:', err.message)
  
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  })
}

// ZAWSZE dodawaj na końcu, po wszystkich route'ach!
app.use(errorMiddleware)
```

### Kolejność middleware - WAŻNE!

```javascript
const express = require('express')
const app = express()

// 1. Najpierw parsery (muszą być przed route'ami)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 2. Pliki statyczne
app.use(express.static('public'))

// 3. Własne middleware (np. logowanie)
app.use(loggerMiddleware)

// 4. Route'y
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

// 5. Error middleware ZAWSZE NA KOŃCU
app.use(errorMiddleware)

app.listen(3000)
```

### Przekazywanie błędów do error middleware

```javascript
app.get('/user/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await findUserById(id)
    
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    next(error) // Przekazuje błąd do error middleware
  }
})
```

---

## Prisma - ORM dla baz danych

Prisma to nowoczesny ORM (Object-Relational Mapping) dla Node.js i TypeScript. Obsługuje MySQL, MariaDB, PostgreSQL, SQLite i MongoDB.

### Konfiguracja dla MySQL/MariaDB (phpMyAdmin)

Po wykonaniu `npx prisma init`, edytuj plik `.env`:

```env
DATABASE_URL="mysql://root@localhost:3306/nazwa_bazy"
```

I plik `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### Definiowanie modeli (schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  
  posts     Post[]
  comments  Comment[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?  @db.Text
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  authorId  Int
  
  author    User       @relation(fields: [authorId], references: [id])
  categories Category[]
  comments  Comment[]
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  
  posts Post[]
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
  authorId  Int
  postId    Int
  
  author    User @relation(fields: [authorId], references: [id])
  post      Post @relation(fields: [postId], references: [id])
}
```

### Atrybuty Prisma

| Atrybut | Opis |
|---------|------|
| `@id` | Klucz główny |
| `@default(autoincrement())` | Auto-inkrementacja |
| `@default(now())` | Domyślna wartość = aktualna data |
| `@updatedAt` | Automatyczna aktualizacja przy zmianie |
| `@unique` | Wartość unikalna |
| `@relation` | Definicja relacji |
| `@db.Text` | Typ TEXT w bazie (dla długich tekstów) |
| `?` po typie | Pole opcjonalne (może być NULL) |

### Połączenie z bazą danych

**JavaScript:**

```javascript
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = prisma
```

**TypeScript:**

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
```

### Operacje CRUD z Prisma

```javascript
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CREATE - Tworzenie
async function createUser(email, name, password) {
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password
    }
  })
  return user
}

// READ - Pobieranie wszystkich
async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}

// READ - Pobieranie po ID
async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }
  })
  return user
}

// READ - Z relacjami
async function getUserWithPosts(id) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { posts: true, comments: true }
  })
  return user
}

// UPDATE - Aktualizacja
async function updateUser(id, data) {
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: data
  })
  return user
}

// DELETE - Usuwanie
async function deleteUser(id) {
  const user = await prisma.user.delete({
    where: { id: parseInt(id) }
  })
  return user
}
```

### Użycie w Express Router

```javascript
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// GET /users
router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// GET /users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }
    })
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// POST /users
router.post('/', async (req, res, next) => {
  try {
    const { email, name, password } = req.body
    
    const user = await prisma.user.create({
      data: { email, name, password }
    })
    
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

// PUT /users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { email, name, password } = req.body
    
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { email, name, password }
    })
    
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// DELETE /users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    })
    
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
```

### Tworzenie z relacjami

```javascript
// Tworzenie posta z kategoriami
const post = await prisma.post.create({
  data: {
    title: 'Mój post',
    content: 'Treść posta',
    authorId: 1,
    categories: {
      connect: [{ id: 1 }, { id: 2 }]  // Połączenie z istniejącymi
    }
  }
})

// Tworzenie posta z nową kategorią
const post2 = await prisma.post.create({
  data: {
    title: 'Nowy post',
    content: 'Treść',
    authorId: 1,
    categories: {
      create: { name: 'Nowa kategoria' }  // Tworzy nową kategorię
    }
  }
})

// Aktualizacja relacji
const updatedPost = await prisma.post.update({
  where: { id: 1 },
  data: {
    categories: {
      set: [{ id: 3 }, { id: 4 }]  // Zastąpienie wszystkich kategorii
    }
  }
})
```

---

## MongoDB - Baza NoSQL

MongoDB to dokumentowa baza danych NoSQL. Przechowuje dane w formacie BSON (Binary JSON).

### Połączenie z MongoDB

```javascript
const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

async function connectToMongo() {
  await client.connect()
  console.log('Connected to MongoDB')
  return client.db('myDatabase')
}
```

### Użycie w Express Router - najprostsza wersja

```javascript
const express = require('express')
const { MongoClient } = require('mongodb')

const router = express.Router()

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)
const db = client.db('myDatabase')

// Połączenie przy starcie
client.connect().then(() => {
  console.log('Connected to MongoDB')
})

// GET /logs
router.get('/', async (req, res, next) => {
  try {
    const logs = await db.collection('logs').find().toArray()
    res.json(logs)
  } catch (error) {
    next(error)
  }
})

// GET /logs/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { ObjectId } = require('mongodb')
    const log = await db.collection('logs').findOne({
      _id: new ObjectId(req.params.id)
    })
    
    if (!log) {
      return res.status(404).json({ message: 'Log not found' })
    }
    
    res.json(log)
  } catch (error) {
    next(error)
  }
})

// POST /logs
router.post('/', async (req, res, next) => {
  try {
    const log = {
      ...req.body,
      timestamp: new Date()
    }
    
    const result = await db.collection('logs').insertOne(log)
    res.status(201).json({ insertedId: result.insertedId })
  } catch (error) {
    next(error)
  }
})

// DELETE /logs/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { ObjectId } = require('mongodb')
    await db.collection('logs').deleteOne({
      _id: new ObjectId(req.params.id)
    })
    
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
```

### Operacje MongoDB - ściągawka

```javascript
const db = client.db('myDatabase')
const collection = db.collection('users')

// INSERT - Dodawanie
await collection.insertOne({ name: 'Jan', email: 'jan@example.com' })
await collection.insertMany([
  { name: 'Anna', email: 'anna@example.com' },
  { name: 'Piotr', email: 'piotr@example.com' }
])

// FIND - Wyszukiwanie
const allUsers = await collection.find().toArray()
const user = await collection.findOne({ email: 'jan@example.com' })
const adults = await collection.find({ age: { $gte: 18 } }).toArray()

// UPDATE - Aktualizacja
await collection.updateOne(
  { email: 'jan@example.com' },
  { $set: { name: 'Jan Kowalski' } }
)
await collection.updateMany(
  { active: false },
  { $set: { active: true } }
)

// DELETE - Usuwanie
await collection.deleteOne({ email: 'jan@example.com' })
await collection.deleteMany({ active: false })

// Wyszukiwanie po ObjectId
const { ObjectId } = require('mongodb')
const userById = await collection.findOne({ _id: new ObjectId('abc123...') })
```

### Operatory MongoDB

| Operator | Opis | Przykład |
|----------|------|----------|
| `$eq` | Równe | `{ age: { $eq: 25 } }` |
| `$ne` | Nie równe | `{ age: { $ne: 25 } }` |
| `$gt` | Większe niż | `{ age: { $gt: 18 } }` |
| `$gte` | Większe lub równe | `{ age: { $gte: 18 } }` |
| `$lt` | Mniejsze niż | `{ age: { $lt: 65 } }` |
| `$lte` | Mniejsze lub równe | `{ age: { $lte: 65 } }` |
| `$in` | W tablicy | `{ status: { $in: ['active', 'pending'] } }` |
| `$and` | I (logiczne) | `{ $and: [{ age: { $gte: 18 } }, { active: true }] }` |
| `$or` | Lub (logiczne) | `{ $or: [{ age: { $lt: 18 } }, { age: { $gt: 65 } }] }` |

---

## Kompletny przykład aplikacji

### index.js (główny plik)

```javascript
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware parsujące (PRZED route'ami!)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Pliki statyczne (HTML, CSS, JS, obrazy)
app.use(express.static(path.join(__dirname, 'public')))

// Własne middleware (opcjonalne)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Route'y
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

// Error middleware (ZAWSZE NA KOŃCU!)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal Server Error', error: err.message })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
```

### .env

```env
PORT=3000
DATABASE_URL="mysql://root@localhost:3306/mojadb"
MONGO_URI="mongodb://localhost:27017"
```
