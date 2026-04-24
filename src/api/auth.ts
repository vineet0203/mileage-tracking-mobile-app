import { User } from "../types/api";

export const getMe = async (): Promise<User> => {
  // Dummy implementation for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        email: "adventurer@example.com",
        phone: "+1234567890",
        name: "Adventurer",
        profile_image: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }, 1000);
  });
};
