const baseUrl = "http://localhost:5001";

const fetchRequest = async (url, options) => {
  const response = await fetch(`${baseUrl}${url}`, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetchRequest("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response;
};

export const loginUser = async (email, password) => {
  const users = await fetchRequest(`/users`);
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user;
};

export const fetchUserById = async (id) => {
  const user = await fetchRequest(`/users?id=${id}`);
  return user[0];
};

export const fetchNotes = async () => {
  const notes = await fetchRequest("/notes");
  return notes;
};

export const deleteNote = async (id) => {
  const response = await fetchRequest(`/notes/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const createNote = async (noteData) => {
  const response = await fetchRequest("/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });
  return response;
};

export const fetchNoteById = async (id) => {
  try {
    const note = await fetchRequest(`/notes/${id}`);
    return note;
  } catch (error) {
    return null;
  }
};

export const updateNote = async (noteId, noteData) => {
  const response = await fetchRequest(`/notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });
  return response;
};
