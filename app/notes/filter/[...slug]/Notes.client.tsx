"use client";

import EmptyListMessage from "@/components/EmptyListMessage/EmptyListMessage";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes, PER_PAGE } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  category: string | undefined;
}

const NotesClient = ({ category }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value.trim());
      setCurrentPage(1);
    },
    500
  );

  const {
    data: { notes = [], totalPages = 0 } = {},
    isFetching,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [
      "notes",
      { searchQuery, tag: category, page: currentPage, perPage: PER_PAGE },
    ],
    queryFn: () => fetchNotes(searchQuery, category, currentPage, PER_PAGE),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} defaultValue={searchQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
      {!notes.length && !isFetching && !isError && <EmptyListMessage />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
