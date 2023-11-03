import { useMemo, useState } from "react";

import { Search } from "@mui/icons-material";
import { Box, Chip, InputAdornment, ListSubheader, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

const containsText = (text: string, searchText: string) => text?.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const SearchSelect = ({ field, options }: { field: any; options: { id: number; name: string }[] }) => {
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option.name, searchText)),
    [searchText, options],
  );

  return (
    <Select
      // Disables auto focus on MenuItems and allows TextField to be in focus
      {...field}
      labelId="search-select-label"
      id="search-select"
      label="Options"
      multiple
      required
      input={<OutlinedInput id="select-multiple-tags" label="Tags" />}
      renderValue={(selected: number[]) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value) => (
            <Chip
              sx={{ height: "23px" }}
              key={value}
              label={options?.find((option) => option.id === value)?.name || value}
            />
          ))}
        </Box>
      )}
      // onChange={(e) => setSelectedOption(e.target.value)}
      onClose={() => setSearchText("")}
      MenuProps={{
        autoFocus: false,
        PaperProps: {
          style: {
            maxHeight: 224,
            width: 235,
          },
        },
      }}
      // This prevents rendering empty string in Select's value
      // if search text would exclude currently selected option.
      // renderValue={() => selectedOption}
    >
      {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
      <ListSubheader>
        <TextField
          size="small"
          // Autofocus on textfield
          autoFocus
          placeholder="Type to search..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Escape") {
              // Prevents autoselecting item while typing (default Select behaviour)
              e.stopPropagation();
            }
          }}
        />
      </ListSubheader>
      {displayedOptions.map((option, i) => (
        <MenuItem key={i} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  );
};
export default SearchSelect;
