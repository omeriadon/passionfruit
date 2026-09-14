// import { source } from "@/lib/source";

// export type Chunk = {
//     id: string;
//     url: string;
//     title: string;
//     heading: string;
//     text: string;
// }

// export function getChunk(): Chunk[] {
//     const pages = source.getPages();
//     const chunks: Chunk[] = [];

//     for (const page of pages) {
//         const raw: string = page.data.body ?? "";
//         const sections = raw.split(/\n(?=#{1,3}\s)/);

//         sections.forEach((section, i) =>{
//             const headingMatch = section.match(/^#{1,3}\s+(.*)/);
//             const heading = headingMatch?.[1] ?? page.data.title;
//             const text = section.replace(/^#{1,3}\s+.*/, "").trim();

//             if (text.length > 0) {
//                 chunks.push({
//                     id: `${page.url}-${i}`,
//                     url: page.url,
//                     title: page.data.title,
//                     heading,
//                     text,
//                 })
//             }
//         })
//     }
    
//     return chunks;
// }