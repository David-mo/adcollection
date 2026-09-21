"use client";

import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import type { TaxonomyRef } from "@/entities/taxonomy";
import { FilterDropdown } from "./filter-dropdown";

const filterParsers = {
  clients: parseAsArrayOf(parseAsString).withDefault([]),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  contentTypes: parseAsArrayOf(parseAsString).withDefault([]),
  search: parseAsString.withDefault(""),
};

interface FilterBarProps {
  clients: TaxonomyRef[];
  industries: TaxonomyRef[];
  videoTypes: TaxonomyRef[];
}

export function FilterBar({ clients, industries, videoTypes }: FilterBarProps) {
  const [filters, setFilters] = useQueryStates(filterParsers, { shallow: false });

  const clientOptions = clients.map((client) => ({
    value: client.slug,
    label: client.name,
  }));
  const industryOptions = industries.map((category) => ({
    value: category.slug,
    label: category.name,
  }));
  const videoTypeOptions = videoTypes.map((contentType) => ({
    value: contentType.slug,
    label: contentType.name,
  }));
  return (
    <div className="flex flex-wrap items-center gap-filter-gap">
      <input
        type="search"
        aria-label="Search ads"
        placeholder="Search ads"
        value={filters.search}
        onChange={(event) => setFilters({ search: event.target.value })}
        className="h-10 min-w-56 rounded-sm border border-hairline bg-white px-3 text-sm outline-none focus:border-black"
      />
      <FilterDropdown
        label="By Client"
        options={clientOptions}
        selected={filters.clients}
        onChange={(values) => setFilters({ clients: values })}
      />
      <FilterDropdown
        label="By Industry"
        options={industryOptions}
        selected={filters.categories}
        onChange={(values) => setFilters({ categories: values })}
      />
      <FilterDropdown
        label="By Video Type"
        options={videoTypeOptions}
        selected={filters.contentTypes}
        onChange={(values) => setFilters({ contentTypes: values })}
      />
    </div>
  );
}
