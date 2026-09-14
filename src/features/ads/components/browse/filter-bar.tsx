"use client";

import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import type { TaxonomyRef } from "@/entities/taxonomy";
import { FilterDropdown } from "./filter-dropdown";

const filterParsers = {
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  contentTypes: parseAsArrayOf(parseAsString).withDefault([]),
  platforms: parseAsArrayOf(parseAsString).withDefault([]),
};

interface FilterBarProps {
  categories: TaxonomyRef[];
  contentTypes: TaxonomyRef[];
  platforms: TaxonomyRef[];
}

export function FilterBar({ categories, contentTypes, platforms }: FilterBarProps) {
  const [filters, setFilters] = useQueryStates(filterParsers, { shallow: false });

  const categoryOptions = categories.map((category) => ({
    value: category.slug,
    label: category.name,
  }));
  const contentTypeOptions = contentTypes.map((contentType) => ({
    value: contentType.slug,
    label: contentType.name,
  }));
  const platformOptions = platforms.map((platform) => ({
    value: platform.slug,
    label: platform.name,
  }));

  return (
    <div className="flex flex-wrap items-center gap-filter-gap">
      <FilterDropdown
        label="By Category"
        options={categoryOptions}
        selected={filters.categories}
        onChange={(values) => setFilters({ categories: values })}
      />
      <FilterDropdown
        label="By Style"
        options={contentTypeOptions}
        selected={filters.contentTypes}
        onChange={(values) => setFilters({ contentTypes: values })}
      />
      <FilterDropdown
        label="By Platform"
        options={platformOptions}
        selected={filters.platforms}
        onChange={(values) => setFilters({ platforms: values })}
      />
    </div>
  );
}
