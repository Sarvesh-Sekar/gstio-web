import { create } from "zustand";

const userStoreDeclaration = (set) => ({
  userData: {
    email: "",
    password: "",
  },

  saveUserData: (email: string, password: string) => {
    set(() => ({
      userData: {
        email: email,
        password: password,
      },
    }));
  },
});

const userStore = create(userStoreDeclaration);
export default userStore;
