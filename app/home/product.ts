export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  seller: string;
  image: string;
  condition: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'หนังสือเรียน Python for Beginners',
    price: 180,
    category: 'หนังสือ',
    seller: 'กิตติพงษ์ (เทคโนโลยีสารสนเทศ ปี 2)',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
    condition: 'สภาพ 95% ไม่มีรอยขีดเขียน'
  },
  {
    id: 2,
    title: 'iPad Air 4 64GB Wi-Fi + Apple Pencil 2',
    price: 12500,
    category: 'ไอที & ไอที',
    seller: 'ณิชา (การบัญชี ปี 3)',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400',
    condition: 'ติดฟิล์มกระดาษพร้อมใช้งาน'
  },
  {
    id: 3,
    title: 'เสื้อช็อปช่างไฟฟ้า ไซส์ L',
    price: 250,
    category: 'เครื่องแต่งกาย',
    seller: 'อนันต์ (ช่างไฟฟ้า ปี 1)',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400',
    condition: 'มือสอง ใส่ไป 3 ครั้ง'
  },
  {
    id: 4,
    title: 'พัดลมตั้งโต๊ะ Hatari 16 นิ้ว',
    price: 320,
    category: 'ของใช้เด็กหอ',
    seller: 'เมธาวี (หอพักชาย 2)',
    image: 'https://images.unsplash.com/photo-1618941723631-f2f54070a969?auto=format&fit=crop&q=80&w=400',
    condition: 'ใช้งานได้ปกติ เย็นฉ่ำ'
  },
  {
    id: 5,
    title: 'เครื่องคิดเลขวิทยาศาสตร์ Casio FX-991EX',
    price: 450,
    category: 'อุปกรณ์การเรียน',
    seller: 'พิชญ์ (วิศวกรรมศาสตร์ ปี 4)',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=400',
    condition: 'ถ่านใหม่ เพิ่งเปลี่ยน'
  }
];