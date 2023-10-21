import { prisma } from "@/lib/prisma";
import { useMufe } from "mufe";

// await prisma.user.create({
//   data: {
//     name: "John",
//     posts: {
//       create: {
//         content: "Hello, World!",
//       },
//     },
//   },
// });

const requests = 500;

for (let i = 0; i < requests; i++) {
  const firstUser = await useMufe({
    id: "first_user",
    revalidate: 15, // 15 seconds
    update: () => prisma.user.findFirst(),
  });

  console.log(firstUser);
}
