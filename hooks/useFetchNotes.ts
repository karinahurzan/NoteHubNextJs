import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface UserNotesOptions {
  search: string;
  page?: number;
  perPage?: number;
}

export const useFetchNotes = ({
  search,
  page = 1,
  perPage = 10,
}: UserNotesOptions) => {
  return useQuery({
    queryKey: ["notes", { search, page, perPage }],
    queryFn: () => fetchNotes(search, page, perPage),
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
