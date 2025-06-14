import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function apiGetSession() {
  // getting the current session to check whether there's a current session
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error("Error fetching user.");

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUserDataForm(userData) {
  if (!userData) {
    throw new Error("User 'Updated Data' is undefined.");
  }

  // 1. extract data to update
  const { password, fullName, avatar } = userData;

  const updateObject = password ? { password } : { data: { fullName } };

  // 2. update either password or fullname
  const { data, error } = await supabase.auth.updateUser(updateObject);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 3. upload avatar to supabase's bucket
  const fileName = `user-${data.user.id}-${Date.now()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 4. update avatar to the user (client)
  const { data: userAvatarData, error: userAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (userAvatarError) throw new Error(userAvatarError.message);

  return userAvatarData;
}
