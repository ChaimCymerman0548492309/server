

## **README.md לדוגמה**

````markdown
# Resource Allocator (Parking-Lot Preset)

### מבנה ומימוש
- יצרנו **Allocator class** שמנהל משאבים (Vehicles) על פני קומות (Floors) עם יחידות (Spots).  
- סוגי רכבים: MOTORCYCLE, CAR, VAN.  
- סוגי חניות: MOTORCYCLE, COMPACT, LARGE.  
- חוקי התאמה (fit rules):
  - MOTORCYCLE → מתאים לכל יחידה  
  - CAR → COMPACT / LARGE  
  - VAN → LARGE בלבד  
- מדיניות הקצאה: **first-fit** – הקומה הראשונה עם מקום פנוי.

### API (Express)
- `POST /allocate` → JSON body `{id, kind}` → מחזיר location או `no_capacity`  
- `POST /release` → JSON body `{id}` → מחזיר `ok` או `not_found`  
- `GET /stats` → counters: totalBySize, freeBySize, usedByKind  
- `GET /isFull` / `GET /isEmpty` → boolean

### איך להריץ
1. התקן dependencies:
```bash
npm install
````

2. בנה את TypeScript:

```bash
npm run build
```

3. הפעל את השרת:

```bash
npm start
```

4. בצע בדיקות עם curl או Postman (דוגמאות למטה).

### דוגמאות בדיקות curl

```bash
# Allocate Car
curl -X POST http://localhost:3000/allocate -H "Content-Type: application/json" -d '{"id":"car1","kind":"CAR"}'

# Release Car
curl -X POST http://localhost:3000/release -H "Content-Type: application/json" -d '{"id":"car1"}'

# Stats
curl http://localhost:3000/stats

# Check if Full
curl http://localhost:3000/isFull
```

### Design choices

* Encapsulation: floors ו-spots לא נחשפים החוצה.
* TypeScript strict mode + union types + interfaces.
* Allocation deterministic (first-fit).
* Resource registry map לשמירת resourceId → kind.

```

