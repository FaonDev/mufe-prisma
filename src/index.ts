import { prisma } from "@/lib/prisma";
import { mufe } from "@/lib/mufe";

// Simulating concurrent requests
const requests = 500;

for (let i = 0; i < requests; i++) {
  // Getting the cached user
  const [cachedFirstUser, setCachedFirstUser] =
    mufe.use<ReturnType<typeof prisma.user.findFirst>>("first_user");

  // Defining the end user
  const firstUser = cachedFirstUser ?? (await prisma.user.findFirst());

  // Inserting user into cache
  if (!cachedFirstUser) setCachedFirstUser(firstUser);

  console.log(firstUser);
}
