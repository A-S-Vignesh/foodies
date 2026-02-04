"use client";

import { MenuForm } from "@/components/admin/MenuForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock Data Fetcher (Can stay in component for now or move to lib)
const getMenuItem = (id: string) => {
  // Simulate finding item
  return {
    id: id,
    name: "The Royal Burger",
    price: 18.0,
    description:
      "A culinary masterpiece featuring a juicy, flame-grilled wagyu beef patty topped with melted aged cheddar, crispy artisanal bacon, fresh organic lettuce, vine-ripened tomatoes, and our secret signature truffle sauce.",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
    ingredients: ["Wagyu Beef", "Cheddar", "Bacon", "Truffle Sauce"],
    isVeg: false,
    featured: true,
    available: true,
  };
};

export default function EditMenuItemPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const item = getMenuItem(id);
      setData(item);
    }
  }, [id]);

  if (!data) return null; // Or loading spinner

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full"
          asChild
        >
          <Link href="/admin/menu">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Item</h1>
          <p className="text-muted-foreground text-sm">
            Make changes to {data.name}.
          </p>
        </div>
      </div>

      <MenuForm initialData={data} />
    </div>
  );
}
