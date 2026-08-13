import api from "./axios";

// Uploads a single image file and returns its public URL (e.g. "/uploads/169...-abc.jpg").
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url;
}

// Uploads multiple image files at once, returns an array of public URLs.
export async function uploadImages(files) {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const { data } = await api.post("/upload/multiple", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.urls;
}

// Deletes a previously uploaded file by its filename (not full URL).
export async function deleteUploadedImage(filenameOrUrl) {
  const filename = filenameOrUrl.split("/").pop();
  await api.delete(`/upload/${filename}`);
}
