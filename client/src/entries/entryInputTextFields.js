// formik = '';
// const entryInputTextFields = [
//     {
//       id: "date",
//       type: "date",
//       label: "Entry Date",
//       helperText: "Please enter valid date",
//       className: classes.userInputFields,
//       error: formik.errors.date ? true : false,
//       //{... formik.getFieldProps()},
//     },
//     {
//       id: "tipsTotal",
//       type: "number",
//       label: "Total Tips",
//       helperText: formik.errors.tipsTotal
//         ? "Please enter positive value"
//         : null,
//       className: classes.userInputFields,
//       error: formik.errors.tipsTotal ? true : false,
//     },
//     {
//       id: "numTransactions",
//       type: "number",
//       label: "Total Transactions",
//       helperText: formik.errors.numTransactions
//         ? "Please enter positive value"
//         : null,
//       className: classes.userInputFields,
//       error: formik.errors.numTransactions ? true : false,
//     },
//   ];

const entryInputTextFields = [
    {
      id: "date",
      type: "date",
      label: "Entry Date",
    },
    {
      id: "tipsTotal",
      type: "number",
      label: "Total Tips",
    },
    {
      id: "numTransactions",
      type: "number",
      label: "Total Transactions",
    },
  ];

export default entryInputTextFields;