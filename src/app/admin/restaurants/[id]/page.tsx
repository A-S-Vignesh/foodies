"use client";

import { RestaurantForm } from "@/components/admin/RestaurantForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data Fetcher
const getRestaurant = (id: string) => ({
  id: id,
  name: "The Italian Place",
  slug: "the-italian-place",
  description:
    "Authentic Italian cuisine featuring homemade pasta, wood-fired pizzas, and a selection of fine wines. Experience the taste of Tuscany in the heart of the city.",
  email: "contact@italianplace.com",
  phone: "+1 (555) 123-4567",
  logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200&auto=format&fit=crop",
  coverImage:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
  status: "active",
  priceRange: "$$",
  tags: ["Italian", "Pizza"],
  address: {
    street: "123 Culinary Ave",
    city: "New York",
    state: "NY",
    zip: "10001",
  },
});

export default function EditRestaurantPage() {
  const params = useParams();
  const id = params.id as string;
  const restaurant = getRestaurant(id);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full"
          asChild
        >
          <Link href="/admin/restaurants">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Restaurant</h1>
          <p className="text-muted-foreground text-sm">
            Update details for {restaurant.name}.
          </p>
        </div>
      </div>

      <RestaurantForm initialData={restaurant} />
    </div>
  );
}
