// scripts/debug.ts
import { source } from "@/lib/source";

const pages = source.getPages();
console.log(Object.keys(pages[0].data));
console.log(pages[0].data); // dump the whole thing too, useful