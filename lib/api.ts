import { Note } from "@/types/note";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteHubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api/notes",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

interface NoteResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
}

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 10
): Promise<NoteResponse> => {
  const params = { search, page, perPage };

  const { data } = await noteHubApi.get<NoteResponse>("", { params });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await noteHubApi.get<Note>(`/${id}`);
  return data;
};

export const createNote = async (
  newNote: Pick<Note, "title" | "content" | "tag">
) => {
  const { data } = await noteHubApi.post<Note>("", newNote);

  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await noteHubApi.delete<Note>(`/${id}`);

  return data;
};
