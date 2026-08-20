export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  seller: string;
  image: string;
  description: string;
}

export const sampleProducts: Product[] = [
  {
    id: "1",
    title: "หนังสือเรียน Calculus 1 (สภาพ 90%)",
    price: 180,
    category: "หนังสือ",
    condition: "มือสองสภาพดี",
    seller: "พี่มอ 3",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
    description: "มีจดโน้ตเฉลยโจทย์สำคัญไว้บางหน้า ไม่มีรอยขีดข่วนรุนแรง",
  },
  {
    id: "2",
    title: "เครื่องคิดเลขวิทยาศาสตร์ Casio FX-991EX",
    price: 450,
    category: "อุปกรณ์การเรียน",
    condition: "ใช้งานปกติ",
    seller: "บอส วิศวะ",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=500&auto=format&fit=crop",
    description: "แถมถ่านใหม่ ใช้งานได้ยาวๆ ปุ่มกดชัดเจนทุกปุ่ม",
  },
  {
    id: "3",
    title: "เสื้อช็อปช่างเทคนิค ไซส์ L",
    price: 250,
    
    category: "เครื่องแต่งกาย",
    condition: "มือสอง",
    seller: "มายด์ ปวส.2",
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500&q=80",
    description: "ซักสะอาดแล้ว ปักโลโก้วิทยาลัยเรียบร้อย",
  },
  {
    id: "4",
    title: "จักรยานปั่นในวิทยาลัย (มีตะกร้าหน้า)",
    price: 800,
    category: "ยานพาหนะ",
    condition: "ตามสภาพ",
    seller: "กอล์ฟ สถาปัตย์",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80",
    description: "ยางเพิ่งเปลี่ยนใหม่ ปั่นไปเรียนสะดวกมากๆ",
  },
  {
    id: "5",
    title: "iPad Air 4 (64GB) Wi-Fi + Apple Pencil 2",
    price: 11500,
    category: "ไอที/อิเล็กทรอนิกส์",
    condition: "สภาพสวย",
    seller: "พลอย คอมพิวเตอร์",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    description: "ติดฟิล์มกระดาษแล้ว ติดเคสตลอด สภาพดีมาก พร้อมกล่อง",
  },
];