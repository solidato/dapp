import useSWR from "swr";

import { useMemo } from "react";

import { Avatar, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { fetcher } from "@lib/net";
import { getLettersFromName } from "@lib/utils";

import { Shareholder } from "../schema/shareholders";

export default function UsersAutocomplete({
  onChange,
  selectedAddress,
  filterList,
  label,
  fullWidth,
}: {
  onChange: (address: string) => void;
  selectedAddress: string | null;
  filterList?: string[];
  label: string;
  fullWidth?: boolean;
}) {
  const { data: users, isLoading, error } = useSWR<Shareholder[]>("/api/users", fetcher);

  const options = useMemo(() => {
    return (users || [])
      .filter((user) => !filterList || filterList.includes(user.ethAddress))
      .map((user) => ({
        name: user.name,
        value: user.ethAddress,
        image: user.avatar,
      }));
  }, [users]);

  if (isLoading) return <CircularProgress />;

  return (
    <Autocomplete
      id="users-autocomplete"
      sx={{ width: fullWidth ? undefined : 300 }}
      fullWidth={fullWidth}
      options={options}
      autoHighlight
      value={options.find((opt) => opt.value === selectedAddress)}
      onChange={(_, option) => {
        onChange(option?.value || "");
      }}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Avatar sx={{ width: 32, height: 32, flexShrink: 0, mr: 2 }} alt={option?.name} src={option?.image || ""}>
            {getLettersFromName(option?.name)}
          </Avatar>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-kek", // disable autocomplete and autofill
          }}
          variant="standard"
        />
      )}
    />
  );
}
