"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "อุปกรณ์การเรียน & แกดเจ็ต",
    condition: "ของใหม่ยังไม่เคยใช้งาน",
    description: "",
    seller: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("ลงประกาศสินค้าใหม่เรียบร้อยแล้ว!");
    router.push("/home");
  };

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 p-4"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "16px",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-md"
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between mb-6"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <Link
            href="/home"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            ← กลับหน้าหลัก
          </Link>
          <h1
            className="font-bold text-lg"
            style={{ fontWeight: "bold", fontSize: "18px", margin: 0, color: "#0f172a" }}
          >
            ลงประกาศขายสินค้าใหม่
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-sm"
          style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px" }}
        >
          <div>
            <label
              className="block font-medium mb-1"
              style={{ display: "block", fontWeight: "500", marginBottom: "6px", color: "#334155" }}
            >
              ชื่อสินค้าใหม่
            </label>
            <input
              required
              type="text"
              placeholder="เช่น เมาส์ไร้สายบลูทูธ, หูฟังตัดเสียงรบกวน, โคมไฟอ่านหนังสือ"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#f8fafc",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div
            className="grid grid-cols-2 gap-3"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
          >
            <div>
              <label
                className="block font-medium mb-1"
                style={{ display: "block", fontWeight: "500", marginBottom: "6px", color: "#334155" }}
              >
                ราคา (บาท)
              </label>
              <input
                required
                type="number"
                placeholder="290"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#f8fafc",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-1"
                style={{ display: "block", fontWeight: "500", marginBottom: "6px", color: "#334155" }}
              >
                หมวดหมู่สินค้าใหม่
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#f8fafc",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              >
                <option>อุปกรณ์การเรียน & แกดเจ็ต</option>
                <option>ไอที & อุปกรณ์คอมพิวเตอร์</option>
                <option>เสื้อผ้า & แฟชั่นนักศึกษา</option>
                <option>ของใช้ในหอพัก & ตกแต่งห้อง</option>
                <option>ขนม & เครื่องดื่ม</option>
                <option>สินค้าทำมือ & งานแฮนด์เมด</option>
              </select>
            </div>
          </div>

          <div>
            <label
              className="block font-medium mb-1"
              style={{ display: "block", fontWeight: "500", marginBottom: "6px", color: "#334155" }}
            >
              ชื่อผู้ขาย / ช่องทางติดต่อ (IG, Line, โทร)
            </label>
            <input
              required
              type="text"
              placeholder="เช่น เจมส์ คอมพิวเตอร์ (Line ID: james_dev)"
              value={formData.seller}
              onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#f8fafc",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              className="block font-medium mb-1"
              style={{ display: "block", fontWeight: "500", marginBottom: "6px", color: "#334155" }}
            >
              รายละเอียดและจุดนัดรับ
            </label>
            <textarea
              rows={3}
              placeholder="รายละเอียดสินค้าใหม่ สินค้าแกะกล่องใหม่ นัดรับได้ที่ใต้ตึกเรียนหรือซอยหน้าวิทยาลัย..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#f8fafc",
                boxSizing: "border-box",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition active:scale-95"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontWeight: "bold",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              marginTop: "8px",
            }}
          >
            🚀 ลงประกาศขายสินค้าใหม่ทันที
          </button>
        </form>
      </div>
    </div>
  );
}