# H Lab Assesment

## Back-end Questions

1. ถ้าสมมติมีการสร้าง Microservice Customer Api, Master Data Api,
   และ Transaction Data Api แล้วจะต้องมีการสร้าง Feature ใหม่ที่ต้องดึง Api จากทั้ง 3 Microservice ให้เร็วที่สุดเข้าใกล้ Realtime ผมจะเลือกที่จะสร้าง Api ตัวใหม่โดยใช้ Kafka ยกตัวอย่างเช่น ถ้าเกิดว่ามีการสร้่าง Transaction Data ขึ้นมาอันนึง ในฝั่ง Transaction Data ก็จะ Emit Data ไปผ่าน Topic Transaction-data แล้วฝั่ง Frontend ถ้าเปิดตัว Topic Transaction-data ไว้ก็จะสามารถอ่านข้อมูล Transaction ที่พึ่งเพิ่มไปได้ทันทีเป็นต้น แล้วถ้าเกิดว่าต้องการให้ไวกว่านี้ ผมคิดว่าเราสามารถเพิ่มระบบ Caching เข้ามาด้วย Redis ได้คือถ้าสมมติว่ามันดันเพิ่ม Transaction Data ที่มันมีอยู่แล้ว ก็ไม่ต้องไปอ่านจากที่ Emit ไป ก็อ่านจาก Cache ได้เลยว่ายิง Transaction Data Api ไปแล้วเคยได้ ข้อมูลยังไงก็นำมาใช้ได้เลย เป็นต้น ซึ่งเราสามารถประยุกต์ใช้วิธีการนี้ได้กับทั้ง 3 Microservice เลย

2. ถ้าสมมตมีการสร้าง Project ใหม่แล้ว Project Manager บอกให้ Test Performance สำหรับการ Release Project นี้ผมจะวางแผนกร Test โดยการใช้ Tools ที่ชื่อว่า k6 เพื่อทำการ Test Rest Api โดยผมจะทำการเขียน Scripts เพื่อที่จะรัน Test โดยผมจะทำการเทสทั้งหมด 4 เคสคือ Load Test คือ Test ปกติ, Stress Test คือ Test ที่เข้มข้นมากกว่าปกติ, Spike Test คือ Test ที่มีความเข้มข้นสูงในระยะเวลาสั้นๆ, Breakpoint Test คือ Test ด้วยความเข้มข้นสูงไปเรื่อยๆจนกว่าจะถึง Limit สูงสุด, Soak Test คือ Test ที่มีความเข้มข้นสูงที่ไปในระยะเวลายาวนาน

3.

## React Questions

1. useCallback คือ Hook ของ React ที่ใช้สำหรับป้องกันการเรียกใช้ซ้ำ เช่น ถ้าเรา Check ค่าจากตัวแปรนึงแล้วค่านั้นไม่เปลี่ยน ถ้าเราใช้ useCallback ครอบ Function ที่เราต้องการจะเรียกใช้ Function นั้นจะไม่ทำงาน กลับกันถ้าตัวแปรตัวนั้นเปลี่ยนค่า Function ตัวนั้นก็จะถูกเรียกใช้

2.

## Stay in touch

- <b>Author</b> - Sintana Wongsuphakdee

- <b>Contact</b> - [linkedin](https://www.linkedin.com/in/sintana-wongsuphakdee-1543741ab/)
