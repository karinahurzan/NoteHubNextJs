import { fetchNotes, PER_PAGE } from "@/lib/api";
import { NOTES_FILTER_ALL } from "@/lib/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesPageParams {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: NotesPageParams) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const category = slug[0] === NOTES_FILTER_ALL ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: [
      "notes",
      { search: "", tag: category, page: 1, perPage: PER_PAGE },
    ],
    queryFn: () => fetchNotes("", category, 1, PER_PAGE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {" "}
      <NotesClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesPage;
