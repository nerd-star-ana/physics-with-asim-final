"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder = "Search resources, courses, or topics",
  value: controlledValue,
  onChange: controlledOnChange,
  onSearch,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (controlledOnChange) {
      controlledOnChange(val);
    } else {
      setInternalValue(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <label className="relative block w-full max-w-md">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        aria-label="Search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="h-11 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-indigo-900"
      />
    </label>
  );
}
