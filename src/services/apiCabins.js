import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("cabins errorl");
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("cabins errorl");
    throw new Error("Cabin could not be deleted");
  }

  return;
}
export async function createEditCabin({ newCabin, id }) {
  const hasAPath = newCabin.image?.startsWith?.("https");
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasAPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/edit cabin
  // note: we use 'supabase.from()' if we want to make multiple actions
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error("cabins errorl:", error);
    throw new Error("Cabin could not be created");
  }

  if (hasAPath) return data;

  // 2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    // note: first is the name of the image and second is the actual image
    .upload(imageName, newCabin.image);

  // 3. delete cabin if the image was not uploaded
  if (storageError) {
    console.error("cabins errorl");
    await supabase.from("cabins").delete().eq(data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return;
}
