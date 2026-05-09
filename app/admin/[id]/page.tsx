import { notFound } from "next/navigation";
import { getStoreById } from "@/lib/db";
import StoreForm from "../store-form";

export default async function EditLojaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = await getStoreById(Number(id));
  if (!store) notFound();
  return <StoreForm mode="edit" store={store} />;
}
