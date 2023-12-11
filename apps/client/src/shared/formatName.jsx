export default function FormatName(name) {
    // Convert the name to lowercase and then capitalize the first letter of each word
    return name.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
  }
  