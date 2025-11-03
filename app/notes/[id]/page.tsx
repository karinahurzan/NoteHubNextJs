import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { GRAPH_URL, URL } from "@/lib/constants";

interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const { title, content } = await fetchNoteById(id);

  return {
    title: `Note: ${title}`,
    description: content,
    openGraph: {
      title: `Note: ${title}`,
      description: content,
      url: `${URL}/notes/filter/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: GRAPH_URL,
          width: 1200,
          height: 630,
          alt: "Note image",
        },
      ],
    },
  };
};

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
