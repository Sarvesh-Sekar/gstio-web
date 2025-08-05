import TextField from "@mui/material/TextField";
export default function AddInvoice() {
  return (
    <div className="flex justify-start h-full border-2 flex-col">
      <div className="flex items-center w-full h-[60px] text-2xl">
        Create New Invoice
      </div>
      <div className="border-2 w-[50%] p-2 flex flex-col gap-y-4">
        <TextField
          id="outlined-multiline-flexible"
          label="Enter GST ID"
          maxRows={1}
          maxLength={15}
          className="w-full"
          InputProps={{
            style: { color: "white" },
            maxLength: 15,
          }}
          slotProps={{ htmlInput: { maxLength: 12 } }}
          InputLabelProps={{
            style: { color: "#A6ADB5", fontFamily: "Lexend" },
          }}
          sx={{
            fontFamily: "Lexend",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#30363B",
              borderRadius: "10px",
              width:"100%",
              height:"100%",

              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
              fontFamily: "Lexend",
            },
          }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Client Address"
          maxRows={4}
          multiline
          className="w-full"
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "#A6ADB5", fontFamily: "Lexend" },
          }}
          sx={{
            fontFamily: "Lexend",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#30363B",
              borderRadius: "10px",

              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
              fontFamily: "Lexend",
            },
          }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Client Name"
          maxRows={1}
          maxLength={15}
          className="w-full"
          InputProps={{
            style: { color: "white" },
            maxLength: 15,
          }}
          slotProps={{ htmlInput: { maxLength: 12 } }}
          InputLabelProps={{
            style: { color: "#A6ADB5", fontFamily: "Lexend" },
          }}
          sx={{
            fontFamily: "Lexend",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#30363B",
              borderRadius: "10px",

              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
              fontFamily: "Lexend",
            },
          }}
        />
      </div>
    </div>
  );
}
