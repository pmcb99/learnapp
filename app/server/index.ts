import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";

const permittedCodes = ["MOGUES", "STPATS", "LORETO"];

type SubmitCodeResult = {
  success: boolean;
  message: string;
};

export const appRouter = router({
  retrieveCode: publicProcedure
    .query(async () => {
      const id = await auth().userId;
      // clerk checks if user is logged in
      if (!id) {
        throw new Error("User not logged in. Please refresh the page.");
      }

      // check if user exists in db
      try {
        const userInDb = await prismadb.user.findUnique({
          where: { id: id },
        });

        if (!userInDb) {
          return ""
        } else {
          return userInDb.checkoutCode as string;
        }
      } catch (e) {
        throw new Error("Error retrieving code. Please try again.");
      }
    }),
  submitCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ input }): Promise<SubmitCodeResult> => {
      const { code } = input;
      // Check if the code is one of the permitted codes
      if (!permittedCodes.includes(code)) {
        // Handle invalid code
        throw new Error("Invalid code. Contact us for help.");
      } else {
        // get user email from clerk
        const userFromClerk = await currentUser();
        const userEmail = userFromClerk?.emailAddresses?.[0]?.emailAddress;

        // clerk checks if user is logged in
        if (!userEmail) {
          throw new Error("User not logged in. Please refresh the page.");
        }

        // check if user exists in db
        try {
          const userInDb = await prismadb.user.findUnique({
            where: { email: userEmail },
          });

          if (!userInDb) {
            await prismadb.user.create({
              data: {
                id: userFromClerk.id,
                email: userEmail,
                checkoutCode: code,
              },
            });
          } else {
            await prismadb.user.update({
              where: { id: userFromClerk.id },
              data: {
                checkoutCode: code,
              },
            });
          }
        } catch (e) {
          throw new Error("Error submitting code. Please try again.");
        }
        return { success: true, message: "Code submitted successfully!" };
      }
    }),
});

export type AppRouter = typeof appRouter;
