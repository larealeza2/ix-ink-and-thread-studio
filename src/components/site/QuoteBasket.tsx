import { createContext, useContext, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const Basket = createContext<{ items: string[]; toggle: (name: string) => void }>({ items: [], toggle: () => {} });
export function QuoteBasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const toggle = (name: string) => setItems((current) => current.includes(name) ? current.filter((n) => n !== name) : [...current, name]);
  return <Basket.Provider value={{ items, toggle }}>{children}{items.length > 0 && <aside aria-label="Selected quote products" className="quote-tray fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-4"><div className="container-x flex items-center justify-between gap-3"><div className="min-w-0"><p className="text-sm font-bold">Your project · {items.length} {items.length === 1 ? "product" : "products"}</p><p className="hidden truncate text-xs text-muted-foreground sm:block">{items.join(" · ")}</p></div><div className="flex shrink-0 items-center gap-2"><Button variant="ghost" size="icon" aria-label="Clear selected products" onClick={() => setItems([])}><X /></Button><Button asChild className="btn btn-primary h-auto"><Link to="/quote" search={{ items: items.join("|") }}>Request quote <ArrowRight /></Link></Button></div></div></aside>}</Basket.Provider>;
}
export const useQuoteBasket = () => useContext(Basket);
