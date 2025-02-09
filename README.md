# H Lab Assesment

## Back-end Questions

1. ถ้าสมมติมีการสร้าง Microservice Customer Api, Master Data Api,
   และ Transaction Data Api แล้วจะต้องมีการสร้าง Feature ใหม่ที่ต้องดึง Api จากทั้ง 3 Microservice ให้เร็วที่สุดเข้าใกล้ Realtime ผมจะเลือกที่จะสร้าง Api ตัวใหม่โดยใช้ Kafka ยกตัวอย่างเช่น ถ้าเกิดว่ามีการสร้าง Transaction Data ขึ้นมาอันนึง ในฝั่ง Transaction Data ก็จะ Emit Data ไปผ่าน Topic Transaction-data แล้วฝั่ง Frontend ถ้าเปิดตัว Topic Transaction-data ไว้ก็จะสามารถอ่านข้อมูล Transaction ที่พึ่งเพิ่มไปได้ทันทีเป็นต้น แล้วถ้าเกิดว่าต้องการให้ไวกว่านี้ ผมคิดว่าเราสามารถเพิ่มระบบ Caching เข้ามาด้วย Redis ได้คือถ้าสมมติว่ามันดันเพิ่ม Transaction Data ที่มันมีอยู่แล้ว ก็ไม่ต้องไปอ่านจากที่ Emit ไป ก็อ่านจาก Cache ได้เลยว่ายิง Transaction Data Api ไปแล้วเคยได้ ข้อมูลยังไงก็นำมาใช้ได้เลย เป็นต้น ซึ่งเราสามารถประยุกต์ใช้วิธีการนี้ได้กับทั้ง 3 Microservice เลย

2. ถ้าสมมตมีการสร้าง Project ใหม่แล้ว Project Manager บอกให้ Test Performance สำหรับการ Release Project นี้ผมจะวางแผนการ Test โดยการใช้ Tools ที่ชื่อว่า k6 เพื่อทำการ Test Rest Api โดยผมจะทำการเขียน Scripts เพื่อที่จะรัน Test โดยผมจะทำการเทสทั้งหมด 4 เคสคือ Load Test คือ Test ปกติ, Stress Test คือ Test ที่เข้มข้นมากกว่าปกติ, Spike Test คือ Test ที่มีความเข้มข้นสูงในระยะเวลาสั้นๆ, Breakpoint Test คือ Test ด้วยความเข้มข้นสูงไปเรื่อยๆจนกว่าจะถึง Limit สูงสุด, Soak Test คือ Test ที่มีความเข้มข้นสูงที่ไปในระยะเวลายาวนาน

3. ผมได้ทำการสร้าง project multilingual-product ขึ้นมาโดยมีการวางแผนไว้ว่า คือ

- Design Database ออกแบบว่า Product เป็น Many to Many กับ Language โดยมี Table Mapping ชื่อ MultilingualProduct
- ทำ CRUD ของ Product และ Langauge รวมกับ ทำ Unit Test
- ทำ Api Create Multiligual Product และ Search Multilingual Product รวมกับทำ Unit Test

### How To Run

```
1. Clone Project https://github.com/banksinn/h-lab-assesment.git
2. cd multilingual-product
3. copy .env.example แล้ว set ค่า ที่ผม xxxx ไว้เป็นของตัวเอง
4. docker-compose up -d
5. nvm use 20 (node ต้อง version 20 ขึ้นไป)
6. yarn
7. yarn start:dev
8. connect database ตามที่เรา set ใน .env
9. สามารถดู swagger ได้ที่ http://localhost:3000/documents
```

## React Questions

1. useCallback คือ Hook ของ React ที่ใช้สำหรับป้องกันการเรียกใช้ซ้ำ เช่น ถ้าเรา Check ค่าจากตัวแปรนึงแล้วค่านั้นไม่เปลี่ยน ถ้าเราใช้ useCallback ครอบ Function ที่เราต้องการจะเรียกใช้ Function นั้นจะไม่ทำงาน กลับกันถ้าตัวแปรตัวนั้นเปลี่ยนค่า Function ตัวนั้นก็จะถูกเรียกใช้

2. ผมได้ทำการสร้าง project user-profile และได้เขียน test UserProfile.test.tsx ขึ้นมาโดยใช้ jest หลักๆ คือผมจะใช้วิธีการ test ว่าตอนที่ fetch api แล้วยังไม่ได้ data จะต้อง show loading, ถ้ามี data แต่ Error ให้ show error และถ้าไม่ Error ให้ show data ที่ fetch api ได้

## Stay in touch

- <b>Author</b> - Sintana Wongsuphakdee

- <b>Contact</b> - [linkedin](https://www.linkedin.com/in/sintana-wongsuphakdee-1543741ab/)
