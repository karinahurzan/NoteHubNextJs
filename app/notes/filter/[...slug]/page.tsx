import { fetchNotes, PER_PAGE } from "@/lib/api";
import { GRAPH_URL, NOTES_FILTER_ALL, URL } from "@/lib/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { RSC_MODULE_TYPES } from "next/dist/shared/lib/constants";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;

  const descCategory =
    slug[0] === NOTES_FILTER_ALL ? "All notes" : `${slug[0]} category`;
  return {
    title: descCategory,
    description: `Notes filter: ${descCategory}`,
    openGraph: {
      title: descCategory,
      description: `Notes filter: ${descCategory}`,
      url: `${URL}/notes/filter/${slug[0]}`,
      siteName: "Notehub",
      images: [
        {
          url: GRAPH_URL,
          width: 1200,
          height: 630,
          alt: "Notebook image",
        },
      ],
    },
  };
};

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
